import api from './api';
import type { ApiResponse, DashboardStats } from '../types';

export const statsService = {
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    return api.get('/stats');
  },
};
