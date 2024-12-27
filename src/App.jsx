import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import { useEffect } from 'react';

function App() {
  useEffect(() => {

      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();

  }, []);

  return (
    <div className="App flex flex-col justify-start items-center w-[100%]">
      <Routes>
        <Route path='/' element={<StartPage />} index />
      </Routes>
    </div>
  );
}

export default App;
