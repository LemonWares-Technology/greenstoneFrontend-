import api from './api';
import type { ApiResponse, Newsletter } from '../types';

export const newsletterService = {
  subscribe: async (email: string): Promise<ApiResponse<null>> => {
    return api.post('/newsletters', { email });
  },

  getAll: async (): Promise<ApiResponse<Newsletter[]>> => {
    return api.get('/newsletters');
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/newsletters/${id}`);
  },
};
