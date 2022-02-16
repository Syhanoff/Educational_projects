$(document).ready(function(){

  $('.carousel__inner').slick({
    infinite: true,
    speed: 1000,
    adaptiveHeight: true,
    fade: true,
    cssEase: 'linear',
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: true,
          arrows: false,
          adaptiveHeight: false
        }
      }
    ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function() {
    $(this)
      .addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleCard (item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__box').eq(i).toggleClass('catalog-item__box_active')
      })
    })
  }

  toggleCard ('.catalog-item__link-list');
  toggleCard ('.catalog-item__link-back');


  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #modal-consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #modal-consultation, #modal-order, #modal-thanks').fadeOut('slow');
  });
  $('.catalog-item__btn').each(function(i) {
    $(this).on('click', function() {
      $('#modal-order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #modal-order').fadeIn('slow');
    });
  })

  function validForms (form) {
    $(form).validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true
      }
    },
    messages: {
      name: {
        required: 'Пожалуйста, введите свое имя'
      },
      phone: {
        required: 'Пожалуйста, введите свой номер телефона'
      },
      email: {
        required: 'Пожалуйста, введите свою почту',
        email: 'Неправильно введен адрес почты'
      }
    }
  });
  }

  validForms('#main-form');
  validForms('#order-form');
  validForms('#consultation-form');

  $("input[name=phone]").mask("+7 (999) 999-9999");

  $('form').submit(function(e) {
    e.preventDefault();
    if(!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "send.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#modal-consultation, #modal-order').fadeOut();
      $('.overlay, #modal-thanks').fadeIn('slow');
      $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1000) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });

  $("a[href=#promo]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();

});
