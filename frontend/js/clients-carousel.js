// Clients Carousel Script
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('clientsCarousel');
    const prevBtn = document.getElementById('clientsPrev');
    const nextBtn = document.getElementById('clientsNext');
    
    if (!carousel) return;

    // Список логотипов клиентов
    const clientLogos = [
        'https://logo.svgcdn.com/devicon/aftereffects-original.png',
        'https://logo.svgcdn.com/logos/adonisjs.png',
        'https://logo.svgcdn.com/logos/android.png',
        'https://logo.svgcdn.com/logos/apple.png',
        'https://logo.svgcdn.com/devicon/apex-original.png',
        'https://logo.svgcdn.com/logos/astro.png',
        'https://logo.svgcdn.com/logos/bash.png',
        'https://logo.svgcdn.com/logos/behance.png',
        'https://logo.svgcdn.com/logos/blender.png',
        'https://logo.svgcdn.com/devicon/cloudflare-original-wordmark.png'
    ];

    // Генерируем HTML для логотипов
    const logosHTML = clientLogos.map((logo) => `
        <div class="client-logo-item">
            <img src="${logo}" alt="Логотип клиента" loading="lazy">
        </div>
    `).join('');

    // Добавляем логотипы дважды для бесшовного цикла
    carousel.innerHTML = logosHTML + logosHTML;

    // Получаем оригинальные элементы
    const originalItems = Array.from(carousel.querySelectorAll('.client-logo-item'));
    const itemsCount = clientLogos.length;
    
    // Удаляем обработчики для кликов на логотипы (они не должны открываться)

    let currentPosition = 0;
    let isAnimating = false;
    let autoScrollTimer = null;

    // Функция для получения ширины элемента с учетом gap
    function getItemWidth() {
        if (originalItems.length === 0) return 0;
        const item = originalItems[0];
        const itemRect = item.getBoundingClientRect();
        const gap = 48; // 3rem gap
        return itemRect.width + gap;
    }

    // Функция для ручной прокрутки
    function scrollCarousel(direction) {
        if (isAnimating) return;
        isAnimating = true;

        // Останавливаем автоматическую анимацию
        carousel.classList.add('manual');
        if (autoScrollTimer) {
            clearTimeout(autoScrollTimer);
            autoScrollTimer = null;
        }

        const itemWidth = getItemWidth();

        if (direction === 'next') {
            currentPosition++;
            if (currentPosition >= itemsCount) {
                currentPosition = 0;
            }
        } else {
            currentPosition--;
            if (currentPosition < 0) {
                currentPosition = itemsCount - 1;
            }
        }

        const offset = -(currentPosition * itemWidth);
        carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        carousel.style.transform = `translateX(${offset}px)`;

        setTimeout(() => {
            isAnimating = false;
            // Восстанавливаем автоматическую анимацию через 5 секунд
            autoScrollTimer = setTimeout(() => {
                carousel.classList.remove('manual');
                carousel.style.transition = '';
                carousel.style.transform = '';
                currentPosition = 0;
            }, 5000);
        }, 600);
    }

    // Обработчики для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollCarousel('prev');
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollCarousel('next');
        });
    }
});
