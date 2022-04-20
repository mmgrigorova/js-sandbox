'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const url = 'https://restcountries.com/v3.1/';
///////////////////////////////////////
// old school way
const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        renderCountry(data);
    });
};

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('bulgaria');
// getCountryData('germany');


const renderCountry = function (data, className = '') {
    const languages = Object.values(data.languages);
    const currencies = Object.values(data.currencies);

    const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${currencies[0].name}</p>
          </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = function (country) {
    // ajax call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);

        // render country 1
        renderCountry(data);

        // get country 2
        const [neighbour] = data.borders;

        if (!neighbour) return;

        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
        request2.send();

        // Callback HELL
        request2.addEventListener('load', function () {
            const [data2] = JSON.parse(this.responseText);
            renderCountry(data2, 'neighbour');
        });

    });
};

// getCountryAndNeighbour('usa');

// callback hell
// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//         console.log('2 seconds passed');
//         setTimeout(() => {
//             console.log('3 seconds passed');
//         }, 1000);
//     }, 1000);
// }, 1000);

///////////////////////////////////////////
// Promises and Fetch API - since ES6
///////////////////////////////////////////

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();
const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
}

const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request); // a promise


// const getCountryDataPr = function (country) {
//     // country 1
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(response => {

//         })// a new promise
//         .then(data => {
//             renderCountry(data[0]);
//             const neighbour = data[0].borders[0];

//             if (!neighbour) return;

//             //country 2
//             return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`); // whatever is returned is the fullfilled value of the promise
//         })
//         .then(response => {
//             // manually reject a promise
//             if (!response.ok) {
//                 throw new Error(`Country not found (${response.status})`);
//             }
//             return response.json()
//         })
//         .then(data => renderCountry(data[0], 'neighbour'))
//         .catch(err => {
//             console.error(`${err} 💥`)
//             renderError(`Something went wrong 💥 ${err.message}`)
//         })// catchces any arrors which occured. The rejections is usually when there is no internet connection. Otherwise status codes are considered as fulfilled.
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//         });
// }
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        // manually reject a promise
        if (!response.ok) {
            throw new Error(`${errorMsg} (${response.status})`);
        }

        return response.json();
    });
};
const getCountryDataPr = function (country) {
    // country 1
    const json = getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Could not get country');
    console.log(json);
    json.then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];

        if (!neighbour) throw new Error('No neighbout found!');

        //country 2
        return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Could not get country')
    })
        .then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => {
            console.error(`${err} 💥`)
            renderError(`Something went wrong 💥 ${err.message}`)
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
}


// btn.addEventListener('click', function () {
//     getCountryDataPr('germany');
//     // getCountryDataPr('sdss'); // 404
// })
// getCountryDataPr('germany');

// Coding Challenge #1
// In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates.For that, you will use a second API to geocode coordinates.So in this challenge, you’ll use an API on your own for the first time 😁
// Your tasks:
// PART 1
// 1. Createafunction'whereAmI'whichtakesasinputsalatitudevalue('lat') and a longitude value('lng')(these are GPS coordinates, examples are in test data below).
// 2. Do“reversegeocoding”oftheprovidedcoordinates.Reversegeocodingmeans to convert coordinates to a meaningful location, like a city and country name.Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do not use the 'getJSON' function we created, that is cheating 😉
// 3. Onceyouhavethedata, takealookatitintheconsoletoseealltheattributes that you received about the provided location.Then, using this data, log a message like this to the console: “You are in Berlin, Germany”
// 4. Chaina.catchmethodtotheendofthepromisechainandlogerrorstothe console
// 5. ThisAPIallowsyoutomakeonly3requestspersecond.Ifyoureloadfast, you will get this error with code 403. This is an error with the request.Remember, fetch() does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message
// PART 2
// 6. Nowit'stimetousethereceiveddatatorenderacountry.Sotaketherelevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Renderthecountryandcatchanyerrors, justlikewehavedoneinthelast lecture(you can even copy this code, no need to type the same code)
//       The Complete JavaScript Course 30
// Test data:
// § Coordinates 1: 52.508, 13.381(Latitude, Longitude) § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK 😀

// const whereAmI = function (lat, lng) {
//     const location = fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//         .then(res => {
//             if (!res.ok) throw new Error(`You have only 3 requests per second allowed.`);
//             return res.json();
//         })
//         .then(data => {
//             console.log(`You are in ${data.city}, ${data.country}`);
//             getCountryDataPr(data.country.toLowerCase());
//         }).catch(err => console.error(`There was something wrong - ${err.message}`))
// }

// whereAmI(52.508, 13.381);
// whereAmI(-33.933, 18.474);
// whereAmI(19.037, 72.873);

// console.log('Test start');

// setTimeout(() => console.log('0 sec timer'), 0); // these 0 seconds are not a guarantee because they may be blocked by a long taking microtask

// immediately resolved promise
// Promise.resolve('Resolve promise 1')
//     .then(res => console.log(res));

