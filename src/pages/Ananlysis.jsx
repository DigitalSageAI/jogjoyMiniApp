import React, { useEffect, useState } from 'react'
import Metric from '../components/ui/Metric'
import axios from '../axios'
import Loading from '../components/ui/Loading'

function Ananlysis() {
    const id = localStorage.getItem('id')
    const [subscribe, setSubscribe] = useState(null)
  
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
    <div className='relative flex flex-col justify-start items-center w-[100%]'>
        <p className='font-syne mt-4 text-[17px] text-white font-semibold'>Analysis</p>
        <img src="/icons/shared.svg" className='absolute top-[10px] right-[10px]' alt="" />

        <div className="mb-[15px] bg-white rounded-[10px] w-[343px] h-[681px] flex flex-col justify-center mt-[15px]">
        <div className='flex justify-center items-start mt-[15px]'>
            <img 
              src='/images/video.png' 
              alt='Analysis' 
              className='rounded-lg w-[95%]'
            />
          </div>
          <div className='mt-4 mb-5 ml-[10px]'>
            <h3 className='font-semibold mb-2 font-syne'>Metrics</h3>
            { subscribe != null ?
               <>
              <Metric percent={68} title={'Footstrike Proximity to Center of Gravity'}/>
              <Metric blured={subscribe == false ? true : false} percent={34} title={'Footstrike Position'}/>
              <Metric blured={subscribe == false ? true : false} percent={71} title={'Upper Body Movement'}/>
              <Metric blured={subscribe == false ? true : false} percent={28} title={'Trunk Inclination Angle'}/>
              </> :
              <>
                <div className='h-[350px]'></div>
                <Loading/>
              </>
            }
          </div>
        </div>


    </div>
  )
}

export default Ananlysis
