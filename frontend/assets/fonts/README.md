# Fonts Directory

Поместите файлы шрифта Onset в эту папку:

- `Onset-Regular.woff2`
- `Onset-Regular.woff`
- `Onset-Regular.ttf`
- `Onset-Bold.woff2`
- `Onset-Bold.woff`
- `Onset-Bold.ttf`

## Как подключить шрифт

После добавления файлов шрифта, раскомментируйте блок `@font-face` в файле `css/main.css`:

```css
@font-face {
    font-family: 'Onset';
    src: url('../assets/fonts/Onset-Regular.woff2') format('woff2'),
         url('../assets/fonts/Onset-Regular.woff') format('woff'),
         url('../assets/fonts/Onset-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
```

## Текущее состояние

Пока файлы шрифта не добавлены, сайт использует шрифт Inter как fallback.

Если у вас есть другие форматы или варианты шрифта, добавьте их сюда.