// Promise.resolve('Resolve promise 2')
//     .then(res => {
//         for (let index = 0; index < 100000; index++) { }
//         console.log(res);
//     })

// console.log('Test end');

// expected: top level code will be executed first
// test start
// test end 
// resolve promise 1
// 0 sec timer

// build promise
// argument is executor function
// const lotteryPromise = new Promise(function (resolve, reject) {
//     console.log('Lottery draw is happening 🔮');

//     setTimeout(function () {
//         if (Math.random() >= 0.5) {
//             resolve('You WIN 💰');
//         } else {
//             reject(new Error('You lost your money 💩'));
//         }
//     }, 2000)
// });

// consuming promise
// lotteryPromise
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

// promisifying - replacing callback functions with promises
// promisifying setTimeout
const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

// wait(1)
//     .then(() => {
//         console.log('I waited for 1 seconds');
//         return wait(1);
//     })
//     .then(() => console.log('I waited for 2 second'))

// callback hell
// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//         console.log('2 seconds passed');
//         setTimeout(() => {
//             console.log('3 seconds passed');
//         }, 1000);
//     }, 1000);
// }, 1000);

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject('Problem!!').catch(x => console.error(x));


// navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.log(err));

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err));
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

// getPosition().then(pos => console.log(pos));

// promisifying 
const whereAmI = function () {
    getPosition().then(pos => {
        const { latitude: lat, longitude: lng } = pos.coords;

        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
        .then(res => {
            if (!res.ok) throw new Error(`You have only 3 requests per second allowed.`);
            return res.json();
        })
        .then(data => {
            console.log(`You are in ${data.city}, ${data.country}`);
            getCountryDataPr(data.country.toLowerCase());
        }).catch(err => console.error(`There was something wrong - ${err.message}`))
}

btn.addEventListener('click', whereAmI);

// Coding Challenge #2
// For this challenge you will actually have to watch the video! Then, build the image loading functionality that I just showed you on the screen.
// Your tasks:
// Tasks are not super- descriptive this time, so that you can figure out some stuff by yourself.Pretend you're working on your own 😉
// PART 1
// 1. Createafunction'createImage'whichreceives'imgPath'asaninput.This function returns a promise which creates a new image(use document.createElement('img')) and sets the.src attribute to the provided image path
// 2. Whentheimageisdoneloading, appendittotheDOMelementwiththe 'images' class, and resolve the promise.The fulfilled value should be the image element itself.In case there is an error loading the image(listen for the'error' event), reject the promise
// 3. Ifthispartistootrickyforyou, justwatchthefirstpartofthesolution
// PART 2
// 4. Consumethepromiseusing.thenandalsoaddanerrorhandler
// 5. Aftertheimagehasloaded, pauseexecutionfor2secondsusingthe'wait'
// function we created earlier
// 6. Afterthe2secondshavepassed, hidethecurrentimage(setdisplayCSS
// property to 'none'), and load a second image(Hint: Use the image element returned by the 'createImage' promise to hide the current image.You will need a global variable for that 😉)
// 7. Afterthesecondimagehasloaded, pauseexecutionfor2secondsagain
// 8. Afterthe2secondshavepassed, hidethecurrentimage
// Test data: Images in the img folder.Test the error handler by passing a wrong image path.Set the network speed to “Fast 3G” in the dev tools Network tab, otherwise images load too fast
// GOOD LUCK 😀

// const imgContainer = document.querySelector('.images');
// const createImage = function (imgPath) {
//     return new Promise(function (resolve, reject) {
//         const img = document.createElement('img');
//         img.src = imgPath;

//         img.addEventListener('load', function () {
//             imgContainer.append(this);
//             resolve(this);
//         });

//         img.addEventListener('error', () =>
//             reject(new Error('Image not found')));
//     });
// }

// let currImg = '';
// createImage('img/img-1.jpg')
//     .then(img => {
//         currImg = img;
//         return wait(2);
//     })
//     .then(() => {
//         currImg.style.display = 'none';
//         return createImage('img/img-2.jpg')
//     })
//     .then(img => {
//         currImg = img;
//         return wait(2);
//     })
//     .then(() => currImg.style.display = 'none')
//     .catch(err => console.log('Image not found'));

// createImage('img/img-4.jpg');

// ES 2017 - async/await - sintactic sugar over promises and then()
// stops an execution in an async function which runs in the background
// the resolved value of the promise
const whereAmI2 = async function () {
    try {
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

        // this error will be handled by the catch block
        if (!resGeo.ok) throw new Error('Problem getting country 💥');

        const dataGeo = await resGeo.json();

        // console.log(dataGeo);
        // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res))

        const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
        const data = await res.json();
        // console.log(data);
        renderCountry(data[0]);

        // this will be the fullfilled value of the promise
        return `You are in ${dataGeo.city}`;
    } catch (err) {
        console.error(err.message);
        renderError(err.message);

        // reject promise returned from async function
        throw err;
    }
}


console.log('1: Will get location');
// const city = whereAmI2();
// console.log(city);
// whereAmI2();
// this approach is mixing the old and the new (async/await with then/catch)
// whereAmI2()
//     .then(city => console.log(`2: ${city}`))
//     .catch(`2: ${err} 💥`)
//     .finally(() => console.log('3: Finished getting location'));

//using only new with IFFEs
(async function () {
    try {
        // const city = await whereAmI2();
        // console.log(`2: ${city}`);
    }
    catch (err) {
        console.log(`${err.message} 💣`);
    }
    console.log('3: Finished getting location');
})();

// try {
//     let y = 1;
//     const x = 2;
//     x = 3;
// } catch (err) {
//     alert(err.message);
// }

const get3Countries = async function (c1, c2, c3) {
    try {
        // here we run them in sequence which doesn't have much sense
        // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
        // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
        // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
        // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);

        // paralel running of promises - with a combinator
        // if one promise rejects, then all reject
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v3.1/name/${c1}`),
            getJSON(`https://restcountries.com/v3.1/name/${c2}`),
            getJSON(`https://restcountries.com/v3.1/name/${c3}`)
        ]);
        console.log(data.map(c => c[0].capital[0]));

    }
    catch (err) {
        console.error(err);
    }
};

