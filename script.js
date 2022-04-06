'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////
//smooth scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // relative to the current viewport

  // console.log(s1coords);
  // console.log('Current scroll (x/y): ', scrollX, scrollY);
  // console.log('height/width viewport: ',
  // document.documentElement.clientHeight,
  //   document.documentElement.clientWidth);

  // scroll to
  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

  //Old school way
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth'
  // });

  // very modern, partial support on Safari
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////////
// Page navigation

// we would add the same event to all the links, but it is not an effective solution for many elements
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // we wan't to implement smooth scrolling
//     const id = this.getAttribute('href'); // the path from the html
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth'
//     });
//   })
// });

// PAGE NAVIGATION with event delegation - BEST WAY for performance. It is possible because events are fired even if there is no event listener that can capture them

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target); // the originating element
  e.preventDefault(); // we wan't to implement smooth scrolling

  // Matching strategy (find the actual element which originated the event). Usually the hardest part of event delegation
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault(); // we wan't to implement smooth scrolling
    const id = e.target.getAttribute('href'); // the path from the html
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
});

/////////////////////////////////////
// Tab Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  // const clicked = e.target // problematic when we have elements inthe button
  const clicked = e.target.closest('.operations__tab') //works when we have child elements in the button

  // a guard clause
  if (!clicked) return;

  // active tab
  const activeClassName = 'operations__tab--active';
  clicked.classList.add(activeClassName);

  // inactivate the other elements
  tabs.forEach(t => t.classList.remove(activeClassName));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  // activate content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

/// Menu fade animation
// mouseenter does not bubble, mouseover bubbles
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// sticky navigation
// this implementation is NOT effective as the scroll event fires alll the time
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky')
  else nav.classList.remove('sticky');
})


// Intersection observer API
// Now, this threshold property holds the array value even it has single value.Here, 0.2 means when the  target element(section1) is 20 % visible on our viewport(intersecting element), call this callback function. That's why isIntersecting value is true (isIntersecting: true).
// If target element is(section1) less than 20 % visible in our viewport(intersecting elemnet), the value of isIntersecting value will get false(insIntersecting: false)
// const obsOptions = {
//   root: null, // the entire viewport
//   threshold: [0, 0.2] // the percentage of intersection when the observer callback is called
// };

// // called each time the observed element is intersecting with the root element
// const obsCallback = function (entries, observer) {
//   // entries are the array of thresholds
//   entries.forEach(entry => console.log(entry));
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const stickyNav = function (entries) {
  cont[entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky');
}
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

// reveal sections

const allSections = document.querySelectorAll('.section');

const revealElements = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const sectionsObserver = new IntersectionObserver(revealElements, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((sec) => {
  sec.classList.add('section--hidden');
  sectionsObserver.observe(sec);
});

////// Lazy image loading
// we load very small images and apply a blur filter to hide how pixelized it looks. 
// than as we scroll we replace the src with the good picture

const imgTargets = document.querySelectorAll('img[data-src]'); // select all images which have property 'data-src'
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // replace the src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img));

/// SLIDER
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');


  let currSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend',
        `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`)
    });
  }

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    const y = document.querySelector(`.dots__dot[data-slide="${slide}"]`);
    y.classList.add('dots__dot--active');
  }

  const goToSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);// 0%, 100%, 200%
  }

  const nextSlide = function () {
    if (currSlide === maxSlide - 1) {
      currSlide = 0
    } else {
      currSlide++;
    }

    goToSlide(currSlide);
    activateDot(currSlide)
  }

  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlide - 1;
    } else {
      currSlide--;
    }

    goToSlide(currSlide);
    activateDot(currSlide)
  }
  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  }

  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  })

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  })
};

slider();

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////         LECTURES         ///////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////


// selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section'); // returns NodeList which is iterable
console.log(allSections);
document.getElementById('section--1'); // 

const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //it is live HTMLCollection which is different from the NodeList. If we delete a button, then the number of items in HTMLCollection will decrease. 
// NodeList does not update dynamically when the html changes

document.getElementsByClassName('btn'); // Live HTML collection

// creating and inserting elements
//.insertAdjacendHTML

const message = document.createElement('div'); // creates a dom element, not yet on the dom
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML = 'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';

//the element will be moved and cannot be on two places on the same time
// header.prepend(message); // adds as first child of the current element
header.append(message); // adds as last child of the current element 

// header.append(message.cloneNode(true)); // to clone the element 
// header.before(message); // header and message are siblings

// Delete message
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove(); // this is a newer method
  // message.parentElement.removeChild(message); // the old way of deleting element
});

// styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // this will be empty because color is specified in CSS

// get styles from CSS
console.log(getComputedStyle(message).color);

// increase the height
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);

logo.alt = 'Beautiful minimalist logo';

//non-standard
console.log(logo.designer); // undefined as it is not a standard attribute
console.log(logo.getAttribute('designer'));
console.log(logo.setAttribute('companty', 'Bankist'));

console.log(logo.src); // absolute path
logo.getAttribute('src'); // relative path

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// data attributes
console.log(logo.dataset.versionNumber);

// classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c', 'j');
logo.classList.contains('c', 'j');

// do NOT use - overrides all classes
logo.className = 'jonas';


//// events
// events always happen no matter if we handle it or not

const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the header!');

  // listen to an event once
  h1.removeEventListener('mouseenter', alertH1);
};
// addEventListener allows to add multiple functions and to remove the handler
h1.addEventListener('mouseenter', alertH1);

// the event listener can be removed at any place in the code
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//old school way
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the header!');
// };

// event propagation - capturing, target and bubbling
// this is important because when an event happens on an element, it is as if it happened to all of its parent elements.

// assign random background color to a button
// rgb(255,255,255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget); // e.target = where the event happened

//   // Stop propagation. Not often used
//   // e.stopPropagation();
// });

// // the 'click' event on the nav__link triggers the event listeners to the parent elements as well.
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Container', e.target, e.currentTarget); // currentTarget === this. The element to which the eventListener is attached
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Nav', e.target, e.currentTarget);
// }, false); // if third parameter is set to 'true' will listen for the event in the capturing phase.

// event delegation

/// DOM Traversing
// going downwards: child
console.log(h1.querySelectorAll('.highlight')); // all children of h1 in debth
console.log(h1.childNodes); // all children
console.log(h1.children); // all direct children
h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

//going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// using variables
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// goind sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // all siblings of h1
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)'
// })

// wait for the html and script to load
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML Parsed and DOM tree built!', e);
});

// when all external resources have finished loading
window.addEventListener('load', function (e) {
  console.log("Page fully loaded", e);
});

// created immediately when user is ready to call the page
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })

// Efficient script loading