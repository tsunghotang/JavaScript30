# Drum Kit

Each key is mapped to a sound effect. When the user hits or clicks a key, a short animation will appear and a sound effect will play.

We achieve this with:
 * **Event Listeners** - whenever the user presses or clicks a key, we apply a CSS class to the element corresponding to the element/key pressed and play an audio. This CSS class will execute the animation.

 * **The HTML data attribute** - we assign each element with a class of `key` to its corresponding codeKey and bind an audio file to that keyCode.

## Key Takeaways

* Every key on our keyboard has a corresponding **key-code** associated with it.

* **Data attribute** are used to store custom data on HTML elements. we can use `dataset.*` method to access the data stored on the HTML element.

* The `transitionend` event is fired when a CSS transition has completed.

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

* `Set audio.currentTime = 0` - When an audio is still playing, `audio.play()` won't do anything or restart the audio. You have to set the `currentTime to 0` so that the audio will rewind to the beginning.

* `<kbd>` element
  The <kbd> HTML element represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device.

  ```html
  <p>
    Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to re-render an MDN page.
  </p>
  ```

* `classList`

  ```javascript
  key.classList.add('playing');
  key.classList.remove('playing');
  key.classList.append('playing');
  ```

## Pseudocode
**Objective**: Build a drum kit that plays aduio and animations when a specific key is pressed

### HTML Structure

```html
<div class="keys">
  <div data-key="65" class="key">
    <kbd>A</kbd>
    <span class="sound">clap</span>
  </div>
  <div data-key="83" class="key">
    <kbd>S</kbd>
    <span class="sound">hihat</span>
  </div>
  <div data-key="68" class="key">
    <kbd>D</kbd>
    <span class="sound">kick</span>
  </div>
  <div data-key="70" class="key">
    <kbd>F</kbd>
    <span class="sound">openhat</span>
  </div>
  <div data-key="71" class="key">
    <kbd>G</kbd>
    <span class="sound">boom</span>
  </div>
  <div data-key="72" class="key">
    <kbd>H</kbd>
    <span class="sound">ride</span>
  </div>
  <div data-key="74" class="key">
    <kbd>J</kbd>
    <span class="sound">snare</span>
  </div>
  <div data-key="75" class="key">
    <kbd>K</kbd>
    <span class="sound">tom</span>
  </div>
  <div data-key="76" class="key">
    <kbd>L</kbd>
    <span class="sound">tink</span>
  </div>
</div>

<audio data-key="65" src="sounds/clap.wav"></audio>
<audio data-key="83" src="sounds/hihat.wav"></audio>
<audio data-key="68" src="sounds/kick.wav"></audio>
<audio data-key="70" src="sounds/openhat.wav"></audio>
<audio data-key="71" src="sounds/boom.wav"></audio>
<audio data-key="72" src="sounds/ride.wav"></audio>
<audio data-key="74" src="sounds/snare.wav"></audio>
<audio data-key="75" src="sounds/tom.wav"></audio>
<audio data-key="76" src="sounds/tink.wav"></audio>
```



The `playing` class will scale the elements inside and add a border colour and box shadow.

```css
.playing {
  transform: scale(1.1);
  border-color: #ffc600;
  box-shadow: 0 0 1rem #ffc600;
}
```



* The `div` element with the class of `keys` acts as the container element
  * Within the `keys` container we have 9 elements with the class of `key` that represent a key on the keyboard.
    * Each key has a `data-key` attribute assigned to it, a `<kdb>`, and a `span` element which describes the sound the key makes
  
* Nine `audio` elements with a `data-key` attribute and the `src` for the sound.



The `data-key` attribute is used to link a sound file to a specific key. Each key on the keyboard has a specific `key code`  which we can retrieve from the `event` object. This allows us to trigger a certain sound when a specific key is hit.



1. Select all elements with the class of `key`.
2. Hook all elements with the class of `key` to an `eventListener` that listens for the `keydown` event.
3. Define the callback function for the `keydown` event listener
   1. Play sound
      * Retrieve the key-code of the key that triggered the event
        * Select the audio element with the same data-key as the key-code
          * IF there is no audio element with the matching code do nothing
          * IF there is a matching audio file then play the audio
   2. Add animation
      * Retrieve the key-code of the key that triggered the event
        * Select the element with the `data-key` matching the key-code that triggered the event
        * add/toggle the class `playing` on the element
   3. Remove animation
      * Define an event listener that looks for the `transitionend` event
        * The `transitionend` event is triggered when the animations defined in the `playing` class completes
      * Look for the specific `propertyName` of `transform`
        * IF it is present then remove the `playing` class from the element

#### Bugs and Edge cases

* Audio needs to be set to 0 to ensure that the sound plays even if we hit a key before it finishes playing. - `  audio.currentTime = 0;`
* Using `toggle` instead of `add` fixes a bug where the `playing` class is not correctly removed

## Solution

Additional Functionality:

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
