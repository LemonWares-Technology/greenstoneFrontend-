import api from './api';
import type { ApiResponse } from '../types';

export const uploadService = {
  uploadFile: async (file: File): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': undefined } as Record<string, string | undefined>,
      timeout: 30000,
    }) as Promise<ApiResponse<{ url: string }>>;
  },
};
