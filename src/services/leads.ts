import api from './api';
import type { ApiResponse, Lead, LeadPayload } from '../types';

export const leadService = {
  create: async (data: LeadPayload): Promise<ApiResponse<Lead>> => {
    return api.post('/leads', data);
  },

  getAll: async (): Promise<ApiResponse<Lead[]>> => {
    return api.get('/leads');
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/leads/${id}`);
  },
};
