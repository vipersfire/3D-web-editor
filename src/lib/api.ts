import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Project {
  id: string;
  name: string;
  description?: string;
  sceneData: any;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export const projectApi = {
  // Get all projects
  getAll: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },

  // Get a single project
  getById: async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Create a new project
  create: async (data: {
    name: string;
    description?: string;
    sceneData: any;
  }): Promise<Project> => {
    const response = await api.post('/projects', data);
    return response.data;
  },

  // Update a project
  update: async (
    id: string,
    data: {
      name?: string;
      description?: string;
      sceneData?: any;
      thumbnailUrl?: string;
    }
  ): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  // Delete a project
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  // Upload thumbnail
  uploadThumbnail: async (id: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('thumbnail', file);
    const response = await api.post(`/projects/${id}/thumbnail`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.url;
  },
};
