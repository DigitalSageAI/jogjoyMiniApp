import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BottomMenu() {
  const [active, setActive] = useState('home');
  const navigate = useNavigate();

  const menuItems = [
    { id: 'home', icon: '/bottomMenu/1.svg', route: '/main' },
    { id: 'stats', icon: '/bottomMenu/2.svg', route: '/analysis' },
    { id: 'video', icon: '/bottomMenu/3.svg', route: '/video' },
    { id: 'analytics', icon: '/bottomMenu/4.svg', route: '/workout' },
    { id: 'profile', icon: '/bottomMenu/5.svg', route: '/cabinet' },
  ];

  const handleClick = (id, route) => {
    setActive(id);
    navigate(route);
  };

  return (
    <div className='w-[100%] h-[67px] flex justify-around items-center bg-black bottom-0 left-0' style={{ position: "fixed" }}>
      {menuItems.map(item => (
        <div 
          key={item.id} 
          className={`flex flex-col items-center cursor-pointer ${active === item.id ? 'text-green-500' : 'text-gray-500'}`}
          onClick={() => handleClick(item.id, item.route)}
        >
          <img 
            src={item.icon} 
            alt={item.id} 
            className={`w-[28px] h-[28px]`}
            style={{ filter: active === item.id ? 'invert(42%) sepia(90%) saturate(500%) hue-rotate(100deg) brightness(90%) contrast(90%)' : 'invert(30%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)' }}
          />
        </div>
      ))}
    </div>
  );
}

export default BottomMenu;