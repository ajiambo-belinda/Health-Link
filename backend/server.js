import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';

// Import database connection
import connectDB from './config/db.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import healthTipRoutes from './routes/healthTipRoutes.js';
import symptomRoutes from './routes/symptomRoutes.js';

// Import middleware
import { errorHandler } from './middleware/errorMiddleware.js';

// Import Socket.IO chat logic
import chatSocket from './socket/chatSocket.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// -------------------- Middleware --------------------

// Parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// Logging in development
app.use(morgan('dev'));

// -------------------- Routes --------------------

// User authentication and profile
app.use('/api/users', userRoutes);

// Doctors endpoints
app.use('/api/doctors', doctorRoutes);

// Appointments
app.use('/api/appointments', appointmentRoutes);

// Chat (real-time messaging)
app.use('/api/chats', chatRoutes);

// Health tips (admin)
app.use('/api/healthtips', healthTipRoutes);

// Symptom checker
app.use('/api/symptoms', symptomRoutes);

// -------------------- Error Middleware --------------------
app.use(errorHandler);

// -------------------- HTTP & WebSocket Server --------------------
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // change this to your frontend URL in production
  },
});

// Initialize chat socket events
chatSocket(io);

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
