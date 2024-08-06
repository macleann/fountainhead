import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGameState } from '../../contexts/GameStateContext';

interface RegisterFormProps {
    onClose: () => void;
    onSwitchForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose, onSwitchForm }) => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const { gameState, updateGameState } = useGameState();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await register({ username, firstName, lastName, email, password, game_state: gameState });
            if (response && response.game_state) {
                await updateGameState(response.game_state);
            }
            onClose();
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-black text-white border border-white"
            />
            <input
                type="text"
                placeholder="first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 bg-black text-white border border-white"
            />
            <input
                type="text"
                placeholder="last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 bg-black text-white border border-white"
            />
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-black text-white border border-white"
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-black text-white border border-white"
            />
            <button type="submit" className="w-full bg-black hover:bg-white text-white hover:text-black border border-white hover:border-black px-4 py-2">
                Register
            </button>
            <p className="text-white text-sm">
                Already have an account?{' '}
                <span
                    onClick={onSwitchForm}
                    className="text-green-500 cursor-pointer hover:underline"
                >
                    Login here
                </span>
            </p>
        </form>
    );
};

export default RegisterForm;