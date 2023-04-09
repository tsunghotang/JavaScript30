# AJAX Type Ahead

Implement an autosuggest feature using `AJAX` and DOM manipulation.

The goal is to populate suggestions based on the current value typed into the search form. The current input will be used to filter out a large data set that contains the cities and states in the US. The matches are highlighted with the value in the search form.



We achieve this with:

1. **Fetch API** - fetch a list of cities from an external source.
2. Manipulating **JSON Data** - We fetch this data with the **fetch api** and save it to a variable
3. **Event Listener** - Hook the search form to the `change` event 
4. **Filter** - filter the JSON data(obj) based on the current value of the search form. The data contains both state and city name keys. 
5. **Dom manipulation** - Create `li` based on the matches and insert them into The DOM

## Key takeaways

* `fetch(url, {})` - fetch returns a promise. we can calll `.then` on a promise to get back a response which we need to convert into the correct data. `.json()`,`.text()`. This returns another promise which we can again call `.then` on to return the converted data.

  * The data that comes back from the `fetch` call does not know what kind of data it is. Thus we need to convert the raw data from the response into the correct data type. `.then(response => { return response.json()})`




* `push()` - takes multiple arguments which are pushed into an array separately. `arr.push(1,2,3,) => [1,2,3]`.  This means we can use `spread` when we want to push all the elements of one array into another without iterating. `arr.push(...data)`

* Regex - Regular expressions are patterns used to match character combinations in strings. 
  * We can create a new RegEx by instantiating it from the RegExp class - `new RegExp(expression, flags)`. Example: `new RegExp(,)`
  * We can put a variable into a regular expression by creating a regulator expression ...

* `.match` - retrieves the result of matching a string against a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

  * ```javascript
    const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
    const regex = /[A-Z]/g;
    const found = paragraph.match(regex);
    
    console.log(found);
    // Expected output: Array ["T", "I"]
    // Matches all the Capitals in the paragraph and returns a new array containing the matches
    ```

* `new RegExp(varianble, options)` example `const regex = new`

* `element.innerHTML` - allows us to add elements as children of the element used to call `innerHTML`

* `replace()` - Returns a new stirng with one, some, or all matches of a `pattern` replaced by a `replacement`. The `pattern` can be a string or a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp), and the `replacement` can be a string or a function called for each match. If `pattern` is a string, only the first occurrence will be replaced. The original string is left unchanged.

  ```
  const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';
  
  console.log(p.replace('dog', 'monkey'));
  // Expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"
  
  
  const regex = /Dog/i;
  console.log(p.replace(regex, 'ferret'));
  // Expected output: "The quick brown fox jumps over the lazy ferret. If the dog reacted, was it really lazy?"
  
  ```

  

---



## Pseudocode

### HTML Structure

```html
  <form class="search-form">
    <input type="text" class="search" placeholder="City or State">
    <ul class="suggestions">
      <li>Filter for a city</li>
      <li>or a state</li>
    </ul>
  </form>
```

We have a form element that contains an `input` element and a `ul`element

The `input` acts as a search form.

The `ul` will act as a list for the suggestions/matches. 



### Data

The `JSON` file contains the data we need to suggest cities based on what the user types. Everytime the user types, we filter the JSON  against the current value.



We Fetch the external city data using the **fetch api**. Everytime the use types into the search form, we run a function that takes the city data and filters it down to a subset. The subset of data will reprsent the suggestions and each element in this subset will be used to create an `li` element and injected into the `ul` element



1. Create an empty `cities` array

2. Fetch the JSON data and save it into an array 

   1. Use Fetch API 

      * Convert the raw data received into `JSON` - `.JSON`

      * Push every element of the JSON data into the empty `cities` array. - `.push(...data)`

3. Select the Input form - `querySelector`
4. Select the suggestion div - `querySelector`

4. Add an event listenter to the input form looking for the `keyup` event

5. Define the cb function used by the event Listener

   1. On `change` we want to call a function that:

      * Filters the `cities` data based on the current into - `findMatches`

        * Create a Regex with the current value in the search form

        * If the current object in the iteration has a property named `city` or `state` with a value that matches the `RegEX` then we return `true` which will place the whole object into the new subset.

      * Define a function that displays the suggestions

        * Take the filtered array and create `li` elements with each element to inject into The DOM
          * Loop over the filtered array with `map` and create a new array containing the `HTML` markup for displaying each element as a `li` element.
          * Create a new `Regex` that matches current value
          * Use the `Regex` to replace the word that it matches with a `span` with a class of `hl` and add a background color to the `span` with css.
          * Inject each element of the array created with `map` using `innerHTML`

   

