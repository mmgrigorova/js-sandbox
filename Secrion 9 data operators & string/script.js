'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// we can compute property names
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
}

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  // function keyword is not required
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // ES6 enhances object literals
  openingHours,

  // orderDelivery: function (obj) {
  orderDelivery({ startedIndex = 1, mainIndex = 0, time = '20:00', addess }) {
    console.log(`Order received! ${this, this.starterMenu}`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3} 🍝!`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  }
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Vie',
  mainIndex: 2,
  starterIndex: 2
});

restaurant.orderDelivery({
  address: 'Bla',
  starterIndex: 0
});

const arr = [1, 2, 3];
// array destructuring - retrieve array parts into its own variables;
const [x, y, z] = arr; // this is not an array, it is not destroing the array
console.log(x, y, z);

let [main, secondary] = restaurant.categories;
console.log(main, secondary);

// old way
// const temp = main; 
// main = secondary;
// secondary = temp;

// switch variables;
[main, secondary] = [secondary, main]; //1. create new array with switched order and destruct it in the variables
console.log(main, secondary);

// return multiple values from a function 
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;

const [i, , [j, k]] = nested;
console.log(i, j, k);

// default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

///////////////////////////////////////////////
// destructure objects
///////////////////////////////////////////////

// const { name, openingHours, categories } = restaurant; // the object prop names
// console.log(name, openingHours, categories);

// diferent variable names 
const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(restaurantName, hours, tags);

// default values
const { mainMenu: mainM = [], startedMenu: starters = [] } = restaurant;
console.log(mainM, starter);

// mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);

// nested objects destructuring
const { fri: { open: o, close: c } } = openingHours;
// console.log(fri);
// console.log(open, close);
console.log(o, c);

//////////////////////////////////////
// spread operator - creates multiple values, separated by comma
/////////////////////////////////////
const arr1 = [7, 8, 9];
const badNewArr = [1, 2, arr1[0], arr1[1], arr1[2]];
console.log('The old way: ', badNewArr);

const goodNewArr = [1, 2, ...arr1]; // take all the values out of the array
console.log(goodNewArr);

console.log(...goodNewArr); // when we need the values separately, when we pass arguments to functions

const newMenu = [...restaurant.mainMenu, 'Gnocci']; // creates new array from scratch
console.log(newMenu);

// copy array - shallow copy of the array
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays or more
const wholeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(wholeMenu);

// spread operator works on all iterables: arrays, strings, maps, sets (NOT objects)

const str = 'Jonas';
const letters = [...str, ' ', 's'];
console.log(letters);

//real world example
// const ingredients = [prompt('Let\'s make pasta! Ingedient 1?'),
// prompt('Ingredient 2?'), prompt('Ingredient 3')];

// restaurant.orderPasta(...ingredients);

// since 2018 works on objects, replaces Object.assign
const newRestaurant = { ...restaurant, founder: 'Giuseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

//////////////////////////////////////
// REST pattern and parameters - opposite of spread. Collects elements in an array
/////////////////////////////////////

// 1. Destructuring
// SPREAD because on right side of "="
const arrSpread = [1, 2, ...[3, 4]];

// REST because on right side of =
const [m, n, ...others] = [1, 2, 3, 4, 5]; // collects the elements that are unused in the destructuring assignment
console.log(m, n, others);

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, risotto, otherFood); // rest operator does not unclude skipped elements, only 'the rest' of the elements

// Objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(sat, weekDays);

// 2. Functions

const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);

const hhh = [23, 5, 7];
add(...hhh); // unpack arr into arguments and them rest is collecting them into an array

restaurant.orderPizza('mushrooms', 'onion', 'olives');
restaurant.orderPizza('meat');

//////////////////////////////////////
// Short Circuiting
/////////////////////////////////////
console.log('---- OR ----');
// log ops use any data type, return any data type and do short circuiting
console.log('3' || 'Jonas'); // if the first value is a truthy values, it returns it
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null || 0); // returns the last value even if it's falsy

// restaurant.numGuests = 0; // this is the actual number of guests and || with produce a bug
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('---- AND ----'); // returns the first falsy value or the last truthy if all are
console.log(0 && 'Jonas');// if the first value is a falsy values, it returns it
console.log(7 && 'Jonas');

//practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

//////////////////////////////////////
// Nullish coalescing operator (coalesce) ES2020
/////////////////////////////////////

// works with nullish values instead of falsy values (null, undefined vs. 0, '')
// restaurant.numGuests = 0;
const guessCorrect = restaurant.numGuests ?? 10;
console.log(guessCorrect);


//////////////////////////////////////
// Logical assignment operators ES2021
/////////////////////////////////////
const rest1 = {
  name: 'Capri',
  numGuests: 20
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi'
};
const rest3 = {
  name: 'La Piazza',
  owner: 'Lu\'s',
  numGuests: 0
}

// OR assignment operator 
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

rest1.numGuests ||= 10;//assigns a variable if currently falsy
rest2.numGuests ||= 10;
rest3.numGuests ??= 13; // nullish assignment operator

// rest1.owner = rest1.owner && '<ANONIMOUS>';
// rest2.owner = rest2.owner && '<ANONIMOUS>';
rest1.owner &&= '<ANONIMOUS>';
rest2.owner &&= '<ANONIMOUS>';

console.log(rest1);
console.log(rest2);
console.log(rest3);

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log('Menu: ', menu);

// FOR OF loop -- allows break and continue
for (const item of menu) console.log(item);

// old school way, we can use destructuring to make it better
for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`); // we are looping for array of two elements array (item[0] is the index, item[1] is the menu item)
}

