import { Router } from 'express';
import { projectController } from '../controllers/projectController';
import { upload } from '../middleware/upload';

const router = Router();

// Project CRUD routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// Thumbnail upload route
router.post('/:id/thumbnail', upload.single('thumbnail'), projectController.uploadThumbnail);

export default router;
