# PetroExpert Frontend

Frontend приложение для центра независимой экспертизы ПетроЭксперт на чистом HTML, CSS и JavaScript.

## Структура проекта

```
frontend/
├── index.html          # Главная страница
├── pages/              # HTML страницы
│   ├── services.html
│   ├── service-detail.html
│   ├── blog.html
│   ├── blog-post.html
│   ├── about.html
│   ├── contact.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── cart.html
│   ├── favorites.html
│   └── compare.html
├── css/                # Стили
│   ├── main.css        # Основные стили
│   ├── header.css      # Стили header
│   ├── footer.css      # Стили footer
│   ├── home.css        # Стили главной страницы
│   ├── services.css    # Стили страницы услуг
│   ├── service-detail.css
│   ├── blog.css
│   ├── blog-post.css
│   ├── about.css
│   ├── contact.css
│   └── auth.css
├── js/                 # JavaScript файлы
│   ├── api.js          # API функции
│   ├── header.js       # Header компонент
│   ├── footer.js       # Footer компонент
│   ├── home.js         # Главная страница
│   ├── services.js     # Страница услуг
│   ├── service-detail.js
│   ├── blog.js
│   ├── blog-post.js
│   ├── about.js
│   ├── contact.js
│   ├── login.js
│   └── register.js
└── package.json
```

## Установка и запуск

### Вариант 1: Использование http-server

```bash
npm install
npm start
```

Приложение откроется на [http://localhost:3000](http://localhost:3000)

### Вариант 2: Использование любого статического сервера

Можно использовать любой статический сервер:
- Python: `python -m http.server 3000`
- PHP: `php -S localhost:3000`
- Live Server (VS Code extension)

## Настройка API

В файле `js/api.js` можно изменить URL API:

```javascript
const API_URL = 'http://localhost:5000/api';
```

Или установить переменную окружения перед запуском сервера.

## Технологии

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Fetch API для запросов к backend

## Особенности

- ✅ Чистый HTML/CSS/JS без фреймворков
- ✅ Адаптивный дизайн
- ✅ Модульная структура
- ✅ Разделение на отдельные файлы для каждой страницы
- ✅ Переиспользуемые компоненты (header, footer)
- ✅ API интеграция
