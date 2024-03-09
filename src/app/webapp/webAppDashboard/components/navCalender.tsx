// NavCalendar.tsx
import React, { useEffect } from "react";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import { Button } from "@nextui-org/react";

interface NavCalendarProps {
  currentDate: Date;
  setCurrentWeekDates: React.Dispatch<React.SetStateAction<Date[]>>;
  currentWeekDates: Date[]; // New prop added
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
}

const NavCalendar: React.FC<NavCalendarProps> = ({
  handlePreviousWeek,
  handleNextWeek,
  currentDate,
  setCurrentWeekDates,
  currentWeekDates // Receive currentWeekDates as prop
}) => {
  useEffect(() => {
    setCurrentWeekDates(getWeekDates());
  }, [currentDate]);

  const handlePreviousWeekClick = () => {
    handlePreviousWeek(); // Call handlePreviousWeek here
  };

  const handleNextWeekClick = () => {
    handleNextWeek(); // Call handlePreviousWeek here
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
    if (currentWeekDates.length === 0) return ""; // Return empty string if currentWeekDates is empty
  
    const startOfWeek = currentWeekDates[0];
    const endOfWeek = currentWeekDates[currentWeekDates.length - 1];
  
    return `${startOfWeek.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })} - ${endOfWeek.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  return (
    <div>
      <div className="mt-4 flex flex-row">
        <IoChevronBackOutline
          className="mt-2 text-7xl cursor-pointer"
          onClick={handlePreviousWeekClick}
        />
        <IoChevronForward
          className="mt-2 text-7xl ml-4 cursor-pointer"
          onClick={handleNextWeekClick}
        />
        <div>
        <p className="flex justify-end opacity-75">
  {currentWeekDates && currentWeekDates.length > 0 ? 
    currentWeekDates[0].toLocaleDateString("en-US", { weekday: "long" }) :
    "Loading..."}{" "}
  Kalenderwoche
</p>
          <h1 className="text-4xl mt-2 ml-4 mb-2">{getFormattedWeekDates()}</h1>
        </div>
        <div className="flex ml-[27rem]" style={{ gap: "3rem" }}>
          <Button
            className="mt-3"
            color="primary"
            variant="ghost"
            size="lg"
            style={{ height: "3.5rem" }}
          >
            Zufälliges <br></br>Rezept
          </Button>
          <Button className="mt-4" color="primary" variant="ghost" size="lg">
          Erstellen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavCalendar;
