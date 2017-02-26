//libraries used/things to credit:
//stackoverflow (lots of javascript)
//web audio api, several related tutorials, http://www.phy.mtu.edu/~suits/notefreqs.html
//95 total frequencies - 40 black keys, 55 white keys

//the array to hold all the key mappings
var dict = [16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14, 30.87, 32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49.0, 51.91, 55.0, 58.27, 61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98.0, 103.83, 110.0, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.0, 196.0, 207.65, 220.0, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880.0, 932.33, 987.77, 1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760.0, 1864.66, 1975.53, 2093.0, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520.0, 3729.31];

var ascii = ['space', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~']

//creating an audio context when the page first loads
var context;
var gainNode;
window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    //create a new context
    context = new AudioContext();
  }
  catch(e) {
    alert("Web Audio API is not supported in this browser. Your password extension will not work.");
  }
  // drawPiano();
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

//when a key is pressed, play a tone
document.onkeypress = function() {
   var keyCode = event.which || event.keyCode || 0;
   playTone(dict[keyCode-32]);
   console.log(keyCode-32);
   console.log(dict[keyCode-32]);
   //show the thing on the screen
   document.querySelector('.keytext').innerHTML = "<span>"+ascii[keyCode-32]+"</span>"
}

var collection = document.getElementsByClassName("white-key");
for (var i; i<collection.length; i++) {
   collection[i].onclick = function() {
      console.log("call my function!");
   }
}

// function myfunction() {
//    console.log(event.target.className.animVal);
//    event.target.setAttribute("class", "pink");
//    setTimeout(function () {
//       event.target.setAttribute("class", "white-key");
//    }, 10);
//
// }
function pink() {
   console.log(event.target.className);
   event.target.setAttribute("class", "pink");
   setTimeout(function () {
      event.target.setAttribute("class", "white-key");
   }, 10);
}
function back() {
   event.target.setAttribute("class", "white-key");
}
