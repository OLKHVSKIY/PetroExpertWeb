// Clients Carousel Script with Touch, Trackpad, and Wheel Support
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('clientsCarousel');
    const wrapper = carousel?.closest('.clients-carousel-wrapper');
    
    if (!carousel || !wrapper) return;

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

    // Добавляем логотипы трижды для бесшовного цикла
    carousel.innerHTML = logosHTML + logosHTML + logosHTML;

    // Получаем оригинальные элементы
    const originalItems = Array.from(carousel.querySelectorAll('.client-logo-item'));
    const itemsCount = clientLogos.length;

    let currentPosition = itemsCount; // Начинаем со второй копии
    let isAnimating = false;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let scrollVelocity = 0;
    let lastScrollTime = 0;

    // Функция для получения ширины элемента с учетом gap
    function getItemWidth() {
        const item = carousel.querySelector('.client-logo-item');
        if (!item) return 0;
        const itemRect = item.getBoundingClientRect();
        const gap = 48; // 3rem gap
        return itemRect.width + gap;
    }

    // Функция для обновления позиции
    function updatePosition(smooth = true) {
        const itemWidth = getItemWidth();
        const offset = -(currentPosition * itemWidth);
        
        if (smooth) {
            carousel.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            carousel.style.transition = 'none';
        }
        carousel.style.transform = `translateX(${offset}px)`;
    }

    // Функция для бесшовного перехода
    function handleSeamlessTransition() {
        const totalItems = itemsCount;
        
        if (currentPosition <= 0) {
            currentPosition = totalItems;
            carousel.style.transition = 'none';
            updatePosition(false);
            requestAnimationFrame(() => {
                carousel.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        } else if (currentPosition >= totalItems * 2) {
            currentPosition = totalItems;
            carousel.style.transition = 'none';
            updatePosition(false);
            requestAnimationFrame(() => {
                carousel.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }
    }

    // Функция для прокрутки
    function scrollCarousel(direction, amount = 1) {
        if (isAnimating) return;
        isAnimating = true;

        if (direction === 'next') {
            currentPosition += amount;
        } else {
            currentPosition -= amount;
        }

        updatePosition();
        
        setTimeout(() => {
            handleSeamlessTransition();
            isAnimating = false;
        }, 300);
    }

    // Touch events (пальцы)
    let touchStartX = 0;
    let touchStartY = 0;

    wrapper.addEventListener('touchstart', (e) => {
        if (isAnimating) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isDragging = true;
        carousel.style.transition = 'none';
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchStartX - touchX;
        const deltaY = touchStartY - touchY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            const itemWidth = getItemWidth();
            const offset = -(currentPosition * itemWidth) - deltaX;
            carousel.style.transform = `translateX(${offset}px)`;
        }
    }, { passive: false });

    wrapper.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const touchX = e.changedTouches[0].clientX;
        const deltaX = touchStartX - touchX;
        const threshold = 50;

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                scrollCarousel('next');
            } else {
                scrollCarousel('prev');
            }
        } else {
            updatePosition();
        }
    }, { passive: true });

    // Mouse drag (для тачпада)
    wrapper.addEventListener('mousedown', (e) => {
        if (isAnimating) return;
        startX = e.clientX;
        currentX = startX;
        isDragging = true;
        carousel.style.transition = 'none';
        e.preventDefault();
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        const deltaX = startX - currentX;
        const itemWidth = getItemWidth();
        const offset = -(currentPosition * itemWidth) - deltaX;
        carousel.style.transform = `translateX(${offset}px)`;
    });

    wrapper.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const deltaX = startX - currentX;
        const threshold = 50;

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                scrollCarousel('next');
            } else {
                scrollCarousel('prev');
            }
        } else {
            updatePosition();
        }
    });

    wrapper.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            updatePosition();
        }
    });

    // Wheel scroll (колесико мыши)
    wrapper.addEventListener('wheel', (e) => {
        if (isAnimating) return;
        
        const now = Date.now();
        const timeDelta = now - lastScrollTime;
        const delta = e.deltaX || e.deltaY;
        
        if (Math.abs(delta) > 10) {
            if (timeDelta < 100) {
                scrollVelocity = Math.min(scrollVelocity + 0.1, 1);
            } else {
                scrollVelocity = 0.3;
            }
            
            lastScrollTime = now;
            
            if (delta > 0) {
                scrollCarousel('next', Math.max(1, Math.floor(scrollVelocity * 2)));
            } else {
                scrollCarousel('prev', Math.max(1, Math.floor(scrollVelocity * 2)));
            }
            
            e.preventDefault();
        }
    }, { passive: false });

    // Инициализация позиции
    updatePosition(false);
    requestAnimationFrame(() => {
        carousel.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});
