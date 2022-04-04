'use strict';

// NUMBERS - all numbers are stored as floating point numbers. Stored in 64 
// we cannot do precise financial calculations with javascript

console.log(23 === 23.0);

// Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.33333
// Binary base 2 - 0 1 - 64 bits, 53 bits to store the number

console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // false = this is an error in JS

// string to number
console.log(Number('23'));
console.log(+'23'); // + sign automatically converts to numbers

// parsing - the string needs to start with number
console.log(Number.parseInt('30px', 10)); // the second param is the numberic base
console.log(Number.parseInt('30px'));

console.log(Number.parseFloat('2.5rem'));
console.log(Number.parseFloat('  2.5rem   '));

// Check if value is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // false

// better to check if a value is a number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23.5)); // false
console.log(Number.isInteger(23 / 0)); // false

// Math and rounding

console.log(Math.sqrt(25)); // square root
console.log(25 ** (1 / 2)); // square root
console.log(8 ** (1 / 3)); // cubic root

console.log(Math.max(3, 4, '43', 55, '67'));
console.log(Math.min(3, 4, '43', 55, '67'));

console.log(Math.PI * Number.parseFloat('10px') ** 2); // area of a circle

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(10, 20));

// rounding integers
console.log(Math.trunc(23.3));

console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor(23.9));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3)); // more accurate than trunk

// rounding decimals
console.log((2.7).toFixed(0)); // reutrns a string
console.log(+(2.7).toFixed(0));
console.log((2.7).toFixed(3));

// The Remainder operator - %
console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 2);
console.log(8 / 2); // 8 = 2 * 3 + 2

// check if even or odd

console.log(6 % 2 === 0); // even
console.log(7 % 2 === 0); // odd

const isEven = n => n % 2 === 0 ? true : false;

console.log(isEven(8));
console.log(isEven(23));

// Numeric separators - ES2021
// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter); //287460000000

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

// const PI = 3._1415; - not allowed underscore placement

console.log(Number('230_000')); // NaN - we should not use the _ for functions. Mainly for constants

// BIGING - ES2020 , primitive type
console.log(2 ** 53 - 1); // the biggest number JS can store
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 5); // this will not be correct

console.log(879878973982749837981347924748732421947n); // big int number
console.log(BigInt(879878973982749837981347924748732421947)); // not always accurate

// operations
console.log(10000n + 10000n);
console.log(231232311341225435435352n * 100000000n);

const huge = 9898797907979709660n;
const num = 23;
// console.log(huge * num);// error
// Math operations don't work
console.log(huge * BigInt(num));

console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(20n == 20); // true

console.log(huge + ' is really big!');

// divisions
console.log(11n / 3n); //  3 =cuts the decimal part
console.log(11 / 3); // 3.6666666666666665


const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};
const accounts = [account1, account2];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// CREATING DATES

const now = new Date();
console.log(now);

console.log(new Date('Apr 03 2022 21:52:19 GMT+0300 '));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); // the month is zero mased
console.log(new Date(2037, 10, 31));

console.log(new Date(0)); // the beggining of time Jan 01 1970 02:00:00 GMT+0200 
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days in ms - timestamp

// forking with dates

const future = new Date(2037, 10, 19, 15, 23); // the month is zero mased
console.log(future);
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10 - november
console.log(future.getDate()); // 19
console.log(future.toISOString());
console.log(future.getTime()); // get the timestamps

console.log(Date.now()); // get current timestamp

future.setFullYear(2040);
console.log(future);

// operations with dates

console.log(Number(future));
console.log(+future);

const calcDaysPassed = (date1, date2) => Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));
const daysPassed = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24, 10, 9));
console.log(daysPassed, ' days');


// timeout and intervals

// setTimeout - schedules a function to execute after some time
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout((ingr1, ingr2) => console.log(`Here is you pizza 🍕 with ${ingr1} and ${ingr2}`), 3000, ...ingredients);
console.log("waiting...");


if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval - create a clock
// setInterval(function () {
//     const now = new Date();
//     console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
// }, 1000);
const options = {
    style: 'currency',
    // unit: 'mile-per-hour',
    unit: 'celsius',
    currency: 'EUR',
    useGrouping: false
}

const num1 = 87697669697697;
console.log("US: ", new Intl.NumberFormat('en-US', options).format(num1));
console.log("Germany: ", new Intl.NumberFormat('de-DE', options).format(num1));
console.log("Syria: ", new Intl.NumberFormat('ar-SY', options).format(num1));
  // console.log("BG: ", new Intl.NumberFormat('bg-BG', options).format(num1));