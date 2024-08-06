import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = getCSRFToken();
  if (csrfToken && !['login', 'register'].includes(config.url || '')) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

export default api;