import axios from 'axios';

const api = axios.create({ baseURL: '/api/tasks' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
  return config;
});

export const taskService = {
  getTasks: (status) => api.get('/', { params: status && status !== 'All' ? { status } : {} }).then(r => r.data),
  createTask: (data) => api.post('/', data).then(r => r.data),
  updateTaskStatus: (id, status) => api.put(`/${id}`, { status }).then(r => r.data),
  deleteTask: (id) => api.delete(`/${id}`).then(r => r.data)
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getAuthToken = () => localStorage.getItem('token');

export default api;
