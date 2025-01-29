import React from 'react'
import { useNavigate } from 'react-router-dom'

function TrainingPage() {
  const exercices = [
    {
      img: "/images/exercices2/1.svg",
      title: "Растяжка используя какие то мышщы ",
      duration: "30 сек."
    },
    {
      img: "/images/exercices2/2.svg",
      title: "Ноги",
      duration: "30 сек."
    },
    {
      img: "/images/exercices2/3.svg",
      title: "Икры",
      duration: "30 сек."
    },
  ]
  const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-start items-center w-[100%] ' >
        <img onClick={() => navigate(-1)} src="/icons/Left Arrow Button.svg" className='absolute left-4 mt-[11px]' alt="" />
        <p className="mt-[11px] text-[17px] font-syne text-white font-semibold ">Day 1</p>
        <div className="flex flex-col justify-start items-center w-[343px] rounded-[8px] gap-[8px] py-2 mt-[20px]" style={{ background: 'rgba(116, 116, 128, 0.18)' }}>
          <div className="w-[90%] flex justify-between items-center">
              <p className='text-white font-sans text-[13px] opacity-60'>Продолжительность</p>
              <p className='text-white font-sans text-[13px]'>14 мин.</p>
          </div>
          <img src="/images/Line.svg" alt="" />
          <div className="w-[90%] flex justify-between items-center">
              <p className='text-white font-sans text-[13px] opacity-60'>Сложность</p>
              <p className='text-white font-sans text-[13px]'>Лёгкая</p>
          </div>
        </div>
        <p className="mt-[17px] text-[17px] font-sans text-white font-semibold w-[90%]">Упражнения</p>
        {
          exercices && exercices.map(elem => 
            <div className="flex justify-center items-center bg-gray w-[343px] h-[104px] mt-2 rounded-[10px] gap-[16px]">
              <img src={elem.img} alt="" />
              <div className="flex flex-col justify-center items-start w-[172px]">
                <h1 className='font-sans text-[15px] font-semibold text-white'>{elem.title}</h1>
                <p className='font-sans text-[13px] font-medium text-white opacity-60'>{elem.duration}</p>
              </div>
              <img src="/icons/play.svg" alt="" />
            </div>
          )
        }

      <video src='https://videos.pexels.com/video-files/3209300/3209300-uhd_2560_1440_25fps.mp4' controls width="343">
      </video>
    </div>
  )
}

export default TrainingPage
