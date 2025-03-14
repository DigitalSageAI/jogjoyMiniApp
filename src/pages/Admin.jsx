import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const BOT_TOKEN = "7277557145:AAEwgi1zaHFOayVrYnf-n9oh8ytg8Iyl5TA";

function Admin() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("/getUsers")
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Ошибка при загрузке данных", error));
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (login === "admin" && password === "123") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    } else {
      alert("Неверный логин или пароль!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
  };

  const openBroadcastModal = () => {
    setIsBroadcastModalOpen(true);
  };

  const closeBroadcastModal = () => {
    setIsBroadcastModalOpen(false);
    setBroadcastMessage("");
  };
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!message.trim()) return alert("Введите сообщение!");

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const data = {
      chat_id: selectedUser.telegramId,
      text: message,
    };

    try {
      await axios.post(url, data);
      alert("Сообщение отправлено!");
      closeModal();
    } catch (error) {
      console.error("Ошибка отправки сообщения", error);
      alert("Ошибка при отправке!");
    }
  };

  const sendBroadcast = async () => {
    if (!broadcastMessage.trim())
      return alert("Введите сообщение для рассылки!");

    for (const user of users) {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const data = {
        chat_id: user.telegramId,
        text: broadcastMessage,
      };
      try {
        await axios.post(url, data);
      } catch (error) {
        console.error(
          `Ошибка отправки сообщения пользователю ${user.telegramId}`,
          error
        );
      }
    }
    alert("Рассылка завершена!");
    closeBroadcastModal();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-white p-6 rounded shadow-lg w-80">
          <h2 className="text-lg font-bold mb-4 text-center">Авторизация</h2>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border rounded mb-2"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full p-2 bg-blue-500 text-white rounded"
            onClick={handleLogin}
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="text-lg font-bold text-white">Админ-панель</h2> */}
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-green-500 text-white rounded"
            onClick={openBroadcastModal}
          >
            Разослать всем
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={handleLogout}
          >
            Выйти
          </button>
          <button
            className="px-3 py-1 bg-yellow-400 text-white rounded"
            onClick={() => navigate("/promo")}
          >
            Промокоды
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <span className="text-white">
              {user.name || user.telegramId} - Подписка: {user.sub1 && "1"}
              {user.sub2 && "2"} {user.sub3 && "3"} {user.sub4 && "4"}
            </span>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => openModal(user)}
            >
              Написать
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedUser && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-5 rounded shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={closeModal}
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-3">
              Отправить сообщение {selectedUser.name || selectedUser.telegramId}
            </h3>
            <textarea
              className="w-full p-2 border rounded mb-3"
              rows="4"
              placeholder="Введите сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded w-full"
              onClick={sendMessage}
            >
              Отправить
            </button>
          </div>
        </div>
      )}

      {isBroadcastModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeBroadcastModal}
        >
          <div
            className="bg-white p-5 rounded shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={closeBroadcastModal}
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-3">Рассылка</h3>
            <textarea
              className="w-full p-2 border rounded mb-3"
              rows="4"
              placeholder="Введите сообщение..."
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
            ></textarea>
            <button
              className="px-3 py-1 bg-green-500 text-white rounded w-full"
              onClick={sendBroadcast}
            >
              Разослать
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
