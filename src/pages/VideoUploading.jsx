import React, { useRef, useState } from "react";

function VideoUploading() {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // Открытие окна загрузки
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Обработка выбранного файла
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file); // Создаем временный URL для видео
      const videoElement = videoRef.current;

      videoElement.src = videoUrl; // Устанавливаем видео в тег video
      videoElement.load();

      videoElement.onloadeddata = () => {
        capturePreview(); // Создаем превью после загрузки данных
      };
    }
  };

  // Извлечение кадра с помощью canvas
  const capturePreview = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    const context = canvasElement.getContext("2d");
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    // Рисуем кадр из видео на canvas
    context.drawImage(
      videoElement,
      0,
      0,
      videoElement.videoWidth,
      videoElement.videoHeight
    );

    // Получаем изображение в формате dataURL
    const dataUrl = canvasElement.toDataURL("image/png");
    setPreview(dataUrl); // Сохраняем превью в state
  };
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleUploadClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Загрузить видео
      </button>

      {/* Превью изображения */}
      {preview && (
        <img src={preview} alt="Preview" className="mt-4 w-48 h-auto" />
      )}

      {/* Скрытые элементы для обработки видео */}
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default VideoUploading;
