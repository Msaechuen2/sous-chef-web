import React, { useState } from 'react';
import './ChatbotPopup.css';
import ChatAssistant from './ChatAssistant'; 


const ChatbotPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div className="chatbot-popup">
        {/* Chatbot Button */}
        <button className="chatbot-button" onClick={togglePopup}>
          💬 Chat with Sous Chef
        </button>
  
        {/* Popup Window */}
        {isOpen && (
          <div className="chat-popup-window">
            <button className="close-button" onClick={togglePopup}>✖</button>
            <h3>Chat with Sous Chef</h3>
            <ChatAssistant /> 
          </div>
        )}
      </div>
    );
  };
  
  export default ChatbotPopup;
  
