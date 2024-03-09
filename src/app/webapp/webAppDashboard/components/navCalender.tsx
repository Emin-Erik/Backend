"use client";
import React, { useEffect } from "react";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import { Button } from "@nextui-org/react";

interface NavCalendarProps {
  currentDate: Date;
  setCurrentWeekDates: React.Dispatch<React.SetStateAction<Date[]>>;
  currentWeekDates: Date[];
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
}

const NavCalendar: React.FC<NavCalendarProps> = ({
  handlePreviousWeek,
  handleNextWeek,
  currentDate,
  setCurrentWeekDates,
  currentWeekDates,
}) => {
  useEffect(() => {
    setCurrentWeekDates(getWeekDates());
  }, [currentDate]);

  const handlePreviousWeekClick = () => {
    handlePreviousWeek();
  };

  const handleNextWeekClick = () => {
    handleNextWeek();
  };

  const getWeekDates = (startDate: Date = new Date()) => {
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(startDate.setDate(diff));
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };
  const getFormattedWeekDates = () => {
    if (currentWeekDates.length === 0) return "";
  
    const startOfWeek = currentWeekDates[0];
    const endOfWeek = currentWeekDates[currentWeekDates.length - 1];
  
    const startMonthDay = startOfWeek.toLocaleDateString("de-DE", {
      month: "short",
      day: "numeric",
    });
  
    const endMonthDay = endOfWeek.toLocaleDateString("de-DE", {
      month: "short",
      day: "numeric",
    });
  
    return `${startMonthDay} - ${endMonthDay}`;
  };
  

  const getCalendarWeekNumber = (date: Date) => {
    if (!date) return 0; // Return 0 if date is undefined
  
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysOffset =
      firstDayOfYear.getDay() > 4 ? 11 - firstDayOfYear.getDay() : 4 - firstDayOfYear.getDay();
    const firstThursday = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset));
    const weekNumber = Math.ceil(((date.getTime() - firstThursday.getTime()) / 86400000 + 1) / 7);
    return weekNumber;
  };
  

  return (
    <div className="flex flex-row">
      <IoChevronBackOutline
        className="text-7xl cursor-pointer"
        onClick={handlePreviousWeekClick}
      />
      <IoChevronForward
        className="text-7xl ml-4 cursor-pointer"
        onClick={handleNextWeekClick}
      />
      <div className="flex flex-col mb-8">
  
        <p className="text-2xl opacity-75 mb-0">{`Kalenderwoche ${getCalendarWeekNumber(currentWeekDates[0])}`}</p>

        <p className="text-2xl opacity-75 mb-0">{getFormattedWeekDates()}</p>
      </div>
      <div className="flex ml-[27rem]" style={{ gap: "3rem" }}>
        <Button
          className="mt-3"
          color="primary"
          variant="ghost"
          size="lg"
          style={{ height: "3.5rem" }}
        >
          Zufälliges <br />Rezept
        </Button>
        <Button className="mt-4" color="primary" variant="ghost" size="lg">
          Erstellen
        </Button>
      </div>
    </div>
  );
  
};

export default NavCalendar;
