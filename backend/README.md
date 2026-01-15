# PetroExpert Backend

Node.js/Express API для центра независимой экспертизы ПетроЭксперт.

## Установка

```bash
npm install
```

## Настройка

1. Скопируйте `.env.example` в `.env`
2. Заполните необходимые переменные окружения
3. Убедитесь, что MongoDB запущен

## Запуск

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/auth/profile` - Профиль пользователя
- `PUT /api/auth/profile` - Обновление профиля

### Services
- `GET /api/services` - Список услуг
- `GET /api/services/:id` - Детали услуги
- `GET /api/services/category/:category` - Услуги по категории

### Orders
- `POST /api/orders` - Создать заказ
- `GET /api/orders` - Список заказов
- `GET /api/orders/:id` - Детали заказа

### Blog
- `GET /api/blog` - Список статей
- `GET /api/blog/:id` - Детали статьи

### Contact
- `POST /api/contact/form` - Отправить форму
- `POST /api/contact/callback` - Заказать звонок

## Технологии

- Node.js
- Express
- MongoDB (Mongoose)
- JWT
- Nodemailer
