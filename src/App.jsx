import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import { useEffect } from 'react';
import GetStartedPage from './pages/GetStartedPage';

import GetFreeAccount from './pages/GetFreeAccount';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';

function App() {
  useEffect(() => {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
  }, []);

  return (
    <div className="App flex flex-col justify-start items-center w-[100%]" style={{ height: "100vh" }}>
      <Routes>
        <Route path='/' element={<StartPage />} index />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/getStarted' element={<GetStartedPage />} />
        <Route path='/getFreeAccount' element={<GetFreeAccount />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
