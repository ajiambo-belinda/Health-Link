import express from 'express';
import { getAllDoctors, getDoctorById } from '../controllers/doctorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllDoctors); // list all doctors
router.get('/:id', protect, getDoctorById); // single doctor by ID

export default router;
