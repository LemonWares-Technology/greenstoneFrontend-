import api from './api';
import type { ApiResponse, ExecutiveSummary, ExecutiveSummaryPayload } from '../types';

export const executiveSummaryService = {
  getAll: async (): Promise<ApiResponse<ExecutiveSummary[]>> => {
    return api.get('/executive-summary');
  },

  create: async (data: ExecutiveSummaryPayload): Promise<ApiResponse<ExecutiveSummary>> => {
    return api.post('/executive-summary', data);
  },

  update: async (id: string, data: Partial<ExecutiveSummaryPayload>): Promise<ApiResponse<ExecutiveSummary>> => {
    return api.put(`/executive-summary/${id}`, data);
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/executive-summary/${id}`);
  },
};
