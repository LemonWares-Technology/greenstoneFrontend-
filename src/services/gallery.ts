import api from './api';
import type { ApiResponse, GalleryImage, GalleryImagePayload } from '../types';

export const galleryService = {
  getAll: async (): Promise<ApiResponse<GalleryImage[]>> => {
    return api.get('/gallery');
  },

  getOne: async (id: string): Promise<ApiResponse<GalleryImage>> => {
    return api.get(`/gallery/${id}`);
  },

  create: async (data: GalleryImagePayload): Promise<ApiResponse<GalleryImage>> => {
    return api.post('/gallery', data);
  },

  update: async (id: string, data: Partial<GalleryImagePayload>): Promise<ApiResponse<GalleryImage>> => {
    return api.put(`/gallery/${id}`, data);
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/gallery/${id}`);
  },
};
