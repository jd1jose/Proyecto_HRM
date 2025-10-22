import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { saveInforme, updateInforme, generateInforme, findInforme } from '../controllers/informes.controller.js';

const router = Router();

router.get('/', requireAuth(['admin', 'reclutador']), findInforme);
router.post('/', requireAuth(['admin', 'reclutador']), saveInforme);
router.put('/:id', requireAuth(['admin', 'reclutador']), updateInforme);
router.post('/generar', requireAuth(['admin', 'reclutador']), generateInforme);

export default router;
