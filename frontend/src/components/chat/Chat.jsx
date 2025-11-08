import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

const ChatBox = ({ receiver, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const messagesEndRef = useRef(null);

  // Sample initial messages for demo
  const initialMessages = [
    {
      id: 1,
      sender: 'doctor',
      message: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 3600000),
      read: true
    },
    {
      id: 2,
      sender: 'patient',
      message: 'I have been experiencing headaches for the past few days.',
      timestamp: new Date(Date.now() - 1800000),
      read: true
    },
    {
      id: 3,
      sender: 'doctor',
      message: 'Can you describe the pain? Is it sharp, dull, or throbbing?',
      timestamp: new Date(Date.now() - 1200000),
      read: true
    }
  ];

  useEffect(() => {
    // Simulate loading messages
    setLoading(true);
    setTimeout(() => {
      setMessages(initialMessages);
      setLoading(false);
      setConnectionStatus('connected');
    }, 1000);
  }, [receiver]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: user.role,
      message: newMessage.trim(),
      timestamp: new Date(),
      read: false
    };

    // Optimistically add message to UI
    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate API call to send message
    try {
      // In a real app, you would call your backend API here
      // await chatAPI.sendMessage(receiver.id, newMessage);
      
      // Simulate network delay
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === message.id ? { ...msg, read: true } : msg
          )
        );
      }, 500);

    } catch (error) {
      console.error('Failed to send message:', error);
      // Remove the message if sending fails
      setMessages(prev => prev.filter(msg => msg.id !== message.id));
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {receiver?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold">{receiver?.name || 'Unknown User'}</h3>
              <div className="flex items-center space-x-2 text-blue-100 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-400' : 'bg-gray-400'
                }`}></div>
                <span>
                  {connectionStatus === 'connected' ? 'Online' : 'Offline'}
                </span>
                <span>•</span>
                <span>{receiver?.role || 'User'}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading messages...</span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(messageGroups).map(([date, dateMessages]) => (
              <div key={date}>
                {/* Date Separator */}
                <div className="flex justify-center my-4">
                  <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 border">
                    {formatDate(new Date(date))}
                  </span>
                </div>
                
                {/* Messages for this date */}
                {dateMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === user.role ? 'justify-end' : 'justify-start'
                    } mb-3`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === user.role
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 border rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <div className={`flex items-center justify-end space-x-1 mt-1 ${
                        message.sender === user.role ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === user.role && (
                          <span className="text-xs">
                            {message.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4 rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-full transition-colors flex items-center justify-center w-10 h-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        
        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 mt-3 text-xs text-gray-500">
          <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span>Attach</span>
          </button>
          
          <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Emoji</span>
          </button>
          
          <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Camera</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;