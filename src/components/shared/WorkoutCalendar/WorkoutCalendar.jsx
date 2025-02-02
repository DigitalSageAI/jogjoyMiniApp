import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './WorkoutCalendar.css'; // Подключи стили для кастомизации

const WorkoutCalendar = ({ trainingPlan }) => {
    const [highlightedDates, setHighlightedDates] = useState([]);

    useEffect(() => {
        if (trainingPlan?.length > 0) {
            let trainingDates = [];
            
            trainingPlan.forEach(week => {
                Object.values(week).forEach(days => {
                    Object.values(days).forEach(dateStr => {
                        const [day, month, year] = dateStr['Дата'].split('.').map(Number);
                        const dateObj = new Date(year, month - 1, day); 
                        trainingDates.push(dateObj);
                    });
                });
            });

            setHighlightedDates(trainingDates);
        }
    }, [trainingPlan]);

    const tileClassName = ({ date, view }) => {
        if (view === 'month' && highlightedDates.some(d => d.toDateString() === date.toDateString())) {
            return 'highlight'; // CSS-класс для подсветки
        }
        return null;
    };

    return <Calendar className="rounded-[5px] border-none mt-4 outline-none" tileClassName={tileClassName} />;
};

export default WorkoutCalendar;
