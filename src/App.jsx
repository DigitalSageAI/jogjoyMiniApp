import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      console.log("Инициализируем Telegram WebApp API...");
      tg.ready(); // Инициализация WebApp API
      tg.expand(); // Полноэкранный режим
    } else {
      console.error("Telegram WebApp API недоступен");
    }
  }, []);

  return (
    <div className="App flex flex-col justify-start items-center w-[100%]">
      <Routes>
        <Route element={<StartPage />} index />
      </Routes>
    </div>
  );
}

export default App;
