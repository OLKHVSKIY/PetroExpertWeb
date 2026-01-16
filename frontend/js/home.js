// Home Page Scripts

function playHeroVideo() {
    const video = document.getElementById('heroVideo');
    const preview = document.querySelector('.hero-video-preview');
    
    if (video && preview) {
        preview.style.display = 'none';
        video.style.display = 'block';
        video.play().catch(err => {
            console.error('Ошибка воспроизведения видео:', err);
        });
    }
}
document.addEventListener('DOMContentLoaded', async () => {
    await loadServicesPreview();
    await loadBlogPreview();
    setupHeroVideo();
    setupScrollAnimation();
});

function setupHeroVideo() {
    const video = document.getElementById('heroVideo');
    
    if (video) {
        // Попытка загрузить и воспроизвести видео
        video.load();
        
        video.addEventListener('loadeddata', () => {
            video.play().catch(err => {
                console.error('Ошибка воспроизведения видео:', err);
            });
        });
        
        // Автоматический запуск при загрузке
        video.addEventListener('canplay', () => {
            video.play().catch(err => {
                console.error('Ошибка воспроизведения видео:', err);
            });
        });
    }
}

function setupScrollAnimation() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Добавляем небольшую задержку для каждого элемента
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

let allServices = [];
let visibleCount = 8;
let initialVisibleCount = 8; // Сохраняем изначальное количество видимых карточек
let isExpanded = false; // Флаг для отслеживания состояния (развернуто/свернуто)

