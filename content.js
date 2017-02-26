// content.js

var tones = [16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5,
29.14, 30.87, 32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49.0, 51.91, 55.0,
58.27, 61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98.0, 103.83,
110.0, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.0,
196.0, 207.65, 220.0, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63,
349.23, 369.99, 392.0, 415.3, 440.0, 466.16, 493.88, 523.25, 554.37, 587.33,
622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880.0, 932.33, 987.77, 1046.5,
1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760.0,
1864.66, 1975.53, 2093.0, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96,
3135.96, 3322.44, 3520.0, 3729.31, 3951.07, 4186.01, 4434.92, 4698.63, 4978.03,
5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040.0, 7458.62, 7902.13]
var tonesRand;
var seed;
var isLoad = false;

//creating an audio context when the page first loads
var context;
var gainNode;
var p;
document.onload = init();
function init() {
  try {
    // Fix up for prefixing
    document.AudioContext = document.AudioContext||document.webkitAudioContext;
    //create a new context
    context = new AudioContext();
  }
  catch(e) {
    alert("Web Audio API is not supported in this browser. Your password extension will not work.");
  }
  //puts ID in password input element
	var nodeList = document.getElementsByTagName("input");
	for (item in nodeList) {
		try {
			if(nodeList[item].getAttribute("type") == "password") {
				nodeList[item].setAttribute("class", "PASS");
				isLoad = true;
			}
		} catch(err) {}
	}
	if (isLoad){
		//places random token in chrome storage for user: NOT SECURE, PLACEHOLDER
		chrome.storage.sync.get('userid', function(items) {
    		var userid = items.userid;
    		if (userid) {
        		useToken(userid);
    		} else {
        		userid = getRandomToken();
        		chrome.storage.sync.set({userid: userid}, function() {
            		useToken(userid);
        		});
    		}
    		function useToken(userid) {
    			seed = parseInt(userid, 16);
    			tonesRand = randOrder(tones);
				//console.log(tonesRand);
			}
		});

		//generates random token
		function getRandomToken() {
    		// E.g. 8 * 32 = 256 bits token
    		var randomPool = new Uint8Array(32);
    		crypto.getRandomValues(randomPool);
    		var hex = '';
    		for (var i = 0; i < randomPool.length; ++i) {
        		hex += randomPool[i].toString(16);
    		}
    	// E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
   		 	return hex;
		}



		function seededRandom(max, min) {
// 			console.log("seed: ", seed);
			max = max || 1;
			min = min || 0;

			seed = (seed*9301 + 49297) % 233280;
			var rnd = seed/ 233280;

			return min + rnd * (max - min);
		}


		function randOrder(array){
			var currentIndex = array.length, temporaryValue, randomIndex;

			while(0 !== currentIndex) {
				randomIndex = Math.floor(seededRandom(1, 0)*currentIndex);
				currentIndex -= 1;

				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
				return array
			}



};

//get password input field
p = document.getElementsByClassName("PASS");
}

//play a tone for a specified length of time
//exponentially decrease the gain (volume) so that the note rounds out
//(no harsh cutting off noise)
//plays for 0.1s
function playTone(freq) {
   oscillator = context.createOscillator();
   gainNode = context.createGain();
   oscillator.frequency.value = freq;   //middle C
   oscillator.type = "square"
   oscillator.connect(gainNode);
   gainNode.connect(context.destination)
   oscillator.start(0);
   gainNode.gain.setTargetAtTime(0, context.currentTime, 0.10);
}


//loop through all the elements we've captured with PASS
for (var i = 0; i < p.length; i++) {
p[i].onkeypress = function() {
   var keyCode = event.which || event.keyCode || 0;
   //console.log(keyCode);
   //console.log(tonesRand[keyCode-32]);


   playTone(tonesRand[keyCode-32]);
}
}
