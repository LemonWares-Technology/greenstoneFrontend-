import api from './api';
import type { ApiResponse, Service, ServicePayload } from '../types';

export const serviceService = {
  getAll: async (): Promise<ApiResponse<Service[]>> => {
    return api.get('/services');
  },

  getOne: async (id: string): Promise<ApiResponse<Service>> => {
    return api.get(`/services/${id}`);
  },

  create: async (data: FormData | ServicePayload): Promise<ApiResponse<Service>> => {
    return api.post('/services', data, { timeout: 120000 });
  },

  update: async (id: string, data: FormData | Partial<ServicePayload>): Promise<ApiResponse<Service>> => {
    return api.put(`/services/${id}`, data, { timeout: 120000 });
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/services/${id}`);
  },
};
