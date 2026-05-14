import api from './api';
import type { ApiResponse, Project, ProjectPayload } from '../types';

export const projectService = {
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    return api.get('/projects');
  },

  getOne: async (id: string): Promise<ApiResponse<Project>> => {
    return api.get(`/projects/${id}`);
  },

  create: async (data: FormData | ProjectPayload): Promise<ApiResponse<Project>> => {
    return api.post('/projects', data, { timeout: 120000 });
  },

  update: async (id: string, data: FormData | Partial<ProjectPayload>): Promise<ApiResponse<Project>> => {
    return api.put(`/projects/${id}`, data, { timeout: 120000 });
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/projects/${id}`);
  },
};
