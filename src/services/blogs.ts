import api from './api';
import type { ApiResponse, Blog, BlogPayload } from '../types';

export const blogService = {
  getAll: async (): Promise<ApiResponse<Blog[]>> => {
    return api.get('/blogs');
  },

  getOne: async (id: string): Promise<ApiResponse<Blog>> => {
    return api.get(`/blogs/${id}`);
  },

  create: async (data: FormData | BlogPayload): Promise<ApiResponse<Blog>> => {
    return api.post('/blogs', data, { timeout: 120000 });
  },

  update: async (id: string, data: FormData | Partial<BlogPayload>): Promise<ApiResponse<Blog>> => {
    return api.put(`/blogs/${id}`, data, { timeout: 120000 });
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/blogs/${id}`);
  },
};
