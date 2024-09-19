import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../contexts/ChatContext';
import TypewriterEffect from '../components/TypewriterEffect';
import { useNavigate } from 'react-router-dom';

const OldFriendChatPage: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const [typingIndex, setTypingIndex] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  useEffect(() => {
    if (messages.length > 0 && !isLoading) {
      setTypingIndex(messages.length - 1);
    }
  }, [messages, isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingIndex]);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="text-white hover:text-gray-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>
      <div className="flex-grow overflow-auto mt-4 px-4 pb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`p-2 rounded ${message.role === 'user' 
                ? 'bg-blue-500 max-w-fit' 
                : 'bg-gray-700 w-3/4'}`}
            >
              {message.role === 'user' || index < typingIndex ? (
                <div className="text-lg whitespace-pre-wrap">{message.content}</div>
              ) : (
                <TypewriterEffect 
                  text={message.content} 
                  onComplete={() => setTypingIndex(prev => prev + 1)}
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow p-2 bg-gray-800 text-white rounded-l"
            placeholder="Type your message..."
            disabled={isLoading || typingIndex < messages.length - 1}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r"
            disabled={isLoading || typingIndex < messages.length - 1}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default OldFriendChatPage;