import React, { useEffect, useState } from 'react'
import axios from '../axios'
import Button from '../components/ui/Button'
import Loading from '../components/ui/Loading'
import { useNavigate } from 'react-router-dom'

function Stats() {
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
            <p className='font-syne font-semibold text-white text-[17px] mt-4'>Analysis history</p>
            <img className='mt-[100px]' src="/images/locked.svg" alt="" />
            <Button onClick={() => navigate('/payment')} className="absolute bottom-3">Get access</Button>
        </div> :
        <div>
            
        </div>
    }
    {
        subscribe == null &&
        <Loading></Loading>
    }
    </>
  )
}

export default Stats
