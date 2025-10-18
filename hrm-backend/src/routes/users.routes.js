import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { listUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';

const router = Router();

// Permite listar usuarios a cualquier usuario autenticado
router.get('/', requireAuth(), listUsers);
router.get('/:id', requireAuth(['admin','reclutador']), getUser);
router.post('/', requireAuth(['admin','reclutador']), createUser);
router.put('/:id', requireAuth(['admin','reclutador']), updateUser);
router.delete('/:id', requireAuth(['admin','reclutador']), deleteUser);

export default router;

