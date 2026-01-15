// API Configuration
const API_URL = window.API_URL || 'http://localhost:5000/api';

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
        const data = await response.json();
        
        if (!response.ok) {
            if (response.status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                if (window.location.pathname !== '/login.html' && window.location.pathname !== '/pages/login.html') {
                    window.location.href = 'pages/login.html';
                }
            }
            throw new Error(data.message || 'Ошибка запроса');
        }
        
        return data;
    } catch (error) {
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

// Export API functions
window.API = {
    auth: authAPI,
    services: servicesAPI,
    orders: ordersAPI,
    blog: blogAPI,
    contact: contactAPI
};
