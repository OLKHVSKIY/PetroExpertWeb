# Решение проблем

## CSS не загружается

Если CSS файлы не загружаются:

1. **Очистите кэш браузера:**
   - Chrome/Edge: `Ctrl+Shift+R` (Windows) или `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5` (Windows) или `Cmd+Shift+R` (Mac)

2. **Проверьте консоль браузера:**
   - Откройте DevTools (F12)
   - Перейдите на вкладку Console
   - Проверьте наличие ошибок загрузки CSS файлов

3. **Проверьте Network вкладку:**
   - Откройте DevTools (F12)
   - Перейдите на вкладку Network
   - Обновите страницу
   - Проверьте статус загрузки CSS файлов (должен быть 200 OK)

4. **Убедитесь, что все CSS файлы подключены:**
   - `css/main.css` - основные стили
   - `css/header.css` - стили header
   - `css/footer.css` - стили footer
   - `css/home.css` - стили главной страницы (только для index.html)

## Backend не запускается (порт занят)

Если видите ошибку `EADDRINUSE: address already in use :::5000`:

1. **Найдите процесс на порту 5000:**
   ```bash
   lsof -ti:5000
   ```

2. **Остановите процесс:**
   ```bash
   kill $(lsof -ti:5000)
   ```

3. **Или измените порт в backend/.env:**
   ```
   PORT=5001
   ```

## MongoDB не подключен

Если видите ошибку подключения к MongoDB:

1. **Убедитесь, что MongoDB запущен:**
   ```bash
   # Проверка статуса
   brew services list  # для macOS с Homebrew
   # или
   sudo systemctl status mongod  # для Linux
   ```

2. **Запустите MongoDB:**
   ```bash
   brew services start mongodb-community  # для macOS
   # или
   sudo systemctl start mongod  # для Linux
   ```

3. **Проверьте строку подключения в backend/.env:**
   ```
   MONGODB_URI=mongodb://localhost:27017/petroexpert
   ```

## Проблемы с путями к файлам

Все пути должны быть относительными:
- Из корня frontend: `css/main.css`, `js/api.js`
- Из pages/: `../css/main.css`, `../js/api.js`
