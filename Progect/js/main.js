// $(document).ready(function() {
// })


// Sticky menu
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


// Anchor link
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


// Validate


$('[data-submit]').on('click', function(e) {
   e.preventDefault();
   $(this).parent('form').submit();
})

$.validator.addMethod("regex", function(value, element, regexp) {
   var regExsp = new RegExp(regexp);
   return regExsp.test(value);
},"Пожалуйста, проверьте поле ввода"
);

$('form').validate({
   rules : {
      name : {
         required : true,
         regex : "[A-Za-z]{1,32}"
         },
      email : {
         required : true,
         email: true
         },
      phone : {
         required : true,
         digits : true,
         minlength: 10,
         maxlength: 11,
         regex : "[0-9]+"
         }
      },
   messages: {
      name: {
         required: 'Поле обязательно для заполнения',
         },
      tel: {
         required: 'Поле обязательно для заполнения',
         regex: 'Телефон может содержать символы + - ()'
         },
      email: {
         required: 'Поле обязательно для заполнения',
         email: 'Неверный формат E-mail'
         }
      },
      submitHandler: function(form) {
         var $form = $(form);
         var $formId = $(form).attr('id');
         switch ($formId) {
            case'form1':
               $.ajax({
                  type: 'POST',
                  url: $form.attr('action'),
                  data: $form.serialize()
               })
               .done(function() {
                  console.log('Success');
               })
               .fail(function() {
                  console.log('Fail');
               })
               .always(function() {
                  console.log('Always');
                  setTimeout(function() {
                     $form.trigger('reset');
                     $('.modal-window').fadeOut();
                     }, 1000);
                  setTimeout(function() {
                     $('#message').fadeIn();
                     }, 1500);
                  setTimeout(function() {
                     $('.wrapper-modal, .success-window').fadeIn ();
                     }, 1700);
               });
            break;
         }
      return false;
   }
   });


