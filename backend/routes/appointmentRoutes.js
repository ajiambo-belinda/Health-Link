import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
} from '../controllers/appointmentController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createAppointment); // patient books
router.get('/', protect, getAppointments); // get all for user
router.put('/:id', protect, authorizeRoles('doctor', 'admin'), updateAppointment); // update status

export default router;
