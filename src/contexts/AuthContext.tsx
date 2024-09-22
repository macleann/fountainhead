import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useGameState } from './GameStateContext';

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
  googleAuthenticate: (codeResponse: string, currentGameState: GameState) => Promise<{ user: User; game_state: GameState }>;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const { setGameState } = useGameState();

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/user')
        .then(response => setUser(response.data.user))
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        });
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    const response = await api.post('/login', { username, password });
    setToken(response.data.access);
    localStorage.setItem('token', response.data.access);
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    setUser(response.data.user);
    setGameState(response.data.game_state.state);
    return response.data;
  };

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setGameState(null);
  };

  const register = async (userData: { username: string; firstName: string; lastName: string; email: string; password: string; game_state?: GameState }) => {
    const response = await api.post('/register', userData);
    setToken(response.data.access);
    localStorage.setItem('token', response.data.access);
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    setUser(response.data.user);
    setGameState(response.data.game_state.state);
    return response.data;
  };

  const googleAuthenticate = async (codeResponse: string, currentGameState: GameState) => {
    const response = await api.post('/google-authenticate', { codeResponse, game_state: currentGameState });
    setToken(response.data.access);
    localStorage.setItem('token', response.data.access);
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    setUser(response.data.user);
    setGameState(response.data.game_state.state);
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, googleAuthenticate, token }}>
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