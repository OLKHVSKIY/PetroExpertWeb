// Evaluation Carousel Script
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('evaluationCarousel');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (!carousel) return;

    // Получаем оригинальные карточки
    const originalCards = Array.from(carousel.querySelectorAll('.evaluation-card'));
    
    // Дублируем все карточки для бесшовного цикла
    originalCards.forEach(card => {
        const clonedCard = card.cloneNode(true);
        carousel.appendChild(clonedCard);
    });

    let currentPosition = 0;
    let isAnimating = false;
    let autoScrollTimer = null;

    // Функция для получения ширины карточки с учетом gap
    function getCardWidth() {
        if (originalCards.length === 0) return 0;
        const card = originalCards[0];
        const cardRect = card.getBoundingClientRect();
        const gap = 32; // 2rem gap
        return cardRect.width + gap;
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

        const cardsCount = originalCards.length;
        const cardWidth = getCardWidth();

        if (direction === 'next') {
            currentPosition++;
            if (currentPosition >= cardsCount) {
                currentPosition = 0;
            }
        } else {
            currentPosition--;
            if (currentPosition < 0) {
                currentPosition = cardsCount - 1;
            }
        }

        const offset = -(currentPosition * cardWidth);
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
