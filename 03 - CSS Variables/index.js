// Select all inputs
const inputs = document.querySelectorAll('.controls input');

// event handler
const handleUpdate = ({currentTarget}) => {
  // if the element that triggered the event has a data atrribute sizing store it in a variable
  const suffix = currentTarget.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${currentTarget.name}`, `${currentTarget.value}${suffix}`);
}

// function handleUpdate() {
//   const suffix = this.dataset.sizing || '';
//   document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
// }

// add eventListener to inputs
inputs.forEach(input => {
  input.addEventListener('change', handleUpdate)
  input.addEventListener('mousemove', handleUpdate)
})
