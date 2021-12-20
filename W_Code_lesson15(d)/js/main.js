// tabs
const tabsBtns = document.querySelectorAll('.tab-btn');
const tabsContents = document.querySelectorAll('.tab-content');

const changeClassActiveTab = el => {
	for(let i = 0; i < tabsBtns.length; i++) {
		tabsBtns[i].classList.remove('active');
	}
	el.classList.add('active');
}

tabsBtns.forEach((btn, index) => {
	btn.addEventListener('click', e => {
		changeClassActiveTab(e.target);
		let currentIndex = index + 1;
		for(i = 0; i < tabsContents.length; i++) {
		tabsContents[i].classList.remove('active');
		if(tabsContents[i].dataset.content == currentIndex) {
			tabsContents[i].classList.add('active')
			}
		}
	})
})





// modal
const btnOpen = document.getElementById('btn-open');
const btnClose = document.getElementById('btn-close');
const modalWrap = document.getElementById('wrapper-modal');
const modalWindow = document.querySelector('modal-window');

btnOpen.addEventListener('click', () => {
	modalWrap.classList.add('active');
})

const closModal = () => {
	modalWrap.classList.remove('active');
}

modalWrap.addEventListener('click', closModal);
btnClose.addEventListener('click', closModal);

for(let modalWindow of modalWrap.children) {
	modalWindow.addEventListener('click', event=> {
		event.stopPropagation();
	} )
}


// slides
const prevBtn = document.getElementById('btn-prev'),
	  nextBtn = document.getElementById('btn-next'),
	  slides = document.querySelectorAll('.slides'),
	  dotsBtn = document.querySelectorAll('.dot'),
      slidesWrap = document.querySelectorAll('.slider-wrapper');

let index = 0;

const activeSlide = n => {
	for(slide of slides){
		slide.classList.remove('active');
	}
	slides[n].classList.add('active');
}

const activeDot = n => {
	for(dot of dotsBtn){
		dot.classList.remove('active');
	}
	dotsBtn[n].classList.add('active');
}

const prepareCurrentSlide = ind => {
	activeSlide(ind);
	activeDot(ind);
}

const nextSlide = () => {
	if(index == slides.length - 1) {
		index = 0;
		prepareCurrentSlide(index);
	}else {
			index++;
			prepareCurrentSlide(index);
	}	
}

console.log(nextSlide);


const prevSlide = () => {
	if(index == 0) {
		index = slides.length - 1;
		prepareCurrentSlide(index);
	}else {
			index--;
			prepareCurrentSlide(index);
		}	
}

dotsBtn.forEach((item, indexDot) => {
	item.addEventListener('click', () => {
		index = indexDot;
		prepareCurrentSlide(index);
	})
})

nextBtn.addEventListener('click', nextSlide)
prevBtn.addEventListener('click', prevSlide)

const interval = setInterval(nextSlide, 2500);



