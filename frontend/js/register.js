// Register Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    setupRegisterForm();
});

function setupRegisterForm() {
    const form = document.getElementById('registerForm');
    const alertDiv = document.getElementById('authAlert');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            alertDiv.innerHTML = '<div class="alert alert-error">Пароли не совпадают</div>';
            return;
        }

        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: password,
            phone: formData.get('phone'),
            city: formData.get('city') || 'spb'
        };
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Регистрация...';

        try {
            const response = await window.API.auth.register(data);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response));
            window.location.href = 'dashboard.html';
        } catch (error) {
            alertDiv.innerHTML = `<div class="alert alert-error">${error.message || 'Ошибка при регистрации'}</div>`;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Зарегистрироваться';
        }
    });
}
