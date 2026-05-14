import api from './api';
import type { ApiResponse } from '../types';

export const uploadService = {
  /** Standalone POST /api/upload — field name must be `image` per API. */
  uploadFile: async (file: File): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload', formData, {
      timeout: 60000,
    }) as Promise<ApiResponse<{ url: string }>>;
  },
};
