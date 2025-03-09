import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/ui/Loading";
import html2canvas from "html2canvas";
import Button from "../components/ui/Button";

function FullMetric() {
  const [selected, setSelected] = useState("Analysis");
  const navigate = useNavigate();
  const percent = localStorage.getItem("percent");
  const [subscribe, setSubscribe] = useState(null);
  const title = localStorage.getItem("title");
  const [videoUrl, setVideoUrl] = useState("");
  const id = localStorage.getItem("id");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`/getUserById/${id}`)
      .then((response) => response.data)
      .then((data) => {
        setSubscribe({
          sub1: data.sub1,
          sub2: data.sub2,
          sub3: data.sub3,
          sub4: data.sub4,
        });
        if (data.analysis?.videoUrl) {
          const videoApiUrl = `https://ai.jogjoy.run/apik/uploads/${data.analysis.videoUrl}`;

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
              // console.log(videoBlobUrl?.slice[4, videoBlobUrl.length-1], 'videoBlobUrl');

              setVideoUrl(videoBlobUrl);
            })
            .catch((error) => console.error("Ошибка загрузки видео:", error));
        }
      });
  }, []);
  const handleImageClick = () => {
    if (videoUrl) {
      setIsModalOpen(true); // Открыть модальное окно
    } else {
      console.error("Видео еще не загружено.");
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрыть модальное окно
  };

  const getTextByTitleAndPercent = (title, percent) => {
    switch (title) {
      case "Точка приземления относительно центра тяжести":
        if (percent >= 70) {
          return "Ты приземляешься на среднюю часть стопы, это помогает тебе бежать эффективно и поддерживать крейсерскую скорость. \n\n\n\n Ты приземляешься на среднюю часть стопы, это помогает тебе бежать эффективно и поддерживать крейсерскую скорость.";
        } else if (percent >= 30) {
          return "Ты приземляешься на носок, это приводит к перегрузке твоих икроножных мышц, они медленнее восстанавливаются и твой прогресс в беге замедляется.";
        } else {
          return "Ты приземляешься на пятку, а нужно – на среднюю часть стопы. Приземление на пятку создает повышенную нагрузку на твои колени и позвоночник, постепенно изнашивая суставы в них, и, конечно, это приводит к серьезным травмам! Что делать? Я дам тебе индивидуальный список специальных беговых упражнений, которые помогут тебе не получить эти травмы.";
        }

      case "Точка приземления стопы":
        if (percent >= 70) {
          return "Твоя стопа в момент приземления под твоим центром тяжести. И так и нужно! Это помогает тебе бегать эффективно. Но даже в этом случае, нужно поддерживать и укреплять мышцы, выполяняя комплекс специальных беговых упражнений.";
        } else if (percent >= 30) {
          return "Твоя стопа в момент приземления перед твоим центром тяжести, а должна быть - ровно под ним. Получается, что ты 'натыкаешься' на свою ногу, это создает повышенную нагрузку не только на колени, но и на мышцы, потому что поддержание скорости требует от тебя дополнительных усилий. Как итог: медленное восстановление, а значит двигательный аппарат копит в себе усталость, как снежный ком, и когда ком станет лавиной, это обязательно приведет к травмам. Давай поработаем над этим вместе? Ниже я дам комплекс упражнений, которые помогут приземляться в нужный момент.";
        } else {
          return "Твоя стопа в момент приземления перед твоим центром тяжести, а должна быть - ровно под ним. Получается, что ты 'натыкаешься' на свою ногу, это создает повышенную нагрузку не только на колени, но и на мышцы, потому что поддержание скорости требует от тебя дополнительных усилий. Как итог: медленное восстановление, а значит двигательный аппарат копит в себе усталость, как снежный ком, и когда ком станет лавиной, это обязательно приведет к травмам. Давай поработаем над этим вместе? Ниже я дам комплекс упражнений, которые помогут приземляться в нужный момент.";
        }

      case "Работа рук":
        if (percent >= 70) {
          return "Твой корпус во время бега стабилен (не вращается вокруг своей оси), а руки активно работают! Получается, ты уже побегал с палочками для суши? Эх, а это было мое топ-упражнение... Ну, ничего, у меня есть список упражнений и для таких профи, как ты ;)";
        } else if (percent >= 30) {
          return "Твой корпус во время бега стабилен (не вращается вокруг своей оси), но руками нужно всё-же шевелить активнее :-) Активнее руки - эффективнее бег. Не страшно, я дам тебе упражнения для работы над этим, только обещай делать их, потому что это know-how, must have и просто топ-упражнения.";
        } else {
          return "Твой корпус во время движения вращается вокруг своей оси, а руки - нет (ну, или почти нет)! Давай наоборот? Корпус должен быть стабилен (ну, ок, почти стабилен, ты же все-таки бежишь), а руки должны активно работать. Активнее руки - эффективнее бег. Не страшно, я дам тебе упражнения для работы над этим, только обещай делать их, потому что это know-how, must have и просто топ-упражнения.";
        }

      case "Наклон корпуса":
        if (percent >= 70) {
          return "Твой корпус во время бега наклонен вперед, и это замечательно: ты используешь инерцию, поэтому мышцы ног работают на поддержание скорости, а не поддержку туловища. Но даже в этом случае нужно поддерживать и развивать мышцы корпуса. В этом тебе могут помочь специальные беговые упражнения из комплекса, который я бережно для тебя собрал.";
        } else if (percent >= 30) {
          return "Твой корпус во время бега расположен вертикально. Бывает и хуже, но лучше бегать с небольшим наклоном вперед: так ты сможешь задействовать силу инерции, а это позволит тебе бежать быстрее, или просто меньше напрягать мышцы, а значит, развиваться быстрее. У меня есть упражнения для работы над этим, только обещай их делать! Ниже поделюсь.";
        } else {
          return "О_о, как это ты так делаешь? Твое тело отклонено назад! То есть ноги тянут твое тело вперед, поэтому они сильно перегружены!!! Срочно зовите санитаров! Шучу, мы справимся с тобой вдвоем! Корпус во время бега лучше наклонять вперед: так ты сможешь задействовать силу инерции, а это позволит тебе бежать быстрее, или просто меньше напрягать мышцы, а значит, развиваться быстрее. У меня есть упражнения для работы над этим, только обещай их делать! Ниже поделюсь.";
        }

      default:
        return "Нет данных для отображения.";
    }
  };
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

  return (
    <div className="flex flex-col justify-start items-center w-[100%] relative">
      <img
        onClick={() => navigate(-1)}
        src="/icons/Left Arrow Button.svg"
        className="absolute left-4 mt-[11px]"
        alt=""
      />
      <img
        src="/icons/shared.svg"
        className="absolute top-[10px] right-[10px]"
        alt=""
        onClick={handleShare}
      />
      <p className="mt-[11px] text-[17px] font-syne text-white font-semibold w-[90%] text-center">
        {title}
      </p>
      <p
        className="mt-[14px] text-[15px] font-syne text-white font-medium ml-[17px]"
        style={{ color: "rgba(255, 255, 255, 0.7)" }}
      >
        Сравнение вашей техники бега со стандартной
      </p>
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
      {videoUrl && (
        <img
          src="/icons/playVideo.svg"
          className="absolute top-[200px] z-20"
          style={{ pointerEvents: "none" }}
          alt=""
        />
      )}
      {videoUrl ? (
        <video
          src={videoUrl}
          className="rounded-lg w-[90%] cursor-pointer h-[200px] object-cover mt-[20px]"
          onClick={() => setIsModalOpen(true)}
          onLoadedData={(e) => e.target.pause()}
          muted
          poster={videoUrl || "/images/video.png"}
        />
      ) : (
        <Loading /> // Показываем загрузку, пока URL видео не готов
      )}
      <div className="w-[90%] mt-5 h-[auto] bg-white rounded-lg flex flex-col justify-center items-center py-[20px]">
        {percent < 70 && percent >= 30 && (
          <img src="/images/normIcon.png" className="w-[60px]" alt="" />
        )}
        {percent <= 30 && (
          <img src="/images/badIcon.png" className="w-[60px]" alt="" />
        )}
        {percent >= 70 && (
          <img src="/images/okIcon.png" className="w-[60px]" alt="" />
        )}
        <p className="font-sans font-semibold text-[15px]">
          {percent >= 70
            ? "Perfect"
            : percent < 70 && percent >= 30
            ? "Good"
            : "Bad"}
        </p>

        <p
          className="w-[311px] font-sans font-medium opacity-70 mt-1"
          style={{ lineHeight: "120%" }}
        >
          {getTextByTitleAndPercent(title, percent)}
        </p>
      </div>
      <Button
        onClick={
          subscribe?.sub1 == true || subscribe?.sub4 == true
            ? () => navigate("/results")
            : () => {
                navigate("/payment");
                localStorage.setItem("selectedTarif", "clubMembership");
              }
        }
        className="mt-5 mb-3"
      >
        Получить упражнения
      </Button>
    </div>
  );
}

export default FullMetric;