// Mock данные для демонстрации, если API недоступен
const mockServices = [
    { _id: '1', title: 'Автотехническая экспертиза', shortDescription: 'Комплексная экспертиза транспортных средств после ДТП', image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=300&fit=crop' },
    { _id: '2', title: 'Строительная экспертиза', shortDescription: 'Оценка качества строительных работ и материалов', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop' },
    { _id: '3', title: 'Землеустроительная экспертиза', shortDescription: 'Исследование земельных участков и границ', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop' },
    { _id: '4', title: 'Лингвистическая экспертиза', shortDescription: 'Анализ текстов и речевых материалов', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' },
    { _id: '5', title: 'Почерковедческая экспертиза', shortDescription: 'Идентификация почерка и подписей', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop' },
    { _id: '6', title: 'Психологическая экспертиза', shortDescription: 'Оценка психического состояния и поведения', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop' },
    { _id: '7', title: 'Оценка недвижимости', shortDescription: 'Определение рыночной стоимости объектов недвижимости', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop' },
    { _id: '8', title: 'Оценка бизнеса', shortDescription: 'Оценка стоимости предприятий и бизнес-активов', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' },
    { _id: '9', title: 'Экспертиза оборудования', shortDescription: 'Анализ технического состояния оборудования', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop' },
    { _id: '10', title: 'Гидрогеологическая экспертиза', shortDescription: 'Исследование скважин и водных ресурсов', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop' },
    { _id: '11', title: 'Экспертиза документов', shortDescription: 'Проверка подлинности и давности документов', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop' },
    { _id: '12', title: 'Медицинская экспертиза', shortDescription: 'Оценка состояния здоровья и причин повреждений', image: 'https://sud-expertiza.ru/wp-content/uploads/2013/11/-241-e1424178902966.jpg' },    { _id: '13', title: 'Товароведческая экспертиза', shortDescription: 'Анализ качества товаров и их соответствия стандартам', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
    { _id: '14', title: 'Экспертиза интеллектуальной собственности', shortDescription: 'Оценка стоимости патентов и авторских прав', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop' },
    { _id: '15', title: 'Экологическая экспертиза', shortDescription: 'Оценка экологического состояния объектов', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop' },
    { _id: '16', title: 'Лабораторные исследования', shortDescription: 'Химические и физические анализы материалов', image: 'https://images.unsplash.com/photo-1564053489984-317bbd824340?w=400&h=300&fit=crop' }
];

async function loadServicesPreview() {
    const container = document.getElementById('servicesPreview');
    const showMoreContainer = document.getElementById('showMoreContainer');
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (!container) return;

    try {
        // Показываем индикатор загрузки
        container.innerHTML = '<p class="text-center" style="padding: 2rem; color: #64748b;">Загрузка услуг...</p>';
        
        // Проверяем наличие API
        if (!window.API || !window.API.services) {
            console.warn('API недоступен, используем mock данные');
            allServices = mockServices;
        } else {
            // Загружаем больше услуг (минимум 16)
            try {
                allServices = await window.API.services.getAll({ limit: 20 });
                
                // Если API вернул пустой массив или ошибку, используем mock данные
                if (!allServices || allServices.length === 0) {
                    console.warn('API вернул пустой массив, используем mock данные');
                    allServices = mockServices;
                }
            } catch (apiError) {
                console.warn('Ошибка загрузки с API, используем mock данные:', apiError);
                allServices = mockServices;
            }
        }
        
        if (!allServices || allServices.length === 0) {
            container.innerHTML = '<p class="text-center" style="padding: 2rem; color: #64748b;">Услуги временно недоступны</p>';
            return;
        }

        // Рендерим все карточки, но сначала показываем только 8
        container.innerHTML = allServices.map((service, index) => {
            const isVisible = index < visibleCount;
            return `
                <a href="pages/service-detail.html?id=${service._id}" class="service-card ${isVisible ? 'visible' : 'hidden'}" data-index="${index}">
                    ${service.image ? `<img src="${service.image}" alt="${service.title}">` : '<div style="width: 100%; height: 200px; background: linear-gradient(135deg, #17255F 0%, #1e3a8a 100%); border-radius: 16px 16px 0 0;"></div>'}
                    <div class="service-card-content">
                        <h3 class="service-card-title">${service.title}</h3>
                        <p class="service-card-text">${service.shortDescription || service.description.substring(0, 180)}...</p>
                        <div class="service-card-footer">
                            <span class="service-card-link">Подробнее</span>
                        </div>
                    </div>
                </a>
            `;
        }).join('');

        // Сброс состояния
        isExpanded = false;
        visibleCount = initialVisibleCount;

        // Показываем кнопку "Показать еще", если есть скрытые карточки
        if (allServices.length > visibleCount) {
            showMoreContainer.style.display = 'block';
            if (showMoreBtn) {
                showMoreBtn.textContent = 'Показать еще';
            }
        } else {
            showMoreContainer.style.display = 'none';
        }

        // Добавляем обработчик для кнопки
        if (showMoreBtn) {
            showMoreBtn.onclick = showMoreServices;
        }

        // Анимация появления видимых карточек
        setTimeout(() => {
            const visibleCards = container.querySelectorAll('.service-card.visible');
            visibleCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transitionDelay = `${index * 50}ms`;
                }, 100);
            });
        }, 100);

    } catch (error) {
        console.error('Error loading services:', error);
        container.innerHTML = '<p class="text-center">Ошибка загрузки услуг</p>';
    }
}

function showMoreServices() {
    const container = document.getElementById('servicesPreview');
    const showMoreContainer = document.getElementById('showMoreContainer');
    const showMoreBtn = document.getElementById('showMoreBtn');
    
    if (!container || !showMoreBtn) return;

    if (!isExpanded) {
        // Показываем все скрытые карточки
        const hiddenCards = container.querySelectorAll('.service-card.hidden');
        const cardsToShow = Array.from(hiddenCards);
        
        if (cardsToShow.length === 0) {
            showMoreContainer.style.display = 'none';
            return;
        }

        // Увеличиваем счетчик видимых карточек
        visibleCount = allServices.length;

        // Показываем карточки с анимацией
        cardsToShow.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('hidden');
                card.classList.add('visible');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Плавная анимация появления
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                });
            }, index * 50);
        });

        // Меняем текст кнопки на "Скрыть"
        setTimeout(() => {
            showMoreBtn.textContent = 'Скрыть';
            isExpanded = true;
        }, cardsToShow.length * 50 + 300);
        
    } else {
        // Скрываем карточки, которые были показаны после первоначальных 8
        const allCards = container.querySelectorAll('.service-card');
        const cardsToHide = Array.from(allCards).slice(initialVisibleCount);
        
        if (cardsToHide.length === 0) return;

        // Плавно скрываем карточки с более плавной анимацией
        cardsToHide.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // После завершения анимации скрытия добавляем класс hidden
                setTimeout(() => {
                    card.classList.remove('visible');
                    card.classList.add('hidden');
                    card.style.opacity = '';
                    card.style.transform = '';
                    card.style.transition = '';
                }, 600);
            }, index * 40);
        });

        // Уменьшаем счетчик видимых карточек
        visibleCount = initialVisibleCount;

        // Меняем текст кнопки на "Показать еще" и выполняем плавную прокрутку
        const totalAnimationTime = cardsToHide.length * 40 + 600;
        
        setTimeout(() => {
            showMoreBtn.textContent = 'Показать еще';
            isExpanded = false;
        }, totalAnimationTime);
        
        // Плавная прокрутка к началу блока "Виды экспертиз" начинается после небольшой задержки
        setTimeout(() => {
            const servicesSection = document.querySelector('.services-preview');
            if (servicesSection) {
                const sectionTop = servicesSection.getBoundingClientRect().top + window.pageYOffset - 120;
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
            }
        }, totalAnimationTime * 0.6); // Начинаем скролл когда анимация еще идет
    }
}

