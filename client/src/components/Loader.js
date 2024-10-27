import React from 'react';
import animationData from "../assets/lotties/loader.json"; // Ensure this path is correct
import Lottie from 'lottie-react';


const Loading = () => {
    return (
        <div className="bg-transparent flex-col flex items-center justify-center w-full h-screen">
            <Lottie className='w-[200px]' animationData={animationData} width={50} loop={true} autoplay={true} />
            <p className='font-bold text-white font-serif'>Loading...</p>
        </div>
    );
};

export default Loading;