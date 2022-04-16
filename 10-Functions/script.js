'use strict';

// Default parameters
const bookings = [];
const createBookng = function (
    flighNum,
    numPassengers = 1,
    price = 199 * numPassengers) {
    // ES5
    // numPassengers = numPassengers || 1; // old way of setting default value
    // price = price || 199;

    const booking = {
        flighNum,
        numPassengers,
        price
    }
    console.log(booking);
    bookings.push(booking);
}

createBookng('LH878');
createBookng('LH123', 2, 800);
createBookng('LH123', 5);
createBookng('LH123', undefined, 500); // leave to the default value

// Parameter types - primitives vs referent
// Passing by value and pass by reference - JS passes by value

const flight = 'LH234';
const jonas = {
    name: 'Jonas Schmedtman',
    passport: 2234234323434
};

const checkIn = function (flighNum, passenger) {
    flighNum = 'LH999';

    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 2234234323434) {
        console.log('Checked in')
    } else {
        console.log('Wrong!')
    }
}

checkIn(flight, jonas);

// this function manipulates the same object
const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 1000000000);
}

newPassport(jonas);
checkIn(flight, jonas)

// First class and higher order functions

// Functions are simply values (first class citizens). Functions are objects.

// higher order functions - receives function as parameter (a callback); Or return new function

// Higher order functions

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

//higer-order function
const transformer = function (str, fn) {
    console.log('Original string:', str);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transformed by ${fn.name}`);
}

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
    console.log('👋');
}
// document.body.addEventListener('click', high5);

// ['Jonas', 'Martha', 'Adam'].forEach(high5);


// functions that return a function
const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
}

const greeterHey = greet('Hey'); // the result is a function
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

const greetArrow = greeting => name => console.log(`${greeting}, ${name}`);

greetArrow('Yo')('Masha');

// Call and Apply
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name })
    }
};

lufthansa.book(239, 'Jonas Schmendtman');
lufthansa.book(456, 'Jon Smith');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: []
}

const book = lufthansa.book; // this way we are able to reuse the function 

// book(23, 'Sarah Williams'); // in a regular function call the this is not available

book.call(eurowings, 23, 'Sarah Williams'); // first params specifies the this keyword to an object. The rest of the args are the function arguments
console.log(eurowings);

book.call(lufthansa, 234, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
    airline: 'Swiss Airlines',
    iataCode: 'LX',
    bookings: []
}
book.call(swiss, 544, 'Mary Cooper');

// Apply method - does not receive a list of arguments but an array
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData); // the modern way

// Bind - does not immediately call the function, instead returns a new function
const bookEW = book.bind(eurowings); // returns new function where this is always seto to eurowings
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(45, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23); // sets parameters as well (partial application)
bookEW23('Jonas Schmendtman');
bookEW23('Martha Cooper');

// objects with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};

// this will not work - the 'this' keyword always points to the element the handler is attached to
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); 

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.10, 200));

const addVAT = addTax.bind(null, 0.23); // we don't care about the 'this' so we leave it null
console.log(addVAT(100));

const addRateCB = function (taxRate) {
    return function (value) {
        return value + value * taxRate
    };
}

const addVATCB = addRateCB(0.20);
console.log(addVATCB(100));

/// CODING CHALLENGE
const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    // This generates [0, 0, 0, 0]. More in the next section! 
    answers: new Array(4).fill(0)
};

poll.registerNewAnswer = function () {
    let message = `${this.question}\n${this.options.join('\n')}\n(Write option number)`;
    const userInput = new Number(prompt(message));

    if (userInput < 0 || userInput >= this.answers.length) {
        alert('⚠️ Invalid input!')
    } else {
        this.answers[userInput]++;
    }

    this.displayResults('string');
}

document
    .querySelector('.poll')
    .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults = function (type = 'array') {
    if (type === 'array') {
        console.log(this.answers);
    }
    if (type === 'string') {
        console.log(`Poll results are ${this.answers.join(', ')}`);
    }
}

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

// IIFE - Immediately invoked function expression 
(function () {
    console.log("This will never run again");
})();

(() => console.log("This will ALSO never run again"))();

////////////////////////////
// CLOSURES - a function remembers all variables at its birthplace at the time of its running
////////////////////////////

// A function hass access to the VE (variable environment) ot the execution context in which it was created
// CLOSURE: VE attached to the function, exactly as it was at the time and place the function was created
// the scope chain has somehow preserved through the closure even if the scope has already been destroyed, becase the enclosing function has been executed ( the execution context is gone)
// Closure is like a backpack that function carries around wherever it goes. The backpack has all the variables that were present in the environemnt where the function was created.
// Closure has priority over the Scope Chain
// We do not have to create closures manually
// We cannot explicitly access variables of a closure. They are not a tangible object. We can only observe it.

const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}

const booker = secureBooking(); // the result will be function

booker();
booker();
booker();

// Observe the function details, including the Scopes > Closure
console.dir(booker);

// more examples of closures
// Example 1
let f;

const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    }
}

const h = function () {
    const b = 777;
    f = function () {
        console.log(b * 2);
    }
}

g(); // assigns a to 23 and f to a function
f(); // actually executes f(); F() has closed over the VE of g() and has access to the 'a' variable

// Re-assigning the f function
h();
f();

// Example 2 - timer
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000); // the callback function will execute after 1s

    console.log(`Will start boarding in ${wait} seconds`);

}

const perGroup = 1000; // this is ignored which proves that closure has priority over global context. But if we take out the perGroup from the boardPassengers() then the global one will be used.
boardPassengers(180, 3);

///////////////////////////////
// Coding challeng
///////////////////////////////
// This is more of a thinking challenge than a coding challenge 🤓 Your tasks:
// 1. TaketheIIFEbelowandattheendofthefunction, attachaneventlistenerthat changes the color of the selected h1 element('header') to blue, each time the body element is clicked.Do not select the h1 element again!
// 2. Andnowexplaintoyourself(orsomeonearoundyou)whythisworked!Takeall the time you need.Think about when exactly the callback function is executed, and what that means for the variables involved in this example.


(function () {
    const header = document.querySelector('h1');
    header.style.color = 'purple';

    const addListener = function () {
        console.log('execute callback');
        header.style.color = 'blue';
    };

    header.addEventListener('click', addListener);
    console.log(addListener);
    console.dir(addListener);
})();