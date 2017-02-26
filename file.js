//libraries used/things to credit:
//stackoverflow (lots of javascript)
//web audio api, several related tutorials, http://www.phy.mtu.edu/~suits/notefreqs.html
//95 total frequencies - 40 black keys, 55 white keys

//the array to hold all the key mappings
var dict = [32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49.0, 51.91, 55.0, 58.27, 61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98.0, 103.83, 110.0, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.0, 196.0, 207.65, 220.0, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880.0, 932.33, 987.77, 1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760.0, 1864.66, 1975.53, 2093.0, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520.0, 3729.31, 3951.07, 4186.01, 4434.92, 4698.63, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040.0, 7458.62];

//index into dict with octave*12 + note's original position
// var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

var ascii = ['space', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~']

var notes = {
   "C": [32.7, 65.41, 130.81, 261.63, 523.25, 1046.50, 2093.00, 4186.41],
   "C#": [34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92],
   "D": [36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.63],
   "D#": [38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03],
   "E": [41.20, 82.41, 164.81, 329.63, 659.25, 1318.51, 2637.02, 5274.04],
   "F": [43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83, 5587.65],
   "F#": [46.25, 92.5, 185.00, 369.99, 739.99, 1479.98, 2959.96, 5919.91],
   "G": [49.00, 98.00, 196.00, 392.00, 783.99, 1567.98, 3135.96, 6271.93],
   "G#": [51.91, 103.83, 207.65, 415.30, 830.61, 1661.22, 3322.44, 6644.88],
   "A": [55.00, 110.00, 220.00, 440.00, 880.00, 1760.00, 3520.00, 7040.00],
   "A#": [58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31, 7458.62],
   "B": [61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07, 7902.13]
}

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
   //light up the appropriate piano key
   for (element in notes) {
      if (element.indexOf(dict[keyCode-32]) !== -1) {
         console.log(element);
      }
   }
}

function incOctave() {
   var html = document.querySelector(".octave").innerHTML
   console.log(parseInt(html.charAt(16)));
   var newNum = parseInt(html.charAt(16));
   document.querySelector(".octave").innerHTML = "<span class='octave'>Current Octave: "+newNum+"</span>"
}

function pink() {
   var key = event.target;
   key.setAttribute("class", "pink-white");
   var octave = document.querySelector(".octave").innerHTML;
   octave = octave.charAt(16);
   octave = parseInt(octave);
   console.log(octave)
   if (key.id[1] == "2") {
      //second set of notes, increase octave by 1
      octave += 1;
      tone = notes[key.id[0]][octave];
   } else {
      tone = notes[key.id][octave];
   }
   console.log(tone);
   playTone(tone);
   document.querySelector(".keytext").innerHTML = "<span>"+ascii[dict.indexOf(tone)]+"</span>"
   setTimeout(function () {
      key.setAttribute("class", "white-key");
   }, 200);
}

function pinkblack() {
   var key = event.target;
   key.setAttribute("class", "pink-black");
   var octave = document.querySelector(".octave").innerHTML;
   octave = octave.charAt(16);
   octave = parseInt(octave);
   if (key.id[2] == 2) {
      octave += 1;
      tone = notes[key.id[0]+key.id[1]][octave];
   } else {
      tone = notes[key.id][octave];
   }
   console.log(tone);
   playTone(tone);
   document.querySelector(".keytext").innerHTML = "<span>"+ascii[dict.indexOf(tone)]+"</span>"
   setTimeout(function() {
      key.setAttribute("class", "black-key");
   }, 200);
}
