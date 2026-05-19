import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://expensive-tracker-with-ai-insights.onrender.com',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can also read token from localStorage if you stored it there
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

export default axiosInstance;
