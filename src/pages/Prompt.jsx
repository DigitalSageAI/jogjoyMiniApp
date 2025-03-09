import React, { useEffect, useState } from "react";
import axios from "../axios";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";
import { useNavigate } from "react-router-dom";

function Prompt() {
  const [level, setLevel] = useState("начинающий");
  const [currentTime, setCurrentTime] = useState("58");
  const [targetTime, setTargetTime] = useState("55");
  const [weeklyTrainings, setWeeklyTrainings] = useState("3");
  const [marathonDistance, setMarathonDistance] = useState("10");
  const [timeLeft, setTimeLeft] = useState("3 недели");
  const [startDate, setStartDate] = useState(""); // Дата начала тренировок
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribe, setSubscribe] = useState();
  const [trainingPlan, setTrainingPlan] = useState([]);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/getUserById/${id}`)
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          console.log(data);
          setSubscribe({
            sub1: data.sub1,
            sub2: data.sub2,
            sub3: data.sub3,
            sub4: data.sub4,
          });
          setTrainingPlan(data?.trainingPlan);
        }
      })
      .catch((err) => alert("Не удалось авторизоваться"));
  }, [id]);

  const handleGeneratePrompt = async () => {
    if (
      !subscribe?.sub3 &&
      // !subscribe?.sub1 &&
      // !subscribe?.sub2 &&
      !subscribe?.sub4
    ) {
      localStorage.setItem("selectedTarif", "clubMembership");
      navigate("/payment");
      return;
    }
    if (
      !level ||
      !currentTime ||
      !targetTime ||
      !weeklyTrainings ||
      !marathonDistance ||
      !timeLeft ||
      !startDate
    ) {
      setError("Все поля должны быть заполнены.");
      return;
    }

    const prompt = `Сгенерируй тренировочную программу для подготовки к забегу на ${marathonDistance} км за ${timeLeft}. Исходные данные: уровень ${level}, текущий результат ${currentTime} минут, целевой результат ${targetTime} минут. 
  В тренировочную программу включи:
  - СБУ 2 раза в неделю после бега.
  - 1 раз в две недели анализ техники бега.
  Разовый объем тренировок не должен превышать 80% от ${marathonDistance} км. Количество тренировок в неделю - ${weeklyTrainings}.
  Дата начала тренировок: ${startDate}.
  Ответ верни в **валидном JSON-формате**:
  [
    {
      "week1": {
        "Понедельник": { 
          "Дата": "${startDate}",
          "Тип тренировки": "", 
          "Дистанция": "", 
          "Заметки": "",
          "СБУ": true
        }
      }
    }
  ]`;

    try {
      if (id) {
        setLoading(true);
        const response = await axios.post("/generate", { prompt });
        let data = response.data?.content;

        console.log("Сырой ответ OpenAI:", data);

        // Очистка данных от лишних символов
        if (typeof data === "string") {
          data = data.replace(/```json|```/g, "").trim(); // Удаляем `json` и ```
        }

        // Парсим JSON
        const parsedData = JSON.parse(data);
        console.log("Парсинг JSON успешен:", parsedData);

        setTrainingPlan(parsedData);

        axios
          .post("/saveTraining", {
            userId: id,
            trainingPlan: parsedData,
          })
          .then(() => {
            // axios
            //   .post("/subscribe", {
            //     type: ["sub3", "sub4"],
            //     id,
            //     val: false,
            //   })
            //   .then(() => console.log("Успешно прошла оплата"))
            //   .catch(() => console.log("Не удалось произвести оплату"));

            setLoading(false);
            navigate("/main");
          })
          .catch(() => {
            alert("Не удалось сохранить данные");
            setLoading(false);
          });
      } else {
        alert("Ошибка авторизации");
      }
    } catch (error) {
      setLoading(false);
      console.error("Ошибка парсинга JSON:", error.message);
      setError("Не удалось сгенерировать план. Попробуйте снова.");
    }
  };

  return (
    <div
      className="p-6 max-w-lg mx-auto w-[100%]"
      style={{ overflowX: "hidden" }}
    >
      {loading && <Loading />}
      <img
        onClick={() => navigate(-1)}
        className="absolute top-3 right-3"
        src="/icons/Close.svg"
      />
      <h1 className="text-xl font-bold mb-4 text-white">
        Создание тренировочной программы
      </h1>

      <div className="mb-4">
        <label className="block mb-2 text-white">Уровень</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border p-2 w-full"
          style={{
            background: "#323232",
            borderRadius: "5px",
            color: "white",
            outline: "none",
          }}
        >
          <option value="начинающий">Начинающий</option>
          <option value="средний">Средний</option>
          <option value="продвинутый">Продвинутый</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-white">Дистанция забега (км)</label>
        <input
          type="number"
          value={marathonDistance}
          onChange={(e) => setMarathonDistance(e.target.value)}
          className="border p-2 w-full"
          style={{
            background: "none",
            borderRadius: "5px",
            color: "white",
            outline: "none",
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-white">
          Текущий результат (минуты)
        </label>
        <input
          type="number"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
          className="border p-2 w-full"
          style={{
            background: "none",
            borderRadius: "5px",
            color: "white",
            outline: "none",
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-white">
          Целевой результат (минуты)
        </label>
        <input
          type="number"
          value={targetTime}
          onChange={(e) => setTargetTime(e.target.value)}
          className="border p-2 w-full"
          style={{
            background: "none",
            borderRadius: "5px",
            color: "white",
            outline: "none",
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-white">Дата начала тренировок</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 w-full"
          style={{
            background: "none",
            borderRadius: "5px",
            color: "white",
            outline: "none",
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-white">
          Количество тренировок в неделю
        </label>
        <input
          type="number"
          value={weeklyTrainings}
          onChange={(e) => setWeeklyTrainings(e.target.value)}
          className="border p-2 w-full"
          style={{
            background: "none",
            borderRadius: "5px",
            color: "white",
            outline: "none",
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-white">
          Сколько времени осталось до забега
        </label>
        <select
          value={timeLeft}
          onChange={(e) => setTimeLeft(e.target.value)}
          className="border p-2 w-full"
          style={{
            background: "#323232",
            borderRadius: "5px",
            color: "white",
            outline: "none",
          }}
        >
          {/* <option value="1 неделя">1 неделя</option>
          <option value="2 недели">2 недели</option> */}
          <option value="3 недели">3 недели</option>
          <option value="1 месяц">1 месяц</option>
          <option value="2 месяца">2 месяца</option>
          <option value="3 месяца">3 месяца</option>
        </select>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Button onClick={handleGeneratePrompt}>Получить план</Button>
    </div>
  );
}

export default Prompt;
