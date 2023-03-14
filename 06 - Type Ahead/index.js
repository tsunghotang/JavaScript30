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
  console.log(matchArray)
  const html = buildHtml(matchArray, this.value)
  suggestions.innerHTML = html;
}


// Original solution

// function displayMatches() {
// 	const matchArray = findMatches(this.value, cities)
//   const html = matchArray.map(place => {
//     const regex = new RegExp(this.value, 'gi');
//     const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`);
//     const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`);
//     const population = parseInt(place.population).toLocaleString('en-US');
//       return `
//         <li>
//           <span class='name'>${cityName}, ${stateName}</span>
//           <span class='population'>${population}</span>
//         </li>
//       `
//   }).join('');
//     suggestions.innerHTML = html;
// }



const input = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

input.addEventListener('change', displayMatches);
input.addEventListener('keyup', displayMatches)
