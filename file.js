//libraries used/things to credit:
//stackoverflow (lots of javascript)
//web audio api, several related tutorials, http://www.phy.mtu.edu/~suits/notefreqs.html

//the dictionary object to hold all the key mappings
var dict = {
   32: 16.35,
   33: 17.32,
   34: 18.35,
   35: 19.45,
   36: 20.60,
   37: 21.83,
   38: 23.12,
   39: 24.50,
   40: 25.96,
   41: 27.50,
   42: 29.14,
   43: 30.87,
   44: 32.70,
   45: 34.65,
   46: 36.71,
   47: 38.89,
   48: 41.20,
   49: 43.65,
   50: 46.25,
   51: 49.00,
   52: 51.91,
   53: 55.00,
   54: 58.27,
   55: 61.74,
   56: 65.41,
   57: 69.30,
   58: 73.42,
   59: 77.78,
   60: 82.41,
   61: 87.31,
   62: 92.50,
   63: 98.00,
   64: 103.83,
   65: 110.00,
   66: 116.54,
   67: 123.47,
   68: 130.81,
   69: 138.59,
   70: 146.83,
   71: 155.56,
   72: 164.81,
   73: 174.61,
   74: 185.00,
   75: 196.00,
   76: 207.65,
   77: 220.00,
   78: 233.08,
   79: 246.94,
   80: 261.63,
   81: 277.18,
   82: 293.66,
   83: 311.13,
   84: 329.63,
   85: 349.23,
   86: 369.99,
   87: 392.00,
   88: 415.30,
   89: 440.00,
   90: 466.16,
   91: 493.88,
   92: 523.25,
   93: 554.37,
   94: 587.33,
   95: 622.25,
   96: 659.25,
   97: 698.46,
   98: 739.99,
   99: 783.99,
   100: 830.61,
   101: 880.00,
   102: 932.33,
   103: 987.77,
   104: 1046.50,
   105: 1108.73,
   106: 1174.66,
   107: 1244.51,
   108: 1318.51,
   109: 1396.91,
   110: 1479.98,
   111: 1567.98,
   112: 1661.22,
   113: 1760.00,
   114: 1864.66,
   115: 1975.53,
   116: 2093.00,
   117: 2217.46,
   118: 2349.32,
   119: 2489.02,
   120: 2637.02,
   121: 2793.83,
   122: 2959.96,
   123: 3135.96,
   124: 3322.44,
   125: 3520.00,
   126: 7902.13
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

document.onkeypress = function() {
   var keyCode = event.which || event.keyCode || 0;
   console.log(keyCode);
   console.log(dict[keyCode]);


   playTone(dict[keyCode]);
   // playTone(dict[keyCode]);
   console.log("good morning!")
}

//read in from an outside json to determine what the noises should be
