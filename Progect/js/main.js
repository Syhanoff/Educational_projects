// $(document).ready(function() {
// })


$(window).scroll(function(){
   if($(this).scrollTop()>1){
      $('.header-box').addClass('fixed');
      $('.header').addClass('fixed');
   }
   else if ($(this).scrollTop()<140){
      $('.header-box').removeClass('fixed');
      $('.header').removeClass('fixed');
   }
});


const anchors = document.querySelectorAll('.offer__btn-wrapper a[href="#collection"]')

for (let anchor of anchors) {
   anchor.addEventListener('click', function (e) {
   e.preventDefault()
   const blockID = anchor.getAttribute('href').substr(1)
   document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth', 
      block: 'start'
      })
   })
}


//Slides
const slidesHeader = document.querySelectorAll('.offer__slides'),
      slidesHeaderImg = document.querySelectorAll('.img__slides'),
      slidesTeam = document.querySelectorAll('.team__slides'),
      bulletHeader = document.querySelectorAll('.offer__bullets'),
      bulletTeam = document.querySelectorAll('.team__bullets'),
      btnPrev = document.getElementById('btn-prev'),
      btnNext = document.getElementById('btn-next');

let index = 0;

const activeHeaderSlide = n => {
   for(offer__slides of slidesHeader) {
      offer__slides.classList.remove('active');
   }
   slidesHeader[n].classList.add('active');
}

const activeHeaderImgSlide = n => {
   for(img__slides of slidesHeaderImg) {
      img__slides.classList.remove('active');
   }
   slidesHeaderImg[n].classList.add('active');
}

const activeHeaderBullet = n => {
   for(offer__bullets of bulletHeader) {
      offer__bullets.classList.remove('active');
   }
   bulletHeader[n].classList.add('active');
}

const prepareCurrentHeaderSlide = i => {
   activeHeaderSlide(i);
   activeHeaderImgSlide(i);
   activeHeaderBullet(i);
}

bulletHeader.forEach((item, indexBullet) => {
   item.addEventListener('click', () => {
      index = indexBullet;
      prepareCurrentHeaderSlide(index);
   })
})

const activeTeamSlide = n => {
   for(team__slides of slidesTeam) {
      team__slides.classList.remove('active');
   }
   slidesTeam[n].classList.add('active');
}

const activeTeamBullet = n => {
   for(team__bullets of bulletTeam) {
      team__bullets.classList.remove('active');
   }
   bulletTeam[n].classList.add('active');
}

const prepareCurrentTeamSlide = i => {
   activeTeamSlide(i);
   activeTeamBullet(i);
}

const nextSlide = n => {
   if(index == slidesTeam.length - 1) {
      index = 0;
      prepareCurrentTeamSlide(index);
   }  else {
      index++;
      prepareCurrentTeamSlide(index);
   }
}

const prevSlide = n => {
   if(index == 0) {
      index = slidesTeam.length - 1;
      prepareCurrentTeamSlide(index);
   }  else {
      index--;
      prepareCurrentTeamSlide(index);
   }
}

btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);

bulletTeam.forEach((item, indexBullet) => {
   item.addEventListener('click', () => {
      index = indexBullet;
      prepareCurrentTeamSlide(index);
   })
})

const interval = setInterval(nextSlide, 2500);

//Modal
const btnOpen = document.getElementById('modal-open');
const btnClose = document.getElementById('modal-close');
const modalWrap = document.getElementById('wrapper-modal');
const successBtnClose = document.getElementById('btn-close');
const modalWindow = document.querySelector('modal-window');

btnOpen.addEventListener('click', e => {
   console.log(e);
   modalWrap.classList.add('active');
})

const closModal = () => {
	modalWrap.classList.remove('active');
}

modalWrap.addEventListener('click', closModal);
btnClose.addEventListener('click', closModal);
successBtnClose.addEventListener('click', closModal);

for(let modalWindow of modalWrap.children) {
	modalWindow.addEventListener('click', event=> {
		event.stopPropagation();
	} )
}