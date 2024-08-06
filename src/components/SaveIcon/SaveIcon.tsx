import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import SaveModal from "./SaveModal";

const SaveIcon: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-4 right-4 z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
      >
        <svg
          fill="currentColor"
          className="w-full h-full text-white active:text-green"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          enable-background="new 0 0 64 64"
        >
          <g id="Floppy-disk">
            <path d="M35.2673988,6.0411h-7.9999981v10h7.9999981V6.0411z M33.3697014,14.1434002h-4.2046013V7.9387999h4.2046013V14.1434002z" />
            <path
              d="M41,47.0410995H21c-0.5527992,0-1,0.4472008-1,1c0,0.5527,0.4472008,1,1,1h20c0.5527,0,1-0.4473,1-1
                    C42,47.4883003,41.5527,47.0410995,41,47.0410995z"
            />
            <path
              d="M41,39.0410995H21c-0.5527992,0-1,0.4472008-1,1c0,0.5527,0.4472008,1,1,1h20c0.5527,0,1-0.4473,1-1
                    C42,39.4883003,41.5527,39.0410995,41,39.0410995z"
            />
            <path d="M12,56.0410995h38v-26H12V56.0410995z M14,32.0410995h34v22H14V32.0410995z" />
            <path
              d="M49.3811989,0.0411L49.3610992,0H7C4.7908001,0,3,1.7909,3,4v56c0,2.2092018,1.7908001,4,4,4h50
                    c2.2090988,0,4-1.7907982,4-4V11.6962996L49.3811989,0.0411z M39.9604988,2.0804999v17.9211006H14.0394001V2.0804999H39.9604988z
                    M59,60c0,1.1027985-0.8972015,2-2,2H7c-1.1027999,0-2-0.8972015-2-2V4c0-1.1027999,0.8972001-2,2-2h5v20.0410995h30V2h6.5099983
                    L59,12.5228996V60z"
            />
          </g>
        </svg>
      </button>

      {isModalOpen && (
        <SaveModal isLoggedIn={!!user} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default SaveIcon;
