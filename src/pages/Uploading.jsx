import React, { useState } from "react";
import Button from "../components/ui/Button";
import "./styles/LoadingAnimation.css";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import WaitPopup from "../components/shared/WaitPopup";

function Uploading() {
  const [isUploading, setIsUploading] = useState(false);
  const id = localStorage.getItem("id");
  const [uploadProgress, setUploadProgress] = useState("");
  const [wait, setWait] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setUploadProgress("Uploading video...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://ai.jogjoy.run/apik/file", {
        method: "POST",
        headers: {
          "x-api-key": "b0ec52c0-5962-4100-bf78-1ab38d8fc52f",
          "x-access-token": "11ba0902-2fc1-4059-9c0e-6c0bb8fa6e70",
        },
        body: formData,
      });

      const responseData = await response.json();
      const processed_filename = responseData.processed_filename;

      const aproxim_time_left_value = responseData["aproxim_time_left(sec)"]; // 100 секунд
      // await axios
      //   .post("/subscribe", {
      //     type: ["sub1", "sub4"],
      //     id,
      //     val: false,
      //   })
      //   .then((res) => res.data)
      //   .then((data) => console.log("Успешно прошла оплата"))
      //   .catch((err) => console.log("Не удалось произвести оплату"));
      console.log("оставшее вреся", aproxim_time_left_value);

      // Получаем текущую дату и прибавляем 100 секунд (100 * 1000 миллисекунд)
      const futureDate = new Date(
        Date.now() + (aproxim_time_left_value + 10) * 1000
      );

      // Преобразуем дату в строку (ISO 8601 формат)
      const futureDateString = futureDate.toISOString();

      // Сохраняем дату в localStorage
      localStorage.setItem("newFetch", true);
      localStorage.setItem("time", futureDateString);

      if (!response.ok) {
        throw new Error("Failed to fetch the video");
      }

      console.log(response);
      if (response.url) {
        axios
          .post("/saveAnalysis", {
            id,
            videoUrl: processed_filename,
          })
          .then((res) => res.data)
          .then((data) => {
            if (data) {
              // navigate('/analysis')
              setWait(true);
            }
          });
      }
    } catch (error) {
      console.error("Ошибка при загрузке видео:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-start items-center">
      {wait && <WaitPopup closePopup={() => setWait(false)} />}
      <p className="font-syne font-semibold text-[17px] text-white mt-[20px] z-10">
        Загрузка видео
      </p>
      <div className="w-[344px] h-[228px] mt-[20px] flex justify-center items-center cursor-pointer z-10">
        <label className="cursor-pointer">
          <img src="/backgrounds/uploading.svg" alt="Upload" />
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      <Button className="absolute bottom-[20px] z-10">
        Отправить на анализ
      </Button>

      {isUploading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-center items-center">
          <p className="text-white mb-4">{uploadProgress}</p>
          <div className="flex space-x-2">
            <div className="circle-loader bg-green-500"></div>
            <div className="circle-loader bg-gray animation-delay-200"></div>
            <div className="circle-loader bg-green-500 animation-delay-400"></div>
            <div className="circle-loader bg-gray animation-delay-600"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Uploading;
