// tabs
const tabs = document.getElementById('tabs');
const content = document.getElementById('contents');

const changeClass = el => {
	for(let i = 0; i < tabs.children.length; i++) {
		tabs.children[i].classList.remove('active');
	}
	el.classList.add('active');
}

tabs.addEventListener('click', e => {
	const currTab = e.target.dataset.btn
	changeClass(e.target);
	for(let i = 0; i < content.children.length; i++) {
		content.children[i].classList.remove('active');
		if(content.children[i].dataset.content == currTab) {
			content.children[i].classList.add('active')
		}
	}
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
const prev = document.getElementById('btn-prev'),
	  next = document.getElementById('btn-next'),
	  slides = document.querySelectorAll('.slide'),
	  dots = document.querySelectorAll('.dot'),
      slidesWrap = document.querySelectorAll('.slider-wrapper');

let index = 0;

const activeSlide = n => {
	for(slide of slides){
		slide.classList.remove('active');
	}
	slides[n].classList.add('active');
}

const activeDot = n => {
	for(dot of dots){
		dot.classList.remove('active');
	}
	dots[n].classList.add('active');
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

const prevSlide = () => {
	if(index == 0) {
		index = slides.length - 1;
		prepareCurrentSlide(index);
	}else {
			index--;
			prepareCurrentSlide(index);
		}	
}

dots.forEach((item, indexDot) => {
	item.addEventListener('click', () => {
		index = indexDot;
		prepareCurrentSlide(index);
	})
})

next.addEventListener('click', nextSlide)
prev.addEventListener('click', prevSlide)

const interval = setInterval(nextSlide, 2500);