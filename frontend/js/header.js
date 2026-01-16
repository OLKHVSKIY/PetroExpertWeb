// Top Info Bar Component
function renderTopInfoBar() {
    const topInfoBar = document.getElementById('topInfoBar');
    if (!topInfoBar) return;

    // Determine base path for links
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';
    
    // Get selected city from localStorage or default to Санкт-Петербург
    let selectedCityName = localStorage.getItem('selectedCityName');
    let selectedCity = localStorage.getItem('selectedCity');
    
    // If no city is set or if it's invalid, set default to Санкт-Петербург
    if (!selectedCityName || (selectedCityName !== 'Санкт-Петербург' && selectedCityName !== 'Москва' && selectedCityName !== 'Великий Новгород' && selectedCityName !== 'Петрозаводск')) {
        selectedCityName = 'Санкт-Петербург';
        selectedCity = 'spb';
        localStorage.setItem('selectedCityName', selectedCityName);
        localStorage.setItem('selectedCity', selectedCity);
    }
    
    if (!selectedCity) {
        selectedCity = 'spb';
        localStorage.setItem('selectedCity', selectedCity);
    }
    
    const cityButtonText = selectedCityName;

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
                            <span class="city-name">${cityButtonText}</span>
                            <svg class="city-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="city-dropdown" id="cityDropdown">
                            <button class="city-dropdown-item" data-city="spb" onclick="selectCity('spb', 'Санкт-Петербург')">Санкт-Петербург</button>
                            <button class="city-dropdown-item" data-city="moscow" onclick="selectCity('moscow', 'Москва')">Москва</button>
                            <button class="city-dropdown-item" data-city="novgorod" onclick="selectCity('novgorod', 'Великий Новгород')">Великий Новгород</button>
                            <button class="city-dropdown-item" data-city="petrozavodsk" onclick="selectCity('petrozavodsk', 'Петрозаводск')">Петрозаводск</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Setup scroll behavior for top-info-bar

}

