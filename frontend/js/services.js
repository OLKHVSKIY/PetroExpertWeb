// Services Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    setupFilters();
});

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            loadServices(category);
        });
    });

    // Check URL params
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        const btn = document.querySelector(`[data-category="${category}"]`);
        if (btn) {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadServices(category);
        }
    }
}

async function loadServices(category = '') {
    const container = document.getElementById('servicesGrid');
    if (!container) return;

    container.innerHTML = '<div class="spinner"></div>';

    try {
        const params = {};
        if (category) {
            params.category = category;
        }
        const services = await window.API.services.getAll(params);

        if (services.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p>Услуги не найдены</p>
                </div>
            `;
            return;
        }

        container.innerHTML = services.map(service => `
            <a href="service-detail.html?id=${service._id}" class="service-item">
                ${service.image ? `<img src="${service.image}" alt="${service.title}" class="service-item-image">` : ''}
                <div class="service-item-content">
                    <h3 class="service-item-title">${service.title}</h3>
                    <p class="service-item-description">${service.shortDescription || service.description.substring(0, 150)}...</p>
                    <div class="service-item-footer">
                        <span class="service-item-link">Подробнее →</span>
                        ${service.priceFrom ? `<span class="service-item-price">от ${service.priceFrom.toLocaleString()} ₽</span>` : ''}
                    </div>
                </div>
            </a>
        `).join('');
    } catch (error) {
        console.error('Error loading services:', error);
        container.innerHTML = `
            <div class="empty-state">
                <p>Ошибка загрузки услуг</p>
            </div>
        `;
    }
}
