'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// DIFFERENT DATA! Contains movement dates, currency and locale

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
    '2022-04-01T17:01:17.194Z',
    '2022-04-02T23:36:17.929Z',
    '2022-04-03T10:51:36.790Z',
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

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
}

const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    useGrouping: false
  }).format(value);
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  // we are creating a copy with slice() because we don't want to change the original array
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]); // we can loop through a second array at the same time

    const displayDate = formatMovementDate(date, acc.locale);

    const formatted = formatCurr(mov, acc.locale, acc.currency);

    const html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatted}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, sorted);
  sorted = !sorted;
});

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  })
}

createUsernames(accounts);
console.log(accounts);

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// accumulator is like a snowball
// const balance = movements.reduce(function (accumulator, curr, i, arr) {
//   // console.log(`Iteration number ${i}: accumualtor ${accumulator}`);
//   return accumulator += curr;
// }, 0); // the initial value of the accumulator is the second parameter
// console.log(balance);

const calcDisplayBalance = function (acc) {
  // the initial value of the accumulator is the second parameter
  acc.balance = acc.movements.reduce((accumulator, mov) => accumulator += mov, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);

}

calcDisplayBalance(account1);

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc += mov, 0)
  labelSumIn.textContent = formatCurr(incomes, account.locale, account.currency);

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => account.interestRate += mov, 0);
  labelSumOut.textContent = formatCurr(out, account.locale, account.currency);

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * 1.2 / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc += int, 0);
  labelSumInterest.textContent = formatCurr(interest, account.locale, account.currency);

};

const updateUI = function (acc) {
  //display movements
  displayMovements(currentAccount);
  // display balance 
  calcDisplayBalance(currentAccount);
  //display summayr
  calcDisplaySummary(currentAccount);

  // const now = new Date();
  // const day = `${now.getDate()}`.padStart(2, 0);
  // const month = `${now.getMonth() + 1}`.padStart(2, 0);
  // const year = now.getFullYear();
  // const hour = `${now.getHours()}`.padStart(2, 0);
  // const min = `${now.getMinutes()}`.padStart(2, 0);
  // // day/month/year
  // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

}

console.log(calcDisplaySummary(account1));

// Event Handlers

let currentAccount, timer;

// fake always logged in 
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;


const startLogOutTimer = function () {
  // set time to 5 minutes
  let time = 120;
  // we need to manually call the function once to avoid waiting the interval
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // each call print remaining time
    labelTimer.textContent = `${min}:${sec}`;

    // when time is 0 stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Login to get started`;
    }
    // decrease time
    time--;
  }

  // call timer every second
  tick();
  timer = setInterval(tick, 1000);

  // wee need to return the times so that we can clear it manually
  return timer;
}

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();


    // const now = new Date(2022, 3, 30, 13, 45, 30);
    const now = new Date();
    // labelDate.textContent = new Intl.DateTimeFormat('en-US').format(now);
    // labelDate.textContent = new Intl.DateTimeFormat('en-GB').format(now);

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }

    // get locale from browser
    const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
    // labelDate.textContent = `${new Intl.DateTimeFormat('en-GB', options).format(now)} (${new Intl.DateTimeFormat('ar-SY', options).format(now)}) (${new Intl.DateTimeFormat(locale, options).format(now)})`;

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
})

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;

  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0
    && receiverAcc
    && currentAccount.balance >= amount
    && receiverAcc?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    // reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
})

/// Request loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0
    && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    //Add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date());
      updateUI(currentAccount);
    }
      , 2500);
    inputLoanAmount.value = '';
  }

  // reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});
/// findIndex - ES6
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username
    && +inputClosePin.value === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = currentAccount.username = '';
})

// Take all movements
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// FlatMap - combines the flat and map methods, goes one level deep
const overallBalanceFlatMap = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceFlatMap);



labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace('???', '')
  );
  console.log(movementsUI);
});

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'lightblue'
    }
  })
});

