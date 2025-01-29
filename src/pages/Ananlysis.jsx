import React, { useEffect, useState } from 'react';
import Metric from '../components/ui/Metric';
import axios from '../axios';
import Loading from '../components/ui/Loading';
import WaitPopup from '../components/shared/WaitPopup';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

function Analysis() {
  const id = localStorage.getItem('id');
  const [subscribe, setSubscribe] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(false)
  const [isVideo, setIsVideo] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`/getUserById/${id}`)
      .then((response) => response.data)
      .then((data) => {
        if (data) {
          setSubscribe(data.subscribe);
        }
        if (data.analysis?.videoUrl) {
          setIsVideo(true);
          const videoApiUrl = `https://ai.jogjoy.run/apik/uploads/${data.analysis.videoUrl}`;
          const resultsApiUrl = `https://ai.jogjoy.run/apik/metrics/${data.analysis.videoUrl}?lang=en`;
          fetch(videoApiUrl, {
            method: 'GET',
            headers: {
              'x-api-key': 'b0ec52c0-5962-4100-bf78-1ab38d8fc52f',
              'x-access-token': '11ba0902-2fc1-4059-9c0e-6c0bb8fa6e70',
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch video');
              }
              return response.blob();
            })
            .then((blob) => {
              const videoBlobUrl = URL.createObjectURL(blob);
              // console.log(videoBlobUrl?.slice[4, videoBlobUrl.length-1], 'videoBlobUrl');
              
              setVideoUrl(videoBlobUrl);
            })
            .catch((error) => {
              console.error('Ошибка загрузки видео:', error)
              setIsVideo(false);
          });
          fetch(resultsApiUrl, {
            method: 'GET',
            headers: {
              'x-api-key': 'b0ec52c0-5962-4100-bf78-1ab38d8fc52f',
              'x-access-token': '11ba0902-2fc1-4059-9c0e-6c0bb8fa6e70',
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch video');
              }
              return response.json();
            })
            .then((data) => {
              console.log(data)
              setMetrics(data?.mean_metrics)
            })
            .catch((error) => {
              console.error('Ошибка загрузки видео:', error)
              setError(true)
          });

          
        }else{
          setIsVideo(false); 
        }
      })
      .catch((error) => console.error('Ошибка при загрузке данных пользователя:', error));
  }, []);

  const handleImageClick = () => {
    if (isVideo && videoUrl) {
      setIsModalOpen(true); // Открыть модальное окно
    } else {

      console.error('Видео еще не загружено.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрыть модальное окно
  };

  return (
    <div className="relative flex flex-col justify-start items-center w-[100%]">
      {
        error &&
      <WaitPopup></WaitPopup>
      }
      <p className="font-syne mt-4 text-[17px] text-white font-semibold">Анализ</p>
      <img src="/icons/shared.svg" className="absolute top-[10px] right-[10px]" alt="" />

      <div className={`mb-[15px] bg-white rounded-[10px] w-[343px] ${isVideo ? 'h-[631px]' : 'h-[171px]' } flex flex-col justify-start mt-[15px]`}>
        <div className="flex justify-center items-start mt-[15px] relative">
          { isVideo &&
            videoUrl &&
            <img src="/icons/playVideo.svg" className='absolute top-[60px]' style={{ pointerEvents: "none" }} alt="" />
          }
          { isVideo && videoUrl ? (
            <video
              src={videoUrl}
              className="rounded-lg w-[95%] cursor-pointer h-[200px] object-cover"
              onClick={handleImageClick} // Открыть модальное окно
              onLoadedData={(e) => {
                e.target.pause(); // Остановить воспроизведение на первом кадре
              }}
              muted
            />
          ) : (
            <div>
            {
              isVideo &&
            <Loading />
            }
          </div>
          )}
        </div>
        <div className="mt-4 mb-5 ml-[10px]">
        {
            isVideo &&
          <h3 className="font-semibold mb-2 font-syne">Metrics</h3>
          }
          {subscribe != null && metrics != null ? (
            <>
              <Metric percent={+metrics[0]?.toString().slice(2, 4)} title={'Удар ногой к центру тяжести'} />
              <Metric blured={subscribe === false} percent={+metrics[1]?.toString().slice(2, 4)} title={'Положение для удара ногой'} />
              <Metric blured={subscribe === false} percent={+metrics[2]?.toString().slice(2, 4)} title={'Движение верхней части тела'} />
              <Metric blured={subscribe === false} percent={+metrics[3]?.toString().slice(2, 4)} title={'Угол наклона ствола'} />
            </>
          ) : (
            <>
              <div className={`flex flex-col justify-start items-center`}>
                Чтобы получить анализ загрузите пожалуйста видео вашего бега
              </div>
                <Button className="w-[97%] mt-4" onClick={subscribe ? () => navigate('/analysis') : () => navigate('/payment')}>Перейти к анализу</Button>
              {
                isVideo &&
                <Loading />
              }
              

            </>
          )}
        </div>
      </div>

      {/* Модальное окно для воспроизведения видео */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-30">
          <div className="relative w-[90%] max-w-[600px]">
            <video
              src={videoUrl}
              controls
              autoPlay
              className="rounded-lg w-full"
            />
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white bg-gray rounded-full px-[6px] "
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {
        isVideo &&
      <Button onClick={() => navigate('/results')} className="mt-0">Получить упражнения</Button>
      }
    </div>
  );
}

export default Analysis;
