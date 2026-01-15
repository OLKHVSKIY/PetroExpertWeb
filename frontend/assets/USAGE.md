# Как использовать assets

## Пути к файлам

### Из корня frontend (index.html):
```html
<!-- Изображение -->
<img src="assets/images/hero-main.jpg" alt="Описание">

<!-- Логотип -->
<img src="assets/logo/logo.png" alt="ПетроЭксперт">

<!-- Иконка -->
<img src="assets/icons/phone.svg" alt="Телефон">
```

### Из папки pages/:
```html
<!-- Используйте ../ для выхода на уровень выше -->
<img src="../assets/images/service-expertise.jpg" alt="Экспертиза">
<img src="../assets/logo/logo.png" alt="Логотип">
```

## В CSS

### Из корня frontend:
```css
.hero {
    background-image: url('assets/images/hero-bg.jpg');
}
```

### Из папки css/:
```css
.hero {
    background-image: url('../assets/images/hero-bg.jpg');
}
```

## В JavaScript

```javascript
// Динамическая загрузка изображения
const imagePath = 'assets/images/service-image.jpg';
const img = document.createElement('img');
img.src = imagePath;
```

## Примеры использования

### Логотип в header:
```html
<a href="index.html" class="header-logo">
    <img src="assets/logo/logo.png" alt="ПетроЭксперт" class="logo-img">
</a>
```

### Фоновое изображение:
```html
<section class="hero" style="background-image: url('assets/images/hero-bg.jpg');">
    <!-- Контент -->
</section>
```

### Иконка в списке:
```html
<li>
    <img src="assets/icons/check.svg" alt="" class="icon">
    <span>Текст</span>
</li>
```
