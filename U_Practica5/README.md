# Магазин детских игрушек Сhildhood

## Привет! 👋

### Описание

Посадка верстки многостраничного сайта на CMS WordPress, в рамках учебного проекта. Реализована панель администратора. Через панель: меняется графика (картинки, фото), заголовки, описания — на всех страницах сайта; изменение контактной информации; создание постов по категориям; выведение карты с адресом компании; отправка писем, защита почты от спама с помощью Google captcha V3.
В папке src исходники проекта
В папке theme готовая темя для wordpress

### Инструменты

Используется шаблон от Underscores для базовой структуры.
Для создания метаполей под конкретную страницу применен плагин Advanced Custom Fields.

#### Особенности

- исходний макет «разбит» на отдельные страницы
- стили из блока header и скрипты из footer отсавлены из статичной верстки, и перемещены в файлы header.php и footer.php (без хуков)
- контент слайдера (картинка, ссылка кнопки), отзывов (имя и сообщение), тип игрушки — разделены на рубрики. У каждой рубрики свои метаполя.

### Результат

Живой макет можно посмотреть [по ссылке](https://childhood.spacefortest.ru/).