import React, { useEffect } from 'react'

function StartPage() {
    useEffect(() => {
        let tg = window.Telegram.WebApp;
        tg.expand();   
    }, [])
  return (
    <div className='flex flex-col justify-center items-start w-[100%]'>
        <img 
            src="/backgrounds/startPage.png" 
            alt="start" 
            className='w-full h-[full]'
        />
    </div>
  )
}

export default StartPage