// with destructuring
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

console.log(menu.entries()); // prints Array Iterator
console.log([...menu.entries()]); // gets the actual entries in an array

//////////////////////////////////////
// Optional Chaning - ?. ES2020
//////////////////////////////////////

console.log(restaurant.openingHours?.mon?.open);
console.log(restaurant.openingHours?.fri?.open);

for (const day of weekdays) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed'; // ?? - for nullage values
  console.log(`On ${day}, we open at ${open}`);
}

// optional chaining for methods
console.log(restaurant.order?.(0, 1) ?? 'Method exists');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// arrays
const users = [{ name: 'Jonas', email: 'email#' }];
console.log(users[0]?.name ?? 'User array is empty'); // useful check for empty array


//////////////////////////////////////
// Looping over objects
//////////////////////////////////////

const properties = Object.keys(openingHours);
console.log(properties);
console.log(properties.length);

for (const day of Object.keys(openingHours)) {
  console.log(day);
}

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

// property VALUES
const values = Object.values(openingHours);
console.log(values);

// entire object
const entries = Object.entries(openingHours);
console.log(entries);
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

//////////////////////////////////////
// Sets & Maps - ES6 (iterables)
//////////////////////////////////////

// sets - collection of unique values

const ordersSet = new Set(['Pasta', 'Pizza', 'Risotto', 'Pasta', 'Pizza']);
console.log(ordersSet);

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic bread');
ordersSet.add('Garlic bread');
ordersSet.delete('Risotto');
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) {
  console.log(order);
}

// example
const staff = ['waiter', 'chef', 'manager', 'waiter', 'chef'];
const staffUnique = [...new Set(staff)]; // create new array of unique values
console.log(staffUnique);

// count different letters in string
console.log('unique letters in mariagrigorova: ', new Set('mariagrigorova').size);

// MAPS - the keys can be of any type

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');

rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We\'re open :D')
  .set(false, 'We\'re closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));

rest.set([1, 2], 'Test');
rest.get([1, 2]); // will return undefined, as the arrays are different in the heap.

const time = 21;
const areOpen = time > rest.get('open') && time < rest.get('close');
console.log(areOpen);
console.log('are open? ', rest.get(areOpen));
rest.delete(2);
console.log(rest);

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct 🎊'],
  [false, 'Try again!']
]);
console.log(question);

// convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));

for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer: ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(answer === question.get('correct')));

// Convert map to array - destructure and put them in array
console.log([...question]);

////////////////////////////////////
// STRINGS
////////////////////////////////////

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(airline.length);
console.log(airline.indexOf('r')); //first occurence
console.log(airline.lastIndexOf('r')); //first occurence
console.log(airline.indexOf('Portugal')); // case sensitive

