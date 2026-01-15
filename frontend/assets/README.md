# Assets - Ресурсы сайта

Эта папка содержит все статические ресурсы сайта: изображения, иконки, логотипы.

## Структура

```
assets/
├── images/     # Изображения для страниц (hero, услуги, блог и т.д.)
├── icons/      # Иконки для интерфейса
└── logo/       # Логотипы компании
```

## Использование

### В HTML:
```html
<img src="assets/images/hero-bg.jpg" alt="Описание">
<img src="assets/logo/logo.png" alt="Логотип">
```

### В CSS:
```css
background-image: url('../assets/images/hero-bg.jpg');
```

### В JavaScript:
```javascript
const logoPath = 'assets/logo/logo.png';
```

## Рекомендации по именованию

- **Изображения страниц**: `page-name-image.jpg` (например: `hero-main.jpg`, `service-expertise.jpg`)
- **Иконки**: `icon-name.svg` или `icon-name.png` (например: `icon-phone.svg`)
- **Логотипы**: `logo.png`, `logo-white.png`, `logo-icon.png`

## Форматы

- **Изображения**: JPG, PNG, WebP
- **Иконки**: SVG (предпочтительно), PNG
- **Логотипы**: SVG, PNG

## Оптимизация

Перед загрузкой на сайт рекомендуется:
- Оптимизировать изображения (сжать без потери качества)
- Использовать WebP для фотографий
- Использовать SVG для иконок и логотипов
- Указывать правильные размеры в HTML/CSS
