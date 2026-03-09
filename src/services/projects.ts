import api from './api';
import type { ApiResponse, Project, ProjectPayload } from '../types';

export const projectService = {
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    return api.get('/projects');
  },

  getOne: async (id: string): Promise<ApiResponse<Project>> => {
    return api.get(`/projects/${id}`);
  },

  create: async (data: ProjectPayload): Promise<ApiResponse<Project>> => {
    return api.post('/projects', data);
  },

  update: async (id: string, data: Partial<ProjectPayload>): Promise<ApiResponse<Project>> => {
    return api.put(`/projects/${id}`, data);
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/projects/${id}`);
  },
};
