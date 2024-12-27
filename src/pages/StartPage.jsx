import React from 'react'
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-center items-start w-[100%]'>
        <img 
            onClick={() => navigate('/getStarted')}
            src="/backgrounds/startPage.png" 
            alt="start" 
            className='w-full h-[full]'
        />
    </div>
  )
}

export default StartPage
