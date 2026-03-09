import api from './api';
import type { AuthResponse, LoginPayload, RegisterPayload, User, ApiResponse } from '../types';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const payload: LoginPayload = { email, password };
    return api.post('/auth/login', payload);
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const payload: RegisterPayload = { name, email, password };
    return api.post('/auth/register', payload);
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    return api.get('/auth/me');
  },
};
