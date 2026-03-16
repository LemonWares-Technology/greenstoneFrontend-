import api from './api';
import type { ApiResponse, Service, ServicePayload } from '../types';

export const serviceService = {
  getAll: async (): Promise<ApiResponse<Service[]>> => {
    return api.get('/services');
  },

  getOne: async (id: string): Promise<ApiResponse<Service>> => {
    return api.get(`/services/${id}`);
  },

  create: async (data: ServicePayload): Promise<ApiResponse<Service>> => {
    return api.post('/services', data);
  },

  update: async (id: string, data: Partial<ServicePayload>): Promise<ApiResponse<Service>> => {
    return api.put(`/services/${id}`, data);
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/services/${id}`);
  },
};
