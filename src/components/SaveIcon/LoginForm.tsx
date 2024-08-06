import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGameState } from '../../contexts/GameStateContext';

interface LoginFormProps {
    onClose: () => void;
    onSwitchForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitchForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { updateGameState } = useGameState();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            if (response && response.game_state) {
                await updateGameState(response.game_state);
            }
            onClose();
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
            <button type="submit" className="w-full bg-black hover:bg-white text-white hover:text-black border border-white hover:border-black px-4 py-2">
                Login
            </button>
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