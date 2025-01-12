import React from 'react';
import '../../pages/styles/LoadingAnimation.css';

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center">
      <div className="flex space-x-2">
        <div className="circle-loader bg-green-500"></div>
        <div className="circle-loader bg-gray animation-delay-200"></div>
        <div className="circle-loader bg-green-500 animation-delay-400"></div>
        <div className="circle-loader bg-gray animation-delay-600"></div>
      </div>
    </div>
  );
};

export default Loading;
