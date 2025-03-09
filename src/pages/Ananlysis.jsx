import React, { useEffect, useState } from "react";
import Metric from "../components/ui/Metric";
import axios from "../axios";
import Loading from "../components/ui/Loading";
import WaitPopup from "../components/shared/WaitPopup";
import Button from "../components/ui/Button";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import BigMetrics from "../components/ui/BigMetrics";

function Analysis() {
  const id = localStorage.getItem("id");
  const [subscribe, setSubscribe] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleShare = async () => {
    const canvas = await html2canvas(document.body);
    const image = canvas.toDataURL("image/png");

    if (navigator.share) {
      try {
        await navigator.share({
          files: [
            new File(
              [await fetch(image).then((res) => res.blob())],
              "screenshot.png",
              { type: "image/png" }
            ),
          ],
        });
      } catch (error) {
        console.error("Ошибка при попытке поделиться:", error);
      }
    } else {
      const link = document.createElement("a");
      link.href = image;
      link.download = "screenshot.png";
      link.click();
    }
  };

  useEffect(() => {
    const isNewFetch = localStorage.getItem("newFetch");
    if (isNewFetch == "true") {
      console.log(isNewFetch);
      localStorage.setItem("newFetch", false);
      window.location.href = window.location.href;
    }
    axios
      .get(`/getUserById/${id}`)
      .then(({ data }) => {
        setSubscribe({
          sub1: data.sub1,
          sub2: data.sub2,
          sub3: data.sub3,
          sub4: data.sub4,
        });
        if (data.analysis?.videoUrl) {
          setIsVideo(true);
          const videoApiUrl = `https://ai.jogjoy.run/apik/uploads/${data.analysis.videoUrl}`;
          const resultsApiUrl = `https://ai.jogjoy.run/apik/metrics/${data.analysis.videoUrl}?lang=en`;

          return Promise.all([
            fetch(videoApiUrl, {
              method: "GET",
              headers: {
                "x-api-key": "b0ec52c0-5962-4100-bf78-1ab38d8fc52f",
                "x-access-token": "11ba0902-2fc1-4059-9c0e-6c0bb8fa6e70",
              },
            })
              .then((res) =>
                res.ok ? res.blob() : Promise.reject("Failed to fetch video")
              )
              .then((blob) => setVideoUrl(URL.createObjectURL(blob))),
            fetch(resultsApiUrl, {
              method: "GET",
              headers: {
                "x-api-key": "b0ec52c0-5962-4100-bf78-1ab38d8fc52f",
                "x-access-token": "11ba0902-2fc1-4059-9c0e-6c0bb8fa6e70",
              },
            })
              .then((res) =>
                res.ok ? res.json() : Promise.reject("Failed to fetch metrics")
              )
              .then((data) => {
                console.log(data);
                setMetrics(data?.mean_metrics);
              }),
          ]);
        }
        setIsVideo(false);
      })
      .catch(() => {
        setError(true);
        alert("Ваше видео еще в обработке");
      })
      .finally(() => setLoading(false));
  }, []);

  console.log(metrics);

  if (loading) return <Loading />;

  return (
    <div className="relative flex flex-col justify-start items-center w-[100%]">
      <p className="font-syne mt-4 text-[17px] text-white font-semibold">
        Анализ
      </p>
      <img
        src="/icons/shared.svg"
        className="absolute top-[10px] right-[10px]"
        alt=""
        onClick={handleShare}
      />
      {isVideo && (
        <p className="text-[15px] text-white font-sans w-[90%] mt-4 font-semibold">
          Последний анализ
        </p>
      )}
      <div
        className={`mb-[15px] bg-[#303032] rounded-[8px] w-[100%] ${
          isVideo
            ? "flex flex-col justify-start mt-[15px] h-[426px]"
            : "w-[95%] h-[241px]"
        } flex flex-col justify-start mt-[15px]`}
      >
        {isVideo && !metrics != null && (
          <p className="flex justify-between text-[13px] text-white mt-[13px] w-[90%] ml-[16px]">
            09.03.2025
            {/* <span className="text-[#0a84ff] cursor-pointer">View</span> */}
          </p>
        )}
        <div
          className={`flex ${
            !isVideo && "flex-col"
          } justify-start flex-wrap items-center  mt-2 mb-1 ml-[10px] w-[95%] overflow-x-scroll overflow-y-hidden pb-3 min-h-[110px] gap-1`}
        >
          {(subscribe?.sub1 == true ||
            // subscribe?.sub2 == true ||
            subscribe?.sub4 == true ||
            videoUrl) &&
          metrics != null ? (
            metrics.map((metric, index) => (
              <BigMetrics
                key={index}
                percent={+metric?.toString().slice(2, 4)}
                title={
                  [
                    "Точка приземления относительно центра тяжести",
                    "Точка приземления стопы",
                    "Работа рук",
                    "Наклон корпуса",
                  ][index]
                }
                blured={
                  !(
                    (
                      subscribe?.sub1 == true ||
                      // subscribe?.sub2 == true ||
                      subscribe?.sub4 == true
                    )
                    // videoUrl
                  ) && index > 0
                }
              />
            ))
          ) : (
            <div className="flex flex-col justify-start items-center h-[auto] ">
              <div className="flex flex-col justify-start items-center text-white">
                Здесь пишется история… <br /> Вы еще не проводили анализ техники
                бега, а чтобы получить свой первый разбор техники бега,
                загрузите видео по кнопке ниже
              </div>
              <Button
                className="w-[97%] mt-4 z-60"
                onClick={() => {
                  navigate("/uploading");
                }}
              >
                Перейти к анализу
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center  relative mb-2">
          {isVideo && videoUrl && !error && metrics != null && (
            <img
              src="/icons/playVideo.svg"
              className="absolute top-[80px]"
              alt=""
            />
          )}
          {/* {isVideo && videoUrl ? (
            <video
              src={videoUrl}
              className="rounded-lg w-[95%] cursor-pointer h-[126px] object-cover"
              onClick={() => setIsModalOpen(true)}
              onLoadedData={(e) => e.target.pause()}
              muted
              // poster={videoUrl || "/images/video.png"}
            />
          ) : isVideo ? (
            <Loading />
          ) : null} */}
        </div>
      </div>
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

      {isVideo && (
        <Button
          onClick={() => {
            if (metrics == null) {
              navigate("/uploading");
            } else if (
              (subscribe?.sub1 === true || subscribe?.sub4 === true) &&
              videoUrl
            ) {
              navigate("/results");
            } else {
              navigate("/payment");
              localStorage.setItem("selectedTarif", "clubMembership");
            }
          }}
          className="mt-0"
        >
          Получить упражнения
        </Button>
      )}
    </div>
  );
}

export default Analysis;
