import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    verify: () => api.get('/auth/verify'),
};

// Job APIs
export const jobAPI = {
    getAll: (params) => api.get('/jobs', { params }),
    getById: (id) => api.get(`/jobs/${id}`),
    create: (jobData) => api.post('/jobs', jobData),
    update: (id, jobData) => api.put(`/jobs/${id}`, jobData),
    delete: (id) => api.delete(`/jobs/${id}`),
    bulkDelete: (ids) => api.post('/jobs/bulk-delete', { ids }),
    import: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/jobs/import', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    export: () => api.get('/jobs/export', { responseType: 'blob' }),
};

// Portal APIs
export const portalAPI = {
    getAll: () => api.get('/portals'),
    connect: (portalData) => api.post('/portals/connect', portalData),
    disconnect: (id) => api.post(`/portals/${id}/disconnect`),
    sync: (id) => api.post(`/portals/${id}/sync`),
    test: (credentials) => api.post('/portals/test', credentials),
};

// User APIs
export const userAPI = {
    getProfile: () => api.get('/user/profile'),
    updateProfile: (profileData) => api.put('/user/profile', profileData),
    updateSettings: (settings) => api.put('/user/settings', settings),
};

// Analytics APIs
export const analyticsAPI = {
    getStats: () => api.get('/analytics/stats'),
    getTimeline: (period) => api.get(`/analytics/timeline?period=${period}`),
    getPortalsStats: () => api.get('/analytics/portals'),
};

export default api;