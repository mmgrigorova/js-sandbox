'use strict';

// function calcAge(birthYear) {
//     const age = 2037 - birthYear;

//     function printAge() {
//         const output = `${firstName}, you are ${age}, born in ${birthYear}`;
//         console.log(output);

//         if (birthYear >= 1981 && birthYear <= 1996) {
//             const str = `Oh, and you're a millenial, ${firstName}`;
//             console.log(str);
//             var millenial = true;
//         }
//     }

//     printAge();
//     return age;
// }

// const firstName = 'Jonas';
// calcAge(1991);

console.log(this);

function calcAge(birthYear) {
    const age = 2037 - birthYear;
    console.log(age);
    console.log(this); // undefined in strick mode, window object of global scope in sloppy mode
}

calcAge(1998);


const calcAgeArrow = (birthYear) => {
    const age = 2037 - birthYear;
    console.log(age);
    console.log(this); // the window
}

calcAgeArrow(1991);

const jonas1 = {
    year: 1991,
    calcAge: function () {
        console.log(this); // jonas - the owner of the method
        console.log(2037 - this.year);
    }
}

jonas1.calcAge();

const matilda = {
    year: 2017
};

matilda.calcAge = jonas1.calcAge; //method borrowing
matilda.calcAge();

// const f = jonas.calcAge;

// console.log(f);

// f(); // this is undefinded as there is no owner in global function

const jonas = {
    year: 1991,
    firstName: "Jonas",
    calcAge: function () {
        console.log(this); // jonas - the owner of the method
        console.log(2037 - this.year);

        //solution 1
        // const self = this; // solution to undefined this in regular functions; self or that as conventions
        // const isMillenial = function () {
        //     // console.log(this.year >= 1991 && this.year < 1996);
        //     console.log(self.year >= 1991 && self.year < 1996);
        // }

        const isMillenial = () => {
            console.log(this.year >= 1991 && this.year < 1996); // works because arrow function uses the parent's this keyword
        }
        isMillenial();
    },
    greet: () => console.log(`Hey, ${this.firstName}`) // this is undefined in arrow function. Object literal is not a code block. It is object literal
}

jonas.greet();
jonas.calcAge();

// arguments keyword
const addExpression = function (a, b) {
    console.log(arguments);
    return a + b;
}

addExpression(2, 5);
addExpression(2, 5, 8, 12);

let addArrow = (a, b) => {
    // console.log(arguments); undefined
    return a + b
};

addArrow(2, 66);

let age = 30;
let oldAge = age;
age = 31;

console.log(age, oldAge);

const me = {
    name: 'Jonas',
    age: 30
}

const friend = me;
friend.age = 27;

console.log('Friend: ', friend);
console.log('Me: ', me);