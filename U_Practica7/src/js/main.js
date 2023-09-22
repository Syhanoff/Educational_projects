'use strict';

window.addEventListener('DOMContentLoaded', () => {


  //tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsWrapper = document.querySelector('.tabheader__items'),
        tabContent = document.querySelectorAll('.tabcontent');

  function hideTabContent() {
    tabContent.forEach(item => item.style.display = 'none');
    tabs.forEach(tab => tab.classList.remove('tabheader__item_active'));
  }
  hideTabContent();
  
  function activeTabAndShowContent(i = 0) {
    tabContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }
  activeTabAndShowContent();

  tabsWrapper.addEventListener('click', (event) => {
    if(event.target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if(event.target == tab) {          
          hideTabContent();
          activeTabAndShowContent(i);
        }
      })
    }
  });


  //Timer
  // const deadline = '2023-09-03';
  const date = new Date();
  const deadline = date.setHours(48);

  function getRestTime(end) {
    const difference = end - new Date(),
          days = Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours = Math.floor(((difference / (1000 * 60 * 60)) % 24)),
          minutes = Math.floor((difference / (1000 * 60)) % 60),
          seconds = Math.floor((difference / 1000) % 60);

    return {
      difference,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function setZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else if (num < 0) {
      return num = 0;
    } else {
      return num;
    };
  };

  function setTime(clockBox, end) {
    const timer = document.querySelector(clockBox),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeIntraval = setInterval(updateTime, 1000);
    
    updateTime();


    function updateTime() {
      const returnTime = getRestTime(end);
      days.innerText = setZero(returnTime.days);
      hours.innerText = setZero(returnTime.hours);
      minutes.innerText = setZero(returnTime.minutes);
      seconds.innerText = setZero(returnTime.seconds);
      
      if (returnTime.difference <= 0) {
        clearInterval(timeIntraval);
        
      };
    };
  };

  setTime('.timer', deadline);


  //Card
  class Card{
    constructor(scr, alt, title, descr, cost, parentSelector, ...classes) {
      this.scr = scr;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.cost = cost;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
    };
    
    createNewCard() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      };

      element.innerHTML = `
          <img src=${this.scr} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.cost}</span> руб/день</div>
          </div>
      `;
      this.parent.append(element);
    };
  };


  //Вариант генерации карточек через асинхронную функцию с методом fetch
  // const getCardContent = async (url) => {
  //   const result = await fetch(url);
  //   if (!result.ok) {
  //     throw new Error (`Нвозможно получить адрес: ${url}, status ответа сервера: ${result.status}`);
  //   }
  //   return await result.json();
  // }

  // getCardContent('http://localhost:3000/menu')
  // .then(data => {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     new Card(img, altimg, title, descr, price, '.menu .container').createNewCard();
  //   })
  // })


  //Вариант генерации карточек с использованием библиотеки Axios
  axios.get('http://localhost:3000/menu')
  .then(response => {
    response.data.forEach(({img, altimg, title, descr, price}) => {
      new Card(img, altimg, title, descr, price, '.menu .container').createNewCard();
    });
  });


  //Modal
  const buttonsOpenModal = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

  buttonsOpenModal.forEach(el => el.addEventListener('click', openModal));
  const modalInterval = setTimeout(openModal, 15000);
  window.addEventListener('scroll', showModalByScroll);
  
  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };
  
  // document.documentElement.scrollTop;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
    clearInterval(modalInterval);
  };

  function closeModal(e) {
    if (e.target === modal || e.target.classList.contains('modal__close') || e.code === 'Escape') {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };
  

  //forms
  const message = {
    sucсess: 'Спасибо, мы с вами свяжемся!',
    error: 'Ошибка. Попробуйте еще раз',
  }

  const forms = document.querySelectorAll('form');
  forms.forEach(el => {
    bindePostData(el);
  })
  
  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
    return await result.json();
  }


  function bindePostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      //запрос на методе XMLHttpRequest
      // const request = new XMLHttpRequest();
      // request.open('POST', 'http://localhost:3000/requests');
      // request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
      // const formData = new FormData(form);
      // const obj = {};
      // formData.forEach((value, key) => {
      //   obj[key] = value;
      // });
      // const json = JSON.stringify(obj);
      // request.send(json);
      // request.addEventListener('load', () => {
      //   if(request.status === 200) {
      //     console.log(request.response);
      //     openModal();
      //     showThanksModal(message.sucсess);
      //   } else {
      //     showThanksModal(message.error);
      //   }
      //   form.reset();
      // })

      // запрос на методе fetch
      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
      .then(response => {
        console.log(response);
        openModal();
        showThanksModal(message.sucсess);
      })
      .catch(() => {
        showThanksModal(message.error);
      })
      .finally(() => {
        form.reset();
      })
    })
  }

  function showThanksModal(message) {
    const innerModal = document.querySelector('.modal__dialog');
    innerModal.classList.add('hide');
    const thanksModal = document.createElement('div');
    thanksModal.innerHTML = `
    <div class="modal__dialog">
      <div class="modal__content">
        <div class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    </div>
    `;
    modal.append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      innerModal.classList.remove('hide');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }, 4000);
  }

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
  sliders.forEach(slide => {
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
    };
    sliderInnerWrapper.style.transform = `translateX(-${offset}px)`;

    if (currentIndex == sliders.length) {
      currentIndex = 1;
    } else {
      currentIndex++;
    };
    currentNumberSlid.innerText = setZero(currentIndex);

    activeDot();
  })

  btnPrev.addEventListener('click', () => {
    if (offset == 0) {
      offset = parseInt(width) * (sliders.length - 1);
    } else {
      offset -= parseInt(width);
    };
    sliderInnerWrapper.style.transform = `translateX(-${offset}px)`;

    if (currentIndex == 1) {
      currentIndex = sliders.length;
    } else {
      currentIndex--;
    };
    currentNumberSlid.innerText = setZero(currentIndex);

    activeDot();
  });

  const indicators = document.createElement('ol');
  indicators.className = 'carousel-indicators';
  slider.append(indicators);
  
  const dots = [];
  
  for (let i = 0; i < sliders.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1)
    dot.className = 'dot';
    if (i == 0) {
      dot.style.opacity = 1;
    };
    indicators.append(dot);
    dots.push(dot);
  };

  function activeDot() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[currentIndex - 1].style.opacity = 1;
  };

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      currentIndex = slideTo;
      offset = parseInt(width) * (slideTo - 1);
      sliderInnerWrapper.style.transform = `translateX(-${offset}px)`;
      currentNumberSlid.innerText = setZero(currentIndex);
      activeDot();
    });
  });

  //Calc

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
})