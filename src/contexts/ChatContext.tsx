import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    setIsLoading(true);
    addMessage({ role: 'user', content });

    try {
      const response = await api.post('/chat', {
        message: content,
        conversation_history: messages
      });

      addMessage({ role: 'assistant', content: response.data.reply });
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({ role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }, [messages, addMessage]);


  return (
    <ChatContext.Provider value={{ messages, addMessage, sendMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};