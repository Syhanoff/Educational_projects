'use strict';

function timer() {
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
};

module.exports = timer;