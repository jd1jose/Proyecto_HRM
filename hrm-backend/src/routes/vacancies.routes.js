import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { listVacancies, getVacancy, createVacancy, updateVacancy, deleteVacancy } from '../controllers/vacancies.controller.js';

const router = Router();

// lectura pública opcional:
router.get('/', listVacancies);
router.get('/:id', getVacancy);

// administración protegida:
router.post('/', requireAuth(['admin','reclutador']), createVacancy);
router.put('/:id', requireAuth(['admin','reclutador']), updateVacancy);
router.delete('/:id', requireAuth(['admin']), deleteVacancy);

export default router;