// Load blog preview (first 3 articles)
async function loadBlogPreview() {
    const container = document.getElementById('blogPreview');
    if (!container) return;

    try {
        const response = await window.API.blog.getAll();
        const posts = response.posts || [];
        
        // Take only first 3 posts
        const previewPosts = posts.slice(0, 3);

        if (previewPosts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Статьи не найдены</p>
                </div>
            `;
            return;
        }

        container.innerHTML = previewPosts.map(post => {
            // Check if post should have overlay title on image
            const hasOverlay = post.title && post.title.includes('Попробуем договориться миром');
            
            return `
                <a href="pages/blog-post.html?id=${post._id}" class="blog-preview-card">
                    ${post.image ? `
                        <div class="blog-preview-card-image-wrapper">
                            <img src="${post.image}" alt="${post.title}" class="blog-preview-card-image">
                            ${hasOverlay ? `
                                <div class="blog-preview-card-overlay">
                                    <h3 class="blog-preview-card-overlay-title">${post.title}</h3>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                    <div class="blog-preview-card-content">
                        ${!hasOverlay ? `<h3 class="blog-preview-card-title">${post.title}</h3>` : ''}
                        <p class="blog-preview-card-excerpt">${post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : '')}</p>
                    </div>
                </a>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading blog preview:', error);
        // Fallback with mock data
        container.innerHTML = `
            <a href="pages/blog.html" class="blog-preview-card">
                <div class="blog-preview-card-image-wrapper">
                    <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop" alt="Попробуем договориться миром?" class="blog-preview-card-image">
                    <div class="blog-preview-card-overlay">
                        <h3 class="blog-preview-card-overlay-title">Попробуем договориться миром?</h3>
                    </div>
                </div>
                <div class="blog-preview-card-content">
                    <p class="blog-preview-card-excerpt">Независимая экспертиза может помочь решить спорные вопросы в досудебном порядке, сэкономив время и средства на судебные разбирательства. Наши...</p>
                </div>
            </a>
            <a href="pages/blog.html" class="blog-preview-card">
                <div class="blog-preview-card-image-wrapper">
                    <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop" alt="5 советов, как защитить подпись от подделки" class="blog-preview-card-image">
                </div>
                <div class="blog-preview-card-content">
                    <h3 class="blog-preview-card-title">5 советов, как защитить подпись от подделки</h3>
                    <p class="blog-preview-card-excerpt">До 90% россиян расписываются довольно просто. Чаще всего это первые 2-3 буквы фамилии. У кого-то...</p>
                </div>
            </a>
            <a href="pages/blog.html" class="blog-preview-card">
                <div class="blog-preview-card-image-wrapper">
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop" alt="Сломалось оборудование, что делать?" class="blog-preview-card-image">
                </div>
                <div class="blog-preview-card-content">
                    <h3 class="blog-preview-card-title">Сломалось оборудование, что делать?</h3>
                    <p class="blog-preview-card-excerpt">Даже самые современные производственные линии порой выходят из строя. Причины могут...</p>
                </div>
            </a>
        `;
    }
}
