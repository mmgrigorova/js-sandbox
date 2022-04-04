/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];


// SLICE - does not mutate
console.log(arr.slice(2)); // does not mutate the original 
console.log(arr.slice(2, 4));

console.log(arr.slice(-1)); // get the last element of an array

console.log(arr.slice(-2));
console.log(arr.slice(1, -2));

// create a shallow copy of an array
console.log(arr.slice()); // use slice when you want to chain multiple method
console.log([...arr]);

// SPLICE - mutates the original
// console.log('Splice: ',arr.splice(2));
console.log('Splice: ', arr.splice(-1)); // the most common use - to remove the last element
console.log('Splice: ', arr.splice(1, 2)); // deletes two elements from index 1

// reverse - mutates
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse());
console.log(arr2);

// concat = does not mutate
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // alternative

// JOIN
console.log(letters.join(' - '));

// AT method - ES2022

const arrn = [23, 11, 64];
console.log(arrn[0]);
console.log(arrn.at(0));

// get last element of array
console.log(arrn[arrn.length - 1]);
console.log(arrn.slice(-1)[0]);
console.log(arrn.at(-1)); // the new cool way and useful for chaining

console.log('jonas'.at(-1));

// forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
    if (movement > 0) console.log(`${i + 1}. You deposited ${Math.abs(movement)}`);
    else console.log(`${i + 1}. You withdrew ${Math.abs(movement)}`);
}

console.log('----FOREACH----');

// forEarch requires a callback function. Cannot 'break' or 'continue' in a forEach loop
movements.forEach(function (movement, index, array) {
    if (movement > 0) console.log(`${index + 1}. You deposited ${Math.abs(movement)}`);
    else console.log(`${index + 1}. You withdrew ${Math.abs(movement)}`);
});

// forEach with Maps and Sets
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
})

//set
const currenciesUnique = new Set(['USD', 'BPD', 'USD', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
    console.log(`${_}: ${value}`);
})

// Coding Challenge #1
// Julia and Kate are doing a study on dogs.So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Juliafoundoutthattheownersofthefirstandthelasttwodogsactuallyhave cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. CreateanarraywithbothJulia's(corrected)andKate'sdata
// 3. Foreachremainingdog, logtotheconsolewhetherit'sanadult("Dognumber1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy   ")
// 4. Runthefunctionforbothtestdatasets
// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data[4, 1, 15, 8, 3] § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data[10, 5, 6, 1, 4]

