import React from 'react'
import Menu from '../components/shared/Menu'
import MenuWorkout from '../components/shared/MenuWorkout'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

function Main() {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-between items-center bg-primary w-[100%]' style={{ height: "100%" }}>
        <div className="flex flex-col justify-start items-center w-[100%]">
            <div className="flex justify-between items-start w-[340px] mt-[45px]">
                <p className='font-syne text-lightGray text-[17px] font-semibold opacity-50'>Welcome!</p>
                <img src="/icons/notification.png" className='w-[28px]' alt="" />
            </div>

            <div className="font-syne text-white font-semibold text-[21px] w-[340px] mb-[24px] text-left">
                Explore the app's features
            </div>

            <MenuWorkout />
            <Menu />
        </div>
        <div className="w-[100%] flex flex-col items-center ">

            <Button onClick={() => navigate('/getFreeAccount')} className="mb-[12px] h-[52px] mt-[24px] shrink-0">
                Get your free account
            </Button>
        </div>
    </div>
  )
}

export default Main
