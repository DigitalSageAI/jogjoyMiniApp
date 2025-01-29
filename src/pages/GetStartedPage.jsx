import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import axios from '../axios'

function GetStartedPage() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  // const initData = window.Telegram.WebApp.initData;
  const initData = 'user=%7B%22id%22%3A5056024242%2C%22first_name%22%3A%22%3C%5C%2Fabeke%3E%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22abylaikak%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FAj3hfrbNq8PfLLKvsSp3-WizcXTc3HO8Vynsw3R1a1A5spK3fDmZERABNoOGLEQN.svg%22%7D&chat_instance=-4908992446394523843&chat_type=private&auth_date=1735556539&signature=pgNJfzcxYGAcJCJ_jnsYEsmiTJJxOP2tNKb941-fT7QcsUQ2chSkFcItG8KvjR_r3nH0vem4bxtlltuyX-IwBQ&hash=c0b510163f5b1dea53172644df35e63458216a9d5d9a10413af4f5b0204bb493';

  useEffect(() => {
    const img = new Image();
    img.src = '/backgrounds/getStarted.png';
    img.onload = () => setIsImageLoaded(true);
  }, []);

  const getTelegramId = () => {
    axios.post('/getTelegramId', {
      initData: initData
    })
    .then(response => {
      if(response.data){
        localStorage.setItem("id", response.data.user._id)
        navigate('/main')
      }
    })
    .catch(error => {
      console.error('Ошибка при отправке данных:', error);
      alert('Произошла ошибка')
    });
  }

  return (
    <div
      className={`flex flex-col justify-end items-center w-[100%] h-[100%] transition-opacity duration-500 ${
        isImageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: "url('/backgrounds/getStarted.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {isImageLoaded && (
        <>
          <p className="font-syne text-[21px] text-white w-[342px] text-left mb-2">JOGJOY</p>
          <p
            className="font-sans text-[15px] text-white w-[342px] text-left mb-[24px]"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            Повысьте эффективность своего бега с помощью анализа техники и индивидуальных тренировок
          </p>
          <Button onClick={() => getTelegramId()} className="mb-[12px]">Начать</Button>
        </>
      )}
    </div>
  );
}

export default GetStartedPage;
