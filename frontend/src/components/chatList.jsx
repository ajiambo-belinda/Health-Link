import React from 'react';

const ChatList = ({ onSelectChat }) => {
  return (
    <div className="chat-list">
      <h3>Chat List</h3>
      <button onClick={() => onSelectChat('chat1')}>
        Start Chat 1
      </button>
      <button onClick={() => onSelectChat('chat2')}>
        Start Chat 2
      </button>
    </div>
  );
};

export default ChatList;