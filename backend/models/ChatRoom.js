import mongoose from 'mongoose';

const chatRoomSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
export default ChatRoom;
