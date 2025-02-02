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
  const [error, setError] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isNewFetch = localStorage.getItem('newFetch')
    if(isNewFetch == "true"){
      console.log(isNewFetch)
      localStorage.setItem('newFetch', false)
      window.location.href = window.location.href;

    }
    axios
      .get(`/getUserById/${id}`)
      .then(({ data }) => {
        setSubscribe(data.subscribe);
        if (data.analysis?.videoUrl) {
          setIsVideo(true);
          const videoApiUrl = `https://ai.jogjoy.run/apik/uploads/${data.analysis.videoUrl}`;
          const resultsApiUrl = `https://ai.jogjoy.run/apik/metrics/${data.analysis.videoUrl}?lang=en`;

          return Promise.all([
            fetch(videoApiUrl, {
              method: 'GET',
              headers: {
                'x-api-key': 'b0ec52c0-5962-4100-bf78-1ab38d8fc52f',
                'x-access-token': '11ba0902-2fc1-4059-9c0e-6c0bb8fa6e70',
              },
            })
              .then((res) => res.ok ? res.blob() : Promise.reject('Failed to fetch video'))
              .then((blob) => setVideoUrl(URL.createObjectURL(blob))),
            fetch(resultsApiUrl, {
              method: 'GET',
              headers: {
                'x-api-key': 'b0ec52c0-5962-4100-bf78-1ab38d8fc52f',
                'x-access-token': '11ba0902-2fc1-4059-9c0e-6c0bb8fa6e70',
              },
            })
              .then((res) => res.ok ? res.json() : Promise.reject('Failed to fetch metrics'))
              .then((data) => setMetrics(data?.mean_metrics)),
          ]);
        }
        setIsVideo(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  

  if (loading) return <Loading />;

  return (
    <div className="relative flex flex-col justify-start items-center w-[100%]">
      <p className="font-syne mt-4 text-[17px] text-white font-semibold">Анализ</p>
      <img src="/icons/shared.svg" className="absolute top-[10px] right-[10px]" alt="" />
      <div className={`mb-[15px] bg-white rounded-[10px] w-[343px] ${isVideo ? 'h-[631px]' : 'h-[171px]'} flex flex-col justify-start mt-[15px]`}>
        <div className="flex justify-center items-start mt-[15px] relative">
          {isVideo && videoUrl && (
            <img src="/icons/playVideo.svg" className="absolute top-[60px]" alt="" />
          )}
          {isVideo && videoUrl ? (
            <video
              src={videoUrl}
              className="rounded-lg w-[95%] cursor-pointer h-[200px] object-cover"
              onClick={() => setIsModalOpen(true)}
              // onLoadedData={(e) => e.target.pause()}
              // muted
              poster={videoUrl || '/images/video.png'}
            />
          ) : isVideo ? (
            <Loading />
          ) : null}
        </div>
        <div className="mt-4 mb-5 ml-[10px]">
          {isVideo && <h3 className="font-semibold mb-2 font-syne">Metrics</h3>}
          {subscribe !== null && metrics !== null ? (
            metrics.map((metric, index) => (
              <Metric
                key={index}
                percent={+metric?.toString().slice(2, 4)}
                title={["Удар ногой к центру тяжести", "Положение для удара ногой", "Движение верхней части тела", "Угол наклона ствола"][index]}
                blured={subscribe === false && index > 0}
              />
            ))
          ) : (
            <>
              <div className="flex flex-col justify-start items-center">
                Чтобы получить анализ загрузите пожалуйста видео вашего бега
              </div>
              <Button className="w-[97%] mt-4" onClick={() => navigate(subscribe ? '/analysis' : '/payment')}>
                Перейти к анализу
              </Button>
            </>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-30">
          <div className="relative w-[90%] max-w-[600px]">
            <video src={videoUrl} controls autoPlay className="rounded-lg w-full" />
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-white bg-gray rounded-full px-[6px]">✕</button>
          </div>
        </div>
      )}
      {isVideo && <Button onClick={() => navigate('/results')} className="mt-0">Получить упражнения</Button>}
    </div>
  );
}

export default Analysis;