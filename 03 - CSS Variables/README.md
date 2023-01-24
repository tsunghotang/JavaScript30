# Playing with CSS Variables and JS



This exercise involes updating CSS variables with JavaScript.

1. We declare CSS variables on an element - `--varName: value`

2. We can then use these variables on other elements `img { var(--varName)}`

3. We can access and update the CSS variables in JS by selecting the element they are defined and using the `setProperty` method. 

   ```javascript
   document.documentElement.style.setProperty(`--${varName}`, newValue)
   ```

## Key Takeaways

* **CSS variables can be updated with JavaScript** - This means that we can update a CSS variable with JS and have that change affect the page.
* SASS variables are defined at filetime which gets compiled and cannot be changed.

* `:root` - is the highest level element 

* Calling `.querySelector()` or `.querySelectorAll()` will return a `nodeList`

* `NodeList` - Similar to an array but only has a small amount of methods. We can convert a `NodeList` to an array to gain access to more methods. 

  * We can convert a nodeList to an array using the <u>spread operator</u> or `Array.from()`

    ```javascript
    // create a `NodeList` object
    const divs = document.querySelectorAll('div');
    
    // convert `NodeList` to an array
    const divsArr = Array.from(divs);
    
    // using the spread operator [...iterable]
    const divsArr = [...divs];
    
    const inputs = document.querySelectorAll('.controls input');
    const inputsArr1 = Array.from(inputs);
    const inputsArr2 = [...inputs];                // ES6 spread operator
    ```


* Short-circuit evaluation - we can use `||` to set a default value if the first operand is undefined or falsey.

* `Arrow function vs function declaration/express` - The binding of `this` is different between the two. When we use arrow functions the binding of `this` is not the element that triggered the event. With a function declaration the `this` binding is the element that triggered the event. 

  - [ ] Research into this. 

* `dataset` returns an object that contains all the data attributes on a specific element

* To select a variable we can select the entire document which is our root and set a property of our variables.

  * **`.setProperty(propertyName, value)`** method interface sets a new value for a property on a CSS style declaration object.

  ```javascript
  document.documentElement.style.setProperty(`--${this.name}, this.value})
  ```

   

### CSS Variables

CSS Variables are declared on elements using the `--` prefix. For example, they can be declared on the `:root` element. 

```css
:root {
  --base: #ffc600;
  --spacing: 10px;
  --blur: 10px;
}
```



We can then use the varaibles on another element with `var(--cssvar)` passing in the name of the variable. `var(--base)`

```css
img {
	background: var(--base);
	padding: var(--spacing);
  filter: blur(var(--blur))
}
```



## Solution

### HTML Structure

```html
  <div class="controls">
    <label for="spacing">Spacing:</label>
    <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">

    <label for="blur">Blur:</label>
    <input id="blur" type="range" name="blur" min="0" max="25" value="10" data-sizing="px">

    <label for="base">Base Color</label>
    <input id="base" type="color" name="base" value="#ffc600">
  </div>
```

We have three variables(`spacing`, `blur` and `base`) that we want to select and update.

Each variable is linked to an input with `blur` and `spacing` containing a `data-sizing` attribute. When we change the value of the input we want the value to update the variables. 



1. Assign CSS variables to an element

   ```css
   :root {
     --base: #ffc600;
     --spacing: 10px;
     --blur: 10px;
   }
   ```

   

2. Reference the variables within an element 

   ```css
   img {
     background: var(--base);
     padding: var(--spacing);
     filter: blur(var(--blur))
   }
   ```

   

3. Select all three inputs 

   ```javascript
   const inputs = document.querySelectorAll('.controls input')
   ```



4. Add an eventListener to the selected elements 

   ```javascript
   inputs.forEach(input => {
     input.addEventListener('change', handleUpdate)
     input.addEventListener('mousemove', handleUpdate)
   })
   ```

   

5. Define `handleUpdate` cb method 

   * Get the `name` attribute of the input that triggered the event

   * Get the `value` attribute of the input that triggered the event 

   * Format the value to include the `px` suffix if the input that triggered the event has the `data-sizing`attribute

   * Grab the :root element which contains the variables `document.documentElement`

     * call `setProperty()` passing in the `name` and `value+suffix` to change the value of the variable

       ```javascript
       function handleUpdate(){
       	const suffix = this.dataset.sizing || '';
       	document.documentElement.style.setProperty(`--${this.name}`, `${this.value}${suffix}`)
       }
       ```

       

   