// get3Countries('moldova', 'ukraine', 'bulgaria');

// Promise.race - settled as soon as one promise is settled
// useful for preventing very long promises
(async function () {
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v3.1/name/italy`),
        getJSON(`https://restcountries.com/v3.1/name/mexico`),
        getJSON(`https://restcountries.com/v3.1/name/egypt`)
    ])
    console.log(res[0].name);
}
)();

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error('Request timed out'))
        }, sec * 1000)
    })
};

// useful when we want to prevent a very long promise run. Race against a timeout
// Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     timeout(0.1)
// ]).then(res => console.log(res[0]))
//     .catch(err => console.log(err));

// Promise.allSettled - returns array of all promises
// es2020
// Promise.allSettled([
//     Promise.resolve('Success'),
//     Promise.reject('Reject'),
//     Promise.resolve('Success')
// ]).then(res => console.log(res))
//     .catch(err => console.log(err));

// Promise.any - returns a successful promise
// Promise.any([
//     Promise.resolve('Success'),
//     Promise.reject('Reject'),
//     Promise.resolve('Success')
// ]).then(res => console.log(res))
//     .catch(err => console.log(err));


//     Coding Challenge #3
// Your tasks:
// PART 1
// 1. Writeanasyncfunction'loadNPause'thatrecreatesChallenge#2, thistime using async / await(only the part where the promise is consumed, reuse the 'createImage' function from before)
// 2. Comparethetwoversions, thinkaboutthebigdifferences, andseewhichone you like more
// 3. Don'tforgettotesttheerrorhandler,andtosetthenetworkspeedto“Fast3G” in the dev tools Network tab
// PART 2
// 1. Createanasyncfunction'loadAll'thatreceivesanarrayofimagepaths 'imgArr'
// 2. Use.maptoloopoverthearray, toloadalltheimageswiththe 'createImage' function (call the resulting array 'imgs')
// 3. Checkoutthe'imgs'arrayintheconsole!Isitlikeyouexpected ?
//     4. Useapromisecombinatorfunctiontoactuallygettheimagesfromthearray😉
// 5. Addthe'parallel'classtoalltheimages(ithassomeCSSstyles)
// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img- 3.jpg'].To test, turn off the 'loadNPause' function
//     GOOD LUCK 😀


const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function () {
            imgContainer.append(this);
            resolve(this);
        });

        img.addEventListener('error', () =>
            reject(new Error('Image not found')));
    });
}

// Promise with then and catch
let currImg = '';
// createImage('img/img-1.jpg')
//     .then(img => {
//         currImg = img;
//         return wait(2);
//     })
//     .then(() => {
//         currImg.style.display = 'none';
//         return createImage('img/img-2.jpg')
//     })
//     .then(img => {
//         currImg = img;
//         return wait(2);
//     })
//     .then(() => currImg.style.display = 'none')
//     .catch(err => console.log('Image not found'));


// async/await option version
const loadNPause = async function () {
    try {
        let currImg = await createImage('img/img-1.jpg');
        await wait(2);
        currImg.style.display = 'none';

        currImg = await createImage('img/img-2.jpg');
        await wait(2);
        currImg.style.display = 'none';

    } catch (err) {
        console.err(err, ' 💥');
    }
}

// loadNPause();

const loadAll = async function (imgArr) {
    const imgs = imgArr.map(createImage); // array of promises
    const imgEls = await Promise.all(imgs); // array of images
    imgEls.forEach(i => i.classList.add('parallel'));

    // combinesd into 1 line but worse readability
    // const imgs = await Promise.all(imgArr.map(path => createImage(path)));
    // imgs.forEach(i => i.classList.add('parallel'));
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);