console.log(airline.slice(4)); // returns new string
console.log(airline.slice(4, 7));  // stops extracting befotre the last index (7)

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
console.log(airline.slice(-2)) // last two letters;
console.log(airline.slice(1, -1)) // cuts the first and the last characters

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1); // takes the last character. Starts counting from the right side
  if (s === 'B' || s === 'E') {
    console.log("You got the middle seat :(");
  } else {
    console.log("You got lucky! :) ");
  }
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

const passenger = 'jOnAs';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// comparing emails
const email = 'hello@jjj.com';
const loginEmail = '  Hello@Jjj.com \n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEMail = lowerEmail.trim();

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate')); // only the first occurence 
console.log(announcement.replaceAll('door', 'gate')); // new method. 

console.log(announcement.replace(/door/g, 'gate')); // use replace() with regular expression ( global for door string)

// Booleans 
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A32'));
console.log(plane2.includes('Boeing'));
console.log(plane2.startsWith('Airb'));

if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of the new Airbus family');
}

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
}
checkBaggage('I have a laptop, some food and a pocket knife');
checkBaggage('Socks and camera');
checkBaggage('Got snacks and a gun for protecton');

console.log('a+very+nice+string'.split('+'));
console.log('Maria Grigorova'.split(' '));
const [firstName, lastName] = 'Maria Grigorova'.split(' ');
const newName = ['Ms.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);


// Capitalize a name
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
}
const passengerC = 'jessica ann smith davis';

capitalizeName(passengerC);

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log('Masha'.padStart(25, '+').padEnd(35, '+'));

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*')
}

console.log(maskCreditCard('343234242343434'));
console.log(maskCreditCard('8788788799823434349899'));// or use BigInt for numbers
console.log(maskCreditCard('3334343'));

// Repeat 
const message2 = 'Bad weather... al departures delayed';
console.log(message2.repeat(5));

const planesinLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩️'.repeat(n)}`);
}

planesinLine(5);
planesinLine(3);

/////////////////////////////////////////
// coding challenge strings
/////////////////////////////////////////

// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
// The input will come from a textarea inserted into the DOM(see code below to insert the elements), and conversion will happen when the button is pressed.
// Test data(pasted to textarea, including spaces):
// underscore_case
// first_name
// Some_Variable
// calculate_AGE
// delayed_departure
// Should produce this output(5 separate console.log outputs): 
// underscoreCase       ✅
// firstName            ✅✅
// someVariable         ✅✅✅
// calculateAge         ✅✅✅✅
// delayedDeparture     ✅✅✅✅✅
// Hints:
// § Remember which character defines a new line in the textarea 😉
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable
// name conversion working 😉
// § This challenge is difficult on purpose, so start watching the solution in case
// you're stuck. Then pause and continue!

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const button = document.querySelector('button');
const textArea = document.querySelector('textarea');
let input = '';

const capitalizeWord = function (word) {
  if (!word) {
    return '';
  }
  word = word.toLowerCase();
  return word.replace(word[0], word[0].toUpperCase())
}

const toCammelCase = function (rows) {
  // separate rows
  let result = [];
  // remove spaces
  for (let row of rows) {
    if (!row) continue;

    const [first, second] = row.toLowerCase().trim().split('_');
    const capitalized = `${first}${capitalizeWord(second)}`;
    result.push(capitalized);
  }

  return result;
}

const findLongestWord = function (arr) {
  return Math.max(...arr.map(el => el.length))
}

const print = function (arr) {
  let max = findLongestWord(arr);

  for (let i = 0; i <= arr.length; i++) {
    if (!arr[i]) continue;
    const checks = `${'✅'.repeat(i + 1)}`;
    console.log(arr[i].padEnd(max + 5, ' ') + checks);
  }
}

button.addEventListener('click', function () {
  input = textArea.value;
  let rows = input.split('\n');
  print(toCammelCase(rows));
});

///////////////////////////////////////
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Output
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll('_', ' ')} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`.padStart(55);

  console.log(output);

}
