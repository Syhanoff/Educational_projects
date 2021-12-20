/* Preloder */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      }); 
    });


$(function () {
/* Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });


/* Scroll Up */
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });


 /* 1. PARALLAX */
var scene = $('#scene').get(0);
var parallaxInstance = new Parallax(scene);


/* 2. TABS */
$('.nav-item').on('click', function(e) {
  e.preventDefault();
  var currTab = $(this).index();

  $('.nav-item').removeClass('active');
  $(this).addClass('active');

  $('.tab-pane').removeClass('show active');
  $('.tab-pane').eq(currTab).addClass('show active');
})


/* 3. HAMBURGER */
$('.hamburger').on('click', function() {
  $('.menu-mobile').toggleClass('d-none order-1');
});

  $('#close-btn').on('click', function() {
    $('.menu-mobile').addClass('d-none')
});


/* 4. MODALWINDOW */
$('.border-btn').on('click', function() {
  $('.wrapper-modal').fadeIn();
});

$('.wrapper-modal').on('click', function() {
  $(this).fadeOut() 
});

$('.wrapper-modal').children().on('click', function(e) {
  e.stopPropagation();
});


/* 5. SLIDER */
var swiper = new Swiper('.swiper-container', {
    loop : true,
    stopOnLastSlide : false,
    speed : 500,
    autoplay : {
        delay: 2000
    }
});


/* 6., 7. VALIDATION + FORM */
$('[data-submit]').on('click', function(e) {
    e.preventDefault();
    $(this).parent('form').submit();
})
$.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    "Please check your input."
);

function valEl(el)  {
  el.validate ({ 
    rules : {
      name : {
      required : true,
      regex : "[A-Za-z]{1,32}"
    },
    email : {
      required : true,
      email: true
    },
    phoneNumber : {
      required : true,
      digits : true,
      minlength: 10,
      maxlength: 11,
      regex : "[0-9]+"
    }
  },
  messages: {
    tel: {
      required: 'Поле обязательно для заполнения',
      regex: 'Телефон может содержать символы + - ()'
    },
    name: {
      required: 'Поле обязательно для заполнения',
    },
    email: {
      required: 'Поле обязательно для заполнения',
      regex: 'Неверный формат E-mail'
    }
  },

submitHandler: function(form) {
  $('#preloader-active').fadeIn();
  let $form = $(form);
  let $formId = $(form).attr('id');
  switch ($formId) {
    case 'modalForm':
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
      setTimeout(function() {
        $form.trigger('reset');
        $('.modal-window').fadeOut();
      }, 1000);
      setTimeout(function() {
        $('#preloader-active').fadeOut();
      }, 1400);
      setTimeout(function() {
        $('.thanks-window').fadeIn ();
      }, 1700);
    });
    break;
    case 'mainForm':
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
        $('#preloader-active').fadeOut ();
      }, 1400);
      setTimeout(function() {
        $('.wrapper-modal, .thanks-window').fadeIn ();
      }, 1700);
    });
    break;
  }
  return false;
  }
  })
};

$('.js-form').each (function () {
  valEl( $(this));
});
});
