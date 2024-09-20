import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from "react-router-dom";
// import outsideTape from '../images/Tape Fountainhead-0000021.jpg';
// import insideTape from '../images/Tape Fountainhead-0000013.jpg';
// import cd from '../images/Tape Fountainhead-0000052.jpg';
import boatman from '../images/Video.mov';
import Modal from '../components/Modal';

// interface LandingPageProps {
//     setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
// }

const LandingPage: React.FC = () => {
    // const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [modalContent, setModalContent] = useState({ isOpen: false, title: '', content: '' });
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

    // const handleClick = () => {
    //     navigate('/game');
    // }

    // setIsVisible(false);

    const links = [
        { title: 'Lyrics', content: "You'll need a petal from the Pleasure Garden to access this…" },
        { title: 'Cave of Doubt', content: "You can't get in this way…" },
        { title: 'Memory Field', content: "You'll need to go through the Pleasure Garden…" },
        { title: 'The Dream in LA', content: "File not found. Please visit the Memory Field." },
        { title: 'The Static', content: "You'll need to speak with Old Friend before you go into the static" },
        { title: 'Give Me Strength for Tomorrow', content: "Work towards the things that towards you. Take your Time. You got this - VD" },
        { title: 'Free Merch Bundle of Champion', content: "Hmm. I don't see a sword or a spool of thread in your inventory. Please complete fountain.world before claiming the Merch Bundle of Champion." },
    ];

    const openModal = (title: string, content: string) => {
        setModalContent({ isOpen: true, title, content });
    };

    const closeModal = () => {
        setModalContent({ isOpen: false, title: '', content: '' });
    };

    const renderLinks = (start: number, end: number, alignment: 'left' | 'right' | 'center') => {
        return links.slice(start, end).map((link, index) => (
            <p 
                key={index + start} 
                className={`text-white cursor-pointer hover:text-green-500 mt-2 mb-4`}
                style={{textAlign: alignment}}
                onClick={() => openModal(link.title, link.content)}
            >
                {link.title}
            </p>
        ));
    };

    return (
        <div className="flex flex-col justify-between items-center min-h-screen bg-black p-8">
            <div className="flex flex-col items-center">
                <h1 className="text-white text-5xl mb-8 text-center">VOLUNTEER DEPARTMENT</h1>
                <h2 className="text-white text-3xl mb-10">FOUNTAINHEAD</h2>
            </div>
            {isMobile ? (
                <>
                    <video 
                        ref={videoRef}
                        src={boatman} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        controls
                        className='mb-4 w-full' 
                    />
                    <div className="flex justify-between w-full mb-10">
                        <div className="flex flex-col w-1/2 text-s text-wrap">{renderLinks(0, 4, 'center')}</div>
                        <div className="flex flex-col w-1/2 text-s text-wrap">{renderLinks(4, 7, 'center')}</div>
                    </div>
                </>
            ) : (
                <div className="flex justify-between items-center w-full mb-10">
                    <div className="flex flex-col w-1/4 text-s text-wrap">{renderLinks(0, 4, 'right')}</div>
                    <video 
                        ref={videoRef}
                        src={boatman} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        controls
                        className='mx-4' 
                    />
                    <div className="flex flex-col w-1/4 text-s text-wrap">{renderLinks(4, 7, 'left')}</div>
                </div>
            )}
            {/* <iframe
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] max-w-[480px] mb-10 border-0"
                src="https://bandcamp.com/EmbeddedPlayer/album=4238437936/size=large/bgcol=333333/linkcol=2ebd35/tracklist=false/transparent=true/"
                seamless
                title="Fountainhead Bandcamp album embed"
                >
                <a href="https://volunteerdepartment.bandcamp.com/album/fountainhead">Fountainhead by Volunteer Department</a>
            </iframe> */}
            {/* <div className="flex flex-col items-center">
                <p className="text-white text-xl text-center mt-8">
                    MERCH
                </p>
                <img 
                    src={cd} 
                    alt="CD of Fountainhead" 
                    className="max-w-l md:max-w-3xl h-auto mb-4"
                />
                <img 
                    src={outsideTape} 
                    alt="Tape of Fountainhead" 
                    className="max-w-l md:max-w-3xl h-auto mb-4"
                />
                <img 
                    src={insideTape} 
                    alt="inside tape of Fountainhead" 
                    className="max-w-l md:max-w-3xl h-auto mb-8"
                />
            </div> */}
            {/* <button 
                className="text-white text-xl py-4 px-8 border border-white hover:bg-white hover:text-black transition-colors duration-300"
                onClick={handleClick}
            >
                ENTER FOUNTAINHEAD
            </button> */}
            <div className="flex flex-col items-center mb-10">
                <p className="text-white text-xl text-center">
                    where did you <a href='https://volunteerdepartment.bandcamp.com/album/fountainhead' className='text-green-500'>go</a>, champion?
                </p>
            </div> 
            <div className="flex flex-col items-center">
                <p className="text-white text-xs text-center">
                    © 2024 Volunteer Department, All rights reserved
                </p>
            </div>
            <Modal 
                isOpen={modalContent.isOpen}
                onClose={closeModal}
                content={modalContent.content}
            />
        </div>
    );
}

export default LandingPage;