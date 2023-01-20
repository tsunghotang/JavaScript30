# Drum Kit
Each key is mapped to a sound effect. When the user hits or clicks a key a short animation will appear and a sound effect will play.

We achieve this with
 * **Event Liseners** - whenever the user presses or clicks a key we apply a CSS class to the element corresponding to the element/key pressed and play an audio. This CSS class will execute the animation.

 * **The HTML data attribute** - We assign each key element to its corresponding codeKey and bind an audio file to that keyCode.

 ## Key Takeaways
* Every key on our keyboard has a corresponding keycode associated with it.

* **Data attribute** are used to store HTML on custom data. we can use `dataset.*` to access the data stored on the HTML element.

* The `transitionend` event is fired when a CSS transition has completed

* **Attribute Selector**: 

  ```javascript
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  // Selects the audio element with the attribute data-key with the value of keyCode
  ```

  ```javascript
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  // Selects the element with the class key with the data-key attribute of the value of keyCode
  ```

  * `[attr]` - Represents elements with an attribute name of *attr*.
  * `[attr=value]`- Represents elements with an attribute name of *attr* whose value is exactly *value*.
  * `[attr~=value]` - Represents elements with an attribute name of *attr* whose value is a whitespace-separated list of words, one of which is exactly *value*.
  * `[attr|=value]` - Represents elements with an attribute name of *attr* whose value can be exactly *value* or can begin with *value* immediately followed by a hyphen, `-` (U+002D). It is often used for language subcode matches.
  * `[attr^=value]` - Represents elements with an attribute name of *attr* whose value is prefixed (preceded) by *value*.
  * `[attr$=value]` - Represents elements with an attribute name of *attr* whose value is suffixed (followed) by *value*.
  * `[attr*=value]` - Represents elements with an attribute name of *attr* whose value contains at least one occurrence of *value* within the string.


* `Set audio.currentTime = 0`
  When an audio is still playing, `audio.play()` won't do anything or restart the audio. You have to set the currentTime to 0 so that the audio will rewind to the beginning.

* `<kbd>` element
  The <kbd> HTML element represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device.

  ```html
  <p>
    Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to re-render an MDN page.
  </p>
  ```

* classList 

  ```javascript
  key.classList.add('playing');
  key.classList.remove('playing');
  key.classList.append('playing');
  ```

  

## Solution

* Implemented click functionality 
* Fixed animation bug where holding down a key would not remove the `.playing` class 

```javascript
function playSound(e) {
  const keyCode = (e.keyCode || Number(e.target.closest("[data-key]").getAttribute('data-key')));
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);

  if (!audio) return;

  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  key.classList.toggle('playing');
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key')

keys.forEach(key => {
  key.addEventListener('click', playSound);
  key.addEventListener('transitionend', removeTransition); //The transition
})

window.addEventListener('keydown', playSound);

```

## Todo

* Finish update/write up solution notes.

