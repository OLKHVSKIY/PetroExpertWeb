// API Configuration - Backend работает на порту 5001 (порт 5000 занят macOS Control Center)
// Если нужно изменить, установи window.API_URL перед загрузкой этого скрипта
const DEFAULT_API_URL = 'http://localhost:5001/api';
let API_URL = window.API_URL || DEFAULT_API_URL;

// Force correct port (prevent old cached versions with wrong ports)
// Replace any wrong ports with correct 5001
if (API_URL.includes('50011') || API_URL.includes('5000/api') || API_URL.includes('localhost:5000')) {
    console.warn('⚠️ Обнаружен старый URL API с неправильным портом, обновляем на порт 5001');
    API_URL = DEFAULT_API_URL;
}

// Ensure we always use port 5001 (replace any port number in URL)
const urlMatch = API_URL.match(/^(https?:\/\/[^/]+):(\d+)(\/.*)?$/);
if (urlMatch && urlMatch[2] !== '5001') {
    console.warn(`⚠️ Исправляем порт ${urlMatch[2]} на 5001`);
    API_URL = `${urlMatch[1]}:5001${urlMatch[3] || '/api'}`;
}

// Log API URL for debugging (only in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`🌐 API URL: ${API_URL}`);
    console.log(`📍 Backend должен быть на порту 5001`);
}

// Helper function to get auth token
function getAuthToken() {
    return localStorage.getItem('token');
}

// Helper function to get default headers
function getHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
}

// API Request function
async function apiRequest(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const config = {
        ...options,
        headers: {
            ...getHeaders(),
            ...options.headers
        }
    };

    try {
        const response = await fetch(url, config);
        
        // Check if response is OK before trying to parse JSON
        if (!response.ok) {
            let errorMessage = 'Ошибка запроса';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (parseError) {
                errorMessage = `Ошибка ${response.status}: ${response.statusText}`;
            }
            
            if (response.status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                if (window.location.pathname !== '/login.html' && window.location.pathname !== '/pages/login.html') {
                    window.location.href = 'pages/login.html';
                }
            }
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle network errors (Failed to fetch)
        if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
            console.error('Network Error - Backend недоступен:', url);
            throw new Error('Не удалось подключиться к серверу. Убедитесь, что backend сервер запущен.');
        }
        console.error('API Error:', error);
        throw error;
    }
}

// Auth API
const authAPI = {
    register: (userData) => apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    }),
    
    login: (credentials) => apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    }),
    
    getProfile: () => apiRequest('/auth/profile'),
    
    updateProfile: (userData) => apiRequest('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(userData)
    })
};

// Services API
const servicesAPI = {
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/services${queryString ? '?' + queryString : ''}`);
    },
    
    getById: (id) => apiRequest(`/services/${id}`),
    
    getByCategory: (category) => apiRequest(`/services/category/${category}`)
};

// Orders API
const ordersAPI = {
    create: (orderData) => apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
    }),
    
    getAll: () => apiRequest('/orders'),
    
    getById: (id) => apiRequest(`/orders/${id}`)
};

// Blog API
const blogAPI = {
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/blog${queryString ? '?' + queryString : ''}`);
    },
    
    getById: (id) => apiRequest(`/blog/${id}`)
};

// Contact API
const contactAPI = {
    sendForm: (formData) => apiRequest('/contact/form', {
        method: 'POST',
        body: JSON.stringify(formData)
    }),
    
    requestCallback: (callbackData) => apiRequest('/contact/callback', {
        method: 'POST',
        body: JSON.stringify(callbackData)
    })
};

// AI API
const aiAPI = {
    chat: (message, conversationHistory = []) => apiRequest('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message, conversationHistory })
    })
};

// Export API functions
window.API = {
    auth: authAPI,
    services: servicesAPI,
    orders: ordersAPI,
    blog: blogAPI,
    contact: contactAPI,
    ai: aiAPI
};
