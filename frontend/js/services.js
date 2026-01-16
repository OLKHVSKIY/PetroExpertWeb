// Services Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    // Check if service parameter is present (for redirecting to service detail page)
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam) {
        redirectToService(serviceParam);
        return;
    }
    
    loadServices();
    setupFilters();
});

// Redirect to service detail page by service parameter
async function redirectToService(serviceParam) {
    const container = document.getElementById('servicesGrid');
    if (container) {
        container.innerHTML = '<div class="spinner"></div>';
    }

    try {
        // Map service parameter to service search criteria
        const serviceMap = {
            'autotechnical': ['Автотехническая экспертиза после ДТП', 'Автотехническая', 'ДТП'],
            'autocommodity': ['Автотовароведческая экспертиза', 'Автотовароведческая'],
            'hydrogeological': ['Гидрогеологическая экспертиза', 'Гидрогеологическая', 'скважин'],
            'land': ['Землеустроительная', 'земельная экспертиза'],
            'forensic': ['Криминалистическая экспертиза', 'Криминалистическая'],
            'linguistic': ['Лингвистическая экспертиза', 'Лингвистическая'],
            'equipment': ['Независимая экспертиза оборудования', 'оборудования'],
            'handwriting': ['Почерковедческая экспертиза', 'Почерковедческая'],
            'psychological': ['Психологическая экспертиза', 'Психологическая'],
            'laboratory': ['Лабораторные исследования', 'Лабораторные'],
            'business-valuation': ['Оценка рыночной стоимости бизнеса', 'бизнеса'],
            'buildings-valuation': ['Оценка рыночной стоимости зданий', 'зданий и домов'],
            'ip-valuation': ['Оценка стоимости интеллектуальной собственности', 'интеллектуальной'],
            'real-estate-valuation': ['Оценка стоимости недвижимости', 'недвижимости'],
            'land-valuation': ['Оценка земельного участка', 'земельного'],
            'machinery-valuation': ['Определение стоимости машин', 'машин и оборудования'],
            'property-valuation': ['Оценка рыночной стоимости недвижимости', 'недвижимости'],
            'enterprise-valuation': ['Оценка рыночной стоимости предприятия', 'предприятия'],
            'repair-valuation': ['Оценка стоимости восстановительного ремонта', 'восстановительного ремонта'],
            'movable-valuation': ['Оценка стоимости иного движимого имущества', 'движимого']
        };

        const searchTerms = serviceMap[serviceParam];
        if (!searchTerms || searchTerms.length === 0) {
            // If service not found in map, load all services
            console.warn(`Service parameter "${serviceParam}" not found in map`);
            loadServices();
            setupFilters();
            return;
        }

        // Load all services and find matching one
        const services = await window.API.services.getAll();
        const service = services.find(s => {
            const titleLower = s.title.toLowerCase();
            return searchTerms.some(term => titleLower.includes(term.toLowerCase())) ||
                   s.slug?.toLowerCase().includes(serviceParam.toLowerCase());
        });

        if (service) {
            // Redirect to service detail page (relative path works from pages/)
            window.location.href = `service-detail.html?id=${service._id}`;
        } else {
            // If service not found, load all services
            console.warn(`Service "${serviceParam}" not found in services list`);
            loadServices();
            setupFilters();
        }
    } catch (error) {
        console.error('Error redirecting to service:', error);
        // On error, load all services
        loadServices();
        setupFilters();
    }
}

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
