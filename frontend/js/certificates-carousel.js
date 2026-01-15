// Certificates Carousel Script
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('certificatesCarousel');
    const prevBtn = document.getElementById('certificatesPrev');
    const nextBtn = document.getElementById('certificatesNext');
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('certificateModalImage');
    const modalClose = document.getElementById('certificateModalClose');
    
    if (!carousel) return;

    // Список всех сертификатов
    const certificates = [
        'assets/images/certificates/1or0gkzf6svgfkubz212wo54zs5sdsla.jpg',
        'assets/images/certificates/27tnnq4pekhyab4buzihx3x7or6mo924.jpg',
        'assets/images/certificates/csv5ktli786fefgt0qqt9ksx4aag6qyb.jpg',
        'assets/images/certificates/e197bejmqlnw06mzyx6c0c0sd9mr3jws.jpg',
        'assets/images/certificates/fizc2imlz8sjrhi5pifoetsy75arf2c7.jpg',
        'assets/images/certificates/ijgk2q5851nktfst4m6rg1hr1k3spo9a.jpg',
        'assets/images/certificates/m6t8brt27jm42r62fck7up13s0xjeixu.jpg',
        'assets/images/certificates/oo4eib1iz6e3qmcjin0w53r6kjnewdp2.jpg',
        'assets/images/certificates/pfecsuik49z987gbmfwtc9atxf4n3y8o.jpg',
        'assets/images/certificates/r1vro1frv245q91uqx1g1xtevwxr2hkn.jpg',
        'assets/images/certificates/rpulrp4tmkxrmaf5m3chq6gndjkzzvwf.jpg',
        'assets/images/certificates/vgkl4fxz0d4itx1a48uhamx9k2h10zsl.jpg',
        'assets/images/certificates/znzgzupgvh6prerp433f235oj27o8zph.jpg'
    ];

    // Генерируем HTML для сертификатов
    const certificatesHTML = certificates.map((cert, index) => `
        <div class="certificate-item" data-index="${index}">
            <div class="certificate-item-wrapper">
                <img src="${cert}" alt="Сертификат ${index + 1}" loading="lazy">
            </div>
            <p class="certificate-item-label">Сертификат ${index + 1}</p>
        </div>
    `).join('');

    // Добавляем сертификаты дважды для бесшовного цикла
    carousel.innerHTML = certificatesHTML + certificatesHTML;

    // Получаем оригинальные элементы
    const originalItems = Array.from(carousel.querySelectorAll('.certificate-item'));
    const itemsCount = certificates.length;

    let currentPosition = 0;
    let isAnimating = false;
    let autoScrollTimer = null;

    // Функция для получения ширины элемента с учетом gap
    function getItemWidth() {
        if (originalItems.length === 0) return 0;
        const item = originalItems[0];
        const itemRect = item.getBoundingClientRect();
        const gap = 32; // 2rem gap
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

    // Функция открытия модального окна
    function openModal(imageSrc) {
        if (modal && modalImage) {
            modalImage.src = imageSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Функция закрытия модального окна
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Обработчики кликов на сертификаты
    carousel.addEventListener('click', (e) => {
        const certificateItem = e.target.closest('.certificate-item');
        if (certificateItem) {
            const img = certificateItem.querySelector('img');
            if (img) {
                e.preventDefault();
                openModal(img.src);
            }
        }
    });

    // Обработчик закрытия модального окна
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Закрытие по клику на фон
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
