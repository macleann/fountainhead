import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGameState } from '../../contexts/GameStateContext';

declare global {
  interface Window {
    google: any;
  }
}

const GoogleLoginButton: React.FC = () => {
  const { googleAuthenticate } = useAuth();
  const { gameState } = useGameState();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      await googleAuthenticate(response.credential, gameState);
    } catch (error) {
      console.error('Google authentication failed:', error);
    }
  };

  const handleGoogleSignIn = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.error('Google Sign-In failed to display');
        }
      });
    }
  };

  return (
    <button 
      ref={buttonRef}
      onClick={handleGoogleSignIn}
      className="w-full bg-black hover:bg-white text-white hover:text-black border border-white hover:border-black px-4 py-2 flex items-center justify-center"
    >
      <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
        />
      </svg>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;