const checkDogs = function (dogsJulia, dogsKate) {
    const dogsJuliaCopy = dogsJulia.slice(1, 3);

    const allDogs = [...dogsJuliaCopy, ...dogsKate];
    allDogs.forEach((dog, i) => {
        if ((dog >= 3)) {
            console.log(`Dog number ${i + 1} is an addult and is ${dog} years old`);
        } else {
            console.log(`Dog number ${i + 1} is still a puppy 🐶`);
        }
    });
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


// MAP method - creates a new array based on the original array
const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log('Original: ', movements);
console.log('USD: ', movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) {
//     movementsUSDfor.push(mov * eurToUsd);
// }

const movementsDesc = movements.map((mov, i) =>
    `Movement ${i + 1}. You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
)

console.log(movementsDesc);

// FILTER - creates new array
const deposits = movements.filter(function (mov) {
    return mov > 0;
});
console.log('Deposits:', deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log('Withdrawals: ', withdrawals);


// REDUCE - boils down the array to a single element (a snowball effect). Requires an accumulator
const balance = movements.reduce((accumulator, mov) => accumulator += mov, 0);

// Maximum value
const maxMovement = movements.reduce(
    (max, mov) => mov > max ? mov : max,
    movements[0])
console.log(maxMovement);

// Coding Challenge #2
// Let's go back to Julia and Kate's study about dogs.This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// 1. Calculatethedogageinhumanyearsusingthefollowingformula: ifthedogis <= 2 years old, humanAge = 2 * dogAge.If the dog is > 2 years old, humanAge = 16 + dogAge * 4
// 2. Excludealldogsthatarelessthan18humanyearsold(whichisthesameas keeping dogs that are at least 18 years old)
// 3. Calculatetheaveragehumanageofalladultdogs(youshouldalreadyknow from other challenges how we calculate averages 😉)
// 4. Runthefunctionforbothtestdatasets
// Test data:
// § Data1: [5, 2, 4, 1, 15, 8, 3] § Data2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (ages) {
    const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
    console.log("Human: ", humanAges);

    const elderDogs = humanAges.filter(age => age >= 18);
    console.log("Elder: ", elderDogs);

    const avgDogAge = elderDogs.reduce((acc, age) => acc + age, 0) / elderDogs.length;
    console.log("Average: ", avgDogAge);
}

calcAverageHumanAge([10, 20, 30]); //2
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);


const totalDepositsUSD = movements
    .filter(mov => mov > 0)
    .map(mov => mov * eurToUsd)
    // to inspect the array at any time
    // .map((mov, i, arr) => {
    //   console.log(arr);
    //   return mov * eurToUsd;
    // })
    .reduce((acc, mov) => acc += mov, 0);
console.log(totalDepositsUSD);

const calcAverageHumanAgeChain = function (ages) {
    const avgDogAge = ages
        .map(age => age <= 2 ? 2 * age : 16 + age * 4)
        .filter(age => age >= 18)
        .reduce((acc, age, i, arr) => acc + (age / arr.length), 0);
    console.log(avgDogAge);
    return avgDogAge;
}

calcAverageHumanAgeChain([10, 20, 30]); //2
calcAverageHumanAgeChain([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAgeChain([16, 6, 10, 5, 6, 1, 4]);

// find - loops over the array and returns the first element 
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);


// some and every
console.log(movements);
// INCLUDES tests for equality
console.log(movements.includes(-130));

// SOME method tests for more complex condition
const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits);

// EVERY method

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};
const accounts = [account1, account2, account3, account4];
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(account4.movements.every(mov => mov > 0));

// separate callback
const deposit = mov => mov > 0;

console.log(account4.movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));

// FLAT - ES2019

const arrNested = [1, 2, 3, [4, 5, 6], 7, 8];
console.log(arrNested.flat());

// FLATMAP methods
const arrDeep = [[[1, 2], 3, [4, 5, 6]], 7, 8];
console.log(arrDeep.flat()); // not flat enough
console.log(arrDeep.flat(2)); // flat enough

// SORTING - mutates. Works with strings (first converts everythin to strings)

const owners = ['Jonas', 'Zack', 'Adam', 'Martha'];
console.log(owners.sort()); // mutates the original array!!!
console.log(owners);

//numbers
console.log(movements);
console.log(movements.sort()); // the result is not matematically accurate, we need to pass a calback function
console.log(movements);

// the CORRECT mathematical sorting

// Ascending
// return < 0, A, B - ascending, return negative to keep the order of A and B
movements.sort((a, b) => {
    if (a > b) return 1; // the number does not matter as long it's greater than zero
    if (a < b) return -1;
});

movements.sort((a, b) => a - b);

// Descending
// return > 0, B, A - descending, switch the order of A and B
movements.sort((a, b) => {
    if (a < b) return 1; // the number does not matter as long it's greater than zero
    if (a > b) return -1;
});

movements.sort((a, b) => b - a);

console.log(movements);

// CREATING ARRAYS

const arr3 = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// generate arrays programatically
const x = new Array(7); // creates array with 7 empty elements
console.log(x);

x.fill(1) // mutates the array;
x.fill(1, 3); // starts filling at index 3
x.fill(1, 3, 5); // starts filling at index 3 and ends at 5

console.log(x);

arr3.fill(23, 2, 6); // fill() works with full arrays as well
console.log(arr3);

// Array.from() 
const y = Array.from({ length: 7 }, () => 1); // creates new array again
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // the callback function is like in the map method
console.log(z);

// random dice rolls
const diceRolls = Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6 + 1));
console.log('Dice: ', diceRolls);

/// ARRAYS practice
const numDepostis1000 = accounts.
    flatMap(acc => acc.movements)
    .filter(mov => mov >= 1000)
    .length;

const numDepostis1000reduce = accounts.
    flatMap(acc => acc.movements)
    .filter(mov => mov > 1000)
    .reduce((count, mov) => mov > 1000 ? ++count : count, 0); // cannot use count++

console.log(numDepostis1000);
console.log(numDepostis1000reduce);

// IMPORTANT - Prefixed ++
let a = 10;
console.log(a++); // increases the value but still returns the old value
console.log(++a); // increases the value but still returns the old value
console.log(a);

// 3. Create new object with reduce()
// sum of the depostis and the withdrawals
// const sums = accounts
const { deposits1, withdrawals1 } = accounts
    .flatMap(accounts => accounts.movements)
    .reduce((sums, curr) => {
        // curr > 0 ? sums.deposits1 += curr : sums.withdrawals1 += curr;
        sums[curr > 0 ? 'deposits1' : 'withdrawals1'] += curr; // avoids duplicated code
        return sums;
    }, { deposits1: 0, withdrawals1: 0 });

// console.log(sums);
console.log(deposits1, withdrawals1);

// 4. Convert any strin in a title case
// this is a nice title = > This Is a Nice Title

const convertTitleCase = function (title) {
    const capitalize = str => str[0].toUpperCase() + str.slice(1);

    const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];

    const titleCase = title.toLowerCase().split(' ')
        .map(word => exceptions.includes(word) ? word : capitalize(word))
        .join(' ');
    return capitalize(titleCase);
}
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and this is another title with an EXAMPLE'));

/////////////////////////////////////////
// Coding Challenge #4
// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
// Your tasks:
// 1. Loopoverthe'dogs'arraycontainingdogobjects, andforeachdog, calculate the recommended food portion and add it to the object as a new property.Do not create a new array, simply loop over the array.Forumla: recommendedFood = weight ** 0.75 * 28.(The result is in grams of food, and the weight needs to be in kg)
// 2. FindSarah'sdogandlogtotheconsolewhetherit'seatingtoomuchortoo little.Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky(on purpose) 🤓
// 3. Createanarraycontainingallownersofdogswhoeattoomuch('ownersEatTooMuch') and an array with all owners of dogs who eat too little('ownersEatTooLittle').
// 4. Logastringtotheconsoleforeacharraycreatedin3., likethis: "Matildaand Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Logtotheconsolewhetherthereisanydogeatingexactlytheamountoffood that is recommended(just true or false)
// 6. Logtotheconsolewhetherthereisanydogeatinganokayamountoffood(just true or false)
// 7. Createanarraycontainingthedogsthatareeatinganokayamountoffood(try to reuse the condition used in 6.)
// 8. Createashallowcopyofthe'dogs'arrayandsortitbyrecommendedfood portion in an ascending order(keep in mind that the portions are inside the array's objects 😉)

// Hints:
// § Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// § Being within a range 10 % above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10).Basically, the current portion should be between 90 % and 110 % of the recommended portion.

const dogs = [
    {
        weight: 22,
        curFood: 250,
        owners: ['Alice', 'Bob']
    },
    {
        weight: 8,
        curFood: 200,
        owners: ['Matilda']
    },
    {
        weight: 13,
        curFood: 275,
        owners: ['Sarah', 'John']
    },
    {
        weight: 32,
        curFood: 340,
        owners: ['Michael']
    },
];

// 1.
dogs.forEach(dog => dog.recommended = Math.trunc(dog.weight ** 0.75 * 28));
console.log(dogs);

// 2.
const eatingDesc = function (dog) {
    let howEat = '';
    if (dog.curFood < dog.recommended * 0.9) {
        howEat = 'too little'
    } else if (dog.curFood > dog.recommended * 1.1) {
        howEat = 'too much';
    } else {
        howEat = 'okay';
    }
    console.log(`${dog.owners.join(' and ')}'s dogs eat ${howEat}!`);
}

const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
eatingDesc(sarahsDog);
dogs.forEach(dog => eatingDesc(dog))

// 3. 
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recommended * 1.1)
    .flatMap(dogs => dogs.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recommended * 0.9)
    .flatMap(dogs => dogs.owners);
console.log(ownersEatTooLittle);

// 4.
console.log(
    `${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`
);
console.log(
    `${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`
);

//5. 
console.log('Eats exactly: ', dogs.some(dog => dog.curFood === dog.recommended * 0.9 || dog.curFood === dog.recommended * 1.1));

//6. 
const eatsOkay = dog => dog.curFood >= dog.recommended * 0.9 && dog.curFood <= dog.recommended * 1.1;
console.log('Eats okay: ', dogs.some(eatsOkay));

// 7. 
const eatingOkay = dogs.filter(eatsOkay);
console.log(eatingOkay);

// 8.
const sortedDogs = dogs.slice().sort((dog1, dog2) =>
    Number(dog1.recommended) - Number(dog2.recommended));
console.log(sortedDogs);