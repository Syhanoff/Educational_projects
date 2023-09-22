'use strict';

function modal() {
  //Modal
  const buttonsOpenModal = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  buttonsOpenModal.forEach((el) => el.addEventListener('click', openModal));
  const modalInterval = setTimeout(openModal, 15000);
  window.addEventListener('scroll', showModalByScroll);

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    };
  };

  // document.documentElement.scrollTop;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
    clearInterval(modalInterval);
  };

  function closeModal(e) {
    if (
      e.target === modal ||
      e.target.classList.contains('modal__close') ||
      e.code === 'Escape'
    ) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };
  };
};

module.exports = modal;


