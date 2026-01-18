// City data configuration
const cityData = {
    spb: {
        name: 'Санкт-Петербург',
        address: 'г. Санкт-Петербург, ул. Рубинштейна, 34',
        phone: '+7 (812) 704-87-01',
        phoneLink: '+78127048701',
        email: 'info3@petroexpert.ru'
    },
    moscow: {
        name: 'Москва',
        address: 'г. Москва, ул. Палиха, д. 14, офис 27',
        phone: '+7(926) 530-09-56',
        phoneLink: '+79265300956',
        email: 'mail@petroexpert.ru'
    },
    petrozavodsk: {
        name: 'Петрозаводск',
        address: 'г. Петрозаводск, пр.Ленина, 21, оф. 143 (г-ца Северная)',
        phone: '+7 (931) 701-33-24',
        phoneLink: '+79317013324',
        email: 'kri@petroexpert.ru'
    },
    novgorod: {
        name: 'Великий Новгород',
        address: 'г. Великий Новгород, Воскресенский бульвар, д. 4, офис 2-19',
        phone: '+7 (8162) 55-55-88',
        phoneLink: '+78162555588',
        email: 'vn@petroexpert.ru'
    }
};

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
    
    // Get city data
    const city = cityData[selectedCity] || cityData.spb;
    const cityButtonText = city.name;

    // Generate email item HTML (only if email exists)
    const emailItem = city.email ? `
        <div class="top-info-item">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <a href="mailto:${city.email}">${city.email}</a>
        </div>
    ` : '';

    topInfoBar.innerHTML = `
        <div class="top-info-bar">
            <div class="container">
                <div class="top-info-content">
                    <div class="top-info-item">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>${city.address}</span>
                    </div>
                    <div class="top-info-item">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <a href="tel:${city.phoneLink}">${city.phone}</a>
                    </div>
                    ${emailItem}
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
                        <a href="${isInPages ? '../index.html#services-preview' : '#services-preview'}" class="header-nav-link header-nav-link-dropdown" id="expertiseLink">
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
                    <a href="#" class="header-nav-link">Калькулятор</a>
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
                    <a href="#" class="header-action" title="Контакты" onclick="openContactsModal(event); return false;">
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
                        <a href="#" class="header-action" title="Войти" onclick="openLoginModal(event); return false;">
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
                <a href="${pagesPath}linguistic-expertise.html" class="header-dropdown-item">Лингвистическая экспертиза</a>
                <a href="${pagesPath}independent-equipment-expertise.html" class="header-dropdown-item">Независимая экспертиза оборудования любой сложности</a>
                <a href="${pagesPath}handwriting-expertise.html" class="header-dropdown-item">Почерковедческая экспертиза</a>
                <a href="${pagesPath}services.html?service=psychological" class="header-dropdown-item">Психологическая экспертиза (психолого-педагогическая)</a>
                <a href="${pagesPath}laboratory-research.html" class="header-dropdown-item">Лабораторные исследования</a>
                <a href="${isInPages ? '../index.html#services-preview' : '#services-preview'}" class="header-dropdown-item">Другие экспертизы</a>
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
                <a href="${isInPages ? '../index.html#services-preview' : '#services-preview'}" class="header-mobile-nav-link" id="mobileExpertiseLink">Экспертизы</a>
                <a href="${pagesPath}services.html?category=evaluation" class="header-mobile-nav-link">Оценка</a>
                <a href="#" class="header-mobile-nav-link">Калькулятор</a>
                <a href="${pagesPath}blog.html" class="header-mobile-nav-link">Блог</a>
                <a href="${pagesPath}about.html" class="header-mobile-nav-link">Компания</a>
                <div class="header-mobile-actions">
                    <a href="#" class="header-mobile-action" onclick="toggleSearchField(event); return false;" title="Поиск">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <span>Поиск</span>
                    </a>
                    <a href="#" class="header-mobile-action" title="Контакты" onclick="openContactsModal(event); return false;">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>Контакты</span>
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
                        <a href="#" class="header-mobile-action" title="Войти" onclick="openLoginModal(event); return false;">
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
    
    // Setup smooth scroll for expertise links
    setupExpertiseLinkScroll();
}

// Setup smooth scroll for expertise links
function setupExpertiseLinkScroll() {
    // Wait a bit for DOM to be ready
    setTimeout(() => {
        // Get expertise links
        const expertiseLink = document.getElementById('expertiseLink');
        const mobileExpertiseLink = document.getElementById('mobileExpertiseLink');
        const links = [expertiseLink, mobileExpertiseLink].filter(Boolean);
        
        links.forEach(link => {
            if (link) {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    // Check if we're on the home page
                    const isHomePage = window.location.pathname === '/' || 
                                      window.location.pathname.endsWith('index.html') ||
                                      window.location.pathname.includes('index.html');
                    
                    const isGoingToHomePage = href.includes('index.html');
                    
                    // If clicking from another page, let the browser handle the navigation
                    if (!isHomePage && isGoingToHomePage) {
                        // Store scroll intent in sessionStorage for after page load
                        sessionStorage.setItem('scrollToServices', 'true');
                        return; // Let browser navigate
                    }
                    
                    // If we're on home page, prevent default and smooth scroll
                    if (isHomePage && href.startsWith('#')) {
                        e.preventDefault();
                        const targetId = href.substring(1);
                        const targetElement = document.getElementById(targetId);
                        
                        if (targetElement) {
                            // Close mobile menu if open
                            const mobileMenu = document.getElementById('mobile-menu');
                            if (mobileMenu && mobileMenu.classList.contains('active')) {
                                if (typeof toggleMobileMenu === 'function') {
                                    toggleMobileMenu();
                                }
                            }
                            
                            // Close dropdowns
                            document.querySelectorAll('.header-nav-item-dropdown').forEach(item => {
                                item.classList.remove('active');
                            });
                            
                            // Calculate offset for fixed header
                            const header = document.querySelector('header');
                            const headerHeight = header ? header.offsetHeight : 0;
                            const topInfoBar = document.querySelector('.top-info-bar');
                            const topInfoBarHeight = topInfoBar && !topInfoBar.classList.contains('top-info-bar-hidden') ? topInfoBar.offsetHeight : 0;
                            // Увеличиваем offset, чтобы заголовок "Виды экспертиз" был виден
                            const offset = headerHeight + topInfoBarHeight + 60; // 60px для отображения заголовка
                            
                            // Smooth scroll
                            const targetPosition = targetElement.offsetTop - offset;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            }
        });
    }, 100);
    
    // Handle scroll after page load (if coming from another page)
    if (sessionStorage.getItem('scrollToServices') === 'true') {
        sessionStorage.removeItem('scrollToServices');
        
        // Wait for page to fully load
        setTimeout(() => {
            const targetElement = document.getElementById('services-preview');
            if (targetElement) {
                // Calculate offset for fixed header
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const topInfoBar = document.querySelector('.top-info-bar');
                const topInfoBarHeight = topInfoBar && !topInfoBar.classList.contains('top-info-bar-hidden') ? topInfoBar.offsetHeight : 0;
                // Увеличиваем offset, чтобы заголовок "Виды экспертиз" был виден
                const offset = headerHeight + topInfoBarHeight + 60; // 60px для отображения заголовка
                
                const targetPosition = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }
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
        preloadLoginIllustration(); // Preload login modal illustration
        initCity();
        renderTopInfoBar();
        renderHeader();
        setupDropdownBlur();
        setupTopInfoBarScroll();
        renderContactsModal();
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
    preloadLoginIllustration(); // Preload login modal illustration
    renderTopInfoBar();
    renderHeader();
    setupDropdownBlur();
    setupTopInfoBarScroll();
    renderContactsModal();
    renderLoginModal();
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

// Contacts Modal
function renderContactsModal() {
    const body = document.body;
    let modal = document.getElementById('contacts-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'contacts-modal';
        modal.className = 'modal contacts-modal';
        body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal-content contacts-modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Контакты</h3>
                <button class="modal-close" onclick="closeContactsModal()">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="modal-body contacts-modal-body">
                <div class="contact-card">
                    <h4 class="contact-city">Санкт-Петербург</h4>
                    <div class="contact-info">
                        <a href="tel:+78127048701" class="contact-phone">8 (812) 704-87-01</a>
                        <p class="contact-address">г. Санкт-Петербург, ул. Рубинштейна, 34 пер. Щербаков, 15/34 лит. А / (м. Владимирская, Достоевская)</p>
                        <p class="contact-hours">Пн-Пт: 9:00-18:00</p>
                        <a href="mailto:info7@petroexpert.ru" class="contact-email">info7@petroexpert.ru</a>
                    </div>
                </div>
                
                <div class="contact-card">
                    <h4 class="contact-city">Петрозаводск</h4>
                    <div class="contact-info">
                        <a href="tel:+79317013324" class="contact-phone">+7 (931) 701-33-24</a>
                        <p class="contact-address">г. Петрозаводск, пр.Ленина, 21, оф. 143 (гостиница Северная)</p>
                        <p class="contact-hours">Пн-Пт: 9:00-18:00</p>
                        <a href="mailto:krl@petroexpert.ru" class="contact-email">krl@petroexpert.ru</a>
                    </div>
                </div>
                
                <div class="contact-card">
                    <h4 class="contact-city">Великий Новгород</h4>
                    <div class="contact-info">
                        <a href="tel:+78162555588" class="contact-phone">+7 (8162) 55-55-88, 78-78-70</a>
                        <p class="contact-address">г. Великий Новгород, Воскресенский бульвар, д. 4, офис 2-19</p>
                        <p class="contact-hours">Пн-Пт: 9:00-18:00</p>
                        <a href="mailto:vn@petroexpert.ru" class="contact-email">vn@petroexpert.ru</a>
                    </div>
                </div>
                
                <div class="contact-card">
                    <h4 class="contact-city">Москва</h4>
                    <div class="contact-info">
                        <a href="tel:+74956629861" class="contact-phone">+7 (495) 662-98-61; +7(901) 541-27-71; +7(926) 530-09-56</a>
                        <p class="contact-address">г. Москва, ул. Палиха, д. 14, офис 27 (м. Менделеевская, Новослободская)</p>
                        <p class="contact-hours">Пн-Пт: 9:00-18:00</p>
                        <a href="mailto:mail@petroexpert.ru" class="contact-email">mail@petroexpert.ru</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeContactsModal();
        }
    });
}

function openContactsModal(e) {
    if (e) {
        e.preventDefault();
    }
    const modal = document.getElementById('contacts-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        renderContactsModal();
        setTimeout(() => {
            const newModal = document.getElementById('contacts-modal');
            if (newModal) {
                newModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }, 10);
    }
}

function closeContactsModal() {
    const modal = document.getElementById('contacts-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Preload login modal illustration image
function preloadLoginIllustration() {
    const illustrationUrl = 'https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png';
    const img = new Image();
    img.src = illustrationUrl;
}

// Preload illustration when script loads
preloadLoginIllustration();

// Login Modal (Glassmorphism)
function renderLoginModal() {
    const body = document.body;
    let modal = document.getElementById('login-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'login-modal';
        modal.className = 'modal login-modal';
        body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="login-container-wrapper">
            <div class="login-container-glass">
                <div class="circle circle-one"></div>
                <div class="login-form-container">
                    <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" class="illustration" loading="eager" />
                    <h1 class="login-title opacity">ВХОД</h1>
                    <form id="loginModalForm">
                        <div class="input-wrapper">
                            <input type="text" name="caseNumber" placeholder="Номер дела" required />
                        </div>
                        <div class="input-wrapper">
                            <input type="text" name="lastName" placeholder="Фамилия истца/ответчика" required />
                        </div>
                        <div class="input-wrapper">
                            <input type="tel" name="phone" id="loginPhoneInput" placeholder="+7 (___) ___-__-__" required />
                        </div>
                        <button type="submit" class="opacity login-submit-btn">Войти</button>
                    </form>
                    <p class="login-info-text opacity">Войдите в Личный кабинет, чтобы отслеживать статус вашего дела и получать важную информацию о нём</p>
                    <button class="modal-close login-modal-close" onclick="closeLoginModal()">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="circle circle-two"></div>
            </div>
        </div>
    `;
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLoginModal();
        }
    });
    
    // Handle form submission
    const form = modal.querySelector('#loginModalForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you can add login logic
            console.log('Login form submitted');
        });
    }
    
    // Apply phone mask to login phone input
    const loginPhoneInput = modal.querySelector('#loginPhoneInput');
    if (loginPhoneInput) {
        loginPhoneInput.addEventListener('input', function(e) {
            let value = e.target.value;
            let digits = value.replace(/\D/g, '');
            
            // Always start with +7
            if (digits.length === 0) {
                e.target.value = '';
                return;
            }
            
            // If user tries to delete +7, prevent it
            if (digits.length === 1 && !value.startsWith('+7')) {
                e.target.value = '+7';
                return;
            }
            
            // Extract digits after 7 (skip the first 7)
            let digitsAfter7 = digits.length > 1 ? digits.substring(1) : '';
            
            // Format the phone number
            if (digitsAfter7.length === 0) {
                value = '+7';
            } else if (digitsAfter7.length <= 3) {
                value = '+7 (' + digitsAfter7;
            } else if (digitsAfter7.length <= 6) {
                value = '+7 (' + digitsAfter7.substring(0, 3) + ') ' + digitsAfter7.substring(3);
            } else if (digitsAfter7.length <= 8) {
                value = '+7 (' + digitsAfter7.substring(0, 3) + ') ' + digitsAfter7.substring(3, 6) + '-' + digitsAfter7.substring(6);
            } else {
                value = '+7 (' + digitsAfter7.substring(0, 3) + ') ' + digitsAfter7.substring(3, 6) + '-' + digitsAfter7.substring(6, 8) + '-' + digitsAfter7.substring(8, 10);
            }
            
            e.target.value = value;
        });
        
        loginPhoneInput.addEventListener('keydown', function(e) {
            // Prevent deleting +7
            if ((e.key === 'Backspace' || e.key === 'Delete') && e.target.value === '+7') {
                e.preventDefault();
                return false;
            }
        });
    }
}

function openLoginModal(e) {
    if (e) {
        e.preventDefault();
    }
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('login-modal-open');
        document.body.style.overflow = 'hidden';
    } else {
        renderLoginModal();
        setTimeout(() => {
            const newModal = document.getElementById('login-modal');
            if (newModal) {
                newModal.classList.add('active');
                document.body.classList.add('login-modal-open');
                document.body.style.overflow = 'hidden';
            }
        }, 10);
    }
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('login-modal-open');
        document.body.style.overflow = '';
    }
}

function openRegisterModal() {
    // Placeholder for register modal
    console.log('Register modal - to be implemented');
}

// Make functions globally available
window.openContactsModal = openContactsModal;
window.closeContactsModal = closeContactsModal;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;

// Close dropdowns on click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.city-selector')) {
        document.querySelectorAll('.city-selector').forEach(sel => sel.classList.remove('active'));
    }
});
