'use strict';

// Constructor function - this is a pattern

const Person = function (firstName, birthYear) {
    // instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // NEVER create a method in a constructor function, because the function will copy each time for each instance. Instead use prototyoes
    // this.calcAge = function () {
    //     console.log(2037 - this.birthYear);
    // }
}

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New empty object is created
// 2. function is called, this = {} ( the new empty object)
// 3. {} linked to prototype
// 4. function automatically returns the {}

const matilda = new Person('Matilda', 2017);

const jay = 'Jay';
console.log(jonas instanceof Person); // true
console.log(jay instanceof Person); // false

///////////////////////////////////////////////
// PROTOTYPES
///////////////////////////////////////////////

// each function has prototype property so we attach the functions to the prototype
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};
console.log(Person.prototype);

// any object ALWAYS has access to the methods and properties from its prototype
jonas.calcAge(); // cals from prototype
matilda.calcAge();

// the prototype of jonas / the prototype of the constructor function
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); // true, Person.prototype is the prototype that will be used for the instances

// prototype property would be called .prototypeOfLinkedObjects
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = 'Homo Sapiens';
console.log(jonas, matilda); // the species property is available in the prototype and is not directly on the object
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__); //the prototype of Object. The top of the proto chain
console.log(jonas.__proto__.__proto__.__proto__); //null

console.dir(Person.prototype.constructor);

const arr = [2, 4, 5, 7, 9, 9, 7, 6]; // [] is shorthand to new Array;
console.log(arr.__proto__);

// generally not a good idea to extend the prototype. JS might add such method to a next version which works in a different way.
Array.prototype.unique = function () {
    return [...new Set(this)];
}
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);

// Static 
Person.hey = function () {
    console.log(`Hey there 👋`);
}
Person.hey();

// Coding Challenge #1
// Your tasks:
// 1. Useaconstructorfunctiontoimplementa'Car'.Acarhasa'make'anda 'speed' property.The 'speed' property is the current speed of the car in km / h
// 2. Implementan'accelerate'methodthatwillincreasethecar'sspeedby10, and log the new speed to the console
// 3. Implementa'brake'methodthatwilldecreasethecar'sspeedby5,andlog the new speed to the console
// 4. Create2'Car'objectsandexperimentwithcalling'accelerate'and 'brake' multiple times on each of them
// Test data:
// § Data car 1: 'BMW' going at 120 km / h
// § Data car 2: 'Mercedes' going at 95 km / h
// GOOD LUCK 😀

const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} accelerates at ${this.speed} km/h`);
}

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} breaks at ${this.speed} km/h`);
}

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

console.log(car1, car2);
car1.accelerate();
car1.accelerate();
car2.brake();
console.log(car1, car2);

//////////////////////////////////
/// ES6 Classes - sintactic sugar
/////////////////////////////////

//class expression
// const PersonCl = class{}

// class declaration
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName; // executes the setter
        this.birthYear = birthYear;
    }

    // the methods will still be on the .prototype and not on the same object
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greet() {
        console.log(`Hey, ${this.firstName}`);
    }

    get age() {
        return 2037 - this.birthYear;
    }

    // Set a property which already exists
    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        else alert(`The ${name} is not correct`)
    }

    get fullName() {
        return this._fullName;
    }

    static hey() {
        console.log(`Hey there 👋`);
    }
}

const jessica = new PersonCl('Jessica Davis', 1996);

// PersonCl.prototype.greet = function () {
//     console.log(`Hey, ${this.firstName}`);
// }
console.log(jessica);
jessica.greet();
console.log(jessica.age);

const walter = new PersonCl('Walter Blue', 1965);
console.log(walter);

// 1. Classes are NOT hoisted - we cannot use them before they are declared in the code
// 2. Classes are first-class citizens. We can pass them into functions and return them from functions
// 3. Classes are executied in 'strict' mode

// Getters and Setters - accessor properties
// very useful for data validation for example

const account = {
    owner: 'Jonas',
    movements: [344, 100],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    }
}

console.log(account.latest); // with getters we don't write it as a function
account.latest = 50;
console.log(account.movements);

// Static methods

Array.from([1, 2, 3]); // a static method on the Array constructor. It is attached to the constructor and not to the prototype
// from() is in the Array namespace
Number.parseInt(3.4); // static method

// Object.create() - implement prototypel inheritance
// manually set the prototype of an object to another object

const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979); // this has nothing to do with constructor functions
sarah.calcAge();

