import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ChatList from '../components/chat/ChatList';
import ChatBox from '../components/chat/Chat';

const Chat = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(null);

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
  };

  const handleCloseChat = () => {
    setActiveChat(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600 mb-8">
          Connect with your healthcare providers securely
        </p>

        <div className="bg-white rounded-lg shadow-lg border h-[600px] flex">
          {/* Chat List Sidebar */}
          <ChatList 
            onSelectChat={handleSelectChat} 
            activeChat={activeChat}
          />
          
          {/* Chat Box */}
          <div className="flex-1">
            {activeChat ? (
              <ChatBox 
                receiver={activeChat} 
                onClose={handleCloseChat}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No conversation selected</h3>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;