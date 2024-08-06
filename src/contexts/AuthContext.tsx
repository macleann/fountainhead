import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { getCSRFToken } from '../utils/csrf';

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

type GameState = any;

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ user: User; game_state: GameState }>;
  logout: () => Promise<void>;
  register: (userData: { username: string; firstName: string; lastName: string; email: string; password: string; game_state?: GameState }) => Promise<{ user: User; game_state: GameState }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      // Check if user is already logged in
      api.get('/user')
        .then(response => setUser(response.data.user))
        .catch(() => setUser(null));
    }, []);
  
    const login = async (username: string, password: string) => {
      const response = await api.post('/login', { username, password });
      setUser(response.data.user);
      api.defaults.headers.common['X-CSRFToken'] = getCSRFToken();
      return response.data;
    };
  
    const logout = async () => {
      await api.post('/logout');
      setUser(null);
      delete api.defaults.headers.common['X-CSRFToken'];
    };
  
    const register = async (userData: { username: string; firstName: string; lastName: string; email: string; password: string; game_state?: GameState }) => {
      const response = await api.post('/register', userData);
      setUser(response.data.user);
      api.defaults.headers.common['X-CSRFToken'] = getCSRFToken();
      return response.data;
    };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};