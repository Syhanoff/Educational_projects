const anInitialFee = document.getElementById('an-initial-fee'),
      anInitialFeeRange = document.getElementById('an-initial-fee-range'),
      creditTerm = document.getElementById('credit-term'),
      creditTermRange = document.getElementById('credit-term-range'),
      amountOfCredit = document.getElementById('amount-of-credit'),
      monthlyPayment = document.getElementById('monthly-payment'),
      engine = document.getElementById('engine'),
      complectation = document.getElementById('complectation'),
      inputsRange = document.querySelectorAll('.input-range'),
      openConfigureButton = document.getElementById('open-configure'),
      overlay = document.getElementById('overlay'),
      wrapperModal = document.getElementById('wrapper-modal'),
      saveConfiguration = document.getElementById('saveConfiguration'),
      cancelConfiguration = document.getElementById('cancelConfiguration'),
      cars = document.querySelectorAll('.car'),
      dots = document.querySelectorAll('.dot'),
      additionalAmount = document.getElementById('additionalAmount'),
      priceOfAuto = document.querySelectorAll('.price-auto'),
      totalPriceOfAuto = document.getElementById('total-price-of-auto'),
      priceInformation = document.querySelector('.start-price');

const percent = 11.5,
      initialPrice = 500000;

let addTotalPrice = 0;

const pricesOfColors = {
  blue: 0,
  red: 5000,
  pink: 6000,
  orange: 7000,
  brown: 8000
};
let currentPriceOfColor = pricesOfColors.blue;


function equateValues() {
  anInitialFee.value = anInitialFeeRange.value;
  creditTerm.value = creditTermRange.value;
  calculation(anInitialFee.value, creditTerm.value);
}


inputsRange.forEach(el => {
  el.addEventListener('input', equateValues)
})


openConfigureButton.addEventListener('click', openConfigureModal);


function openConfigureModal() {
  wrapperModal.classList.add('active');
  overlay.addEventListener('click', clouseConfigureModal);
  cancelConfiguration.addEventListener('click', clouseConfigureModal);
  saveConfiguration.addEventListener('click', clouseConfigureModal);
  colorСhoice();
  engine.addEventListener('change', finalPriceOfComplectation);
  complectation.addEventListener('change', finalPriceOfComplectation);
  saveConfiguration.addEventListener('click', finalPriceOfComplectation);
}


function clouseConfigureModal() {
  wrapperModal.classList.remove('active');
  overlay.removeEventListener('click', clouseConfigureModal);
  cancelConfiguration.removeEventListener('click', clouseConfigureModal);
  saveConfiguration.removeEventListener('click', clouseConfigureModal);
}


additionalAmount.innerText = addTotalPrice;
priceOfAuto.forEach(el => {
  el.innerText = initialPrice;
})


function colorСhoice() {
  for(let dot of dots) {
    dot.addEventListener('click', e => {
      cars.forEach(el => {
        if (e.target.dataset.color === el.dataset.color) {
          for(let car of cars) {
            car.classList.remove('active');
          }
          for(let dot of dots) {
            dot.classList.remove('active')
          }
          e.target.classList.add('active');
          el.classList.add('active');
          currentPriceOfColor = pricesOfColors[`${e.target.dataset.color}`];
          finalPriceOfComplectation();
        }
      })
    })
  }
}


function finalPriceOfComplectation() {
  addTotalPrice = +engine.value + +complectation.value + currentPriceOfColor;
  additionalAmount.innerText = addTotalPrice;
  calculation(anInitialFee.value, creditTerm.value);
} 


function calculation(anInitialFee = 100000, creditTerm = 1) {
  const amountPercents = (((initialPrice + addTotalPrice) - anInitialFee) * percent) / 100;
  const totalPriceOfCredit = ((initialPrice + addTotalPrice) - anInitialFee) + amountPercents;
  const numberOfMonth = 12 * creditTerm;
  const monthlyPayments = totalPriceOfCredit / numberOfMonth;
  if(totalPriceOfCredit < 0) {
    return false;
  } else {
    amountOfCredit.innerText = Math.round(amountPercents);
    monthlyPayment.innerText = Math.round(monthlyPayments);
    if(addTotalPrice === 0) {
      priceInformation.innerHTML = `Стоимость машины без допов: ${initialPrice} ₽`
    } else {
      priceInformation.innerHTML = `Стоимость машины с учетом выбранных допов: ${addTotalPrice + initialPrice} ₽`
    }
  }
}

calculation();