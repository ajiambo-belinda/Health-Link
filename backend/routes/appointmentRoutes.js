import express from 'express';
const router = express.Router();

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
router.get('/', async (req, res) => {
  try {
    // For now, return mock data
    res.json({
      success: true,
      appointments: [
        {
          id: '1',
          patientName: 'John Doe',
          doctorName: 'Dr. Smith',
          date: '2024-01-15',
          time: '10:00 AM',
          status: 'confirmed'
        },
        {
          id: '2', 
          patientName: 'Jane Smith',
          doctorName: 'Dr. Johnson',
          date: '2024-01-16',
          time: '2:30 PM',
          status: 'pending'
        }
      ]
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;
    
    // For now, return mock response
    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment: {
        id: '3',
        patientId,
        doctorId, 
        date,
        time,
        reason,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;