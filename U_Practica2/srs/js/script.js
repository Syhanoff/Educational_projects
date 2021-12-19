window.addEventListener('DOMContentLoaded', () => {
   const menu = document.querySelector('.header-nav__items'),
         menuItem = document.querySelectorAll('.header-nav__item'),
         hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
   hamburger.classList.toggle('hamburger_active');
       menu.classList.toggle('header-nav__items_active');
});

   menuItem.forEach(item => {
       item.addEventListener('click', () => {
           hamburger.classList.toggle('hamburger_active');
           menu.classList.toggle('header-nav__items_active');
       })
   })
})
