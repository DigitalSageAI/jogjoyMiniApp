import React, { useEffect, useState } from "react";
import axios from "../axios";
import Loading from "../components/ui/Loading";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [text, setText] = useState();
  useEffect(() => {
    axios
      .get(`/getUserById/${id}`)
      .then((res) => res.data)
      .then((data) => {
        if (data.analysis?.videoUrl) {
          const resultsApiUrl = `https://ai.jogjoy.run/apik/metrics/${data.analysis.videoUrl}?lang=en`;
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
            });
        }
      });
  }, []);
  return (
    <>
      {text ? (
        <div className="w-[100%] flex flex-col justify-start items-center relative mb-4">
          <img
            onClick={() => navigate(-1)}
            src="/icons/Left Arrow Button.svg"
            className="absolute left-4 mt-[11px]"
            alt=""
          />
          <p className="mt-[11px] text-[17px] font-syne text-white font-semibold ">
            Результаты
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: text.first_text.replace(/\n/g, "<br/>"),
            }}
            className="w-[90%] text-white font-sans"
          ></div>
          {text.exercises &&
            Object.entries(text.exercises).map(([key, value]) => {
              // Убедимся, что value[0] и value[1] существуют
              const exerciseName = value?.[0]?.[0] || "Unknown Exercise"; // Название упражнения
              const gifUrl = value?.[1]?.[0]; // URL гифки
              const gifAlt = value?.[1]?.[1] || "Exercise Image"; // Альтернативный текст

              return (
                <div
                  key={key}
                  className="w-[100%] flex flex-col justify-start items-center"
                >
                  <p className="text-white mt-4 font-semibold font-sans w-[90%]">
                    {exerciseName}
                  </p>
                  {gifUrl && (
                    <img
                      src={gifUrl}
                      alt={gifAlt}
                      className="w-[90%] rounded-[10px] mt-2"
                    />
                  )}
                </div>
              );
            })}
          <div
            dangerouslySetInnerHTML={{
              __html: text.last_text.replace(/\n/g, "<br/>"),
            }}
            className="w-[90%] mt-4 text-white font-sans"
          ></div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Results;
