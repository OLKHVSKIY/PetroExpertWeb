// Contact Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    renderOffices();
    setupContactForm();
    setupCallbackForm();
});

const offices = [
    {
        city: 'Санкт-Петербург',
        address: 'ул. Рубинштейна, 34 пер. Щербаков, 15/34 лит. А',
        metro: 'м. Владимирская, Достоевская',
        phone: '8 (812) 331-81-80',
        email: 'info@petroexpert.ru',
        hours: 'Пн-Пт: 9:00-18:00, Сб-Вс: выходной'
    },
    {
        city: 'Москва',
        address: 'ул. Палиха, д. 14, офис 27',
        metro: 'м. Менделеевская, Новослободская',
        phone: '8 (495) 662-98-61',
        email: 'mail@petroexpert.ru',
        hours: 'Пн-Пт: 9:00-18:00, Сб-Вс: выходной'
    },
    {
        city: 'Великий Новгород',
        address: 'Воскресенский бульвар, д. 4, офис 2-19',
        phone: '8 (8162) 55-55-88',
        email: 'vn@petroexpert.ru',
        hours: 'Пн-Пт: 9:00-18:00, Сб-Вс: выходной'
    },
    {
        city: 'Петрозаводск',
        address: 'пр.Ленина, 21, оф. 143 (гостиница Северная)',
        phone: '8 (931) 701-33-24',
        email: 'krl@petroexpert.ru',
        hours: 'Пн-Пт: 9:00-18:00, Сб-Вс: выходной'
    }
];

function renderOffices() {
    const container = document.getElementById('officesList');
    if (!container) return;

    container.innerHTML = offices.map(office => `
        <div class="office-card">
            <h3>${office.city}</h3>
            <div class="office-info">
                <div class="office-info-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>${office.address}</span>
                </div>
                ${office.metro ? `<div class="office-metro">${office.metro}</div>` : ''}
                <div class="office-info-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <a href="tel:${office.phone.replace(/\s/g, '')}">${office.phone}</a>
                </div>
                <div class="office-info-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <a href="mailto:${office.email}">${office.email}</a>
                </div>
                <div class="office-info-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>${office.hours}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    const alertDiv = document.getElementById('contactFormAlert');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        try {
            await window.API.contact.sendForm(data);
            alertDiv.innerHTML = '<div class="alert alert-success">Сообщение отправлено успешно!</div>';
            form.reset();
            setTimeout(() => {
                alertDiv.innerHTML = '';
            }, 5000);
        } catch (error) {
            alertDiv.innerHTML = '<div class="alert alert-error">Ошибка при отправке сообщения</div>';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
        }
    });
}

function setupCallbackForm() {
    const form = document.getElementById('callbackForm');
    const alertDiv = document.getElementById('callbackFormAlert');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        try {
            await window.API.contact.requestCallback(data);
            alertDiv.innerHTML = '<div class="alert alert-success">Запрос на звонок принят!</div>';
            form.reset();
            setTimeout(() => {
                alertDiv.innerHTML = '';
            }, 5000);
        } catch (error) {
            alertDiv.innerHTML = '<div class="alert alert-error">Ошибка при отправке запроса</div>';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Заказать звонок';
        }
    });
}