// Header Component
function renderHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    // Determine base path for links and assets
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';
    const pagesPath = isInPages ? '' : 'pages/';

    header.innerHTML = `
        <div class="container">
            <div class="header-main">
                <button class="header-menu-toggle" onclick="toggleMobileMenu()">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" id="menu-icon" class="menu-icon-svg">
                        <path class="menu-line menu-line-top" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
                        <path class="menu-line menu-line-bottom" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 18h16"></path>
                    </svg>
                </button>
                <a href="${basePath}index.html" class="header-logo">
                    <img src="${basePath}assets/logo/logo.png" alt="ПетроЭксперт" class="header-logo-image-left">
                </a>
                <nav class="header-nav">
                    <div class="header-nav-item-dropdown">
                        <a href="${pagesPath}services.html" class="header-nav-link header-nav-link-dropdown">
                            Экспертизы
                            <svg class="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>
                    </div>
                    <div class="header-nav-item-dropdown">
                        <a href="${pagesPath}services.html?category=evaluation" class="header-nav-link header-nav-link-dropdown">
                            Оценка
                            <svg class="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>
                    </div>
                    <a href="${pagesPath}services.html?category=laboratory" class="header-nav-link">Лаб. исследования</a>
                    <a href="${pagesPath}blog.html" class="header-nav-link header-nav-link-hideable">Блог</a>
                    <div class="header-nav-item-dropdown header-nav-item-hideable">
                        <a href="${pagesPath}about.html" class="header-nav-link header-nav-link-dropdown">
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
                        <a href="${pagesPath}dashboard.html" class="header-action" title="Личный кабинет">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </a>
                    
                        <a href="${pagesPath}cart.html" class="header-action" title="Корзина">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            ${cartItems.length > 0 ? `<span class="header-cart-badge">${cartItems.length}</span>` : ''}
                        </a>
                    ` : `
                        <a href="${pagesPath}login.html" class="header-action" title="Войти">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </a>
                    `}
                </div>
            </div>
            <div class="header-dropdown-menu">
                <a href="${pagesPath}autotechnical.html" class="header-dropdown-item">Автотехническая экспертиза после ДТП</a>
                <a href="${pagesPath}services.html?service=autocommodity" class="header-dropdown-item">Автотовароведческая экспертиза</a>
                <a href="${pagesPath}services.html?service=hydrogeological" class="header-dropdown-item">Гидрогеологическая экспертиза скважин</a>
                <a href="${pagesPath}services.html?service=land" class="header-dropdown-item">Землеустроительная (земельная) экспертиза</a>
                <a href="${pagesPath}services.html?service=forensic" class="header-dropdown-item">Криминалистическая экспертиза</a>
                <a href="${pagesPath}services.html?service=linguistic" class="header-dropdown-item">Лингвистическая экспертиза</a>
                <a href="${pagesPath}services.html?service=equipment" class="header-dropdown-item">Независимая экспертиза оборудования любой сложности</a>
                <a href="${pagesPath}services.html?service=handwriting" class="header-dropdown-item">Почерковедческая экспертиза</a>
                <a href="${pagesPath}services.html?service=psychological" class="header-dropdown-item">Психологическая экспертиза (психолого-педагогическая)</a>
                <a href="${pagesPath}services.html?service=laboratory" class="header-dropdown-item">Лабораторные исследования</a>
                <a href="${pagesPath}services.html" class="header-dropdown-item">Другие экспертизы</a>
            </div>
            <div class="header-dropdown-menu header-dropdown-menu-evaluation">
                <a href="${pagesPath}services.html?service=business-valuation" class="header-dropdown-item">Оценка рыночной стоимости бизнеса</a>
                <a href="${pagesPath}services.html?service=buildings-valuation" class="header-dropdown-item">Оценка рыночной стоимости зданий и домов</a>
                <a href="${pagesPath}services.html?service=ip-valuation" class="header-dropdown-item">Оценка стоимости интеллектуальной собственности</a>
                <a href="${pagesPath}services.html?service=real-estate-valuation" class="header-dropdown-item">Оценка стоимости недвижимости или недвижимого имущества</a>
                <a href="${pagesPath}services.html?service=land-valuation" class="header-dropdown-item">Оценка земельного участка</a>
                <a href="${pagesPath}services.html?service=machinery-valuation" class="header-dropdown-item">Определение (оценка) стоимости машин и оборудования</a>
                <a href="${pagesPath}services.html?service=property-valuation" class="header-dropdown-item">Оценка рыночной стоимости недвижимости</a>
                <a href="${pagesPath}services.html?service=enterprise-valuation" class="header-dropdown-item">Оценка рыночной стоимости предприятия</a>
                <a href="${pagesPath}services.html?service=repair-valuation" class="header-dropdown-item">Оценка стоимости восстановительного ремонта помещений</a>
                <a href="${pagesPath}services.html?service=movable-valuation" class="header-dropdown-item">Оценка стоимости иного движимого имущества</a>
            </div>
            <div class="header-dropdown-menu header-dropdown-menu-company">
                <a href="${pagesPath}about.html" class="header-dropdown-item">О компании</a>
                <a href="${pagesPath}price.html" class="header-dropdown-item">Прайс</a>
                <a href="${pagesPath}experts.html" class="header-dropdown-item">Наши эксперты</a>
                <a href="${pagesPath}equipment.html" class="header-dropdown-item">Оборудование</a>
                <a href="${pagesPath}reviews.html" class="header-dropdown-item">Отзывы</a>
                <a href="${pagesPath}cases.html" class="header-dropdown-item">Кейсы</a>
                <a href="${pagesPath}vacancies.html" class="header-dropdown-item">Вакансии</a>
                <a href="${pagesPath}licenses.html" class="header-dropdown-item">Лицензии и сертификаты</a>
                <a href="${pagesPath}privacy.html" class="header-dropdown-item">Политика конфиденциальности</a>
                <a href="${pagesPath}payment.html" class="header-dropdown-item">Способы оплаты</a>
                <a href="${pagesPath}faq.html" class="header-dropdown-item">Вопрос-ответ</a>
                <a href="${pagesPath}details.html" class="header-dropdown-item">Реквизиты</a>
                <a href="${pagesPath}safety.html" class="header-dropdown-item">Охрана труда</a>
            </div>
        </div>
    `;
    
    // Render mobile menu outside header container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'header-mobile-menu';
    mobileMenu.id = 'mobile-menu';
    mobileMenu.innerHTML = `
            <nav class="header-mobile-nav">
                <a href="${pagesPath}services.html" class="header-mobile-nav-link">Экспертизы</a>
                <a href="${pagesPath}services.html?category=evaluation" class="header-mobile-nav-link">Оценка</a>
                <a href="${pagesPath}services.html?category=laboratory" class="header-mobile-nav-link">Лаб. исследования</a>
                <a href="${pagesPath}blog.html" class="header-mobile-nav-link">Блог</a>
                <a href="${pagesPath}about.html" class="header-mobile-nav-link">Компания</a>
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
                        <a href="${pagesPath}dashboard.html" class="header-mobile-action" title="Личный кабинет">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span>Личный кабинет</span>
                        </a>
                        <a href="${pagesPath}cart.html" class="header-mobile-action" title="Корзина">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span>Корзина${cartItems.length > 0 ? ` (${cartItems.length})` : ''}</span>
                        </a>
                    ` : `
                        <a href="${pagesPath}login.html" class="header-mobile-action" title="Войти">
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
            dropdownItem.addEventListener('mouseleave', hideMenu);
            dropdownMenu.addEventListener('mouseenter', showMenu);
            dropdownMenu.addEventListener('mouseleave', hideMenu);
        }
    });
}

