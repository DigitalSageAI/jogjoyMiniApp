import React from 'react'

function Metric({ percent, title }) {
    let image = '/images/okIcon.png'
    if(percent <= 65 && percent >= 30){
        image = '/images/normIcon.png'
    }else if(percent < 30){
        image = '/images/badIcon.png'
    }
  return (
    <div className='flex justify-start items-center w-[324px] rounded-[10px] h-[80px] mt-2' style={{background: '#f2f2f7'}}>
        <img src={image} alt="" className='w-[60px] ml-[1px] mr-[10px]'/>
        <div className="flex flex-col justify-start items-start gap-[0px]">
            <p className='font-sans text-[12px]' style={{ color: "rgba(0, 0, 0, 0.6)", lineHeight: "120%" }}>{percent}%</p>
            <h4 className='font-sans text-[14px] text-black w-[184px]' style={{ lineHeight: "120%" }}>{title}</h4>
        </div>
        <img src="/icons/Arrow.png" className='ml-[24px] w-[13px]' alt="" />
    </div>
  )
}

export default Metric
