import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import Button from '../ui/Button';

function MenuWorkout() {
  const [isOpen, setIsOpen] = useState(true);
  const [week, setWeek] = useState('1');
  const [trainingPlan, setTrainingPlan] = useState([]);
  const [filteredTraining, setFilteredTraining] = useState({});
  const navigate = useNavigate();
  const id = localStorage.getItem('id');

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    axios.get(`/getUserById/${id}`)
      .then(res => res.data)
      .then(data => {
        if (data) {
          console.log(data);
          setTrainingPlan(data?.trainingPlan);
        }
      })
      .catch((err) => alert('Не удалось авторизоваться'));
  }, [id]);

  // Следим за изменением week и trainingPlan
  useEffect(() => {
    if (trainingPlan?.length > 0 && week) {
      const weekNumber = String(Number(week));  // Преобразуем week в строку
      const currentWeekKey = `week${weekNumber}`;
  
      // Обращаемся к нужному объекту по индексу
      const filtered = trainingPlan[weekNumber - 1]?.[currentWeekKey] || {}; // Индексируем массив с учетом 0, поэтому weekNumber - 1
      const filtered1 = trainingPlan[weekNumber - 1]; // То же самое, но полный объект недели
  
      console.log('currentWeekKey', currentWeekKey);
      console.log('filtered1', filtered1);
      setFilteredTraining(filtered);
    }
  }, [week, trainingPlan]);
   // Запускать, когда меняются week или trainingPlan

  return (
    <div className='w-[340px] bg-gray-900 rounded-lg shadow-lg'>
      {/* Заголовок меню */}
      <div 
        className='flex justify-between items-center p-4 cursor-pointer text-white relative'
        style={{ background: "#393939", borderRadius: "5px 13px 0 0 ", marginTop: "-15px" }} 
        onClick={toggleMenu}
      >
        <span className='font-semibold text-lg font-syne'>Программа тренировок</span>
        <div style={{ 
          backgroundImage: "url('/icons/Vector 11.png')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          width: '76px', 
          height: '35px', 
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          position: 'absolute',
          top: "0",
          right: "0"
        }}>
          {isOpen ? <IoIosArrowUp size={24} className='ml-5 mt-1' /> : <IoIosArrowDown className='ml-5 mt-1' size={24} />}
        </div>
      </div>

      {/* Контент меню */}
      <div 
        style={{ borderRadius: "0 0px 5px 5px", marginTop: "-1px" }}
        className={`transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-[1000px]' : 'max-h-0'
          } bg-white`}
      >
        <div className='p-2 w-[100%] flex flex-col justify-start items-center' style={{ background: "#393939" }}>
          {/* Список недель */}
          <div className="flex justify-start items-center w-[100%] overflow-x-auto">
            {trainingPlan &&
              Object.keys(trainingPlan).map((weekKey, idx) => 
                <div 
                  key={idx} 
                  onClick={() => setWeek(`${idx + 1}`)} 
                  className="flex flex-col justify-start items-center pb-[10px] text-[13px] min-w-[76px]" 
                  style={week !== `${idx + 1}` ? { borderBottom: '1px solid #5b5b5b', color: "#828282" } : { color: "white", borderBottom: "1px solid white" }}
                >
                  Неделя {idx + 1}
                </div>
              )
            }
          </div>

          <img src="/images/exercices/collaj.svg" className='mt-6' alt="" />
          <p className='w-[100%] font-syne text-[15px] text-white font-semibold mt-6'>Упражнения</p>

          {/* Отображение тренировок только для выбранной недели */}
          {filteredTraining && Object.entries(filteredTraining).map(([day, details], idx) => (
            <div key={idx} className="w-[100%] min-h-[69px] flex flex-row justify-start items-start rounded-[10px] mt-2" style={{ border: '1px solid #606060' }}>
              <img src="/icons/green.svg" className='min-h-[65px] mt-[1px]' style={{ borderRadius: "50px 0 0 50px" }} alt="" />
              <p className='font-sans ml-[8px] text-[12px] text-white whitespace-nowrap mt-2'>День {idx + 1} <br/> {(details['СБУ'] == true || details["SБУ"] == true) && <div className='text-white font-semibold flex flex-col justify-center items-center rounded-xl mt-2' style={{ background: "rgb(100, 216, 73)" }}>СБУ</div>}</p>
              <div className="flex flex-col justify-start items-start w-[100%] gap-[3px] mt-2">
                <p className='font-sans ml-[22px] text-[14px] text-white font-medium w-[225px]' style={{ lineHeight: "120%" }}>
                  {details['Тип тренировки']} -- {details['Дистанция']}
                </p>
                <p className='font-sans ml-[22px] text-[12px] text-white opacity-60 font-medium w-[225px]' style={{ lineHeight: "120%" }}>
                  {details['Заметки']}
                </p>
              </div>
            </div>
          ))}
{
  (filteredTraining == null || Object.entries(filteredTraining).length === 0) &&
  <Button className="mt-2 w-[320px]" onClick={() => navigate('/prompt')}>Получить план тренировки</Button>
}

        </div>
      </div>
    </div>
  );
}

export default MenuWorkout;
