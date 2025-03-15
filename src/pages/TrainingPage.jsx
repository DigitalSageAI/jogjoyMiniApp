import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/ui/Loading";
import Button from "../components/ui/Button";
import { details } from "framer-motion/client";

function TrainingPage() {
  const navigate = useNavigate();
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const [buttonContent, setButtonContent] = useState("Начать");
  const [sbu, setSbu] = useState(false);
  const [details1, setDetails1] = useState();

  const details = JSON.parse(localStorage.getItem("details"));
  useEffect(() => {
    const id = localStorage.getItem("id");
    const details = JSON.parse(localStorage.getItem("details"));

    setDetails1(details);

    if (details["СБУ"] == true || details["SБУ"] == true) {
      setSbu(true);
    }
    console.log("details", details);
    setLoading(true);
    axios
      .get(`/getUserById/${id}`)
      .then((res) => res.data)
      .then((data) => {
        if (data.analysis?.videoUrl) {
          const resultsApiUrl = `https://ai.jogjoy.run/apik/metrics/${data.analysis.videoUrl}?lang=ru`;
          fetch(resultsApiUrl, {
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
              return response.json();
            })
            .then((data) => {
              console.log(data.text);
              setText(data.text);
            })
            .catch((error) => {
              console.error("Ошибка загрузки видео:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      });
  }, []);

  const addTraining = () => {
    const day = localStorage.getItem("day");
    const id = localStorage.getItem("id");

    axios
      .post("/addCompletedTrainingDay", {
        userId: id,
        trainingDay: day,
      })
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          setButtonContent("Выполнено");
        }
      })
      .catch((err) => {
        alert("Не удалось начать тренировку");
      });
  };
  return (
    <div className="flex flex-col justify-start items-center w-[100%] relative">
      {loading && <Loading />}
      <img
        onClick={() => navigate(-1)}
        src="/icons/Left Arrow Button.svg"
        className="absolute left-4 mt-[11px]"
        alt=""
      />
      <p className="mt-[11px] text-[17px] font-syne text-white font-semibold ">
        День {localStorage.getItem("day") || 1}
      </p>
      <div
        className="flex flex-col justify-start items-center w-[343px] rounded-[8px] gap-[8px] py-2 mt-[20px]"
        style={{ background: "rgba(116, 116, 128, 0.18)" }}
      >
        <div className="w-[90%] flex justify-between items-center">
          <p className="text-white font-sans text-[13px] opacity-60">
            Продолжительность
          </p>
          <p className="text-white font-sans text-[13px]">30 мин.</p>
        </div>
        <img src="/images/Line.svg" alt="" />
        <div className="w-[90%] flex justify-between items-center">
          <p className="text-white font-sans text-[13px] opacity-60">
            Сложность
          </p>
          <p className="text-white font-sans text-[13px]">Средняя</p>
        </div>
      </div>

      {details1 && (
        <div className="flex flex-col justify-start items-start w-[100%] gap-[3px] mt-2">
          <p
            className="font-sans ml-[22px] text-[14px] text-white font-medium w-[225px]"
            style={{ lineHeight: "120%" }}
          >
            {details1["Тип тренировки"]} -- {details1["Дистанция"]}
          </p>
          <p
            className="font-sans ml-[22px] text-[12px] text-white opacity-60 font-medium w-[305px]"
            style={{ lineHeight: "120%" }}
          >
            {details1["Заметки"]}
          </p>
        </div>
      )}
      {sbu && (
        <p className="mt-[17px] text-[17px] font-sans text-white font-semibold w-[90%]">
          Упражнения
        </p>
      )}
      {sbu &&
        text?.exercises &&
        Object.entries(text.exercises).map(([key, value]) => {
          if (key === "exercise_head") return null; // Пропускаем заголовки

          // Проверяем структуру данных, если массив пустой, не рендерим
          if (!Array.isArray(value) || value.length < 3) {
            return null;
          }

          const exerciseName = value[0]?.[0] || "Без названия"; // Название упражнения
          const description = value[0]?.[1] || "Описание отсутствует"; // Описание упражнения (количество повторений)

          const gifUrl = value[1]?.[0] || "/icons/placeholder.png"; // URL гифки, если нет - ставим заглушку
          const gifAlt = value[1]?.[1] || "Exercise Image"; // Альтернативный текст для изображения

          const youtubeUrl = value[2]?.[0] || null; // YouTube ссылка

          return (
            <div
              key={key}
              className="flex justify-center items-center bg-gray w-[343px] h-[104px] mt-2 rounded-[10px] gap-[16px]"
            >
              <img
                src={gifUrl}
                alt={gifAlt}
                className="w-[80px] h-[80px] rounded-[5px] object-cover"
              />
              <div className="flex flex-col justify-center items-start w-[172px]">
                <h1 className="font-sans text-[15px] font-semibold text-white">
                  {exerciseName}
                </h1>
                <p className="font-sans text-[13px] font-medium text-white opacity-60">
                  {description}
                </p>
              </div>
              {youtubeUrl ? (
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/icons/play.svg"
                    alt="Play Video"
                    className="w-[24px] h-[24px]"
                  />
                </a>
              ) : (
                <img
                  src="/icons/play-disabled.svg"
                  alt="No Video"
                  className="w-[24px] h-[24px] opacity-50"
                />
              )}
            </div>
          );
        })}
      <Button
        onClick={
          details?.analys == true
            ? () => {
                navigate("/uploading");
              }
            : () => {
                addTraining();
              }
        }
        className="mt-4 mb-3"
      >
        {buttonContent}
      </Button>
    </div>
  );
}

export default TrainingPage;
