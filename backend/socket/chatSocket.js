const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    // Join a chat room
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // Listen for chat messages
    socket.on('sendMessage', ({ roomId, senderId, content }) => {
      // Emit message to everyone in the room except sender
      socket.to(roomId).emit('receiveMessage', { senderId, content });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });
};

export default chatSocket;
