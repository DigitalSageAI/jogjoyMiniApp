import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();

  // Создаем независимые состояния для каждого переключателя
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isSMSEnabled, setIsSMSEnabled] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(false);

  return (
    <div
      className="flex flex-col justify-start items-center w-[100%] h-[100%]"
      style={{ background: "#101010" }}
    >
      <img
        onClick={() => navigate(-1)}
        src="/icons/Left Arrow Button.svg"
        className="absolute left-4 mt-[11px] cursor-pointer"
        alt=""
      />
      <p className="mt-[11px] text-[17px] font-syne text-white font-semibold">
        Notifications
      </p>

      {/* E-mail Notifications */}
      <div
        className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md w-[343px] mt-7"
        style={{ background: "#28282b" }}
      >
        <label className="text-white text-sm font-medium mr-3">
          E-mail notifications
        </label>
        <div
          onClick={() => setIsEmailEnabled(!isEmailEnabled)}
          className={`relative w-11 h-6 flex-shrink-0 cursor-pointer rounded-full ${
            isEmailEnabled ? "bg-green-500" : "bg-primary"
          } transition-colors duration-300`}
        >
          <span
            className={`absolute w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
              isEmailEnabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* SMS Notifications */}
      <div
        className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md w-[343px] mt-2"
        style={{ background: "#28282b" }}
      >
        <label className="text-white text-sm font-medium mr-3">
          SMS notifications
        </label>
        <div
          onClick={() => setIsSMSEnabled(!isSMSEnabled)}
          className={`relative w-11 h-6 flex-shrink-0 cursor-pointer rounded-full ${
            isSMSEnabled ? "bg-green-500" : "bg-primary"
          } transition-colors duration-300`}
        >
          <span
            className={`absolute w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
              isSMSEnabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* Push Notifications */}
      <div
        className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md w-[343px] mt-2"
        style={{ background: "#28282b" }}
      >
        <label className="text-white text-sm font-medium mr-3">
          Push notifications
        </label>
        <div
          onClick={() => setIsPushEnabled(!isPushEnabled)}
          className={`relative w-11 h-6 flex-shrink-0 cursor-pointer rounded-full ${
            isPushEnabled ? "bg-green-500" : "bg-primary"
          } transition-colors duration-300`}
        >
          <span
            className={`absolute w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
              isPushEnabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
