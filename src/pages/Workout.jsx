import React, { useEffect, useState } from 'react'
import axios from '../axios'
import Button from '../components/ui/Button'
import Loading from '../components/ui/Loading'
import { useNavigate } from 'react-router-dom'
function Workout() {
    const id = localStorage.getItem('id')
    const [subscribe, setSubscribe] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/getUserById/${id}`)
        .then(response => response.data)
        .then(data => {
        if(data){
            setSubscribe(data.subscribe)        
        }
        })
    }, [])

  return (
    <>
    {
        subscribe != null && subscribe == false ?
        <div className='flex flex-col justify-start items-center relative h-[100%]'>
            <p className='font-syne font-semibold text-white text-[17px] mt-4'>Workout Program</p>
            <img className='mt-[100px]' src="/images/locked.svg" alt="" />
            <Button onClick={() => navigate('/payment')} className="absolute bottom-3">Get access</Button>
        </div> :
        <div className='flex flex-col justify-start items-center relative h-[100%]'>
            <p className='font-syne font-semibold text-white text-[17px] mt-4'>Work out</p>
            <div className="flex flex-col justify-start items-center w-[343px] rounded-[8px] gap-[8px] py-2 mt-[20px]" style={{ background: 'rgba(116, 116, 128, 0.18)' }}>
                <div className="w-[90%] flex justify-between items-center">
                    <p className='text-white font-sans text-[13px] opacity-60'>Number of days per week</p>
                    <p className='text-white font-sans text-[13px]'>3</p>
                </div>
                <img src="/images/Line.svg" alt="" />
                <div className="w-[90%] flex justify-between items-center">
                    <p className='text-white font-sans text-[13px] opacity-60'>Duration of the training program</p>
                    <p className='text-white font-sans text-[13px]'>1 month</p>
                </div>
            </div>
            <p className='text-[14px] font-sans font-semibold mt-[22px] w-[343px] text-left' style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Select workout days by clicking on the date</p>

            <Button className="absolute bottom-3" onClick={() => navigate('/training')}>Ready!</Button>
        </div>
    }
    {
        subscribe == null &&
        <Loading></Loading>
    }
    </>
  )
}

export default Workout
