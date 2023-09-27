import { postData } from '../services/services';

function forms(formSelector, modalSelector) {
  const modal = document.querySelector(modalSelector);
  const forms = document.querySelectorAll(formSelector);

  const message = {
    sucсess: 'Спасибо, мы с вами свяжемся!',
    error: 'Ошибка. Попробуйте еще раз',
  };

  forms.forEach((el) => {
    bindePostData(el);
  });

  function bindePostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      //запрос на методе XMLHttpRequest
      // const request = new XMLHttpRequest();
      // request.open('POST', 'http://localhost:3000/requests');
      // request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
      // const formData = new FormData(form);
      // const obj = {};
      // formData.forEach((value, key) => {
      //   obj[key] = value;
      // });
      // const json = JSON.stringify(obj);
      // request.send(json);
      // request.addEventListener('load', () => {
      //   if(request.status === 200) {
      //     console.log(request.response);
      //     openModal();
      //     showThanksModal(message.sucсess);
      //   } else {
      //     showThanksModal(message.error);
      //   }
      //   form.reset();
      // })

      // запрос на методе fetch
      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then((response) => {
          console.log(response);
          showThanksModal(message.sucсess);
        })
        .catch(() => {
          showThanksModal(message.error);
        })
        .finally(() => {
          form.reset();
        });
    });
  };

  function showThanksModal(message) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const innerModal = document.querySelector('.modal__dialog');
    const thanksModal = document.createElement('div');
    thanksModal.innerHTML = `
      <div class="modal__dialog">
        <div class="modal__content">
          <div class="modal__close">&times;</div>
          <div class="modal__title">${message}</div>
        </div>
      </div>
      `;
    innerModal.replaceWith(thanksModal);
    setTimeout(() => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      thanksModal.replaceWith(innerModal)
    }, 4000);
  };
};

export default forms;
