import React, { useState, useEffect, useRef, ReactNode } from 'react';
import TypewriterEffect from '../components/TypewriterEffect';
import boatman from '../images/Video.mov';
import Modal from '../components/Modal';
import sam from '../images/sam.jpg';
import zook from '../images/zook.jpg';

interface ModalData {
  id: string;
  isOpen: boolean;
  title: string;
  content: ReactNode;
  width?: string;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2025-03-07T19:00:00');
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-white">
      <p className="mb-2">Today is {new Date().toLocaleDateString()}. You have {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, and {timeLeft.seconds} seconds until the event on March 7st at 7PM.</p>
    </div>
  );
};

const FriendModal: React.FC<{ 
  image: string; 
  name: string; 
  musicUrl: string;
}> = ({ image, name, musicUrl }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-full h-96 mb-4">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover"
      />
      <a 
        href={musicUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                   bg-white text-black p-2 w-20 
                   hover:bg-black hover:text-white hover:border-white border-2 
                   hover:animate-blink text-center"
      >
        listen
      </a>
    </div>
  </div>
);

const LandingPage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [activeModals, setActiveModals] = useState<ModalData[]>([]);
    const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const playVideo = async () => {
            if (videoRef.current) {
                try {
                    await videoRef.current.play();
                } catch (error) {
                    console.error("Autoplay failed:", error);
                }
            }
        };
        playVideo();
    }, []);

    const openModal = (modalData: ModalData) => {
        const existingModal = activeModals.find(modal => modal.id === modalData.id);
        if (!existingModal) {
            setActiveModals(prev => [...prev, modalData]);
        }
    };

    const closeModal = (id: string) => {
        setActiveModals(prev => prev.filter(modal => modal.id !== id));
    };

    const specialWords = [
        {
            word: 'you',
            className: 'hover:text-green-500',
            onClick: () => {
                const email = 'volunteerdeptoffice@gmail.com';
                const subject = encodeURIComponent('Who are you?');
                const mailtoUrl = `mailto:${email}?subject=${subject}`;
                
                const link = document.createElement('a');
                link.href = mailtoUrl;
                
                try {
                    link.click();
                } catch (e) {
                    alert('Who are you?');
                }
            },
        },
        {
            word: 'visited',
            className: 'hover:text-blue-500',
            onClick: () => openModal({
                id: 'visited',
                isOpen: true,
                title: 'Visit Us',
                content: 'Visit Volunteer Department live in person at Drkmttr Collective'
            }),
        },
        {
            word: 'friend',
            className: 'hover:text-yellow-500',
            onClick: () => {
                openModal({
                    id: 'sam',
                    isOpen: true,
                    title: 'sam_hoffman',
                    content: <FriendModal 
                              image={sam}
                              name="sam_hoffman"
                              musicUrl="https://sam-hoffman.bandcamp.com/"
                            />,
                    width: 'w-96'
                });
                
                openModal({
                    id: 'zook',
                    isOpen: true,
                    title: 'zook',
                    content: <FriendModal 
                              image={zook}
                              name="zook"
                              musicUrl="https://zook1.bandcamp.com/"
                            />,
                    width: 'w-96'
                });
            },
        },
        {
            word: 'today',
            className: 'hover:text-red-500',
            onClick: () => {
                openModal({
                    id: 'today',
                    isOpen: true,
                    title: 'today',
                    content: <CountdownTimer />,
                    width: 'w-96'
                });
            },
        }
    ];

    if (!isQuestionAnswered) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-8">
                <div className="flex flex-col items-center">
                    <div className='text-left'>
                        <TypewriterEffect text="Are you the root or the worm?" isBlinking={true}/>
                    </div>
                    <div className='flex flex-row'>
                        <button
                            type='button'
                            onClick={() => setIsQuestionAnswered(true)}
                            className='bg-white text-black p-2 m-4 w-20 hover:bg-black hover:text-white hover:border-white border-2 hover:animate-blink'
                        >
                            root
                        </button>
                        <button
                            type='button'
                            onClick={() => setIsQuestionAnswered(true)}
                            className='bg-white text-black p-2 m-4 w-20 hover:bg-black hover:text-white hover:border-white border-2 hover:animate-blink'
                        >
                            worm
                        </button>
                    </div>
                    <p className="text-xs text-center absolute bottom-10">
                        © 2025 Volunteer Department, All rights reserved
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center min-h-screen bg-black text-white relative overflow-hidden">
            <video 
                ref={videoRef}
                src={boatman} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 h-screen w-auto max-w-none mx-auto object-cover"
            />
            <div className="relative z-10">
                <div className="text-center">
                    <TypewriterEffect 
                        text="Have you visited with old friend today?"
                        specialWords={specialWords}
                    />
                </div>
            </div>
            <p className="text-xs text-center fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10">
                © 2025 Volunteer Department, All rights reserved
            </p>
            {activeModals.map((modal) => (
                <Modal 
                    key={modal.id}
                    isOpen={modal.isOpen}
                    onClose={() => closeModal(modal.id)}
                    title={modal.title}
                    content={modal.content}
                    width={modal.width}
                />
            ))}
        </div>
    );
}

export default LandingPage;