import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGameState } from '../../contexts/GameStateContext';

interface SaveConfirmationProps {
    onClose: () => void;
}

const SaveConfirmation: React.FC<SaveConfirmationProps> = ({ onClose }) => {
    const { gameState, lastSave, updateGameState, clearGameState } = useGameState();
    const { logout } = useAuth();
    const lastSaveDate = new Date(lastSave).toLocaleString();

    const handleSave = async () => {
        if (gameState) {
            await updateGameState(gameState);
        }
        onClose();
    };

    const handleClear = async () => {
        await clearGameState();
        onClose();
    }

    return (
        <div className='flex flex-col'>
            <p className="text-white mb-4">Do you want to save your progress?</p>
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className=" bg-black hover:bg-white text-white hover:text-black border border-white hover:border-black px-4 py-2 mr-2"
                >
                    save
                </button>
                <button
                    onClick={onClose}
                    className=" bg-black hover:bg-white text-white hover:text-black border border-white hover:border-black px-4 py-2"
                >
                    cancel
                </button>
                
            </div>
            <hr className="border-t border-white my-4 w-full" />
            <div className="flex justify-center">
                <button
                    onClick={logout}
                    className="bg-black hover:bg-white text-white hover:text-black border border-white hover:border-black text-sm px-3 mx-2 h-6"
                >
                    logout
                </button>
                <button
                    onClick={handleClear}
                    className="bg-black hover:bg-red-500 text-red-500 hover:text-black border border-red-500 hover:border-black text-sm px-3 mx-2 h-6"
                >
                    delete progress
                </button>
            </div>
            <p className="text-gray-400 text-sm text-end mt-3">last save: {lastSaveDate}</p>
        </div>
    );
};

export default SaveConfirmation;