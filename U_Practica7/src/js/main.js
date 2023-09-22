'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const cards = require('./modules/cards'),
        forms = require('./modules/forms'),
        modal = require('./modules/modal'),
        slider = require('./modules/slider'),
        tabs = require('./modules/tabs'),
        calc = require('./modules/calc'),
        timer = require('./modules/timer');

  cards();
  forms();
  modal();
  slider();
  tabs();
  timer();
  calc();

})