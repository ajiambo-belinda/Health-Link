import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config(); // Load environment variables

await connectDB(); // Await DB connection if it's async

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies first

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Route loading flags
let userRoutesLoaded = false;
let appointmentRoutesLoaded = false;
let authRoutesLoaded = false;

// Async function to load routes to ensure proper await handling
async function loadRoutes() {
  try {
    const userRoutes = await import('./routes/userRoutes.js');
    app.use('/api/users', userRoutes.default || userRoutes);
    userRoutesLoaded = true;
    console.log('User routes loaded successfully');
  } catch (error) {
    console.error('User routes not loaded:', error.message);
  }

  try {
    const appointmentRoutes = await import('./routes/appointmentRoutes.js');
    app.use('/api/appointments', appointmentRoutes.default || appointmentRoutes);
    appointmentRoutesLoaded = true;
    console.log('Appointment routes loaded successfully');
  } catch (error) {
    console.error('Appointment routes not loaded:', error.message);
  }

  try {
    const authRoutes = await import('./routes/authRoutes.js');
    app.use('/api/auth', authRoutes.default || authRoutes);
    authRoutesLoaded = true;
    console.log('Auth routes loaded successfully');
  } catch (error) {
    console.error('Auth routes not loaded:', error.message);
  }
}

// Load all routes before starting server
await loadRoutes();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Health-Link Backend running!',
    status: 'healthy',
    features: [
      'Database',
      'Error Handling',
      ...(userRoutesLoaded ? ['User Routes'] : []),
      ...(appointmentRoutesLoaded ? ['Appointment Routes'] : []),
      ...(authRoutesLoaded ? ['Auth Routes'] : [])
    ],
    userRoutes: userRoutesLoaded ? 'Active' : 'Disabled',
    appointmentRoutes: appointmentRoutesLoaded ? 'Active' : 'Disabled',
    authRoutes: authRoutesLoaded ? 'Active' : 'Disabled'
  });
});

// Error middleware - should be last
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(userRoutesLoaded ? 'User routes: /api/users' : 'User routes: Disabled');
  console.log(appointmentRoutesLoaded ? 'Appointment routes: /api/appointments' : 'Appointment routes: Disabled');
  console.log(authRoutesLoaded ? 'Auth routes: /api/auth' : 'Auth routes: Disabled');
});
