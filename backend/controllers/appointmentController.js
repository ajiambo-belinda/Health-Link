// controllers/appointmentController.js
import asyncHandler from "express-async-handler";
import Appointment from "../models/Appointment.js";

// @desc Book new appointment
// @route POST /api/appointments
// @access Private
export const bookAppointment = asyncHandler(async (req, res) => {
  const { doctorId, date, time, symptoms } = req.body;

  const appointment = await Appointment.create({
    user: req.user._id,
    doctor: doctorId,
    date,
    time,
    symptoms,
  });

  res.status(201).json(appointment);
});

// @desc Get user appointments
// @route GET /api/appointments
// @access Private
export const getUserAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id }).populate("doctor", "name specialization");
  res.json(appointments);
});
