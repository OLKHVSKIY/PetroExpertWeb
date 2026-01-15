// Service Detail Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    loadServiceDetail();
});

async function loadServiceDetail() {
    const container = document.getElementById('serviceDetail');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    if (!serviceId) {
        container.innerHTML = '<div class="container"><h1>Услуга не найдена</h1></div>';
        return;
    }

    try {
        const service = await window.API.services.getById(serviceId);

        container.innerHTML = `
            <div class="service-detail">
                ${service.image ? `<img src="${service.image}" alt="${service.title}" class="service-detail-image">` : ''}
                <h1 class="service-detail-title">${service.title}</h1>
                <div class="service-detail-description">${service.description}</div>
                
                ${service.features && service.features.length > 0 ? `
                    <div class="service-detail-features">
                        <h2>Особенности услуги</h2>
                        <ul class="service-detail-features-list">
                            ${service.features.map(feature => `
                                <li class="service-detail-feature">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}

                <div class="service-detail-cta">
                    <h2>Заказать услугу</h2>
                    <p>Свяжитесь с нами для расчета стоимости и получения консультации</p>
                    <div class="service-detail-cta-buttons">
                        <a href="tel:+78123318180" class="btn btn-primary">Позвонить: 8 (812) 331-81-80</a>
                        <a href="contact.html" class="btn btn-outline">Заполнить заявку</a>
                    </div>
                </div>
            </div>
        `;

        // Update page title
        document.title = `${service.title} - ПетроЭксперт`;
    } catch (error) {
        console.error('Error loading service:', error);
        container.innerHTML = '<div class="container"><h1>Ошибка загрузки услуги</h1></div>';
    }
}
