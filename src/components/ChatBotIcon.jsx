import React, { useState } from 'react';
import ChatBot from './ChatBot'; 
import '../styles/ChatBot.css';

const ChatBotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-icon ${isOpen ? 'open' : ''}`} onClick={toggleChatBot}>
        <img src="/images/chat-bot-icon-vector.jpg" alt="ChatBot" className="animated-icon" />
      </div>
      {isOpen && (
        <div className="chatbot-popup">
          <ChatBot />
        </div>
      )}
    </div>
  );
};

export default ChatBotIcon;