// Scroll handling for header rounding
function setupTopInfoBarScroll() {
    const topInfoBar = document.querySelector('.top-info-bar');
    const header = document.querySelector('header');
    if (!topInfoBar || !header) return;
    
    let lastScrollTop = 0;
    let rafId = null;
    
    const updateHeader = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Get top bar position and height
        const topInfoBarRect = topInfoBar.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        
        // Calculate distance between top bar bottom and header top
        const distanceToTopBar = headerRect.top - (topInfoBarRect.bottom);
        
        // Hide/show top-info-bar based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // Scrolling down - hide top-info-bar
            topInfoBar.classList.add('top-info-bar-hidden');
        } else if (scrollTop < lastScrollTop || scrollTop <= 10) {
            // Scrolling up or at top - show top-info-bar
            topInfoBar.classList.remove('top-info-bar-hidden');
        }
        
        // Round top corners only when distance to top bar is >= 10px
        // Remove rounding when distance is less than 10px OR when scrollTop is very small
        // This ensures rounding is removed immediately when scrolling up fast
        if (scrollTop <= 15 || distanceToTopBar < 10) {
            // If scroll is very close to top, always remove rounding
            // Also remove if distance is less than 10px
            header.classList.remove('header-rounded-top');
        } else if (distanceToTopBar >= 10) {
            header.classList.add('header-rounded-top');
        } else {
            header.classList.remove('header-rounded-top');
        }
        
        lastScrollTop = scrollTop;
        rafId = null;
    };
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // If we're near the top (within 30px), update immediately for better responsiveness
        // This ensures rounding is removed quickly when scrolling up fast
        if (scrollTop <= 30) {
            updateHeader();
        } else {
            // For normal scrolling, use RAF for performance
            if (rafId === null) {
                rafId = requestAnimationFrame(updateHeader);
            }
        }
    }, { passive: true });
    
    // Also check on initial load
    updateHeader();
}

// Ensure selectCity is set after all scripts are loaded
// This will override any other selectCity function
(function() {
    // Store the original selectCity from header.js
    const headerSelectCity = window.selectCity;
    
    // Override on window load to ensure it's set after all scripts
    if (document.readyState === 'complete') {
        if (headerSelectCity) {
            window.selectCity = headerSelectCity;
        }
    } else {
        window.addEventListener('load', function() {
            if (headerSelectCity) {
                window.selectCity = headerSelectCity;
            }
        });
    }
})();

// Render header and top info bar on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initCity();
        renderTopInfoBar();
        renderHeader();
        setupDropdownBlur();
        setupTopInfoBarScroll();
        // Ensure selectCity is set after DOM is ready
        if (typeof window.selectCity === 'undefined' || !window.selectCity.toString().includes('petro-expert.com')) {
            // Re-define if it was overwritten
            window.selectCity = function(cityId, cityName) {
                console.log('selectCity called:', cityId, cityName);
                document.querySelectorAll('.city-selector').forEach(sel => sel.classList.remove('active'));
                if (cityId === 'moscow') {
                    console.log('Redirecting to Moscow site...');
                    window.location.href = 'https://petro-expert.com/';
                    return;
                }
                localStorage.setItem('selectedCity', cityId);
                localStorage.setItem('selectedCityName', cityName);
                console.log('City saved to localStorage:', cityId, cityName);
                updatePageTitles(cityName);
                renderTopInfoBar();
                setTimeout(() => {
                    updatePageTitles(cityName);
                    console.log('Page titles updated after timeout');
                }, 100);
                if (window.location.pathname.includes('services.html') && typeof loadServices === 'function') {
                    loadServices();
                }
            };
        }
    });
} else {
    initCity();
    renderTopInfoBar();
    renderHeader();
    setupDropdownBlur();
    setupTopInfoBarScroll();
}

