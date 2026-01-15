// Top Info Bar Component
function renderTopInfoBar() {
    const topInfoBar = document.getElementById('topInfoBar');
    if (!topInfoBar) return;

    topInfoBar.innerHTML = `
        <div class="top-info-bar">
            <div class="container">
                <div class="top-info-content">
                    <div class="top-info-item">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>г. Санкт-Петербург, ул. Рубинштейна, 34</span>
                    </div>
                    <div class="top-info-item">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>8 (812) 331-81-80</span>
                    </div>
                    <div class="top-info-item">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <a href="mailto:info5@petroexpert.ru">info5@petroexpert.ru</a>
                    </div>
                    <div class="top-info-item">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Пн-Пт: 9:00-18:00</span>
                    </div>
                    <div class="city-selector">
                        <button class="top-info-link city-selector-btn" onclick="toggleCityDropdown(event)">
                            Выбрать город
                            <svg class="city-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="city-dropdown" id="cityDropdown">
                            <button class="city-dropdown-item" onclick="selectCity('spb', 'Санкт-Петербург')">Санкт-Петербург</button>
                            <button class="city-dropdown-item" onclick="selectCity('moscow', 'Москва')">Москва</button>
                            <button class="city-dropdown-item" onclick="selectCity('novgorod', 'Великий Новгород')">Великий Новгород</button>
                            <button class="city-dropdown-item" onclick="selectCity('petrozavodsk', 'Петрозаводск')">Петрозаводск</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Setup scroll behavior for top-info-bar
    setupTopInfoBarScroll();
}

// Header Component
function renderHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    header.innerHTML = `
        <div class="container">
            <div class="header-main">
                <button class="header-menu-toggle" onclick="toggleMobileMenu()">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" id="menu-icon" class="menu-icon-svg">
                        <path class="menu-line menu-line-top" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
                        <path class="menu-line menu-line-bottom" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 18h16"></path>
                    </svg>
                </button>
                <a href="index.html" class="header-logo">
                    <img src="assets/logo/logo.png" alt="ПетроЭксперт" class="header-logo-image-left">
                </a>
                <nav class="header-nav">
                    <div class="header-nav-item-dropdown">
                        <a href="pages/services.html" class="header-nav-link header-nav-link-dropdown">
                            Экспертизы
                            <svg class="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>
                    </div>
                    <div class="header-nav-item-dropdown">
                        <a href="pages/services.html?category=evaluation" class="header-nav-link header-nav-link-dropdown">
                            Оценка
                            <svg class="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>
                    </div>
                    <a href="pages/services.html?category=laboratory" class="header-nav-link">Лаб. исследования</a>
                    <a href="pages/blog.html" class="header-nav-link header-nav-link-hideable">Блог</a>
                    <div class="header-nav-item-dropdown header-nav-item-hideable">
                        <a href="pages/about.html" class="header-nav-link header-nav-link-dropdown">
                            Компания
                            <svg class="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
                <div class="header-actions">
                    <div class="header-search-container">
                        <a href="#" class="header-action header-search-icon" onclick="toggleSearchField(event); return false;" title="Поиск">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </a>
                        <div class="header-search-field">
                            <input type="text" class="header-search-input" placeholder="Поиск..." id="headerSearchInput">
                        </div>
                    </div>
                    <a href="tel:+78123318180" class="header-action" title="Позвонить">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                    </a>
                    ${user ? `
                        <a href="pages/dashboard.html" class="header-action" title="Личный кабинет">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </a>
                    ` : `
                        <a href="pages/login.html" class="header-action" title="Войти">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </a>
                    `}
                </div>
            </div>
            <div class="header-dropdown-menu">
                <a href="pages/services.html?service=autotechnical" class="header-dropdown-item">Автотехническая экспертиза после ДТП</a>
                <a href="pages/services.html?service=autocommodity" class="header-dropdown-item">Автотовароведческая экспертиза</a>
                <a href="pages/services.html?service=hydrogeological" class="header-dropdown-item">Гидрогеологическая экспертиза скважин</a>
                <a href="pages/services.html?service=land" class="header-dropdown-item">Землеустроительная (земельная) экспертиза</a>
                <a href="pages/services.html?service=forensic" class="header-dropdown-item">Криминалистическая экспертиза</a>
                <a href="pages/services.html?service=linguistic" class="header-dropdown-item">Лингвистическая экспертиза</a>
                <a href="pages/services.html?service=equipment" class="header-dropdown-item">Независимая экспертиза оборудования любой сложности</a>
                <a href="pages/services.html?service=handwriting" class="header-dropdown-item">Почерковедческая экспертиза</a>
                <a href="pages/services.html?service=psychological" class="header-dropdown-item">Психологическая экспертиза (психолого-педагогическая)</a>
                <a href="pages/services.html?service=laboratory" class="header-dropdown-item">Лабораторные исследования</a>
                <a href="pages/services.html" class="header-dropdown-item">Другие экспертизы</a>
            </div>
            <div class="header-dropdown-menu header-dropdown-menu-evaluation">
                <a href="pages/services.html?service=business-valuation" class="header-dropdown-item">Оценка рыночной стоимости бизнеса</a>
                <a href="pages/services.html?service=buildings-valuation" class="header-dropdown-item">Оценка рыночной стоимости зданий и домов</a>
                <a href="pages/services.html?service=ip-valuation" class="header-dropdown-item">Оценка стоимости интеллектуальной собственности</a>
                <a href="pages/services.html?service=real-estate-valuation" class="header-dropdown-item">Оценка стоимости недвижимости или недвижимого имущества</a>
                <a href="pages/services.html?service=land-valuation" class="header-dropdown-item">Оценка земельного участка</a>
                <a href="pages/services.html?service=machinery-valuation" class="header-dropdown-item">Определение (оценка) стоимости машин и оборудования</a>
                <a href="pages/services.html?service=property-valuation" class="header-dropdown-item">Оценка рыночной стоимости недвижимости</a>
                <a href="pages/services.html?service=enterprise-valuation" class="header-dropdown-item">Оценка рыночной стоимости предприятия</a>
                <a href="pages/services.html?service=repair-valuation" class="header-dropdown-item">Оценка стоимости восстановительного ремонта помещений</a>
                <a href="pages/services.html?service=movable-valuation" class="header-dropdown-item">Оценка стоимости иного движимого имущества</a>
            </div>
            <div class="header-dropdown-menu header-dropdown-menu-company">
                <a href="pages/about.html" class="header-dropdown-item">О компании</a>
                <a href="pages/price.html" class="header-dropdown-item">Прайс</a>
                <a href="pages/experts.html" class="header-dropdown-item">Наши эксперты</a>
                <a href="pages/equipment.html" class="header-dropdown-item">Оборудование</a>
                <a href="pages/reviews.html" class="header-dropdown-item">Отзывы</a>
                <a href="pages/cases.html" class="header-dropdown-item">Кейсы</a>
                <a href="pages/vacancies.html" class="header-dropdown-item">Вакансии</a>
                <a href="pages/licenses.html" class="header-dropdown-item">Лицензии и сертификаты</a>
                <a href="pages/privacy.html" class="header-dropdown-item">Политика конфиденциальности</a>
                <a href="pages/payment.html" class="header-dropdown-item">Способы оплаты</a>
                <a href="pages/faq.html" class="header-dropdown-item">Вопрос-ответ</a>
                <a href="pages/details.html" class="header-dropdown-item">Реквизиты</a>
                <a href="pages/safety.html" class="header-dropdown-item">Охрана труда</a>
            </div>
        </div>
    `;
    
    // Render mobile menu outside header container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'header-mobile-menu';
    mobileMenu.id = 'mobile-menu';
    mobileMenu.innerHTML = `
            <nav class="header-mobile-nav">
                <a href="pages/services.html" class="header-mobile-nav-link">Экспертизы</a>
                <a href="pages/services.html?category=evaluation" class="header-mobile-nav-link">Оценка</a>
                <a href="pages/services.html?category=laboratory" class="header-mobile-nav-link">Лаб. исследования</a>
                <a href="pages/blog.html" class="header-mobile-nav-link">Блог</a>
                <a href="pages/about.html" class="header-mobile-nav-link">Компания</a>
                <div class="header-mobile-actions">
                    <a href="#" class="header-mobile-action" onclick="toggleSearchField(event); return false;" title="Поиск">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <span>Поиск</span>
                    </a>
                    <a href="tel:+78123318180" class="header-mobile-action" title="Позвонить">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>Позвонить</span>
                    </a>
                    ${user ? `
                        <a href="pages/dashboard.html" class="header-mobile-action" title="Личный кабинет">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span>Личный кабинет</span>
                        </a>
                    ` : `
                        <a href="pages/login.html" class="header-mobile-action" title="Войти">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span>Войти</span>
                        </a>
                    `}
                </div>
            </nav>
    `;
    
    // Remove existing menu if present
    const existingMenu = document.getElementById('mobile-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Append mobile menu to body
    document.body.appendChild(mobileMenu);
}

function setupDropdownBlur() {
    const dropdownItems = document.querySelectorAll('.header-nav-item-dropdown');
    const body = document.body;
    
    dropdownItems.forEach((dropdownItem, index) => {
        const dropdownMenus = document.querySelectorAll('.header-dropdown-menu');
        const dropdownMenu = dropdownMenus[index];
        
        if (dropdownItem && dropdownMenu) {
            const showMenu = () => {
                // Скрываем все другие меню
                dropdownMenus.forEach(menu => menu.classList.remove('show'));
                // Показываем текущее меню
                dropdownMenu.classList.add('show');
                body.classList.add('content-blurred');
            };
            
            const hideMenu = () => {
                dropdownMenu.classList.remove('show');
                // Убираем блюр только если все меню закрыты
                const hasOpenMenu = Array.from(dropdownMenus).some(menu => menu.classList.contains('show'));
                if (!hasOpenMenu) {
                    body.classList.remove('content-blurred');
                }
            };
            
            dropdownItem.addEventListener('mouseenter', showMenu);
            dropdownMenu.addEventListener('mouseenter', showMenu);
            
            dropdownItem.addEventListener('mouseleave', (e) => {
                // Проверяем, не переходим ли мы в меню
                if (!dropdownMenu.contains(e.relatedTarget)) {
                    hideMenu();
                }
            });
            
            dropdownMenu.addEventListener('mouseleave', hideMenu);
        }
    });
}

function setupTopInfoBarScroll() {
    const topInfoBar = document.querySelector('.top-info-bar');
    const header = document.querySelector('header');
    if (!topInfoBar || !header) return;
    
    let lastScrollTop = 0;
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        isScrolling = true;
        
        requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 50) {
                // Scrolling down - hide top-info-bar and round top corners of header
                topInfoBar.classList.add('top-info-bar-hidden');
                header.classList.add('header-rounded-top');
            } else if (scrollTop < lastScrollTop || scrollTop <= 10) {
                // Scrolling up or at top - show top-info-bar and remove top rounding
                topInfoBar.classList.remove('top-info-bar-hidden');
                header.classList.remove('header-rounded-top');
            }
            
            lastScrollTop = scrollTop;
            isScrolling = false;
        });
    });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const toggle = document.querySelector('.header-menu-toggle');
    
    if (menu && toggle) {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
}

function toggleCityDropdown(event) {
    event.stopPropagation();
    const selector = event.currentTarget.closest('.city-selector');
    const isActive = selector.classList.contains('active');
    
    // Close all other dropdowns
    document.querySelectorAll('.city-selector').forEach(item => {
        if (item !== selector) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current dropdown
    selector.classList.toggle('active', !isActive);
}

// Close dropdown when clicking outside
if (typeof document !== 'undefined') {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.city-selector')) {
            document.querySelectorAll('.city-selector').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

function openCityModal() {
    // Legacy function for compatibility
    const selector = document.querySelector('.city-selector');
    if (selector) {
        selector.classList.add('active');
    }
}

function closeCityModal() {
    // Legacy function for compatibility
    const selector = document.querySelector('.city-selector');
    if (selector) {
        selector.classList.remove('active');
    }
}

function toggleSearchField(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const searchContainer = document.querySelector('.header-search-container');
    const searchField = document.querySelector('.header-search-field');
    const searchInput = document.getElementById('headerSearchInput');
    const hideableLinks = document.querySelectorAll('.header-nav-link-hideable');
    const hideableItems = document.querySelectorAll('.header-nav-item-hideable');
    
    if (searchContainer && searchField) {
        const isActive = searchContainer.classList.contains('active');
        
        if (!isActive) {
            // Открываем поле поиска
            searchContainer.classList.add('active');
            searchField.classList.add('active');
            hideableLinks.forEach(link => {
                link.style.opacity = '0';
                link.style.visibility = 'hidden';
            });
            hideableItems.forEach(item => {
                item.style.opacity = '0';
                item.style.visibility = 'hidden';
            });
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                }
            }, 300);
        } else {
            // Закрываем поле поиска
            searchContainer.classList.remove('active');
            searchField.classList.remove('active');
            hideableLinks.forEach(link => {
                link.style.opacity = '';
                link.style.visibility = '';
            });
            hideableItems.forEach(item => {
                item.style.opacity = '';
                item.style.visibility = '';
            });
            if (searchInput) {
                searchInput.value = '';
            }
        }
    }
}

// Закрытие поля поиска при клике вне его
if (typeof document !== 'undefined') {
    document.addEventListener('click', (e) => {
        const searchContainer = document.querySelector('.header-search-container');
        const searchField = document.querySelector('.header-search-field');
        const hideableLinks = document.querySelectorAll('.header-nav-link-hideable');
        const hideableItems = document.querySelectorAll('.header-nav-item-hideable');
        
        if (searchContainer && searchField && searchContainer.classList.contains('active')) {
            if (!searchContainer.contains(e.target) && !e.target.closest('.header-search-container')) {
                searchContainer.classList.remove('active');
                searchField.classList.remove('active');
                hideableLinks.forEach(link => {
                    link.style.opacity = '';
                    link.style.visibility = '';
                });
                hideableItems.forEach(item => {
                    item.style.opacity = '';
                    item.style.visibility = '';
                });
                const searchInput = document.getElementById('headerSearchInput');
                if (searchInput) {
                    searchInput.value = '';
                }
            }
        }
    });
}

function openSearchModal() {
    // Legacy function for compatibility
    toggleSearchField({ preventDefault: () => {}, stopPropagation: () => {} });
}

// Render top info bar and header on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderTopInfoBar();
        renderHeader();
        // Setup dropdown blur effect after header is rendered
        setTimeout(() => {
            setupDropdownBlur();
        }, 100);
    });
} else {
    renderTopInfoBar();
    renderHeader();
    // Setup dropdown blur effect after header is rendered
    setTimeout(() => {
        setupDropdownBlur();
    }, 100);
}
