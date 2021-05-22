$(document).ready(function() {
})


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


const anchors = document.querySelectorAll('.offer-wrapper__btn-box a[href="#collection"]')

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
const slidesHeader = document.querySelectorAll('.offer-wrapper__slides'),
      slidesHeaderImg = document.querySelectorAll('.img-wrapper__slides'),
      slidesTeam = document.querySelectorAll('.team__slides'),
      bulletHeader = document.querySelectorAll('.bullet-wrapper__item_offer-color'),
      bulletTeam = document.querySelectorAll('.bullet-wrapper__item_team-color'),
      btnPrev = document.getElementById('btn-prev'),
      btnNext = document.getElementById('btn-next');

let index = 0;

const activeSlide = n => {
   for(team__slides of slidesTeam) {
      team__slides.classList.remove('active');
   }
   slidesTeam[n].classList.add('active');
}

const nextSlide = n => {
   if(index == slidesTeam.length - 1) {
      index = 0;
      activeSlide(index);
   }  else {
      index++;
      activeSlide(index);
   }
}

const prevSlide = n => {

}

btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);




// const activeSlide = n => {
//    for(slide of slides){
//       slide.classList.remove('offer-wrapper__slides_active');
//    }
//    slides[n].classList.add('offer-wrapper__slides_active');
//    }



// const swiper = new Swiper('.offer-wrapper__slider', {
//    speed: 400,
//    spaceBetween: 100,
//  });

//  const prev = document.getElementById('btn-prev'),
//  next = document.getElementById('btn-next'),


slidesWrap = document.querySelectorAll('.offer-wrapper__slider');





// const activeDot = n => {
// for(dot of dots){
//   dot.classList.remove('bullet-wrapper__item_offer-color_active');
// }
// dots[n].classList.add('bullet-wrapper__item_offer-color_active');
// }

// const prepareCurrentSlide = ind => {
// activeSlide(ind);
// activeDot(ind);
// }

// const nextSlide = () => {
// if(index == slides.length - 1) {
//   index = 0;
//   prepareCurrentSlide(index);
// }else {
//      index++;
//      prepareCurrentSlide(index);
// }	
// }

// const prevSlide = () => {
// if(index == 0) {
//   index = slides.length - 1;
//   prepareCurrentSlide(index);
// }else {
//      index--;
//      prepareCurrentSlide(index);
//   }	
// }

// dots.forEach((item, indexDot) => {
// item.addEventListener('click', () => {
//   index = indexDot;
//   prepareCurrentSlide(index);
// })
// })

// next.addEventListener('click', nextSlide)
// prev.addEventListener('click', prevSlide)

// const interval = setInterval(nextSlide, 2500);