import React from 'react';
// import { useNavigate } from "react-router-dom";
// import outsideTape from '../images/Tape Fountainhead-0000021.jpg';
// import insideTape from '../images/Tape Fountainhead-0000013.jpg';
// import cd from '../images/Tape Fountainhead-0000052.jpg';
import boatman from '../images/Video.mov';

// interface LandingPageProps {
//     setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
// }

const LandingPage: React.FC = () => {
    // const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate('/game');
    // }

    // setIsVisible(false);

    return (
        <div className="flex flex-col justify-between items-center min-h-screen bg-black p-8">
            <div className="flex flex-col items-center">
                <h1 className="text-white text-5xl mb-8 text-center">VOLUNTEER DEPARTMENT</h1>
                <h2 className="text-white text-3xl mb-10">FOUNTAINHEAD</h2>
            </div>
            <iframe
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] max-w-[480px] mb-10 border-0"
                src="https://bandcamp.com/EmbeddedPlayer/album=4238437936/size=large/bgcol=333333/linkcol=2ebd35/tracklist=false/transparent=true/"
                seamless
                title="Fountainhead Bandcamp album embed"
                >
                <a href="https://volunteerdepartment.bandcamp.com/album/fountainhead">Fountainhead by Volunteer Department</a>
            </iframe>
            <video src={boatman} autoPlay loop muted className='mb-8' />
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
            <div className="flex flex-col items-center mt-8">
                <p className="text-white text-sm text-center">
                    © 2024 Volunteer Department, All rights reserved
                </p>
            </div>
                    
        </div>
    );
}

export default LandingPage;