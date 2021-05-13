$(document).ready(function() {
   console.log('ready');
})


$(window).scroll(function(){
   if($(this).scrollTop()>17){
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