// Coding Challenge #2
// Your tasks:
// 1. Re - createChallenge#1, butthistimeusinganES6class(callit'CarCl')
// 2. Addagettercalled'speedUS'whichreturnsthecurrentspeedinmi / h(divide
// by 1.6)
// 3. Addasettercalled'speedUS'whichsetsthecurrentspeedinmi / h(but
// converts it to km / h before storing the value, by multiplying the input by 1.6)
// 4. Createanewcarandexperimentwiththe'accelerate'and'brake'
// methods, and with the getter and setter.
// Test data:
// § Data car 1: 'Ford' going at 120 km / h GOOD LUCK 😀

class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} accelerates at ${this.speed} km/h`);
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} breaks at ${this.speed} km/h`);
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }

    get speedUS() {
        return this.speed / 1.6;
    }

}

const ford = new CarCl('Ford', 120);
console.log(ford);
console.log(ford.speedUS)
ford.accelerate();
ford.brake();
ford.speedUS;
ford.speedUS = 150;
console.log(ford);

// Inheritance
const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
}

// linking prototypes
Student.prototype = Object.create(Person.prototype);
// fix the constructor
Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const mike = new Student('Mike', 2020, 'CS');
console.log(mike);
mike.introduce();
mike.calcAge(); // from the Person parent
console.log(mike.__proto__);

console.dir(Student.prototype.constructor);

// Coding Challenge #3
// Your tasks:
// 1. UseaconstructorfunctiontoimplementanElectricCar(called'EV')asachild "class" of 'Car'.Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
// 2. Implementa'chargeBattery'methodwhichtakesanargument 'chargeTo' and sets the battery charge to 'chargeTo'
// 3. Implementan'accelerate'methodthatwillincreasethecar'sspeedby20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km / h, with a charge of 22 % '
// 4. Createanelectriccarobjectandexperimentwithcalling'accelerate', 'brake' and 'chargeBattery'(charge to 90 %).Notice what happens when you 'accelerate'! Hint: Review the definiton of polymorphism 😉
// Test data:
// § Data car 1: 'Tesla' going at 120 km / h, with a charge of 23 % GOOD LUCK 😀

const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
}

EV.prototype.chargeBattery = function (chargeTo) {
    if (chargeTo > 0) this.charge = chargeTo;
}

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
console.dir(EV.prototype.constructor);

tesla.accelerate();
tesla.brake();
tesla.chargeBattery(40);
tesla.accelerate();

// ES6 Inheritance
class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {
        // always needs to happen first!
        super(fullName, birthYear);

        // if we don't have additional parameters, we may skip the constructor
        this.course = course;
    }
    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    calcAge() {
        console.log(`I'm ${2037 - this.birthYear} years ols but I feel older`);
    }
}

const martha = new StudentCl('Martha Bush', 2018, 'Paraplanner');
martha.introduce();
martha.calcAge();

// Inheritance with Object.create()

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}
StudentProto.introduce = function () {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
}

const jane = Object.create(StudentProto);
jane.init('Jane', 2010, 'Computer Science')
jane.introduce();
jane.calcAge();

// More about classes
// Class fields
// public fields
// private fields
// public methods
// private methods

class Account {
    // Public field, they are present for all the instances and not the prototype
    locale = navigator.language;
    _movements = []; // a convention for protected properties

    // Private fields
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        // Protected 
        this.#pin = pin;
        // this._movements = []; // a convention for protected properties
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${this.owner}`);
    }

    // Public methods
    // Public interface
    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
        return this;
    }

    requestLoan(val) {
        if (this.#approveLoan(val)) {
            this.deposit(val);
            console.log('Loan approved');
        }
        return this;
    }

    // Static
    static helper() {
        console.log("Hello account!");
    }

    // Private methods - still not fully supported
    #approveLoan(val) {
        return true;
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
// acc1._approveLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
// not a good idea to manipulate the property directly
// acc1._movements.push(250);
// acc1._movements.push(-140);
Account.helper();

// Chaining - chaining mostly makes sence for setting methods
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

// Coding Challenge #4
// Your tasks:
// 1. Re - createChallenge#3, butthistimeusingES6classes:createan'EVCl' child class of the 'CarCl' class
// 2. Makethe'charge'propertyprivate
// 3. Implementtheabilitytochainthe'accelerate'and'chargeBattery'
// methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!
// Test data:
// § Data car 1: 'Rivian' going at 120 km / h, with a charge of 23 % GOOD LUCK 😀

class CarCl4 {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} accelerates at ${this.speed} km/h`);
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} breaks at ${this.speed} km/h`);
        return this;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }

    get speedUS() {
        return this.speed / 1.6;
    }
}

class EVCl extends CarCl4 {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    accelerate = function () {
        this.speed += 20;
        this.#charge -= 1;
        console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.#charge}%`);
        return this;
    }

    chargeBattery = function (chargeTo) {
        if (chargeTo > 0) this.#charge = chargeTo;
        return this;
    }
}
const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().accelerate().brake().chargeBattery(50).accelerate();
console.log(rivian.speedUS);