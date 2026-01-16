// Service Detail Page Scripts - Modern Version
document.addEventListener('DOMContentLoaded', () => {
    loadServiceDetail();
    setupScrollAnimations();
});

async function loadServiceDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');
    const serviceParam = urlParams.get('service');

    // If service parameter is provided, find service by slug or name
    if (serviceParam && !serviceId) {
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
                console.warn(`Service parameter "${serviceParam}" not found in map`);
                const titleEl = document.getElementById('serviceDetailTitle');
                if (titleEl) {
                    titleEl.textContent = 'Услуга не найдена';
                }
                return;
            }

            // Load all services and find matching one
            const services = await window.API.services.getAll();
            
            if (!services || services.length === 0) {
                console.warn('No services found in database');
                const titleEl = document.getElementById('serviceDetailTitle');
                if (titleEl) {
                    titleEl.textContent = 'Услуга не найдена';
                }
                return;
            }

            const foundService = services.find(s => {
                if (!s || !s.title) return false;
                const titleLower = s.title.toLowerCase();
                return searchTerms.some(term => titleLower.includes(term.toLowerCase())) ||
                       s.slug?.toLowerCase().includes(serviceParam.toLowerCase());
            });

            if (!foundService) {
                console.warn(`Service with parameter "${serviceParam}" not found. Available services:`, services.map(s => s.title));
                const titleEl = document.getElementById('serviceDetailTitle');
                if (titleEl) {
                    titleEl.textContent = 'Услуга не найдена';
                }
                return;
            }

            // Use slug or ID for the service
            const serviceIdentifier = foundService.slug || foundService._id;
            if (!serviceIdentifier) {
                console.error('Service found but has no ID or slug:', foundService);
                const titleEl = document.getElementById('serviceDetailTitle');
                if (titleEl) {
                    titleEl.textContent = 'Ошибка загрузки услуги';
                }
                return;
            }

            try {
                const service = await window.API.services.getById(serviceIdentifier);
                if (service) {
                    renderService(service);
                    return;
                } else {
                    throw new Error('Service data is empty');
                }
            } catch (apiError) {
                console.error('Error fetching service by ID/slug:', apiError);
                // Try to use foundService directly if API fails
                if (foundService.title && foundService.description) {
                    renderService(foundService);
                    return;
                }
                throw apiError;
            }
        } catch (error) {
            console.error('Error loading service by parameter:', error);
            const titleEl = document.getElementById('serviceDetailTitle');
            if (titleEl) {
                titleEl.textContent = 'Ошибка загрузки услуги';
            }
            return;
        }
    }

    if (!serviceId) {
        const titleEl = document.getElementById('serviceDetailTitle');
        if (titleEl) {
            titleEl.textContent = 'Услуга не найдена';
        }
        return;
    }

    try {
        const service = await window.API.services.getById(serviceId);
        renderService(service);
    } catch (error) {
        console.error('Error loading service:', error);
        const titleEl = document.getElementById('serviceDetailTitle');
        if (titleEl) {
            titleEl.textContent = 'Ошибка загрузки услуги';
        }
    }
}

function renderService(service) {
    // Update page title
    document.title = `${service.title} - ПетроЭксперт`;

    // Update hero image
    const heroImage = document.getElementById('serviceDetailImage');
    if (service.image && heroImage) {
        heroImage.src = service.image;
        heroImage.alt = service.title;
        heroImage.style.display = 'block';
    }

    // Update title
    const titleEl = document.getElementById('serviceDetailTitle');
    if (titleEl) {
        titleEl.textContent = service.title;
    }

    // Update short description
    const shortDescEl = document.getElementById('serviceDetailShortDesc');
    if (service.shortDescription && shortDescEl) {
        shortDescEl.textContent = service.shortDescription;
        shortDescEl.style.display = 'block';
    }

    // Update meta information
    const metaEl = document.getElementById('serviceDetailMeta');
    if (metaEl) {
        const formattedPrice = service.priceFrom 
            ? `${service.priceFrom.toLocaleString('ru-RU')} ₽`
            : 'По запросу';
        const deadline = service.deadline || service.duration || 'По договоренности';

        let metaHTML = '';
        
        if (service.priceFrom) {
            metaHTML += `
                <div class="service-detail-meta-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>от ${formattedPrice}</span>
                </div>
            `;
        }

        metaHTML += `
            <div class="service-detail-meta-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Срок: ${deadline}</span>
            </div>
        `;

        metaEl.innerHTML = metaHTML;
    }

    // Update description
    const descEl = document.getElementById('serviceDetailDescription');
    if (descEl && service.description) {
        if (service.description.includes('<p>') || service.description.includes('<br>')) {
            descEl.innerHTML = service.description;
        } else {
            descEl.innerHTML = `<p>${service.description}</p>`;
        }
    }

    // Update features
    const featuresContainer = document.getElementById('serviceDetailFeatures');
    const featuresList = document.getElementById('serviceDetailFeaturesList');
    
    if (service.features && service.features.length > 0 && featuresContainer && featuresList) {
        featuresList.innerHTML = service.features.map((feature, index) => `
            <li class="service-detail-feature" style="animation-delay: ${0.1 * (index + 1)}s;">
                <div class="service-detail-feature-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <div class="service-detail-feature-text">${feature}</div>
            </li>
        `).join('');
        
        featuresContainer.style.display = 'block';
    } else if (featuresContainer) {
        featuresContainer.style.display = 'none';
    }

    // Setup animations after content is loaded
    setupScrollAnimations();
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe elements with animations
    document.querySelectorAll('.service-detail-feature').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}
