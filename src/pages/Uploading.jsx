import React, { useState } from 'react';
import Button from '../components/ui/Button';
import './styles/LoadingAnimation.css'
import { useNavigate } from 'react-router-dom';
function Uploading() {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate()

  const handleImageClick = () => {
    if(isUploading == false){
        setIsUploading(true);
        setTimeout(() => {
          setIsUploading(false);
          navigate('/main')
        }, 3000); // 3 секунды
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-start items-center">
      <p className="font-syne font-semibold text-[17px] text-white mt-[20px] z-10">
        Uploading Video
      </p>
      <div
        className="w-[344px] h-[228px] mt-[20px] flex justify-center items-center cursor-pointer z-10"
        onClick={handleImageClick}
      >
          <img src="/backgrounds/uploading.svg" alt="Upload" />
      </div>
      <Button className="absolute bottom-[20px] z-10">Send to analyse</Button>

      {isUploading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center">
          <div className="flex space-x-2">
            <div className="circle-loader bg-green-500"></div>
            <div className="circle-loader bg-gray animation-delay-200"></div>
            <div className="circle-loader bg-green-500 animation-delay-400"></div>
            <div className="circle-loader bg-gray animation-delay-600"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Uploading;
