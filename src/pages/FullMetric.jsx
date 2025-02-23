import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/ui/Loading";
import Button from "../components/ui/Button";

function FullMetric() {
  const [selected, setSelected] = useState("Analysis");
  const navigate = useNavigate();
  const percent = localStorage.getItem("percent");
  const title = localStorage.getItem("title");
  const [videoUrl, setVideoUrl] = useState("");
  const id = localStorage.getItem("id");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`/getUserById/${id}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.analysis?.videoUrl) {
          const videoApiUrl = `https://ai.jogjoy.run/apik/uploads/${data.analysis.videoUrl}`;

          fetch(videoApiUrl, {
            method: "GET",
            headers: {
              "x-api-key": "b0ec52c0-5962-4100-bf78-1ab38d8fc52f",
              "x-access-token": "11ba0902-2fc1-4059-9c0e-6c0bb8fa6e70",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch video");
              }
              return response.blob();
            })
            .then((blob) => {
              const videoBlobUrl = URL.createObjectURL(blob);
              // console.log(videoBlobUrl?.slice[4, videoBlobUrl.length-1], 'videoBlobUrl');

              setVideoUrl(videoBlobUrl);
            })
            .catch((error) => console.error("Ошибка загрузки видео:", error));
        }
      });
  }, []);
  const handleImageClick = () => {
    if (videoUrl) {
      setIsModalOpen(true); // Открыть модальное окно
    } else {
      console.error("Видео еще не загружено.");
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрыть модальное окно
  };

  return (
    <div className="flex flex-col justify-start items-center w-[100%] relative">
      <img
        onClick={() => navigate(-1)}
        src="/icons/Left Arrow Button.svg"
        className="absolute left-4 mt-[11px]"
        alt=""
      />
      <p className="mt-[11px] text-[17px] font-syne text-white font-semibold ">
        {title}
      </p>
      <p
        className="mt-[14px] text-[15px] font-syne text-white font-medium ml-[17px]"
        style={{ color: "rgba(255, 255, 255, 0.7)" }}
      >
        Сравнение вашей техники бега со стандартной
      </p>
      {isModalOpen && (
        // Фон (оверлей). Клик по нему будет закрывать модалку.
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-30 "
          onClick={() => setIsModalOpen(false)} // Закрыть модалку при клике по фону
        >
          <div
            className="relative w-[90%] max-w-[600px]"
            onClick={(e) => e.stopPropagation()} // Остановить всплытие, чтобы не закрывалось при клике на само видео
          >
            <video
              src={videoUrl}
              controls
              autoPlay
              className="rounded-lg w-full"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-gray rounded-full px-[6px]"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {videoUrl && (
        <img
          src="/icons/playVideo.svg"
          className="absolute top-[140px] z-20"
          style={{ pointerEvents: "none" }}
          alt=""
        />
      )}
      {videoUrl ? (
        <video
          src={videoUrl}
          className="rounded-lg w-[95%] cursor-pointer h-[200px] object-cover"
          onClick={() => setIsModalOpen(true)}
          onLoadedData={(e) => e.target.pause()}
          muted
          poster={videoUrl || "/images/video.png"}
        />
      ) : (
        <Loading /> // Показываем загрузку, пока URL видео не готов
      )}
      <div className="w-[90%] mt-5 h-[198px] bg-white rounded-lg flex flex-col justify-center items-center">
        {percent < 70 && percent >= 30 && (
          <img src="/images/normIcon.png" className="w-[60px]" alt="" />
        )}
        {percent <= 30 && (
          <img src="/images/badIcon.png" className="w-[60px]" alt="" />
        )}
        {percent >= 70 && (
          <img src="/images/okIcon.png" className="w-[60px]" alt="" />
        )}
        <p className="font-sans font-semibold text-[15px]">
          {percent >= 70
            ? "Perfect"
            : percent < 70 && percent >= 30
            ? "Good"
            : "Bad"}
        </p>

        <p
          className="w-[311px] font-sans font-medium opacity-70 mt-1"
          style={{ lineHeight: "120%" }}
        >
          Бегун набрал {percent}% по показателю близости удара ногой к центру
          тяжести, продемонстрировав отличную технику и самоотдачу на
          тренировках.
        </p>
      </div>
      {/* <p className="mt-[20px] w-[343px] text-[17px] font-syne text-white font-semibold ">Упражнения</p>
      <div className="flex mt-2 justify-start items-center gap-[8px] w-[343px]  mb-3 pb-2" style={{ overflowX: 'scroll' }}>
          <img className='w-[90px]' src="/images/exercices/Bounding.svg" alt="" />
          <img className='w-[90px]' src="/images/exercices/high_kness.svg" alt="" />
          <img className='w-[90px]' src="/images/exercices/Stretching.svg" alt="" />
          <img className='w-[90px] mr-2' src="/images/exercices/Scissors.svg" alt="" />
      </div> */}
      <Button onClick={() => navigate("/results")} className="mt-5">
        Получить упражнения
      </Button>
    </div>
  );
}

export default FullMetric;
