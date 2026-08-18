import api from './api';
import type { ApiResponse, TeamMember, TeamMemberPayload, TeamStatus } from '../types';

export const teamService = {
  // Public — published members only.
  getAll: async (): Promise<ApiResponse<TeamMember[]>> => {
    return api.get('/team');
  },

  // Admin — drafts included. Pass a status to narrow the list.
  getAllAdmin: async (status?: TeamStatus): Promise<ApiResponse<TeamMember[]>> => {
    return api.get('/team/admin', { params: status ? { status } : undefined });
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

  // Publish a draft, or move a published member back to draft.
  updateStatus: async (id: string, status: TeamStatus): Promise<ApiResponse<TeamMember>> => {
    return api.patch(`/team/${id}/status`, { status });
  },

  remove: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/team/${id}`);
  },
};
