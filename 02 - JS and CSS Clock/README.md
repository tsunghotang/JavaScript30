# JS and CSS Clock

Each key is mapped to a sound effect. When the user hits or clicks a key a short animation will appear and a sound effect will play.

We achieve this with

 * **Event Liseners** - whenever the user presses or clicks a key we apply a CSS class to the element corresponding to the element/key pressed and play an audio. This CSS class will execute the animation.

 * **The HTML data attribute** - We assign each key element to its corresponding codeKey and bind an audio file to that keyCode.

 ## Key Takeaways

* **Date object** - we can get the current time by creating a new `Date` instance and calling the following methods

  ```javascript
  const now = new Date 
  now.getSeconds();
  now.getMinutes();
  now.getHours();
  ```

  

* `setInterval` can be used to execute a function at a given interval (repeat an action). It takes a function and a delay in milliseconds. 

  ```javascript
  // run setDate() function every 1000 milliseconds
  setInterval(setDate, 1000)
  ```

* `transform-origin`- sets the origin for an elements transformations. https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
* Absolute and relative position 

## Solution

```javascript
// Select hands
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')

function setRotate(deg, hand) {
  if (deg === 90) {
      hand.style.transition = 'all 0s'
  } else {
    hand.style.transition = 'all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)'
}
  return `rotate(${deg}deg)`
}

// Function used to convert the current time to degrees
function calcDegree(unit, unitTime) {
  return ((unit / unitTime) * 360 + 90 )  // because we offset by 90 in the CSS we need to add 90 to the conversion
}

function setClock() {
  const now = new Date();

  const second = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours();

  const secondDegrees = calcDegree(second, 60);
  const minuteDegrees = calcDegree(minute, 60);
  const hourDegrees = calcDegree(hour, 12);

  secondHand.style.transform = setRotate(secondDegrees, secondHand)
  minuteHand.style.transform = setRotate(minuteDegrees, minuteHand)
  hourHand.style.transform = setRotate(hourDegrees, hourHand)
}

setInterval(setClock, 1000);
setClock(); // smoother load
```
