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

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
};

// Appointments API calls
export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (appointmentData) => api.post('/appointments', appointmentData),
  update: (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData),
  delete: (id) => api.delete(`/appointments/${id}`),
  getAvailableSlots: (doctorId, date) => api.get(`/appointments/slots/${doctorId}?date=${date}`),
};

// Users API calls
export const usersAPI = {
  getDoctors: () => api.get('/users/doctors'),
  getPatients: () => api.get('/users/patients'),
  updateProfile: (userData) => api.put('/users/profile', userData),
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

// Chat API
export const chatAPI = {
  getChats: () => api.get('/chats'),
  getMessages: (chatId) => api.get(`/chats/${chatId}/messages`),
  sendMessage: (chatId, message) => api.post(`/chats/${chatId}/messages`, { message }),
  createChat: (participantId) => api.post('/chats', { participantId }),
  };

export default api;