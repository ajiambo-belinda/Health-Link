import express from 'express';
import {
  createHealthTip,
  getHealthTips,
  getHealthTipById,
} from '../controllers/healthTipController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getHealthTips);
router.get('/:id', getHealthTipById);
router.post('/', protect, authorizeRoles('admin'), createHealthTip); // only admin

export default router;
