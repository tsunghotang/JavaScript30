// User clicks on a panel
// The panel has a 'click' event listener that triggers and calls the `handleClick` method
// handleClick
// check if the panel clicked is currently opened. store the boolean result into a variable.
// call the remove Classes function which removes both the 'open' and 'open-active' classes from all panels
// call the toggle open function passing in the variable that references whether the panel clicked was open before we called the 'removeClasses' function
// if the panel clicked was open before we closed it then we do nothing as we have already closed it by removing the classes
// if the panel clicked was not open then we need to open it by adding the 'open' class

// Select all the panels
const panels = Array.from(document.querySelectorAll('.panel'));

function removeClasses() {
  panels.forEach(panel => {
    panel.classList.remove('open')
    panel.classList.remove('open-active')
  });
}

var toggleOpen = function (openedEl, panel) {
  if (!openedEl) {
    panel.classList.add('open')
  }
}

var toggleActive = function (e) {
  if (e.propertyName.includes('flex') && this.classList.contains('open')) {
    this.classList.toggle('open-active')
  }
}

function handleClick() {
  const openedEl = this.classList.contains('open');
  removeClasses();
  toggleOpen(openedEl, this);
}

// Event Listeners
panels.forEach(panel => panel.addEventListener('click', handleClick))
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive))
