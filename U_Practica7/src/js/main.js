'use strict';

import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import calc from './modules/calc';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {

  cards();
  forms('form', '.modal');
  modal('.modal', '[data-modal]');
  slider({
    sliderContainer: '.offer__slider',
    slide: '.offer__slide',
    prevControlBtn: '.offer__slider-prev',
    nextControlBtn: '.offer__slider-next',
    currentSlideIndicator: '#current',
    totalSlideIndicator: '#total',
    sliderWrapper: '.offer__slider-wrapper',
    sliderInner: '.offer__slider-inner'
  });
  tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  timer('.timer', 48);
  calc();

})
