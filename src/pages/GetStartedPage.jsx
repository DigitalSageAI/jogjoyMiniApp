import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

function GetStartedPage() {
    const navigate = useNavigate()
  return (
    <div
        className='flex flex-col justify-end items-center w-[100%] h-[100%]'
        style={{
            backgroundImage: "url('/backgrounds/getStarted.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: 'no-repeat'
        }}
        
    >
      <p className='font-syne text-[21px] text-white w-[342px] text-left mb-2'>JOGJOY</p>
      <p className='font-sans text-[15px] text-white w-[342px] text-left mb-[24px] ' style={{ color: "rgba(255, 255, 255, 0.6)" }}>Increase your running efficiency with the help of technique analysis and individualized training</p>
      <Button className="mb-[12px]">Get started</Button>
    </div>
  )
}

export default GetStartedPage
