import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
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

// Auth API
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
};

// Appointments API
export const appointmentAPI = {
  create: (appointmentData) => api.post('/appointments', appointmentData),
  getAll: () => api.get('/appointments'),
  update: (id, updateData) => api.put(`/appointments/${id}`, updateData),
};

// Health Tips API
export const healthTipAPI = {
  getAll: () => api.get('/healthtips'),
  create: (tipData) => api.post('/healthtips', tipData),
};

// Symptoms API
export const symptomAPI = {
  check: (symptoms) => api.post('/symptoms/check', { symptoms }),
};

export default api;