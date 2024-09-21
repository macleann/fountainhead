import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGameState } from '../../contexts/GameStateContext';
import GoogleLoginButton from './GoogleLoginButton';

interface LoginFormProps {
    onSwitchForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const { login } = useAuth();
    const { updateGameState } = useGameState();

    useEffect(() => {
        setIsFormValid(username.trim() !== '' && password.trim() !== '');
    }, [username, password]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
        try {
            const response = await login(username, password);
            if (response && response.game_state) {
                await updateGameState(response.game_state);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-black text-white border border-white"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-black text-white border border-white"
            />
            <button 
                type="submit" 
                disabled={!isFormValid}
                className={`w-full px-4 py-2 border ${
                    isFormValid 
                    ? 'bg-black hover:bg-white text-white hover:text-black border-white hover:border-black' 
                    : 'bg-gray-500 text-gray-300 border-gray-400 cursor-not-allowed'
                }`}
            >
                Login
            </button>
            <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-2 bg-black text-white">Or</span>
                </div>
            </div>
            <GoogleLoginButton />
            <p className="text-white text-sm">
                Don't have an account?{' '}
                <span
                    onClick={onSwitchForm}
                    className="text-green-500 cursor-pointer hover:underline"
                >
                    Register here
                </span>
            </p>
        </form>
    );
};

export default LoginForm;