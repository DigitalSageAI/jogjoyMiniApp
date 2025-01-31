import React, { useEffect, useState } from 'react';

function WaitPopup({ closePopup }) {
  const [timeLeft, setTimeLeft] = useState(0); // Состояние для оставшегося времени
  const savedTime = localStorage.getItem('time'); // Дата из localStorage

  useEffect(() => {
    if (savedTime) {
      const targetTime = new Date(savedTime).getTime();

      const updateCountdown = () => {
        const now = Date.now();
        const difference = Math.max(0, Math.ceil((targetTime - now) / 1000)); // Оставшееся время в секундах
        setTimeLeft(difference);

        if (difference <= 0) {
          clearInterval(timer); // Остановить таймер, если время истекло
          window.location.reload()
          closePopup()
        }
      };

      const timer = setInterval(updateCountdown, 1000); // Обновление каждую секунду
      updateCountdown(); // Обновить сразу после загрузки

      return () => clearInterval(timer); // Очистить таймер при размонтировании компонента
    }
  }, [savedTime]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <div
        className="relative w-[95%] h-[300px] rounded-[20px] flex flex-col justify-center items-center"
        style={{ background: '#1c1c1e' }}
      >
        <img src="/logo.svg" className="z-50" alt="Logo" />
        <p className="text-white font-sans w-[90%] text-center mt-5 z-50">
          {
            timeLeft < 0 &&
            <img onClick={() => closePopup()} className='absolute top-3 right-3' src='/icons/Close.svg' />
          }
          
          {timeLeft > 0 ? (
            <>Подождите пожалуйста, ваш анализ будет готов через {timeLeft} секунд.</>
          ) : (
            <>Ваш анализ готов!</>
          )}
        </p>
      </div>
    </div>
  );
}

export default WaitPopup;
