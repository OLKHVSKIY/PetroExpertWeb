// About Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    renderOffices();
});

const offices = [
    {
        city: 'Санкт-Петербург',
        address: 'ул. Рубинштейна, 34',
        phone: '8 (812) 331-81-80',
        email: 'info@petroexpert.ru'
    },
    {
        city: 'Москва',
        address: 'ул. Палиха, д. 14, офис 27',
        phone: '8 (495) 662-98-61',
        email: 'mail@petroexpert.ru'
    },
    {
        city: 'Великий Новгород',
        address: 'Воскресенский бульвар, д. 4, офис 2-19',
        phone: '8 (8162) 55-55-88',
        email: 'vn@petroexpert.ru'
    },
    {
        city: 'Петрозаводск',
        address: 'пр.Ленина, 21, оф. 143',
        phone: '8 (931) 701-33-24',
        email: 'krl@petroexpert.ru'
    }
];

function renderOffices() {
    const container = document.getElementById('officesGrid');
    if (!container) return;

    container.innerHTML = offices.map(office => `
        <div class="office-card-about">
            <h4>${office.city}</h4>
            <p>${office.address}</p>
            <p>${office.phone}</p>
            <p>${office.email}</p>
        </div>
    `).join('');
}
