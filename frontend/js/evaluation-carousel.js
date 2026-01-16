// Evaluation Carousel Script with Touch, Trackpad, and Wheel Support
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('evaluationCarousel');
    const wrapper = carousel?.closest('.evaluation-carousel-wrapper');
    
    if (!carousel || !wrapper) return;

    // Получаем оригинальные карточки
    const originalCards = Array.from(carousel.querySelectorAll('.evaluation-card'));
    
    if (originalCards.length === 0) return;
    
    // Дублируем все карточки для бесшовного цикла (3 раза для плавности)
    const cardsHTML = originalCards.map(card => card.outerHTML).join('');
    carousel.innerHTML = cardsHTML + cardsHTML + cardsHTML;

    let currentPosition = originalCards.length; // Начинаем со второй копии
    let isAnimating = false;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let scrollVelocity = 0;
    let lastScrollTime = 0;
    let lastScrollDelta = 0;

    // Функция для получения ширины карточки с учетом gap
    function getCardWidth() {
        const card = carousel.querySelector('.evaluation-card');
        if (!card) return 0;
        const cardRect = card.getBoundingClientRect();
        const gap = 32; // 2rem gap
        return cardRect.width + gap;
    }

    // Функция для обновления позиции
    function updatePosition(smooth = true) {
        const cardWidth = getCardWidth();
        const offset = -(currentPosition * cardWidth);
        
        if (smooth) {
            carousel.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            carousel.style.transition = 'none';
        }
        carousel.style.transform = `translateX(${offset}px)`;
    }

    // Функция для бесшовного перехода
    function handleSeamlessTransition() {
        const cardWidth = getCardWidth();
        const totalCards = originalCards.length;
        
        // Если достигли начала первой копии, переходим к концу второй
        if (currentPosition <= 0) {
            currentPosition = totalCards;
            carousel.style.transition = 'none';
            updatePosition(false);
            requestAnimationFrame(() => {
                carousel.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }
        // Если достигли конца третьей копии, переходим к началу второй
        else if (currentPosition >= totalCards * 2) {
            currentPosition = totalCards;
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

        // Останавливаем автоматическую анимацию
        carousel.classList.add('manual');
        
        const totalCards = originalCards.length;
        
        if (direction === 'next') {
            currentPosition += amount;
        } else {
            currentPosition -= amount;
        }

        updatePosition();
        
        setTimeout(() => {
            handleSeamlessTransition();
            isAnimating = false;
            // Восстанавливаем автоматическую анимацию через 5 секунд
            setTimeout(() => {
                carousel.classList.remove('manual');
                carousel.style.transition = '';
                carousel.style.transform = '';
                currentPosition = totalCards;
                updatePosition(false);
                requestAnimationFrame(() => {
                    carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            }, 5000);
        }, 600);
    }
    
    // Добавляем обработчики для кнопок
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
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

        // Проверяем, что это горизонтальный свайп
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            const cardWidth = getCardWidth();
            const offset = -(currentPosition * cardWidth) - deltaX;
            carousel.style.transform = `translateX(${offset}px)`;
        }
    }, { passive: false });

    wrapper.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const touchX = e.changedTouches[0].clientX;
        const deltaX = touchStartX - touchX;
        const threshold = 50; // Минимальное расстояние для свайпа

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
        const cardWidth = getCardWidth();
        const offset = -(currentPosition * cardWidth) - deltaX;
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
        
        // Определяем направление прокрутки
        const delta = e.deltaX || e.deltaY;
        
        if (Math.abs(delta) > 10) {
            // Накапливаем скорость для плавной прокрутки
            if (timeDelta < 100) {
                scrollVelocity = Math.min(scrollVelocity + 0.1, 1);
            } else {
                scrollVelocity = 0.3;
            }
            
            lastScrollTime = now;
            lastScrollDelta = delta;
            
            if (delta > 0) {
                scrollCarousel('next', Math.max(1, Math.floor(scrollVelocity * 2)));
            } else {
                scrollCarousel('prev', Math.max(1, Math.floor(scrollVelocity * 2)));
            }
            
            e.preventDefault();
        }
    }, { passive: false });

    // Инициализация позиции для автоматической анимации
    // Не устанавливаем transform, чтобы CSS анимация работала
    carousel.style.transform = '';
    carousel.style.transition = '';
});
