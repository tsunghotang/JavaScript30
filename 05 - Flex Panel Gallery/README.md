# Flex Panels Image Gallery



Webpage contains multiple panels. When clicked, the panel will grow in size and will transition-in two additional `<p>` elements. 



We achieve this with:

**Event-listenrs** :

* listen for the `click` event on the panels and apply the `active` CSS class to the clicked panel. 
* listen for the `transitionend`event and apply the `open-active` class



**Flex-box** - Space on the page is split up equally among the panels with `flex: 1`. When clicked, the `open` class is applied to the panel and changes the flex property to `flex: 5`. This means the panel will now take up 5x more space on the page.

**`transform: translate(Y)` **- allows us to reposition position elements.

**transition** - Creates the effect/animation when toggling classes

```css
transition:
  font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
  flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
  background 0.2s;
```

## Key Takeaways 

* `flex` - [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) [shorthand property](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) sets how a flex *item* will grow or shrink to fit the space available in its flex container

* `flexbox` - conists of a container element, which is known as the flex container and the elements within that container, which are known as the flex item. An element in CSS can be both a flex item aswell as a flex container

* `transform: translate(Y)` - allows us to reposition elements

* `:first-child` - pseudo class allows us to select the first element of the parent element `.panel > *:first-child { transform: translateY(-100%);}`

* `transitionend` - allows us to wait for a transition to end before performing another action

## Pseudocode

### HTML Structure 

```html
  <div class="panels">
    <div class="panel panel1">
      <p>Hey</p>
      <p>Let's</p>
      <p>Dance</p>
    </div>
    <div class="panel panel2">
      <p>Give</p>
      <p>Take</p>
      <p>Receive</p>
    </div>
    <div class="panel panel3">
      <p>Experience</p>
      <p>It</p>
      <p>Today</p>
    </div>
    <div class="panel panel4">
      <p>Give</p>
      <p>All</p>
      <p>You can</p>
    </div>
    <div class="panel panel5">
      <p>Life</p>
      <p>In</p>
      <p>Motion</p>
    </div>
  </div>
```

The container element contains five `divs` with a class of `panel`. When clicked, the panel will open up to take up more space on the sceen. In addition, The first and last `<p>` elements, which are hidden, will transition onto the page.

```css
/* Toggle classes */
.panel.open {
  font-size: 40px;
  flex: 5;
}

.panel.open-active > *:last-child {
transform:translateY(0);
}


.panel > *:first-child {
  transform: translateY(-100%);
}

.panel > *:last-child {
  transform: translateY(100%);
}
```



1. Style the panels 
   * Make the div with the class `panels` a `flex` container
   * Make each panel take up equal space within the page - `flex: 1`
   * Make each child element inside the `div` with a class of `panel` a `flex` container
   * Hide the first and last elements nested inside the `.panel` div
     * Select the elements`panel > *:first-child` - `panel > *:last-child`
     * `transform: translateY(-100%)` - move the element offscreen (top)
     * `transform: translateY(100%)` - move the element offscreen (bottom)
   * Define the `open-active` class - remove the `transform: translateY()`
   * Define the `open` class - apply `flex: 5 `

2. JavaScript 
   * Select the `panels`
   * Attach an eventlistener to each panel - `click`
   * Define the cb function to add/remove the `open` class
     * Check if the panel clicked contains the `open` class. Store the boolean result into a variable
     * Remove the `open` and `open-active` classes from all panels 
     * Toogle the `open` class only if the element clicked did not contain the `open` class
       * If it did have `open` then we already removed it. 
   * Attach an event listener to each panel - `transitionend`
   * Define the cb function to add/remove the `open-active` class
     * Use `propertyName` to look specifically for the `flex` transition. 
       * At the end of the flex transition and IF the element contains the `open` class
         * toggle the activeClass

#### Bugs and Edge cases 

* Rapidly clicking a panel breaks the class toggle. 

## Solution

```javascript
function removeClasses() {
  panels.forEach(panel => {
    panel.classList.remove('open')
    panel.classList.remove('open-active')
  });
}

function toggleOpen(openedEl, panel) {
  if (!openedEl) {
    panel.classList.add('open')
  }
}

function toggleActive(e) {
   // because there will be multiple transition end events we need to get the property name to target the correct one
  if (e.propertyName.includes('flex') && this.classList.contains('open')) {
    this.classList.toggle('open-active')
  }
}

function handleClick() {
  const openedEl = this.classList.contains('open');
  removeClasses();
  toggleOpen(openedEl, this);
}

panels.forEach(panel => panel.addEventListener('click', handleClick))
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive))

```

