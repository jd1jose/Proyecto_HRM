import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { listUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/', requireAuth(['admin']), listUsers);
router.get('/:id', requireAuth(['admin']), getUser);
router.post('/', requireAuth(['admin']), createUser);
router.put('/:id', requireAuth(['admin']), updateUser);
router.delete('/:id', requireAuth(['admin']), deleteUser);

export default router;
