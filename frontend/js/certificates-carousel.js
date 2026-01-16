// Certificates Carousel Script with Touch, Trackpad, and Wheel Support
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('certificatesCarousel');
    const wrapper = carousel?.closest('.certificates-carousel-wrapper');
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('certificateModalImage');
    const modalClose = document.getElementById('certificateModalClose');
    
    if (!carousel || !wrapper) return;

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

    // Добавляем сертификаты трижды для бесшовного цикла
    carousel.innerHTML = certificatesHTML + certificatesHTML + certificatesHTML;

    // Получаем оригинальные элементы
    const originalItems = Array.from(carousel.querySelectorAll('.certificate-item'));
    const itemsCount = certificates.length;

    let currentPosition = itemsCount; // Начинаем со второй копии
    let isAnimating = false;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let scrollVelocity = 0;
    let lastScrollTime = 0;

    // Функция для получения ширины элемента с учетом gap
    function getItemWidth() {
        const item = carousel.querySelector('.certificate-item');
        if (!item) return 0;
        const itemRect = item.getBoundingClientRect();
        const gap = 32; // 2rem gap
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

        // Останавливаем автоматическую анимацию
        carousel.classList.add('manual');
        
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
                currentPosition = itemsCount;
                updatePosition(false);
                requestAnimationFrame(() => {
                    carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            }, 5000);
        }, 600);
    }
    
    // Добавляем обработчики для кнопок
    const prevBtn = document.getElementById('certificatesPrev');
    const nextBtn = document.getElementById('certificatesNext');
    
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

    // Инициализация позиции для автоматической анимации
    // Не устанавливаем transform, чтобы CSS анимация работала
    carousel.style.transform = '';
    carousel.style.transition = '';

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
        if (isDragging) return; // Игнорируем клики во время перетаскивания
        
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
