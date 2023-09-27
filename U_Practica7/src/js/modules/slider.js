import { setZero } from './timer';

function slider({sliderContainer, slide, nextControlBtn, prevControlBtn, currentSlideIndicator, totalSlideIndicator, sliderWrapper, sliderInner}) {
  const btnPrev = document.querySelector(prevControlBtn),
        btnNext = document.querySelector(nextControlBtn),
        currentNumberSlid = document.querySelector(currentSlideIndicator),
        totalNumberSlid = document.querySelector(totalSlideIndicator),
        slideWrapper = document.querySelector(sliderWrapper),
        sliderInnerWrapper = document.querySelector(sliderInner),
        width = window.getComputedStyle(slideWrapper).width,
        slider = document.querySelector(sliderContainer),
        sliders = document.querySelectorAll(slide);

  sliderInnerWrapper.style.width = 100 * sliders.length + '%';
  sliders.forEach((slide) => {
    slide.style.width = width;
  });

  let currentIndex = 1;
  let offset = 0;
  currentNumberSlid.innerText = setZero(currentIndex);
  totalNumberSlid.innerText = setZero(sliders.length);

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
    };
    indicators.append(dot);
    dots.push(dot);
  };

  function activeDot() {
    dots.forEach((dot) => (dot.style.opacity = '.5'));
    dots[currentIndex - 1].style.opacity = 1;
  };

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

export default slider;
