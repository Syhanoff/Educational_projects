function cards() {
  class Card {
    constructor(scr, alt, title, descr, cost, parentSelector, ...classes) {
      this.scr = scr;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.cost = cost;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
    };

    createNewCard() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      };
      element.innerHTML = `
            <img src=${this.scr} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.cost}</span> руб/день</div>
            </div>
        `;
      this.parent.append(element);
    }
  }

  //Вариант генерации карточек через асинхронную функцию с методом fetch
  // const getCardContent = async (url) => {
  //   const result = await fetch(url);
  //   if (!result.ok) {
  //     throw new Error (`Нвозможно получить адрес: ${url}, status ответа сервера: ${result.status}`);
  //   }
  //   return await result.json();
  // }

  // getCardContent('http://localhost:3000/menu')
  // .then(data => {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     new Card(img, altimg, title, descr, price, '.menu .container').createNewCard();
  //   })
  // })

  //Вариант генерации карточек с использованием библиотеки Axios
  axios.get('http://localhost:3000/menu').then((response) => {
    response.data.forEach(({ img, altimg, title, descr, price }) => {
      new Card(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu .container'
      ).createNewCard();
    });
  });
};

export default cards;
