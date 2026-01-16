// Footer Component
function renderFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-content">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-column">
                        <h3>ПетроЭксперт</h3>
                        <p>Центр независимой профессиональной экспертизы. Работаем с 2004 года.</p>
                        <div class="footer-social">
                            <a href="#" class="footer-social-link">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#" class="footer-social-link">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
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
