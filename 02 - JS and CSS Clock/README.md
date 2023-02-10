# JS and CSS Clock

Build a functional analog clock using JS and CSS.

We achieve this with: 

* **The JavaScript `Date` object** - we can get the current hour, minute and second by creating a `Date` object and calling the following methods: `getSeconds()` ,`getMinutes()` and `getHours()`.
* `setInterval` - used to call a function every second that creates a Date object, queries that object for the current, second, minute and hour, converts the units into degrees and sets the clock hands to the correct position.
* `transform: rotate()` - rotates an element, in this case, the clock hands.  

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

* `transform-origin`- sets the origin for an elements transformations. https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin. By default when we rotate an element it starts at the middle, 50%.
* Absolute and relative position - 

## Pseudocode

**Objective**: Take the current time and update the hands of the clock based on the current hour, minute, second.

```html
<div class="clock">
  <div class="clock-face">
    <div class="hand hour-hand"></div>
    <div class="hand min-hand"></div>
    <div class="hand second-hand"></div>
    <div class="center"></div>
  </div>
</div>
```

* The `div` with a class of `clock` acts as a container. To create a ciricle with css, we set the `height` and `width` of an element with matching values. Then we use the `bordius-radius` property and set it to 50%.
* The clock face... talk about what the clock face is and the hands 
* The clock hands are defined with three `divs` with the class of `hand`. By default, they are stacked on top of each other and the idea is to rotate them according to the current time with `transform: rotate(deg)` 
* To create a ticking effect, delay the movement of the hand with `transition` passing in a `cubic-bezier` and delaying the speed. For example, `transition: all 0.5 cubic-bezier(0.075, 0.82, 0.165, 1)'`

```css
.clock {
  width: 30rem;
  height: 30rem;
  border: 20px solid white;
  border-radius: 50%;
  margin: 50px auto;
  position: relative;
  padding: 2rem;
}

.clock-face {
  position: relative;
  width: 100%;
  height: 100%;
  transform: translateY(-3px); /* account for the height of the clock hands */
}

.hand {
  width: 50%;
  height: 6px;
  background: black;
  position: absolute;
  top: 50%;
  transform-origin: 100%; /* Ensures rotation starts on the right side of the element */
  transform: rotate(90deg); /* Sets the default position of the hand to 12 o'clock */
  transition: all 0.5s; /* Creates a slight delay to the rotation and adds ticking effect */
}

.center {
  position: absolute;
  background-color: black;
  top: 47%;
  left: 47%;
  height: 20px;
  width: 20px;
  border-radius: 50%;
}

.hour-hand {
  width: 40%;
  left: 10%;
}

.second-hand {
  background: red;
  height: 3px;
}
```



1. Select the clock hands - `querySelector`
2. Invoke the `setInterval` function to invoke the cb function passed into it every second 
3. Define the cb function 

   1. Create a Date Object - `new Date`
2. Get the current second, minute and hour from the Date object - `getSeconds`, `getMinutes`, `getHours`
   3. Convert the current second, minute and hour to degrees - `(unit/unitTime) * 360`
4. Set the hands on the clock by rotating the hands according to the degree - `hand.style.transform = rotate(xdeg)`

#### Bugs and edge cases 

* We need to rotate the hands by 90deg as they are positions at 9 o'clock by default 

*  When the hands reach 0 degrees they jitter and rotate backwards because they are going from 400 degrees to 90. To solve this we need to set the transition property to 'all 0s' when the degrees is at 90

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



### Notes

```javascript
// CSS
// The hands are stacked on top of each other and we want to apply a rotate to each hand depending on the time
  // To rotate we use the CSS property `transform: rotate()`.
    // By default this rotates the centre of the element.
    // To rotate the right hand-side of the element we transform the origin with `transform-origin: 100%`
      // By default `transform-origin` is 50%
  // Divs are block elements. To start the hands at 12 o'clock we rotate the hands 90 degrees `transform: rotate(90deg)`
  // Apply transition when rotating the element with `transition: all 0.5s`
    // We can also use `transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1)` to animate the hands.

// JS
  // Select the hands with querySelector
  // Create a function that gets the date
    // We can do this by using the Date class and then using the getSeconds method on the Date instance
    // Convert the seconds into a degree
      // turn seconds into base 100
      // 0 = 0deg
      // 100 = 360deg
      // (seconds / 60) * 360
      // set the second hand element to the the result of the converted seconds
  // Use setInterval to call the function every second
  // Bug - when the hands reach 0 degrees they jitter and rotate backwards because they are going from 400 degrees to 90. To solve this we need to set the `transition` property to ``all 0s`` when the degrees is at 90.
```

