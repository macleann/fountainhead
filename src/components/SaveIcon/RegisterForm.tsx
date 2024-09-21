import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGameState } from '../../contexts/GameStateContext';
import GoogleLoginButton from './GoogleLoginButton';

interface RegisterFormProps {
    onSwitchForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchForm }) => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const { register } = useAuth();
    const { gameState, updateGameState } = useGameState();

    useEffect(() => {
        setIsFormValid(
            username.trim() !== '' &&
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            email.trim() !== '' &&
            password.trim() !== ''
        );
    }, [username, firstName, lastName, email, password]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
        try {
            const response = await register({ username, firstName, lastName, email, password, game_state: gameState });
            if (response && response.game_state) {
                await updateGameState(response.game_state);
            }
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
            <button 
                type="submit" 
                disabled={!isFormValid}
                className={`w-full px-4 py-2 border ${
                    isFormValid 
                    ? 'bg-black hover:bg-white text-white hover:text-black border-white hover:border-black' 
                    : 'bg-gray-500 text-gray-300 border-gray-400 cursor-not-allowed'
                }`}
            >
                Register
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