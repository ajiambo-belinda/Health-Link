// controllers/healthTipController.js
import asyncHandler from "express-async-handler";
import HealthTip from "../models/HealthTip.js";

// @desc Create health tip (admin)
// @route POST /api/health-tips
// @access Private/Admin
export const createHealthTip = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const tip = await HealthTip.create({ title, content, createdBy: req.user._id });
  res.status(201).json(tip);
});

// @desc Get all health tips
// @route GET /api/health-tips
// @access Public
export const getHealthTips = asyncHandler(async (req, res) => {
  const tips = await HealthTip.find().sort({ createdAt: -1 });
  res.json(tips);
});