// Close dropdown menus on click outside
if (document.body) {
    document.body.addEventListener('click', (e) => {
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

// Toggle mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const toggle = document.querySelector('.header-menu-toggle');
    const body = document.body;
    
    if (menu && toggle) {
        const isOpen = menu.classList.contains('active');
        
        if (isOpen) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            body.style.overflow = '';
        } else {
            menu.classList.add('active');
            toggle.classList.add('active');
            body.style.overflow = 'hidden';
        }
    }
}

// Toggle search field
function toggleSearchField(e) {
    e.preventDefault();
    const searchContainer = document.querySelector('.header-search-container');
    const searchField = document.querySelector('.header-search-field');
    const hideableLinks = document.querySelectorAll('.header-nav-link-hideable');
    const hideableItems = document.querySelectorAll('.header-nav-item-hideable');
    
    if (searchContainer && searchField) {
        const isActive = searchContainer.classList.contains('active');
        
        if (isActive) {
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
                searchInput.blur();
            }
        } else {
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
                const searchInput = document.getElementById('headerSearchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }, 300);
        }
    }
}

// City selector functions - make globally available
window.toggleCityDropdown = function(e) {
    if (e) {
        e.stopPropagation();
    }
    const dropdown = document.getElementById('cityDropdown');
    const button = e ? e.target.closest('.city-selector-btn') : document.querySelector('.city-selector-btn');
    const selector = button ? button.closest('.city-selector') : null;
    
    if (dropdown && button && selector) {
        const isActive = selector.classList.contains('active');
        
        // Close all dropdowns
        document.querySelectorAll('.city-selector').forEach(sel => sel.classList.remove('active'));
        
        // Toggle current dropdown
        if (!isActive) {
            selector.classList.add('active');
        }
    }
};

// Make selectCity globally available - this will override any other selectCity function
window.selectCity = function(cityId, cityName) {
    // Close dropdown first
    document.querySelectorAll('.city-selector').forEach(sel => sel.classList.remove('active'));
    
    // If Moscow is selected, redirect to external site immediately
    if (cityId === 'moscow') {
        window.location.href = 'https://petro-expert.com/';
        return;
    }
    
    // Save selected city FIRST
    localStorage.setItem('selectedCity', cityId);
    localStorage.setItem('selectedCityName', cityName);
    
    // Update page titles with selected city immediately
    updatePageTitles(cityName);
    
    // Re-render top info bar to ensure button text is updated immediately
    // This will read the city from localStorage that we just saved
    renderTopInfoBar();
    
    // Update page titles again after renderTopInfoBar (in case elements were recreated)
    setTimeout(() => {
        updatePageTitles(cityName);
    }, 150);
    
    // Reload services if on services page
    if (window.location.pathname.includes('services.html') && typeof loadServices === 'function') {
        loadServices();
    }
};

function updatePageTitles(cityName) {
    // Update titles on service detail pages
    // Only update titles that have class autotechnical-title or are h1 elements
    const titleElements = document.querySelectorAll('.autotechnical-title, h1.autotechnical-title');
    
    titleElements.forEach(titleElement => {
        if (titleElement) {
            let currentText = titleElement.textContent.trim();
            
            // Remove all occurrences of city patterns first (including duplicates)
            // Match any city name after dash/hyphen: "– City" or "- City" at the end
            // Also match patterns like "– Санкт- Санкт- ..." (duplicate patterns)
            currentText = currentText.replace(/[–-]\s*([А-ЯЁ][А-ЯЁа-яё\s–-]+?)(?:\s*[–-]\s*\1)*\s*$/g, '');
            
            // Trim any trailing spaces or dashes
            currentText = currentText.replace(/\s*[–-]\s*$/, '').trim();
            
            // Add the new city name
            const updatedText = `${currentText} – ${cityName}`;
            
            if (updatedText !== titleElement.textContent.trim()) {
                titleElement.textContent = updatedText;
            }
        }
    });
}

// Initialize city on page load
function initCity() {
    // Set default city if not set
    if (!localStorage.getItem('selectedCityName')) {
        localStorage.setItem('selectedCityName', 'Санкт-Петербург');
        localStorage.setItem('selectedCity', 'spb');
    }
    
    // Update page titles with selected city after DOM is ready
    // Use longer timeout to ensure all elements are loaded
    setTimeout(() => {
        const selectedCityName = localStorage.getItem('selectedCityName');
        if (selectedCityName) {
            updatePageTitles(selectedCityName);
        }
    }, 200);
    
    // Also try after a longer delay in case of lazy loading
    setTimeout(() => {
        const selectedCityName = localStorage.getItem('selectedCityName');
        if (selectedCityName) {
            updatePageTitles(selectedCityName);
        }
    }, 500);
}

// Close dropdowns on click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.city-selector')) {
        document.querySelectorAll('.city-selector').forEach(sel => sel.classList.remove('active'));
    }
});
