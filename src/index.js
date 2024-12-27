import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.addEventListener('DOMContentLoaded', () => {
  Telegram.WebApp.ready()
  Telegram.WebApp.expand()
})
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


