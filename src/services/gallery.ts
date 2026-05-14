import api from './api';
import type { ApiResponse, GalleryImage, GalleryImagePayload } from '../types';

export const galleryService = {
  getAll: async (): Promise<ApiResponse<GalleryImage[]>> => {
    return api.get('/gallery');
  },

  getOne: async (id: string): Promise<ApiResponse<GalleryImage>> => {
    return api.get(`/gallery/${id}`);
  },

  create: async (data: FormData | GalleryImagePayload): Promise<ApiResponse<GalleryImage>> => {
    return api.post('/gallery', data, { timeout: 120000 });
  },

  update: async (id: string, data: FormData | Partial<GalleryImagePayload>): Promise<ApiResponse<GalleryImage>> => {
    return api.put(`/gallery/${id}`, data, { timeout: 120000 });
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/gallery/${id}`);
  },
};
