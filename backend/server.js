import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Try to load routes with error handling
let userRoutesLoaded = false;
let authRoutesLoaded = false;

try {
  const userRoutes = await import('./routes/userRoutes.js');
  app.use('/api/users', userRoutes.default || userRoutes);
  userRoutesLoaded = true;
  console.log(' User routes loaded successfully');
} catch (error) {
  console.log(' User routes not loaded:', error.message);
}

try {
  const authRoutes = await import('./routes/authRoutes.js');
  app.use('/api/auth', authRoutes.default || authRoutes);
  authRoutesLoaded = true;
  console.log(' Auth routes loaded successfully');
} catch (error) {
  console.log(' Auth routes not loaded:', error.message);
}

// Test routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: ' Health-Link Backend running!',
    status: 'healthy',
    features: [
      'Database', 
      'Error Handling',
      ...(userRoutesLoaded ? ['User Routes'] : []),
      ...(authRoutesLoaded ? ['Auth Routes'] : [])
    ],
    userRoutes: userRoutesLoaded ? 'Active' : 'Disabled',
    authRoutes: authRoutesLoaded ? 'Active' : 'Disabled'
  });
});

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(userRoutesLoaded ? ' User routes: /api/users' : ' User routes: Disabled');
  console.log(authRoutesLoaded ? ' Auth routes: /api/auth' : ' Auth routes: Disabled');
});