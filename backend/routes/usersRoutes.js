import express from 'express';
import { saveUser } from '../controllers/usersController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, saveUser);

export default router;