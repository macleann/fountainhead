import React, { useState } from 'react';
import SaveConfirmation from './SaveConfirmation';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface SaveModalProps {
    isLoggedIn: boolean;
    onClose: () => void;
}

const SaveModal: React.FC<SaveModalProps> = ({ isLoggedIn, onClose }) => {
    const [isLoginForm, setIsLoginForm] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-black border border-white w-80">
                <div className="bg-white px-2 py-1 flex justify-between items-center">
                    <span className="text-black text-sm">
                        {isLoggedIn ? 'Save Game' : (isLoginForm ? 'Login' : 'Register')}
                    </span>
                    <button onClick={onClose} className="text-black">
                        ✕
                    </button>
                </div>
                <div className="p-4">
                    {isLoggedIn ? (
                        <SaveConfirmation onClose={onClose} />
                    ) : isLoginForm ? (
                        <LoginForm onClose={onClose} onSwitchForm={() => setIsLoginForm(false)} />
                    ) : (
                        <RegisterForm onClose={onClose} onSwitchForm={() => setIsLoginForm(true)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SaveModal;