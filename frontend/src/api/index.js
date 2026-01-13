const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('Glixtron_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API Error: ${response.status}`);
  }
  
  return response.json();
};

// Auth API
export const authApi = {
  register: (data) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  login: (data) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Jobs API
export const jobsApi = {
  search: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/jobs?${query}`);
  },
  
  getSaved: () => apiRequest('/jobs/saved'),
  
  save: (job) => apiRequest('/jobs/save', {
    method: 'POST',
    body: JSON.stringify(job),
  }),
  
  removeSaved: (id) => apiRequest(`/jobs/saved/${id}`, {
    method: 'DELETE',
  }),
};

// Applications API
export const applicationsApi = {
  getAll: () => apiRequest('/applications'),
  
  create: (data) => apiRequest('/applications', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id, data) => apiRequest(`/applications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => apiRequest('/dashboard/stats'),
};

// User API
export const userApi = {
  getProfile: () => apiRequest('/user/profile'),
  
  updateProfile: (data) => apiRequest('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Portals API
export const portalsApi = {
  connect: (portal) => apiRequest('/portals/connect', {
    method: 'POST',
    body: JSON.stringify({ portal }),
  }),
};
