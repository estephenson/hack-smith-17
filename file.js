//libraries used/things to credit:
//stackoverflow (lots of javascript)
//web audio api, several related tutorials


//creating an audio context when the page first loads
var context;
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

//goal: create a function that runs for the duration of a keypress
function playTone() {
   console.log("playTone!");
   oscillator = context.createOscillator();
   oscillator.frequency.value = 261.63;
   oscillator.connect(context.destination);
   oscillator.start(0);
   window.setTimeout(stopTone, 100)
}

//stop playing the tone after a 100ms delay
function stopTone() {
   console.log("Stop playing tone");
   oscillator.stop(0);
}

// //play the tone while the key is down
// document.onkeydown = function() {
//    oscillator = context.createOscillator();
//    oscillator.frequency.value = 100;
//    oscillator.connect(context.destination);
//    oscillator.start(0);
//    // window.setTimeout(stopTone, 200)
// }
//
// //stop it once the key is up
// document.onkeyup = function() {
//    oscillator.stop(0);
// }

document.onkeypress = function() {
   var keyCode = event.which || event.keyCode || 0;
   console.log(keyCode);
   //uppercase A
   // if (keyCode == 65) {
   //    console.log("A key pressed!")
   //    playTone();
   // }
   playTone();
   console.log("good morning!")
}

//javascript making noise
//mapping noises to keyboard fully
