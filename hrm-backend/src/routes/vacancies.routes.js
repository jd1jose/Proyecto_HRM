import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import {
  listVacancies,
  getVacancy,
  createVacancy,
  updateVacancy,
  deleteVacancy,
  assignPostulantes,
  closeVacancy,
  markPostulantesForRiskReport
} from '../controllers/vacancies.controller.js';

const router = Router();

// lectura publica opcional:
router.get('/', listVacancies);
router.get('/:id', getVacancy);

// administracion protegida:
router.post('/', requireAuth(['admin', 'reclutador']), createVacancy);
router.put('/:id', requireAuth(['admin', 'reclutador']), updateVacancy);
router.delete('/:id', requireAuth(['admin']), deleteVacancy);
router.post('/:id/asignaciones', requireAuth(['admin', 'reclutador']), assignPostulantes);
router.post('/:id/cerrar', requireAuth(['admin', 'reclutador']), closeVacancy);
router.post('/:id/informe-riesgo', requireAuth(['admin', 'reclutador']), markPostulantesForRiskReport);

export default router;

