import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCities = () => api.get('/cities');
export const getTrends = (city) => api.get(`/trends/${city}`);
export const analyzeRisk = (inputs) => api.post('/analyze', inputs);

export default api;
