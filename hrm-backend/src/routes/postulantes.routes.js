import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { createPostulante, listPostulantes } from '../controllers/postulantes.controller.js';

const router = Router();

router.get('/', requireAuth(['admin', 'reclutador']), listPostulantes);
router.post('/', requireAuth(['admin', 'reclutador']), createPostulante);

export default router;

