import React, { useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

function SignInPage() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const sendInfo = () => {
        console.log('info sending');
        
    }
    console.log(name, email, password);
    
  return (
    <div className='flex flex-col justify-start items-center bg-primary w-[100%] h-[100%]'>
        <p className='font-sans text-[17px] font-normal mt-[49px] w-[90%] text-right' style={{color: '#fff', opacity: ".5"}}>Skip</p>
        <p className='font-syne text-[21px] text-white font-semibold mt-[29px] w-[90%] text-left'>Sign In</p>
        <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-4" placeholder={'Your name and surname'}></Input>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-4" placeholder={'Email Address'}></Input>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-4" placeholder={'Your password'}></Input>
        <Button className="mt-4" onClick={sendInfo}>Get started</Button>
        <p style={{ color: "rgba(235, 235, 245, 0.6)" }} className='font-sans font-[14px] mt-[11px] w-[90%]'>By clicking “Get started”, you agree to the <span className='text-white'>Terms</span> and <span className='text-white'>Privacy policy.</span></p>
        <img src="/icons/Login.png" alt="login" className='mt-[32px] w-[90%]'/>

        <div className="flex justify-center items-center gap-[15px] w-[90%] mt-[21px]">
            <img src="/icons/facebook.png" alt="" className='w-[104px]'/>
            <img src="/icons/apple.png" alt="" className='w-[104px]'/>
            <img src="/icons/google.png" alt="" className='w-[104px]'/>
        </div>
    </div>
  )
}

export default SignInPage
