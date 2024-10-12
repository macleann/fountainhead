import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import SaveConfirmation from './SaveConfirmation';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface SaveModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [isLoginForm, setIsLoginForm] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-black border border-white w-80">
                <div className="bg-white px-2 py-1 flex justify-between items-center">
                    <span className="text-black text-sm">authenticate.exe</span>
                    <button onClick={onClose} className="text-black">
                        ✕
                    </button>
                </div>
                <div className="p-4">
                    {user ? (
                        <SaveConfirmation onClose={onClose} />
                    ) : isLoginForm ? (
                        <LoginForm onSwitchForm={() => setIsLoginForm(false)} />
                    ) : (
                        <RegisterForm onSwitchForm={() => setIsLoginForm(true)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SaveModal;