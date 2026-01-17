// Footer Component
function renderFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    // Determine base path for assets
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';

    footer.innerHTML = `
        <div class="footer-content">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-column">
                        <h3>ПетроЭксперт</h3>
                        <p>Центр независимой профессиональной экспертизы. Работаем с 2004 года.</p>
                        <div class="footer-social">
                            <a href="https://t.me/PetroExpert_ru" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Telegram">
                                <img src="${basePath}assets/icons/social-media/telegram.png" alt="Telegram" class="footer-social-icon">
                            </a>
                            <a href="https://www.youtube.com/channel/UCRU5f7W6veiAsLQmCnJxDQg/videos" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="YouTube">
                                <img src="${basePath}assets/icons/social-media/youtube.png" alt="YouTube" class="footer-social-icon">
                            </a>
                            <a href="https://dzen.ru/3318180" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Дзен">
                                <img src="${basePath}assets/icons/social-media/yandex.png" alt="Дзен" class="footer-social-icon">
                            </a>
                            <a href="https://vk.com/petroexpert_expertiza?t2fs=a1a3bdee38dcb40563_2" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="VK">
                                <img src="${basePath}assets/icons/social-media/vk.png" alt="VK" class="footer-social-icon">
                            </a>
                        </div>
                    </div>
                    <div class="footer-column">
                        <h4>Услуги</h4>
                        <ul class="footer-links">
                            <li><a href="pages/services.html?category=expertise" class="footer-link">Экспертизы</a></li>
                            <li><a href="pages/services.html?category=evaluation" class="footer-link">Оценка</a></li>
                            <li><a href="pages/services.html?category=laboratory" class="footer-link">Лабораторные исследования</a></li>
                            <li><a href="pages/services.html" class="footer-link">Все услуги</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Компания</h4>
                        <ul class="footer-links">
                            <li><a href="pages/about.html" class="footer-link">Компания</a></li>
                            <li><a href="pages/blog.html" class="footer-link">Блог</a></li>
                            <li><a href="pages/contact.html" class="footer-link">Контакты</a></li>
                            <li><a href="#" class="footer-link">Вакансии</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Контакты</h4>
                        <div class="footer-contact-item">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>г. Санкт-Петербург, ул. Рубинштейна, 34</span>
                        </div>
                        <div class="footer-contact-item">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <a href="tel:+78123318180">8 (812) 331-81-80</a>
                        </div>
                        <div class="footer-contact-item">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <a href="mailto:info@petroexpert.ru">info@petroexpert.ru</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p>© ${new Date().getFullYear()} ООО "Центр независимой профессиональной экспертизы "ПетроЭксперт". Вся информация на сайте носит информационный характер и не является публичной офертой.</p>
            </div>
        </div>
    `;
}

// City Modal
function renderCityModal() {
    const body = document.body;
    const modal = document.createElement('div');
    modal.id = 'city-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Выберите город</h3>
                <button class="modal-close" onclick="closeCityModal()">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <button class="modal-city-btn" onclick="selectCity('spb', 'Санкт-Петербург')">Санкт-Петербург</button>
                <button class="modal-city-btn" onclick="selectCity('moscow', 'Москва')">Москва</button>
                <button class="modal-city-btn" onclick="selectCity('novgorod', 'Великий Новгород')">Великий Новгород</button>
                <button class="modal-city-btn" onclick="selectCity('petrozavodsk', 'Петрозаводск')">Петрозаводск</button>
            </div>
        </div>
    `;
    body.appendChild(modal);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCityModal();
        }
    });
}

// This function is now defined in header.js as window.selectCity
// Keeping this comment for reference but the actual implementation is in header.js

function openSearchModal() {
    // TODO: Implement search modal
    const searchQuery = prompt('Введите поисковый запрос:');
    if (searchQuery) {
        window.location.href = `pages/services.html?search=${encodeURIComponent(searchQuery)}`;
    }
}

// Render footer on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderFooter();
        renderCityModal();
    });
} else {
    renderFooter();
    renderCityModal();
}
