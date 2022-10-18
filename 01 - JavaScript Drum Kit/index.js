// Add an event listener to the window so we can capture all keypresses
  // The cb function will have an event object which contains all kinds of information. We are interested in keyCode.
  // If there an audio element on the page that has a 'data-key' with the value of the keypressed then we want to play it.
    // if there is not then we want to do nothing
  // Select the corresponding element with the same data-key as the audio pressed.
    // add the 'playing' class to the element
// remove the 'playing' class after the animation ends
// gather all key elements
  // add a transition end event listener to each key element
    // remove the 'playing' from the element


// Cb function for keydown eventListener
function playSound(e) {
  // Use attribute selector to select the audio and element with the same keycode data attribute as keyCode property of the key (event obj) captured
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  // used toogle instead of add as it resolve a bug where the transitionend event doesn ot remove the playing class
  key.classList.toggle('playing');
  if (!audio) return; // if there is no audio element associated with the key captured then do nothing.
  audio.currentTime = 0; // rewind to the start
  audio.play(); // plays the audio with the same data-key attribute as the key captured
}

// Cb function for transitionend eventListenr
function removeTransition(e) {
  // we are intested in..
  if (e.propertyName !== 'transform') return; // skip if it is not a transform
  // this refers to the key that the event listener triggered on
  this.classList.remove('playing');
}

// Add keydown eventListener to the window and execute the playSound function when a keydown event is captured
// the keydown event listener returns an event object with information on the key captured (key/value). We are interested in the keyCode property.
window.addEventListener('keydown', playSound(e));

// capture all the elements iwth a class of 'key' and for each element add an event listener that listens for the transition end event
const keys = document.querySelectorAll('.key') // returns an array of all elements with the class 'key
keys.forEach(key => { // iterate over each element and add an eventListener to each
  key.addEventListener('transitionend', removeTransition(e)); //The transition end event fires when an animation ends
})
