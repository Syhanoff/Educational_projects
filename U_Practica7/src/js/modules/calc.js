function calc() {
  const result = document.querySelector('.calculating__result span');
  let sex;
  let height;
  let weight;
  let age;
  let ratio;

  if(localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', ratio);
  };
  
  if(localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', sex);
  };

  function setIndicatorToLocal(selector, activeClass) {
    const indicators = document.querySelectorAll(selector);
    indicators.forEach(indicator => {
      indicator.classList.remove(activeClass);
      if(indicator.getAttribute('id') === localStorage.getItem('sex')) {
        indicator.classList.add(activeClass);
      };
      if(indicator.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        indicator.classList.add(activeClass);
      }
    })
  }

  setIndicatorToLocal('#gender div', 'calculating__choose-item_active');
  setIndicatorToLocal('.calculating__choose_big div', 'calculating__choose-item_active');
  
  function calcTotal() {
    if(!sex || !height || !weight || !age || !ratio) {
      result.innerText = '____';
      return;
    };

    if(sex === 'female') {
      result.innerText = parseInt((447.6 + (13.4 * weight) + (4.8 * height) - (5.7 * +age)) * ratio);
    } else {
      result.innerText = parseInt((88.36 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    };
  }

  calcTotal();

  function getStaticData (selector, activeClass) {
    const indicators = document.querySelectorAll(selector);
    indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        if(e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', sex);
        };
        indicators.forEach(indicator => {
          indicator.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  };

  getStaticData('#gender div', 'calculating__choose-item_active');
  getStaticData('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDinamicData(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {

      if(input.value.match(/\D/gi)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      };
      
      switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      };

      calcTotal();
    });
  };

  getDinamicData('#height');
  getDinamicData('#weight');
  getDinamicData('#age');
};

export default calc;