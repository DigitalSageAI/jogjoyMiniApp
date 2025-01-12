import React from 'react'
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
function Cabinet() {
    const navigate = useNavigate()
  return (
    <div className="w-[100%] flex flex-col justify-start items-center relative">
      {/* Фон */}
      <img
        src="/backgrounds/cabinet.png"
        alt="cabinet_bg"
        className="top-0 w-[100%] h-[146px] object-cover -z-10"
      />
      
      {/* Надпись "Profile" */}
      <p className="top-[11px] text-[17px] font-syne text-white font-semibold absolute">
        Profile
      </p>
      
      {/* Карточка профиля */}
      <div className="w-[90%] h-[454px] bg-white rounded-[8px] flex flex-col justify-start items-center relative">
        <div className="w-[97px] relative">
          <img
            src="/icons/user.jpg"
            className="rounded-[50%] w-[97px] mt-[-50px]"
            alt=""
          />
          <img
            className="absolute right-[10px] bottom-[5px]"
            src="/icons/photo.svg"
            alt=""
          />
        </div>

        {/* <div className="mt-[13px] w-[95%] h-[46px] rounded-[10px] flex justify-between items-center px-[10px]" style={{border: '1px solid rgba(60, 60, 67, 0.2)'}}>
            <div className="gap-[5px] flex justify-start items-center">
                <img src="/icons/pen.svg" alt="" />
                <p>Edit Profile</p>
            </div>
            <img src="/icons/Arrow.png" className='w-[19px]' alt="" />
        </div> */}
        <div onClick={() => navigate('/support')} className="mt-[65px] w-[95%] h-[46px] rounded-[10px] flex justify-between items-center px-[10px]" style={{border: '1px solid rgba(60, 60, 67, 0.2)'}}>
            <div className="gap-[5px] flex justify-start items-center">
                <img src="/icons/letter.svg" alt="" />
                <p>Contact Support</p>
            </div>
            <img src="/icons/Arrow.png" className='w-[19px]' alt="" />
        </div>
        <div onClick={() => navigate('/feedback')} className="mt-[8px] w-[95%] h-[46px] rounded-[10px] flex justify-between items-center px-[10px]" style={{border: '1px solid rgba(60, 60, 67, 0.2)'}}>
            <div className="gap-[5px] flex justify-start items-center">
                <img src="/icons/message.svg" alt="" />
                <p>Send feedback</p>
            </div>
            <img src="/icons/Arrow.png" className='w-[19px]' alt="" />
        </div>
        <div onClick={() => navigate('/notifications')}  className="mt-[8px] w-[95%] h-[46px] rounded-[10px] flex justify-between items-center px-[10px]" style={{border: '1px solid rgba(60, 60, 67, 0.2)'}}>
            <div className="gap-[5px] flex justify-start items-center">
                <img src="/icons/bell.svg" alt="" />
                <p>Notification</p>
            </div>
            <img src="/icons/Arrow.png" className='w-[19px]' alt="" />
        </div>
      {/* Follow us */}
      <p className='mt-[43px]'>Follow us</p>
      <div className="mt-2 flex justify-center items-start gap-[13px]">
        <img src="/icons/Facebook.svg" alt="" />
        <img src="/icons/Twitter.svg" alt="" />
        <img src="/icons/Linkedin.svg" alt="" />
        <img src="/icons/Instagram.svg" alt="" />
        <img src="/icons/Reddit.svg" alt="" />
      </div>

      <Button className="mt-[25px]">Get access</Button>
      </div>

    </div>
  );
}

export default Cabinet;
