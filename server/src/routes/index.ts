import { Router } from 'express';
import projectRoutes from './projectRoutes';

const router = Router();

router.use('/projects', projectRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
