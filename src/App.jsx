import { Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage';
import { useEffect } from 'react';
function App() {

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready(); // Инициализация WebApp API
      tg.expand(); // Расширение на весь экран
    }
  }, []);

  return (
    <div className="App flex flex-col justify-start items-center w-[100%]">
      <Routes>
        <Route element={<StartPage/>} index />

      </Routes>
    </div>
  );
}

export default App;
