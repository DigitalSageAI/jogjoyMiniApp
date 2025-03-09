import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Metric from "../ui/Metric";
import axios from "../../axios";
import Loading from "../ui/Loading";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const id = localStorage.getItem("id");
  const [subscribe, setSubscribe] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isVideo, setIsVideo] = useState(false); // Изначально видео не загружено
  const navigate = useNavigate();

  console.log(subscribe);
  useEffect(() => {
    axios
      .get(`/getUserById/${id}`)
      .then((response) => response.data)
      .then((data) => {
        if (data) {
          setSubscribe({
            sub1: data.sub1,
            sub2: data.sub2,
            sub3: data.sub3,
            sub4: data.sub4,
          });
        }
        if (data.analysis?.videoUrl) {
          setIsVideo(true); // Видео присутствует, меняем состояние
          const videoApiUrl = `https://ai.jogjoy.run/apik/uploads/${data.analysis.videoUrl}`;
          const resultsApiUrl = `https://ai.jogjoy.run/apik/metrics/${data.analysis.videoUrl}?lang=en`;

          // Загружаем видео
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
              setVideoUrl(videoBlobUrl);
            })
            .catch((error) => {
              console.error("Ошибка загрузки видео:", error);
              setIsVideo(false); // Если ошибка, видео не загружено
            });

          // Загружаем метрики
          fetch(resultsApiUrl, {
            method: "GET",
            headers: {
              "x-api-key": "b0ec52c0-5962-4100-bf78-1ab38d8fc52f",
              "x-access-token": "11ba0902-2fc1-4059-9c0e-6c0bb8fa6e70",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch metrics");
              }
              return response.json();
            })
            .then((data) => {
              setMetrics(data?.mean_metrics);
            })
            .catch((error) => {
              console.error("Ошибка загрузки метрик:", error);
              setError(true);
            });
        } else {
          setIsVideo(false); // Если видео нет, установим состояние в false
        }
      })
      .catch((error) =>
        console.error("Ошибка при загрузке данных пользователя:", error)
      );
  }, [id]);

  const handleImageClick = () => {
    if (isVideo && videoUrl) {
      setIsModalOpen(true); // Открыть модальное окно
    } else {
      console.error("Видео еще не загружено или отсутствует.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрыть модальное окно
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-[340px]  bg-gray-900 rounded-lg shadow-lg">
      {/* Заголовок меню */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer text-white relative"
        style={{
          background: "#393939",
          borderRadius: "5px 13px 0 0 ",
          marginTop: "10px",
        }}
        onClick={toggleMenu}
      >
        <span className="font-semibold text-lg font-syne">Анализ</span>
        <div
          style={{
            backgroundImage: "url('/icons/Vector 11.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "76px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            position: "absolute",
            top: "0",
            right: "0",
          }}
        >
          {isOpen ? (
            <IoIosArrowUp size={24} className="ml-5 mt-1" />
          ) : (
            <IoIosArrowDown className="ml-5 mt-1" size={24} />
          )}
        </div>
      </div>

      {/* Контент меню */}
      <div
        className={`mb-[15px] bg-white w-[340px] ${
          isVideo ? "h-[631px]" : "h-[171px]"
        } flex flex-col justify-start mt-[0px] transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
        style={{ borderRadius: "0 0 10px 10px" }}
      >
        <div className="flex justify-center items-start mt-[15px] relative">
          {isVideo && videoUrl && (
            <img
              src="/icons/playVideo.svg"
              className="absolute top-[60px]"
              style={{ pointerEvents: "none" }}
              alt=""
            />
          )}
          {isVideo && videoUrl ? (
            <video
              src={videoUrl}
              className="rounded-lg w-[95%] cursor-pointer h-[200px] object-cover"
              onClick={() => setIsModalOpen(true)}
              onLoadedData={(e) => e.target.pause()}
              muted
              poster={videoUrl || "/images/video.png"}
            />
          ) : (
            <div>{isVideo && <Loading />}</div>
          )}
        </div>
        <div className="mt-4 mb-5 ml-[10px]">
          {isVideo && <h3 className="font-semibold mb-2 font-syne">Метрики</h3>}
          {(subscribe?.sub1 == true ||
            // subscribe?.sub2 == true ||
            subscribe?.sub4 == true ||
            videoUrl) &&
          metrics != null ? (
            <>
              <Metric
                percent={+metrics[0]?.toString().slice(2, 4)}
                title="Точка приземления относительно центра тяжести"
              />
              <Metric
                blured={
                  !(
                    (subscribe?.sub1 == true || subscribe?.sub4 == true) &&
                    videoUrl
                  )
                }
                percent={+metrics[1]?.toString().slice(2, 4)}
                title="Точка приземления стопы"
              />
              <Metric
                blured={
                  !(
                    (subscribe?.sub1 == true || subscribe?.sub4 == true) &&
                    videoUrl
                  )
                }
                percent={+metrics[2]?.toString().slice(2, 4)}
                title="Работа рук"
              />
              <Metric
                blured={
                  !(
                    (subscribe?.sub1 == true || subscribe?.sub4 == true) &&
                    videoUrl
                  )
                }
                percent={+metrics[3]?.toString().slice(2, 4)}
                title="Наклон корпуса"
              />
            </>
          ) : (
            <>
              <div className={`flex flex-col justify-start items-center`}>
                Чтобы получить анализ загрузите пожалуйста видео вашего бега
              </div>
              <Button
                className="w-[97%] mt-4"
                onClick={() => navigate("/uploading")}
              >
                Перейти к анализу
              </Button>
              {/* {isVideo && <Loading />} */}
            </>
          )}
        </div>
      </div>

      {/* Модальное окно для воспроизведения видео */}
      {isModalOpen && (
        // Фон (оверлей). Клик по нему будет закрывать модалку.
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-30"
          onClick={handleCloseModal} // Закрыть модалку при клике по фону
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
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white bg-gray rounded-full px-[6px]"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
