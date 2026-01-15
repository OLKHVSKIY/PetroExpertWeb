// Login Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    setupLoginForm();
});

function setupLoginForm() {
    const form = document.getElementById('loginForm');
    const alertDiv = document.getElementById('authAlert');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Вход...';

        try {
            const response = await window.API.auth.login(data);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response));
            window.location.href = 'dashboard.html';
        } catch (error) {
            alertDiv.innerHTML = `<div class="alert alert-error">${error.message || 'Ошибка при входе'}</div>`;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Войти';
        }
    });
}
