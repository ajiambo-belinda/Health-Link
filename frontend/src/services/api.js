import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL); // Debug log

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token added to request:', token.substring(0, 20) + '...'); // Debug
    } else {
      console.warn('No token found in localStorage'); // Debug
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url); // Debug
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.config?.url, error.message); // Debug
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
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

// Symptom Checker API calls - ADD THIS SECTION
export const symptomAPI = {
  analyzeSymptoms: (symptoms) => api.post('/symptoms/analyze', { symptoms }),
  getCommonSymptoms: () => api.get('/symptoms/common'),
  getSymptomInfo: (symptomId) => api.get(`/symptoms/${symptomId}`),
  saveSymptomHistory: (symptomData) => api.post('/symptoms/history', symptomData),
  getSymptomHistory: () => api.get('/symptoms/history'),
};


// Health Records API calls
export const healthRecordsAPI = {
  getAll: () => api.get('/health-records'),
  getById: (id) => api.get(`/health-records/${id}`),
  create: (recordData) => api.post('/health-records', recordData),
  update: (id, recordData) => api.put(`/health-records/${id}`, recordData),
};

// Chat/Messages API calls
export const chatAPI = {
  getConversations: () => api.get('/chat/conversations'),
  getMessages: (conversationId) => api.get(`/chat/messages/${conversationId}`),
  sendMessage: (messageData) => api.post('/chat/messages', messageData),
  startConversation: (participantId) => api.post('/chat/conversations', { participantId }),
};



export default api;