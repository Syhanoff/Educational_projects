'use strict';

function slider() {
  //Slider
  const btnPrev = document.querySelector('.offer__slider-prev'),
    btnNext = document.querySelector('.offer__slider-next'),
    currentNumberSlid = document.querySelector('#current'),
    totalNumberSlid = document.querySelector('#total'),
    slideWrapper = document.querySelector('.offer__slider-wrapper'),
    sliderInnerWrapper = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slideWrapper).width,
    slider = document.querySelector('.offer__slider'),
    sliders = document.querySelectorAll('.offer__slide');

  sliderInnerWrapper.style.width = 100 * sliders.length + '%';
  sliders.forEach((slide) => {
    slide.style.width = width;
  });

  let currentIndex = 1;
  let offset = 0;
  currentNumberSlid.innerText = setZero(currentIndex);
  totalNumberSlid.innerText = setZero(sliders.length);

  function setZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else if (num < 0) {
      return num = 0;
    } else {
      return num;
    };
  };

  btnNext.addEventListener('click', () => {
    if (offset == parseInt(width) * (sliders.length - 1)) {
      offset = 0;
    } else {
      offset += parseInt(width);
    }
    sliderInnerWrapper.style.transform = `translateX(-${offset}px)`;

    if (currentIndex == sliders.length) {
      currentIndex = 1;
    } else {
      currentIndex++;
    }
    currentNumberSlid.innerText = setZero(currentIndex);

    activeDot();
  });

  btnPrev.addEventListener('click', () => {
    if (offset == 0) {
      offset = parseInt(width) * (sliders.length - 1);
    } else {
      offset -= parseInt(width);
    }
    sliderInnerWrapper.style.transform = `translateX(-${offset}px)`;

    if (currentIndex == 1) {
      currentIndex = sliders.length;
    } else {
      currentIndex--;
    }
    currentNumberSlid.innerText = setZero(currentIndex);

    activeDot();
  });

  const indicators = document.createElement('ol');
  indicators.className = 'carousel-indicators';
  slider.append(indicators);

  const dots = [];

  for (let i = 0; i < sliders.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.className = 'dot';
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function activeDot() {
    dots.forEach((dot) => (dot.style.opacity = '.5'));
    dots[currentIndex - 1].style.opacity = 1;
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      currentIndex = slideTo;
      offset = parseInt(width) * (slideTo - 1);
      sliderInnerWrapper.style.transform = `translateX(-${offset}px)`;
      currentNumberSlid.innerText = setZero(currentIndex);
      activeDot();
    });
  });
};

module.exports = slider;
