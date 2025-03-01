import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import axios from "../axios";

function Support() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const id = localStorage.getItem("id");

  useEffect(() => {
    axios.get(`/getUserById/${id}`).then((res) => {
      if (res.data) {
        console.log(res.data);
        setEmail(res.data.name);
      }
    });
  }, []);

  return (
    <div
      className="flex flex-col justify-start items-center w-[100%] h-[100%]"
      style={{ background: "#101010" }}
    >
      <img
        onClick={() => navigate(-1)}
        src="/icons/Left Arrow Button.svg"
        className="absolute left-4 mt-[11px]"
        alt=""
      />
      <p className="mt-[11px] text-[17px] font-syne text-white font-semibold ">
        Служба поддержки
      </p>
      <p
        className="font-sans font-semibold text-[15px] text-white mt-[19px] w-[90%] text-left"
        style={{ opacity: ".6" }}
      >
        Ваш телеграм
      </p>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-2"
        placeholder={"Ник телеграм"}
      ></Input>
      <p
        className="font-sans font-semibold text-[15px] text-white mt-[24px] w-[90%] text-left"
        style={{ opacity: ".6" }}
      >
        Ваше обращение или вопрос
      </p>
      <textarea
        value={message}
        style={{
          background: "rgba(118, 118, 128, 0.24)",
          color: "white",
          border: "1px solid rgba(84, 84, 88, 0.65)",
        }}
        onChange={(e) => setMessage(e.target.value)}
        className="rounded-[8px] pt-3 w-[342px] focus:outline-none px-[17px] placeholder:text-middleGray mt-2 h-[400px] align-top text-start"
        placeholder={"Напишите сообщение сюда"}
      ></textarea>
      <Button className="mt-[23px] mb-[12px]" onClick={() => navigate(-1)}>Отправить</Button>{" "}
    </div>
  );
}

export default Support;
