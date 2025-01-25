import express from 'express';
import { saveUser } from '../controllers/usersController.js';
const router = express.Router();

router.post('/', saveUser);

export default router;