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

  function setTime(clockBox, end) {
    const timer = document.querySelector(clockBox),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeIntraval = setInterval(updateTime, 1000);
    
    updateTime();

    function setZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else if (num < 0) {
        return num = 0;
      } else {
        return num;
      };
    };

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


  //Modal
  const buttonsOpenModal = document.querySelectorAll('[data-modal]'),
        buttonCloseModal = document.querySelector('.modal__close'),
        modal = document.querySelector('.modal');

  buttonsOpenModal.forEach(el => el.addEventListener('click', openModal));
  const modalInterval = setTimeout(openModal, 3000);

  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);

  document.documentElement.scrollTop;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.addEventListener('click', closeModal);
    buttonCloseModal.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
    clearInterval(modalInterval);
  };

  function closeModal(e) {
    if (e.target === modal || e.target === buttonCloseModal || e.code === 'Escape') {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };


  //Card
  class Card{
    constructor(alt, scr, title, descr, cost, parentSelector, ...classes) {
      this.alt = alt;
      this.scr = scr;
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
            <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
          </div>
      `;
      this.parent.append(element);
    };
  };

  new Card(
    "vegy", 
    "img/tabs/vegy.jpg", 
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    '.menu .container',
    'menu__item'
    ).createNewCard();

  new Card(
    "elite", 
    "img/tabs/elite.jpg", 
    'Меню "Премиум"',
    'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu .container',
    'menu__item'
    ).createNewCard();

  new Card(
    "post", 
    "img/tabs/post.jpg", 
    'Меню "Постное"',
    'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu .container',
    'menu__item'
    ).createNewCard();


})