import React, { useState, useEffect } from "react";
import axios from "../axios";

function Promo() {
  const [promos, setPromos] = useState([]);
  const [name, setName] = useState("");
  const [percent, setPercent] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const { data } = await axios.get("/promo");
      setPromos(data);
    } catch (error) {
      console.error("Ошибка при загрузке промокодов", error);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/promo/${editId}`, { name, percent });
      } else {
        await axios.post("/promo", { name, percent });
      }
      setName("");
      setPercent("");
      setEditId(null);
      fetchPromos();
    } catch (error) {
      console.error("Ошибка при сохранении промокода", error);
    }
  };

  const handleEdit = (promo) => {
    setName(promo.name);
    setPercent(promo.percent);
    setEditId(promo._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/promo/${id}`);
    //   fetchPromos();
    window.location.reload()
    } catch (error) {
      console.error("Ошибка при удалении промокода", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4 text-white">
        Управление промокодами
      </h2>
      <form onSubmit={handleCreateOrUpdate} className="mb-4">
        <input
          type="text"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="number"
          placeholder="Процент скидки (без знака %)"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          {editId ? "Обновить" : "Создать"}
        </button>
      </form>
      <ul>
        {promos.map((promo) => (
          <li
            key={promo._id}
            className="border p-2 mb-2 flex justify-between items-center"
            style={{ border: "1px solid white" }}
          >
            <span className="text-white">
              {promo.name} - {promo.percent}%
            </span>
            <div>
              <button
                onClick={() => handleEdit(promo)}
                className="bg-yellow-500 text-white px-2 py-1 mr-2"
              >
                Редактировать
              </button>
              <button
                onClick={() => handleDelete(promo._id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Promo;
