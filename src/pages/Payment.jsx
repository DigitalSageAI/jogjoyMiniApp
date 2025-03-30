import React, { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import axios from "../axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import Input from "../components/ui/Input";

function Payment() {
  const [selected, setSelected] = useState("onePerson");
  const [tarif, setTarif] = useState("1 year");
  const id = localStorage.getItem("id");
  // Объект для хранения состояния раскрытия карточек по ключу тарифа
  const [expandedCards, setExpandedCards] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [promo, setPromo] = useState();
  const [promos, setPromos] = useState();
  const [promoPrice, setPromoPrice] = useState(790);
  const [used, setUsed] = useState(false);

  useEffect(() => {
    const selectedTarif = localStorage.getItem("selectedTarif");
    if (selectedTarif && selectedTarif == "clubMembership") {
      setSelected("clubMembership");
      setTarif("3 year");

      localStorage.removeItem("selectedTarif");
    }
    const success = searchParams.get("Success") == "true";
    const errorCode = searchParams.get("ErrorCode");
    console.log(success);

    if (success) {
      const type = localStorage.getItem("type"); // Достаем сохраненный тариф

      if (type && id) {
        axios
          .post("/subscribe", {
            type,
            id,
            val: true,
          })
          .then(() => {
            const savedPromo = localStorage.getItem("promo");
            const savedPrice = Number(localStorage.getItem("promoPrice"));
          
            console.log("📦 Логирование промокода...");
            console.log("🎫 savedPromo:", savedPromo);
            console.log("💰 savedPrice:", savedPrice);
            console.log("📦 tarif:", tarif);
          
            if (savedPromo && savedPromo.startsWith("4Rr0")) {
              let fullPrice = 0;
          
              switch (tarif) {
                case "1 year":
                  fullPrice = 790;
                  break;
                case "1 month":
                  fullPrice = 490;
                  break;
                default:
                  console.warn("⛔ Неподдерживаемый тариф для логирования промокода:", tarif);
                  break;
              }
          
              if (!isNaN(savedPrice) && fullPrice > 0) {
                const discount = fullPrice - savedPrice;
          
                console.log("✅ Отправка в лог: paid =", savedPrice, "discount =", discount);
          
                axios
                  .post("https://api.jogjoy.run/log-promo", {
                    paid: savedPrice,
                    code: savedPromo,
                    discount: discount,
                  })
                  .then(() => {
                    console.log("🎉 Промокод успешно логирован в Google Таблицу");
                  })
                  .catch((err) => {
                    console.error("❌ Ошибка при логировании промокода:", err.message, err.response?.data);
                  });
              } else {
                console.warn("⚠️ Невалидные данные для логирования: fullPrice или savedPrice некорректны");
              }
            } else {
              console.log("ℹ️ Промокод отсутствует или не начинается с '4Rr0', логирование не требуется");
            }
          
            localStorage.removeItem("type");
            localStorage.removeItem("promo");
            localStorage.removeItem("promoPrice");
            window.history.go(-3);
          })
          .catch(() => alert("Не удалось произвести оплату"));
      }
    }
  }, [searchParams, id]);

  useEffect(() => {
    axios
      .get("/promo")
      .then((res) => res.data)
      .then((data) => {
        setPromos(data);
      });
  }, []);

  const generateToken = (data) => {
    const sortedValues = Object.keys(data)
      .sort()
      .map((key) => data[key]); // Сортируем ключи и берем значения
    const tokenString = sortedValues.join(""); // Объединяем в строку
    return sha256(tokenString).toString(); // Хэшируем SHA-256
  };

  const checkPromo = async (e) => {
    e.target.blur();
    if (!promo) return;
    try {
      const existingPromo = promos.find((p) => p.name === promo);
      if (existingPromo && used === false) {
        setUsed(true);
        const newPrice = promoPrice - (promoPrice * existingPromo.percent) / 100;
        setPromoPrice(newPrice);
  
        // 🟢 Сохраняем промокод и цену в localStorage
        localStorage.setItem("promo", promo);
        localStorage.setItem("promoPrice", newPrice);
  
        console.log("✅ Промокод сохранён в localStorage:", promo, newPrice);
      } else if (used === true) {
        console.log("ℹ️ Промокод уже использован");
      } else {
        console.log("❌ Промокод не найден");
      }
    } catch (error) {
      console.error("Ошибка при проверке промокода", error);
    }
  };

  const payment = async () => {
    let summ, type;
    if (tarif === "1 month") {
      summ = Number(promoPrice + "00");
      type = "sub1";
    } else if (tarif === "1 year") {
      summ = Number(promoPrice + "00");
      type = "sub2";
    } else if (tarif === "3 month") {
      summ = 249000;
      type = "sub3";
    } else if (tarif === "3 year") {
      summ = 499000;
      type = "sub4";
    }

    try {
      const orderId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const requestData = {
        TerminalKey: "1710783332068DEMO",
        Amount: summ,
        OrderId: orderId,
        Description: "Анализ техники бега от JogJoy",
        Password: "your_password",
        NotificationURL: "https://ai.jogjoy.run/webhook",
      };

      const token = generateToken(requestData);
      requestData.Token = token;

      localStorage.setItem("type", type); // Сохраняем тариф перед оплатой

      const response = await axios.post(
        "https://securepay.tinkoff.ru/v2/Init",
        requestData
      );

      if (response.data.Success) {
        window.location.href = response.data.PaymentURL;
      } else {
        alert("Ошибка при создании платежа: " + response.data.Message);
      }
    } catch (error) {
      console.error("Ошибка оплаты:", error);
      alert("Произошла ошибка, попробуйте еще раз.");
    }
  };

  // Функция для переключения состояния раскрытия карточки
  const toggleExpanded = (key) => {
    setExpandedCards((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <img
        src="/icons/Close.svg"
        className="left-4 top-2 absolute"
        alt=""
        onClick={() => navigate(-1)}
      />
      <img src="/backgrounds/paymentBG.png" className="mt-[50px]" alt="" />
      <div
        className="flex bg-gray-800 rounded-[7px] w-fit mt-[20px]"
        style={{ background: "rgba(118, 118, 128, 0.24)" }}
      >
        <button
          className={`px-8 py-1 text-sm font-medium rounded-[7px] transition`}
          style={
            selected === "onePerson"
              ? { background: "#0bc4ed", color: "white" }
              : { color: "rgba(235, 235, 245, 0.6)" }
          }
          onClick={() => setSelected("onePerson")}
        >
          Анализ бега
        </button>
        <button
          className={`px-8 py-1 text-sm font-medium rounded-[7px] transition`}
          style={
            selected === "clubMembership"
              ? { background: "#0bc4ed", color: "white" }
              : { color: "rgba(235, 235, 245, 0.6)" }
          }
          onClick={() => setSelected("clubMembership")}
        >
          Тренировочная прог.
        </button>
      </div>
      <h1 className="font-sans font-bold text-[24px] text-white mt-[23px]">
        Разблокировать JogJoy Pro
      </h1>

      {selected === "onePerson" ? (
        <div className="mt-[30px] flex flex-col justify-start items-center gap-[9px]">
          {/* Карточка тарифа "1 month" */}
          <div
            onClick={() => setTarif("1 month")}
            className={`p-[10px] w-[90%] ${
              expandedCards["1 month"] ? "h-auto" : "h-[194px]"
            } rounded-[8px] flex flex-col justify-start items-start bg-[#2c2c30] cursor-pointer`}
            style={tarif === "1 month" ? { border: "1px solid #25c73d" } : {}}
          >
            <p className="font-sans font-semibold text-white text-[16px]">
              Купить расширенный анализ техники бега и программу тренировок
            </p>
            <div className="flex justify-start items-start gap-1 mt-2">
              <p className="font-sans text-white text-[13px] opacity-70">
                В платной версии анализа Вы получите оценку по каждому
                отдельному параметру
              </p>
            </div>
            {/* Кнопка "Подробнее" */}
            {expandedCards["1 month"] && (
              <div className="">
                <p className="font-sans text-white text-[13px] opacity-70">
                  и персонализированную программу специальных упражнений,
                  направленных на исправление выявленных ошибок.
                </p>
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded("1 month");
              }}
              className="mt-2 text-blue-400 text-xs underline"
            >
              {!expandedCards["1 month"] ? "Подробнее" : "Скрыть"}
            </button>
            {/* Дополнительный контент при раскрытии */}
            {/* <img src="/icons/Line.svg" className="mt-2 w-[100%]" alt="" /> */}
            <div
              className="w-[100%] h-[1px] mt-3"
              style={{ background: "rgb(69, 69, 69)" }}
            ></div>
            <p className="mt-2 font-sans font-semibold text-[17px] text-white">
              {Math.round(promoPrice)} руб.
            </p>
          </div>

          {/* Карточка тарифа "1 year" */}
          <input
            style={{
              background: "rgba(118, 118, 128, 0.24)",
              color: "white",
              border: "1px solid rgba(84, 84, 88, 0.65)",
            }}
            className={
              "rounded-[8px] w-[342px] h-[58px] focus:outline-none px-[17px] placeholder:text-middleGray"
            }
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Промокод"
            onBlur={(e) => checkPromo(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                checkPromo(e);
              }
            }}
          ></input>
        </div>
      ) : (
        <div className="mt-[30px] flex justify-start items-start gap-[9px]">
          {/* Карточка тарифа "3 month" */}
          <div
            onClick={() => setTarif("3 month")}
            className={`p-[10px] w-[167px] ${
              expandedCards["3 month"] ? "h-auto" : "h-[254px]"
            } rounded-[8px] flex flex-col justify-start items-start bg-[#2c2c30] cursor-pointer`}
            style={tarif === "3 month" ? { border: "1px solid #25c73d" } : {}}
          >
            <p className="font-sans font-semibold text-white text-[16px]">
              Персональный план подготовки к забегу
            </p>
            <div className="flex justify-start items-start gap-1 mt-2">
              <p className="font-sans text-white text-[13px] opacity-70">
                Удобно для тех, кто хочет подготовиться к забегу максимально
                эффективно и снизить
              </p>
            </div>
            {/* Кнопка "Подробнее" */}
            {/* Дополнительный контент при раскрытии */}
            {expandedCards["3 month"] && (
              <div className="">
                <p className="font-sans text-white text-[13px] opacity-70">
                  риск получения травмы.
                </p>
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded("3 month");
              }}
              className="mt-2 text-blue-400 text-xs underline"
            >
              {!expandedCards["3 month"] ? "Подробнее" : "Скрыть"}
            </button>
            <img src="/icons/Line.svg" className="mt-2" alt="" />
            <p className="mt-2 font-sans font-semibold text-[17px] text-white">
              2490 руб.
            </p>
          </div>

          {/* Карточка тарифа "3 year" */}
          <div
            onClick={() => setTarif("3 year")}
            className={`relative p-[10px] w-[167px] ${
              expandedCards["3 year"] ? "h-auto" : "h-[254px]"
            } rounded-[8px] flex flex-col justify-start items-start bg-[#2c2c30] cursor-pointer`}
            style={tarif === "3 year" ? { border: "1px solid #25c73d" } : {}}
          >
            <img
              src="/icons/sale.svg"
              className="absolute top-[-30px] right-[-20px]"
              alt=""
            />
            {/* <p className="font-sans font-semibold text-white text-[13px]">
              Купить персонализированную тренировочную программу для подготовки
              к забегу с функционалом работы над техникой
            </p> */}
            <p className="font-sans font-semibold text-white text-[16px]">
              Безлимит на год
            </p>
            <div className="flex justify-start items-start gap-1 mt-2">
              <p className="font-sans text-white text-[13px] opacity-70">
                Можно составлять программу и проводить анализы техники
                неограниченное количество раз
              </p>
            </div>
            {/* Кнопка "Подробнее" */}
            {/* Дополнительный контент при раскрытии */}
            {/* {expandedCards["3 year"] && (
              <div className="">
                <p className="font-sans text-white text-[13px] opacity-70"></p>
              </div>
            )} */}
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded("3 year");
              }}
              className="mt-2 text-blue-400 text-xs underline"
            >
              {!expandedCards["3 year"] ? "Подробнее" : "Скрыть"}
            </button> */}
            <img src="/icons/Line.svg" className="mt-[60px]" alt="" />
            <p className="mt-2 font-sans font-semibold text-[17px] text-white">
              4990 руб.
            </p>
          </div>
        </div>
      )}
      <Button onClick={payment} className="mt-6 mb-4">
        Получить доступ
      </Button>
    </div>
  );
}

export default Payment;
