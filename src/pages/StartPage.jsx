import React, { useEffect } from 'react'

function StartPage() {
    useEffect(() => {

        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
  
    }, []);
  return (
    <div className='flex flex-col justify-center items-start w-[100%]'>
        <img 
            src="/backgrounds/startPage.png" 
            alt="start" 
            className='w-full h-[full]'
        />
        afdsafsd
    </div>
  )
}

export default StartPage
