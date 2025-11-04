import express from 'express';
import {
  getSymptoms,
  addSymptom,
} from '../controllers/symptomController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: get symptom list
router.get('/', getSymptoms);

// Admin: add new symptom
router.post('/', protect, authorizeRoles('admin'), addSymptom);

export default router;
