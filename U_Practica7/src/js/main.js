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
  })


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
}

setTime('.timer', deadline);


})