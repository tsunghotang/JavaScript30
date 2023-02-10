# Array Cardio Day 1



## Key takeaways

* `console.table()` - outputs arrays in table format
* `...` - A spread will take every item out of an iterable and put it in an array. 
* We can convert a nodeList into an array with `Array.from()` or via spread `[...]`

### Array.prototype.filter()

`filter()` takes a callback function which loops over every item in the array and returns a new array containg every element that returns true.

```javascript
const fifteen = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);

// We can use destructuring to refactor this 
const fifteen = inventors.filter(({year}) => year >= 1500 && year < 1600);
```

### Array.prototype.map()

`map()` takes a callback function and returns a new array containing the return value of the cb function for each element of the provided collection. (transforms the elements of a collection and places them in a new array)

```javascript
const fullNames = inventors.map(inventors => `${inventors.first} ${inventors.last}`)

//destructuring
const fullNames = inventors.map(({first, last}) => `${first} ${last}`)
```

### Array.prototype.sort()

`sort(func(a,b){return a - b})` - sorts the elements of an array inplace and returns the array. Sort can take a comparison function that compares every element in a collection (two at a time) and sorts the elements based on the return value of the comparison function.

The order will be decided by returning `1` or `-1`. If the result is negative, a is sorted before b. If the result is positive, b is sorted before `a'. If the result is 0, no changes are made to the sort order of the two values.

```javascript
const order = inventors.sort((a,b) => a.year - b.year) // asc
const order = inventors.sort((a,b) => a.year - b.year) // desc

const orders = inventors.sort((a, b) => {
	if (a.year > b.year) {
  	return 1;
  } else {
    return -1;
  }
})

const order  = inventors.sort((a,b) => a.year > b.year ? 1 : -1)

//destructuring
const order = inventors.sort( ( { year: a }, { year: b } ) => ( a - b ) )
```

#### Sorting last name alphabetically

```javascript
const name = people.sort((a,b) => {
	const [aLast, aFirst] = a.split(', '); // we split the string into an array and use destructuring to assign them to variables 
  const [bLast, bFirst] = b.split(', ');
  return (aLast > bLast ? 1 : -1)
})
```

### Array.prototype.reduce

The **`reduce()`** method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

The `reducer` method applies a function against an accumulator and each value of the array(from left-to-right) to reduce it to a single value.



`reduce` provides an accumulator and the current iteration value 

```javascript
const totalYears = inventors.reduce((total, inventor) => {
	return (inventor.passed - inventor.year) + total 
},0)
```



Summing up the instances of each item

```javascript
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];

// we can also pass an obj to the reducer and have it create an object for us
//we start with a blank object.
// Everytime we loop over the array we see if the current item exists in the object. If it doesnt we create one giving it the value of 0
// we then add 1 to the value of the current key of the object.

const transportation = data.reduce((obj, item) => {
  // checks if there is an existing key in the obj that matches the item. If not then create a new key/value pair 
  if (!obj[item]) {
  	obj[item] = 0
  }
  obj[item]++;
  return obj
}, {})

// alternative 
data.reduce((obj, item) => {
  obj[item] = (obj[item] || 0) + 1;
  return obj;
}, {})
```



Create a list of Boulevards in Paris that contain 'de' anywhere in the name

https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

```javascript
// Get a list of Boulevards 
const category = document.querySelector('.mw-category');
// grab all the links from category and convert it to an array so we can use `map` and `filter`
const links = Array.from(category.querySelectorAll('a'));
const de = links
							.map(link => link.textContent) // creates an array of textContents of the links
							.filter(data => data.includes('de'));
```

