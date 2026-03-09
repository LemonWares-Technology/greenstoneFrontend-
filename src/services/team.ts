import api from './api';
import type { ApiResponse, TeamMember, TeamMemberPayload } from '../types';

export const teamService = {
  getAll: async (): Promise<ApiResponse<TeamMember[]>> => {
    return api.get('/team');
  },

  getOne: async (id: string): Promise<ApiResponse<TeamMember>> => {
    return api.get(`/team/${id}`);
  },

  create: async (data: TeamMemberPayload): Promise<ApiResponse<TeamMember>> => {
    return api.post('/team', data);
  },

  update: async (id: string, data: Partial<TeamMemberPayload>): Promise<ApiResponse<TeamMember>> => {
    return api.put(`/team/${id}`, data);
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/team/${id}`);
  },
};
