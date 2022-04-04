'use strict';
////////////////////////////////////
// Linking a JavaScript File
// let js = "amazing";
// console.log(40 + 8 + 23 - 10);

// Values and vars
// let country = 'Bulgaria';
// let continent = 'Europe';
// let population = '6 mln';
// console.log(country, continent, population);

////////////////////////////////////////////////////
// operators and variables
////////////////////////////////////////////////////

// let markMass = 78;
// const markHeight = 1.69;

// let johnMass = 92;
// const johnHeight = 1.95;

// let markMass = 95;
// const markHeight = 1.88;

// let johnMass = 85;
// const johnHeight = 1.76;

// function calcBMI(mass, height){
//     return (mass/height**2).toFixed(1);
// }

// let markBMI = calcBMI(markMass, markHeight);
// let johnBMI = calcBMI(johnMass, johnHeight);

// let markHigherBMI = markBMI > johnBMI;

// console.log(markBMI, johnBMI, markHigherBMI);

// if (markHigherBMI){
//     console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI})!`);
// } else {
// console.log(`John's (${johnBMI}) is higher than Mark's BMI (${markBMI}) !`);
// }


////////////////////////////////////////////////////
// Logical Operations
///////////////////////////////////////////////////

// const dolphinsScore1 = 96;
// const dolphinsScore2 = 108;
// const dolphinsScore3 = 6;

// const koalasScore1 = 96;
// const koalasScore2 = 108;
// const koalasScore3 = 6;

// const avgDolphinsScore = (dolphinsScore1 + dolphinsScore2 + dolphinsScore3) / 3;
// const avgKoalasScore = (koalasScore1 + koalasScore2 + koalasScore3) / 3;

// if (avgDolphinsScore > avgKoalasScore && avgDolphinsScore > 100) {
//     console.log(`Dolphins win 🏆!`);
// } else if (avgDolphinsScore < avgKoalasScore && avgKoalasScore > 100) {
//     console.log(`Koalas win 🏆!`);
// } else if (avgDolphinsScore === avgKoalasScore && avgDolphinsScore >= 100) {
//     console.log('Both win! :D')
// } else {
//     console.log('Nobody wins :( 😬')
// }

//////////////////////////////////////////
// Ternary Operator
//////////////////////////////////////////
// let tip;

// const bill = 430;
// bill >= 50 && bill <= 300 ? tip = bill * 15 / 100 : tip = bill * 20 / 100;

// console.log(`The bill was ${bill}, the tip was ${tip} and the total value was ${bill + tip} 🤑.`);

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log('I can drive');

///////////////////////////////////
// Functions
///////////////////////////////////

// const calcAverage = (num1, num2, num3) => (num1 + num2 + num3) / 3;
// const dolphinsAvg = calcAverage(85, 54, 41);
// const koalasAvg = calcAverage(23, 34, 27);
// console.log(dolphinsAvg, koalasAvg);

// const checkWinner = function (avgDolphinsScore, avgKoalasScore) {
//     if (avgDolphinsScore >= avgKoalasScore * 2) {
//         console.log(`Dolphins 🐬 win (${avgDolphinsScore} vs ${avgKoalasScore})`)
//     } else if (avgDolphinsScore * 2 <= avgKoalasScore) {
//         console.log(`Koalas 🐨 win (${avgKoalasScore} vs ${avgDolphinsScore})`)
//     } else {
//         console.log('Nobody wins 🤷')
//     }
// }

// checkWinner(dolphinsAvg, koalasAvg);


//////////////////////////////////////////
// Arrays
//////////////////////////////////////////

// const calcTip = function (bill) {
//     return bill >= 50 && bill <= 300 ? bill * 15 / 100 : bill * 20 / 100;
// }

// const bill = 100;
// const tip = calcTip(bill);

// console.log(`The bill was ${bill}, the tip was ${tip} and the total value was ${bill + tip} 🤑.`);

// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

// console.log(bills, tips, totals);

//////////////////////////////////////////
// Objects
//////////////////////////////////////////

// const mark = {
//     fName: 'Mark',
//     lName: 'Miller',
//     mass: 78,
//     height: 1.69,
//     calcBMI: function () {
//         this.bmi = (this.mass / this.height ** 2).toFixed(2)
//         return this.bmi;
//     }
// };

// const john = {
//     fName: 'John',
//     lName: 'Smith',
//     mass: 92,
//     height: 1.95,
//     calcBMI: function () {
//         this.bmi = (this.mass / this.height ** 2).toFixed(2)
//         return this.bmi;
//     }
// }

// if (mark.calcBMI() > john.calcBMI()) {
//     console.log(`${mark.fName}'s BMI (${mark.bmi}) is higher than ${john.fName}'s (${john.bmi})`)
// } else {
//     console.log(`${john.fName}'s (${john.bmi}) is higher than ${mark.bmi}'s BMI (${mark.bmi})`)
// }

//////////////////////////////////////////
// Loops
//////////////////////////////////////////

// const calcTip = function (bill) {
//     return bill >= 50 && bill <= 300 ? bill * 15 / 100 : bill * 20 / 100;
// }

// const bill = 100;
// const tip = calcTip(bill);

// console.log(`The bill was ${bill}, the tip was ${tip} and the total value was ${bill + tip} 🤑.`);

// const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// const tips = [];
// const totals = [];

// for (let i = 0; i < bills.length; i++) {
//     let tip = calcTip(bills[i]);
//     tips.push(tip);
//     totals.push(bills[i] + tip);
// }

// console.log(bills, tips, totals);

// const calcAverage = function (arr) {
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//         sum += arr[i];
//     }
//     return sum / arr.length;
// }

// console.log(calcAverage(totals));

//////////////////////////////////////////
// Problem Solving
//////////////////////////////////////////
// check if values are numbers
// prepare strings and add them to existing string

const printForecast = function (arr) {
    let forecast = '';
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'number') {
            forecast += `... ${arr[i]}ºC in ${i + 1} days `;
        }
    }
    return forecast;
}
console.log(printForecast([12, 5, -5, 0, 4]));