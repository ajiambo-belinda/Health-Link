// test-exports.js
import * as appointmentController from './controllers/appointmentController.js';

console.log('✅ appointmentController exports:', Object.keys(appointmentController));
console.log('✅ bookAppointment exists:', 'bookAppointment' in appointmentController);
console.log('✅ getUserAppointments exists:', 'getUserAppointments' in appointmentController);

process.exit(0);