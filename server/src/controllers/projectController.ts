import { Request, Response } from 'express';
import { Project } from '../models';
import { StorageFactory } from '../services/storage/StorageFactory';

const storageService = StorageFactory.createStorageService();

export const projectController = {
  // Get all projects
  async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await Project.findAll({
        order: [['updatedAt', 'DESC']],
      });
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  },

  // Get a single project by ID
  async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await Project.findByPk(id);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  },

  // Create a new project
  async createProject(req: Request, res: Response) {
    try {
      const { name, description, sceneData } = req.body;

      if (!name || !sceneData) {
        return res.status(400).json({ error: 'Name and sceneData are required' });
      }

      const project = await Project.create({
        name,
        description,
        sceneData,
      });

      res.status(201).json(project);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  },

  // Update a project
  async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, sceneData, thumbnailUrl } = req.body;

      const project = await Project.findByPk(id);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      await project.update({
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(sceneData && { sceneData }),
        ...(thumbnailUrl !== undefined && { thumbnailUrl }),
      });

      res.json(project);
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  },

  // Delete a project
  async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const project = await Project.findByPk(id);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Delete thumbnail from storage if exists
      if (project.thumbnailUrl) {
        try {
          const key = project.thumbnailUrl.split('/').slice(-2).join('/');
          await storageService.deleteFile(key);
        } catch (error) {
          console.error('Error deleting thumbnail:', error);
        }
      }

      await project.destroy();

      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  },

  // Upload thumbnail
  async uploadThumbnail(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const project = await Project.findByPk(id);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Delete old thumbnail if exists
      if (project.thumbnailUrl) {
        try {
          const oldKey = project.thumbnailUrl.split('/').slice(-2).join('/');
          await storageService.deleteFile(oldKey);
        } catch (error) {
          console.error('Error deleting old thumbnail:', error);
        }
      }

      // Upload new thumbnail
      const result = await storageService.uploadFile(req.file, 'thumbnails');

      await project.update({ thumbnailUrl: result.url });

      res.json({ url: result.url });
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      res.status(500).json({ error: 'Failed to upload thumbnail' });
    }
  },
};
