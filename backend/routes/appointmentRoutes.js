import express from 'express';
import { 
  bookAppointment, 
  getUserAppointments 
} from '../controllers/appointmentController.js'; // NAMED imports
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, bookAppointment);
router.get('/', protect, getUserAppointments);

export default router;