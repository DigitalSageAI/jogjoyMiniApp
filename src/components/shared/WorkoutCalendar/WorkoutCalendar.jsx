import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./WorkoutCalendar.css";

const WorkoutCalendar = ({ trainingPlan, completedTrainings }) => {
  const [highlightedDates, setHighlightedDates] = useState([]);

  useEffect(() => {
    if (!trainingPlan || !Array.isArray(trainingPlan)) return;

    const trainingDates = [];

    trainingPlan.forEach((weekObj) => {
      Object.values(weekObj).forEach((week) => {
        Object.values(week).forEach((trainingDay) => {
          if (trainingDay?.Дата) {
            // Явно указываем время 00:00 локальное:
            const dateObj = new Date(`${trainingDay.Дата}T00:00:00`);
            if (!isNaN(dateObj)) {
              trainingDates.push(dateObj);
            }
          }
        });
      });
    });

    setHighlightedDates(trainingDates);
  }, [trainingPlan]);

  // Чтобы считать день одинаково, без часов:
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;

    // Проверяем, есть ли дата в датах тренировок
    const isTrainingDay = highlightedDates.some((d) => isSameDay(d, date));
    if (!isTrainingDay) return null;

    // Подготовим текущий день (обнулив время)
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // Формируем строку даты локально в формате YYYY-MM-DD
    const dateString = date.toLocaleDateString("en-CA");

    // Проверяем, есть ли дата среди завершённых
    const isCompleted = completedTrainings.includes(dateString);

    // Логика подсветки
    if (date < now) {
      // Прошло
      if (isCompleted) {
        return "past-completed"; // зелёный
      } else {
        return "past-not-completed"; // красный
      }
    } else {
      // Сегодня или будущее
      // При желании можно тоже подсветить
      // return "future-training";
      return "future-training";
    }
  };

  return (
    <Calendar
      className="rounded-[5px] border-none mt-4 outline-none"
      tileClassName={tileClassName}
      // Если хотите стартовать на первой тренировочной дате:
      // defaultValue={highlightedDates[0] || new Date()}
    />
  );
};

export default WorkoutCalendar;
