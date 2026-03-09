import api from './api';
import type { ApiResponse, Blog, BlogPayload } from '../types';

export const blogService = {
  getAll: async (): Promise<ApiResponse<Blog[]>> => {
    return api.get('/blogs');
  },

  getOne: async (id: string): Promise<ApiResponse<Blog>> => {
    return api.get(`/blogs/${id}`);
  },

  create: async (data: BlogPayload): Promise<ApiResponse<Blog>> => {
    return api.post('/blogs', data);
  },

  update: async (id: string, data: Partial<BlogPayload>): Promise<ApiResponse<Blog>> => {
    return api.put(`/blogs/${id}`, data);
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/blogs/${id}`);
  },
};
