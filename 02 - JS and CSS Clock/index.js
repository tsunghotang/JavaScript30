// Takes the current time and update the hands of the clock based on the current hour, minute, second.

// CSS
// The hands are stacked on top of each other and we want to apply a rotate to each hand depending on the time
  // To rotate we use the CSS property `transform: rotate()`.
    // By default this rotates the center of the element.
    // To rotate the right handside of the element we transform the orgin with `transform-origin: 100%`
      // by default `transform-origin` is 50%
  // Divs are block elements. To start the hands at 12 o'clock we can rotate the hands 90 degrees `transform: rotate(90deg)`
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
  // Bug - when the hands reach 0 grees they jitter and rotate backwards because they are going from 400 degrees to 90. To solve this we need to set the transition property to 'all 0s' when the degrees is at 90.

  // Create an instance of the Date object and read the current time from it.
  // Convert the time to degrees
  // Rotate the hands according to the degree using `tranasform: rotate()`
    //the clock has a CSS transition which creates a ticking effect by delaying the speed and using cubic-bezier

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
