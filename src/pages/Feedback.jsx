import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
function Feedback() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

  return (
    <div className='flex flex-col justify-start items-center w-[100%] h-[100%]' style={{ background: "#101010" }}>
        <img onClick={() => navigate(-1)} src="/icons/Left Arrow Button.svg" className='absolute left-4 mt-[11px]' alt="" />
        <p className="mt-[11px] text-[17px] font-syne text-white font-semibold ">Feedback</p>
        <p className='font-sans font-semibold text-[15px] text-white mt-[19px] w-[90%] text-left' style={{ opacity: ".6" }}>Your email</p>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" placeholder={'Email Address'}></Input>
        <p className='font-sans font-semibold text-[15px] text-white mt-[24px] w-[90%] text-left' style={{ opacity: ".6" }}>Your feedback</p>
        <textarea value={message} style={{background: "rgba(118, 118, 128, 0.24)", color: 'white', border: '1px solid rgba(84, 84, 88, 0.65)'}} onChange={(e) => setMessage(e.target.value)} className="rounded-[8px] pt-3 w-[342px] focus:outline-none px-[17px] placeholder:text-middleGray mt-2 h-[400px] align-top text-start" placeholder={'Write your feedback here'}></textarea>
        <Button className="mt-[23px] mb-[12px]">Send</Button>
    </div>
  )
}

export default Feedback
