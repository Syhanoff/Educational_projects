'use strict';

function forms() {
  //forms
  const message = {
    sucсess: 'Спасибо, мы с вами свяжемся!',
    error: 'Ошибка. Попробуйте еще раз',
  };

  const forms = document.querySelectorAll('form');
  forms.forEach((el) => {
    bindePostData(el);
  });

  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return await result.json();
  };

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
          openModal();
          showThanksModal(message.sucсess);
        })
        .catch(() => {
          showThanksModal(message.error);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const innerModal = document.querySelector('.modal__dialog');
    innerModal.classList.add('hide');
    const thanksModal = document.createElement('div');
    thanksModal.innerHTML = `
      <div class="modal__dialog">
        <div class="modal__content">
          <div class="modal__close">&times;</div>
          <div class="modal__title">${message}</div>
        </div>
      </div>
      `;
    modal.append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      innerModal.classList.remove('hide');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }, 4000);
  };
};

module.exports = forms;
