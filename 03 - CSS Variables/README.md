# Playing with CSS Variables and JS

Dynamicially style elements by using JavaScript to manipulate **CSS variables** referenced by elements on the page.

We achieve this by:

1. Setting custom properties on the `:root` element. This allows us to access them globally. For example, `--main-color: red`

2. Use the CSS variables by referencing them in elements. For example,  `img {background: var(--main-color)}`

3. Select/target `document.documentElement` and call the `style.setProperty()` method on the document, passing in the CSS variable you which to change and the new value - **`document.documentElement.style.setProperty()`** 

   * `setProperty()` takes the **property name** and a new **value**. 

     * ```css
       setProperty(`--${main-color}`, 'green')
       ```


## Key Takeaways

* **CSS Variables**(`--varname: value`) - CSS varibles are used to store specific values to be reused throughout a document. For instance, `--main-color: red` or `--spacing: 10px`

* The element/selector that holds the CSS variable defines the scope of that variable. **A common best practive is to define CSS variables on the `:root` pseudo-class**, so that it can be applied globally across your HTML document.

* **CSS variables can be updated with JavaScript** - This means that we can update a CSS variable with JS and have that change affect the page.
* **SASS variables** are defined at filetime which gets compiled and cannot be changed.

* `:root` - is the highest level element 

* **`document.documentElement`** - returns the element that is the root element of the document

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

* `dataset` returns an object that contains all the data attributes on a specific element

* To select a variable we can select the entire document which is our root and set a property of our variables.

  * **`.setProperty(propertyName, value)`** method interface sets a new value for a property on a CSS style declaration object.

  ```javascript
  document.documentElement.style.setProperty(`--${this.name}, this.value})
  ```

## Pseudocode

**Objective**: 

### HTML and CSS Structure

```html
  <div class="controls">
    <label for="spacing">Spacing:</label>
    <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">

    <label for="blur">Blur:</label>
    <input id="blur" type="range" name="blur" min="0" max="25" value="10" data-sizing="px">

    <label for="base">Base Color</label>
    <input id="base" type="color" name="base" value="#ffc600">
  </div>
  <img src="https://source.unsplash.com/7bwQXzbF6KE/800x500">
```

```javascript
:root {
  --base: #ffc600;
  --spacing: 10px;
  --blur: 10px;
  --width: 100px;
  --border-radius: 0px;
}

img {
  padding: var(--spacing);
  background: var(--base);
  filter: blur(var(--blur));
  width: var(--width);
  border-radius: var(--border-radius);
}
```

* The page contains three `input` elements and one image.

* The `spacing`, `blur` and `base` custom properties are defined on the `:root` element and the `img` element references these properties.

* Each variable is linked to an input. `blur` and `spacing` contain the `data-sizing` attribute. When we change the value of the input we want the value to update the variables. 

* The input elements have the following attributes: 

  * `value` - represents the value we want our custom property to have

  * `name` - links the input element to the custom property 

  * `data-sizing` - provides additional information needed to update the value of CSS variables. For instance, properties that require suffixes such as `px`, `em` and `rem` etc. 




1. Select the inputs
2. Listen for the `change` event on the inputs
   1. Define a cb function
      1. Store the `value` and `name` attribute of the `input` that triggered the change in a variable
      2. Select `:root` element
      3. Set the property of the CSS variable in `:root` with the `setProperty()` method, passing in the `name`,  `value` and `data-sizing` values/variables



## Solution


```javascript
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
```



### Solution Breakdown

1. Assign CSS variables to the `:root` element

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

