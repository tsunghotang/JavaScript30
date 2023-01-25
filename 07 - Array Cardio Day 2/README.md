# Array Cardio



## Key takeaways

* Deleting an element from an array 
  * `splice(indxToDel, noOfElToDel)`
  * `delete array[idx]`

### Array.prototype.some()

`some()`tests whether at least one element in the array returns a truthy value against the cb function passed in.

```javascript
const people = [
      { name: 'Wes', year: 1988 },
      { name: 'Kait', year: 1986 },
      { name: 'Irv', year: 1970 },
      { name: 'Lux', year: 2015 }
    ];
```



Example - checking if at least one one person in the array is 19 or older 

```javascript
const isAdult = people.some(person => {
      const currentYear = (new Date()).getFullYear();
      if (currentYear - person.year >= 19) {
        return true;
      }
    });

console.log(isAdult); // true

// refactored 
const isAdult = people.some(person => (new Date()).getFullYear() - person.year >= 19);

// destructuring
const thisYear = ( new Date() ).getFullYear();
const isNineteenOrOlder = ( { year } ) => ( 19 <= thisYear - year );

console.log( people.some( isNineteenOrOlder ) );
```



### Array.prototype.every()

`every()` check to see if all elements return a truthy value against the cb function. It only returns true is all element return truthy. 

```javascript
const isAllAdult = people.every(person => {
      const currentYear = (new Date()).getFullYear();
      if (currentYear - person.year >= 19) {
        return true;
      }
    });
console.log(isAllAdult); // false

// destructuring 
console.log( people.every( isNineteenOrOlder ) );
```



### Array.prototype.find()

`find()` returns the **first element** that returns truthy in the cb function



 The `find()` method is very similar to `filter()`, however, `filter()` returns **an ARRAY of ALL elements** that matches the statement. While `find()` only returns the **first ELEMENT** that matches.

```javascript
const comments = [
      { text: 'Love this!', id: 523423 },
      { text: 'Super good', id: 823423 },
      { text: 'You are the best', id: 2039842 },
      { text: 'Ramen is my fav food ever', id: 123523 },
      { text: 'Nice Nice Nice!', id: 542328 }
    ];
    
    
    const comment = comments.find(comment => {
      if (comment.id === 823423) {
        return true;
      }
    });
console.log(comment); // Object { text: "Super good", id: 823423 }

// Refactored 
const comment = comments.find(comment => comment.id === 823423);

// destructuring
console.log(comments.find(({id}) => (id === 823423)))
```



If using `filter()` in this situation, we will get an array containing one single element.

```javascript
const comment_filter = comments.filter(comment => {
      if (comment.id === 823423) {
        return true;
      }
    });
console.log(comment_filter); 
// Array [ { text: "Super good", id: 823423 } ]
```



### Array.prototype.findIndex()

The `findIndex()` method returns the index of the **first element** in an array that returns true in the cb function. If all elements reutrn false then `findIndex` returns `-1`

```javascript
const index = comments.findIndex(comment => comment.id === 823423);
console.log(index); // 1
```



