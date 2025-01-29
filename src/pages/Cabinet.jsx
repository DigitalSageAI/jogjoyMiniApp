import React, { useEffect, useState } from 'react'
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'
import Loading from '../components/ui/Loading';
function Cabinet() {
    const navigate = useNavigate()
    const id = localStorage.getItem('id')
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [avatarLoaded, setAvatarLoaded] = useState(false);


    useEffect(() => {
      axios.get(`/getUserById/${id}`)
      .then(res => {
        if(res.data){
          console.log(res.data)
          setUser(res.data)
          setIsLoading(false)
        }
      })
    }, [])

    const handleFileSelection = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setIsLoading(true)
  
      // Update preview
      const reader = new FileReader();
      reader.onload = () => {
        setUser(prev => ({...prev, avatar: reader.result}));
      };
      reader.readAsDataURL(file);
  
      try {
        // Upload file to backend
        const formData = new FormData();
        formData.append('photo', file);
  
        const response = await axios.post(
          `/uploadPhoto/${id}`, // Replace USER_ID dynamically
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        console.log('Upload successful:', response.data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    };
    

  return (
    <>
    {
      isLoading ?
      <Loading></Loading>
      :
      <div className="w-[100%] flex flex-col justify-start items-center relative">
      {/* Фон */}
      <img
        src="/backgrounds/cabinet.png"
        alt="cabinet_bg"
        className="top-0 w-[100%] h-[146px] object-cover -z-10"
      />
      
      {/* Надпись "Profile" */}
      <p className="top-[11px] text-[17px] font-syne text-white font-semibold absolute">
        Профиль
      </p>
      
      {/* Карточка профиля */}
      <div className="w-[90%] h-[454px] bg-white rounded-[8px] flex flex-col justify-start items-center relative">
        <label htmlFor='image' className="w-[97px] relative">
        <img
          src={user?.avatar ? user?.avatar : "/icons/user.jpg"}
          className={`rounded-[50%] w-[97px] h-[97px] object-cover mt-[-50px] transition-opacity duration-500 ${avatarLoaded ? 'opacity-100' : 'opacity-0'}`}
          alt=""
          onLoad={() => setAvatarLoaded(true)}
        />

          <img
            className="absolute right-[10px] bottom-[5px]"
            src="/icons/photo.svg"
            alt=""
          />
            <input
              type='file'
              hidden={true}
              id={`image`}
              onChange={(e) => handleFileSelection(e)}
              accept='.png, .jpg'
            />
        </label>
        <div onClick={() => navigate('/support')} className="mt-[65px] w-[95%] h-[46px] rounded-[10px] flex justify-between items-center px-[10px]" style={{border: '1px solid rgba(60, 60, 67, 0.2)'}}>
            <div className="gap-[5px] flex justify-start items-center">
                <img src="/icons/letter.svg" alt="" />
                <p>Служба поддержки</p>
            </div>
            <img src="/icons/Arrow.png" className='w-[19px]' alt="" />
        </div>
        <div onClick={() => navigate('/feedback')} className="mt-[8px] w-[95%] h-[46px] rounded-[10px] flex justify-between items-center px-[10px]" style={{border: '1px solid rgba(60, 60, 67, 0.2)'}}>
            <div className="gap-[5px] flex justify-start items-center">
                <img src={"/icons/message.svg"} alt="" />
                <p>Отправить отзыв</p>
            </div>
            <img src="/icons/Arrow.png" className='w-[19px]' alt="" />
        </div>
        {/* <div onClick={() => navigate('/notifications')}  className="mt-[8px] w-[95%] h-[46px] rounded-[10px] flex justify-between items-center px-[10px]" style={{border: '1px solid rgba(60, 60, 67, 0.2)'}}>
            <div className="gap-[5px] flex justify-start items-center">
                <img src="/icons/bell.svg" alt="" />
                <p>Notification</p>
            </div>
            <img src="/icons/Arrow.png" className='w-[19px]' alt="" />
        </div> */}
      {/* Follow us */}
      <p className='mt-[43px]'>Подпишитесь на нас</p>
      <div className="mt-2 flex justify-center items-start gap-[13px]">
        <img src="/icons/Facebook.svg" alt="" />
        <img src="/icons/Twitter.svg" alt="" />
        <img src="/icons/Linkedin.svg" alt="" />
        <img src="/icons/Instagram.svg" alt="" />
        <img src="/icons/Reddit.svg" alt="" />
      </div>

      <Button className="mt-[80px] w-[99%]">Получить подписку</Button>
      </div>

    </div>
    }
    </>
  );
}

export default Cabinet;
