// controllers/doctorController.js
import asyncHandler from "express-async-handler";
import Doctor from "../models/Doctor.js";

// @desc Get all doctors
// @route GET /api/doctors
// @access Public
export const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// @desc Get doctor profile
// @route GET /api/doctors/:id
// @access Public
export const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (doctor) res.json(doctor);
  else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});

// @desc Update doctor profile
// @route PUT /api/doctors/profile
// @access Private
export const updateDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.user._id);
  if (doctor) {
    doctor.name = req.body.name || doctor.name;
    doctor.specialization = req.body.specialization || doctor.specialization;
    doctor.bio = req.body.bio || doctor.bio;
    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});