---



1. Fetch the JSON data and place it in the `cities` array. 

   ```javascript
   const cities = []; 
   fetch(endpoint)
   	.then(response => response.json()) 
   	.then(data => cities.push(...data)
   ```



2. Select the input and `ul` element used to display the matches 

   ```javascript
   const input = document.querySelector('.search')
   const suggestions = document.querySelector('.suggestions')
   ```
   
   

3. Add event listener to the input 

   ```javascript
   input.addEventListener('change', displayMatches);
   input.addEventListener('keyup', displayMatches)
   ```

3. Define function that filters and returns the data we need to display 

   1. Takes a value to search and the cities array
   2. Filters the citites array based on the input value via regex and returns the filtered array

   ```javascript
   function findMatches(wordToMatch, cities) {
   	return cities.filter(place => {
       const regex = new RegExp(wordToMatch, 'gi')
       return place.city.match(regex) || place.state.match(regex)
     })
   }
   ```

   

3. Define the cb function for event listenr

   1. Get the data 
   2. loop over the data and for each element build a `li` element 
   3.  insert the `li` into the suggestions (`ul`) element

   ```javascript
   function displayMatches() {
   	const matchArray = findMatches(this.value, cities) 
     const html = matchArray.map(place => {
     	return `
       	<li>
       		<span class='name'>${place.city}, ${place.state}</span>
       		<span class='population'>${place.population}</span>
       	</li>
       `
     }).join('');
       suggestions.innerHTML = html;
   }
   ```

4. Format the population numner 

   * Using Regex

     ```javascript
     function numberWithCommas(x) {
       return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
     }
     
     function displayMatches {
     	...
      	<span class='population'${numberWithCommas(place.population)}</span>
     }
     ```

     

   * Using `.toLocalString('en-US')` 

     ```javascript
     const population = parseInt(place.population).toLocaleString('en-US');
     
     function displayMatches {
     	...
      	<span class='population'${population)}</span>
     }
     ```

     

4. Highlight functionality 

   * Create a regex in the `displayMatches` function to match the city name
   * Use the regex to replace the city name to a span with a class of hl containing the regex (take the input out of the matching element and replacing it with a span)

   

   Find whatever it matches in the Regex and replace it with a span with the class of highlight and the value 

   ```javascript
   function displayMatches() {
   	const matchArray = findMatches(this.value, cities) 
     const html = matchArray.map(place => {
       const regex = new RegExp(this.value, 'gi');
       const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`);
       const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`);
     	return `
       	<li>
       		<span class='name'>${cityName}, ${stateName}</span>
       		<span class='population'${place.population}</span>
       	</li>
       `
     }).join('');
       suggestions.innerHTML = html;
   }
   ```


## Solution

```javascript
// Create an empty cities array
// Use fetch to make a HTTP requesst to get the cities data
  // Convert the raw response to json
  // Push each element into the cities array
// Select the input and suggestions
// Add an event listener to the input that triggers the 'displayMatches' function
  // displayMatches
    // call findMatches and save the return value to a variable
      // findMatches - filters the cities array and return a new array containing cities that match the input value
        // iterate over the cities array
        // create a Regex for the input value
        // filter each city in the city array based on the current city's state and city value
    // Generate the html to insert into the suggestion element
      // iterate over the matching cities
      // create a regex to match the current input
        // create a span element with the class 'hl' for the text in state and city that match the regex
      // format the population (toLocaleString())
      // return a <li> el with two span that display the city, state and population
  // insert the html into suggestions

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(response => response.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

function highlightMatch(input, regex, data) {
  return data.replace(regex, `<span class='hl'>${input}</span>`)
}

function buildHtml(matchArr, input) {
  return matchArr.map(match => {
    const regex = new RegExp(input, 'gi');
    const cityName = highlightMatch(input, regex, match.city);
    const stateName = highlightMatch(input,regex, match.state);
    const population = parseInt(match.population).toLocaleString('en-US');
    return `
    	<li>
      	<span class='name'>${cityName}, ${stateName}</span>
      	<span class='population'>${population}</span>
    	</li>
    `
  }).join('')
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities)
  const html = buildHtml(matchArray, this.value)
  suggestions.innerHTML = html;
}

const input = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

input.addEventListener('keyup', displayMatches)
```

