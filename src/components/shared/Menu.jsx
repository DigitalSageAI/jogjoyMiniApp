import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Metric from '../ui/Metric';
import axios from '../../axios'

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const id = localStorage.getItem('id')
  const [subscribe, setSubscribe] = useState(null)

  useEffect(() => {
    axios.get(`/getUserById/${id}`)
    .then(response => response.data)
    .then(data => {
      if(data){
        setSubscribe(data.subscribe)        
      }
    })
  }, [])


  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className='w-[340px]  bg-gray-900 rounded-lg shadow-lg'>
      {/* Заголовок меню */}
      <div 
        className='flex justify-between items-center p-4 cursor-pointer text-white relative'
        style={{ background: "#393939", borderRadius: "5px 13px 0 0 ", marginTop: "10px" }} 
        onClick={toggleMenu}
      >
        <span className='font-semibold text-lg font-syne'>Analisys</span>
        <div style={{ 
          backgroundImage: "url('/icons/Vector 11.png')", 
          backgroundSize: 'cover', // Растягиваем изображение, чтобы оно покрывало весь блок
          backgroundPosition: 'center', // Центрируем изображение
          width: '76px', // Пример фиксированной ширины
          height: '35px', // Пример фиксированной высоты
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
        style={{ borderRadius: "5px" }}
        className={`transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-[1000px]' : 'max-h-0'
          } bg-white`}
          
      >
        <div className='p-2 '>
          <h2 className='text-lg font-semibold font-syne'>Analysis</h2>
          <div className='mt-4'>
            <img 
              src='/images/video.png' 
              alt='Analysis' 
              className='rounded-lg'
            />
          </div>
          <div className='mt-4 mb-5'>
            <h3 className='font-semibold mb-2 font-syne'>Metrics</h3>
            { subscribe != null &&
               <>
              <Metric percent={68} title={'Footstrike Proximity to Center of Gravity'}/>
              <Metric blured={subscribe == false ? true : false} percent={34} title={'Footstrike Position'}/>
              <Metric blured={subscribe == false ? true : false} percent={71} title={'Upper Body Movement'}/>
              <Metric blured={subscribe == false ? true : false} percent={28} title={'Trunk Inclination Angle'}/>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
