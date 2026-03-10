import axios from 'axios';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: "https://gsv1.leeveon.com/api",
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// ─── Request Interceptor: Attach JWT ─────────────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ─── Response Interceptor: Unwrap & Normalise Errors ────
api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiErrorResponse>) => {
    // Auto-logout on 401 (expired/invalid token)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Only redirect if not already on the login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/admin/login';
      }
    }

    // Normalise error message
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred. Please try again.';

    return Promise.reject({
      message,
      status: error.response?.status || 500,
      errors: error.response?.data?.errors || {},
    });
  }
);

export default api;
