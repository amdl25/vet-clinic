import express from 'express';
import { createAppointment, getAppointments, updateAppointment, deleteAppointment } from '../controllers/appointmentsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { optionalAuthMiddleware } from '../middleware/optionalAuthMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAppointments);
router.post('/', optionalAuthMiddleware, createAppointment);
router.put("/:id", authMiddleware, updateAppointment);
router.delete("/:id", authMiddleware, deleteAppointment);

export default router;
