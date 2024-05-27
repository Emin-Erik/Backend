import React, { useState, useEffect } from "react";
import { Modal, Button, useDisclosure } from "@nextui-org/react";
import Card from "./card";
import WeekdayButton from "./weekdayButton";
import ModalComponent from "./modalComponent";
import NavCalendar from "./navCalender";
import { dishOptions } from "./dishOptions";

const WebCalendar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cards, setCards] = useState<{
    [key: string]: { title: string; imageUrl: string }[];
  }>({});
  const [selectedCard, setSelectedCard] = useState<{
    title: string;
    imageUrl: string;
  } | null>(null);
  const [selectedDish, setSelectedDish] = useState<string>("");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [currentWeekDates, setCurrentWeekDates] = useState<Date[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setCurrentWeekDates(getWeekDates(currentDate));
  }, [currentDate]);

  const handlePreviousWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentDate(prevWeek);
    setCurrentWeekDates(getWeekDates(prevWeek));
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
    setCurrentWeekDates(getWeekDates(nextWeek));
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

  const addCardToDay = (dayIndex: number) => {
    setSelectedDayIndex(dayIndex);
    onOpen();
  };

  const handleAddCard = () => {
    if (selectedDish && selectedDayIndex !== null) {
      const newCards = { ...cards };
      const selectedDateString =
        currentWeekDates[selectedDayIndex].toLocaleDateString();
      const selectedDishOption = dishOptions.find(
        (dish) => dish.name === selectedDish
      );
      const cardContent = {
        title: selectedDish,
        imageUrl: selectedDishOption ? selectedDishOption.imageUrl : "",
      };
      if (!newCards[selectedDateString]) {
        newCards[selectedDateString] = [];
      }
      newCards[selectedDateString].push(cardContent);
      setCards(newCards);
      setSelectedDish("");
      setSelectedDayIndex(null);
      onClose();
    }
  };

  const saveCalendarData = () => {
    console.log("Saving calendar data:", cards);
  };

  const handleDeleteCard = (dayIndex: number, cardIndex: number) => {
    const selectedDateString = currentWeekDates[dayIndex].toLocaleDateString();
    const newCards = { ...cards };
    newCards[selectedDateString].splice(cardIndex, 1);
    setCards(newCards);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Kalender</h2>
      <NavCalendar
        currentDate={currentDate}
        setCurrentWeekDates={setCurrentWeekDates}
        currentWeekDates={currentWeekDates}
        handlePreviousWeek={handlePreviousWeek}
        handleNextWeek={handleNextWeek}
        saveCalendarData={saveCalendarData}
      />
      <div className="grid grid-cols-7 gap-4 mt-8">
        {currentWeekDates.map((date, index) => (
          <WeekdayButton
            key={index}
            day={date.toLocaleDateString("en-US", { weekday: "long" })}
            showTitle={true}
          />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4 mt-4">
        {currentWeekDates.map((date, dayIndex) => (
          <div key={dayIndex} className="flex flex-col w-full">
            <WeekdayButton
              key={dayIndex}
              onAddCard={() => addCardToDay(dayIndex)}
              showTitle={false}
            />
            {cards[date.toLocaleDateString()] && (
              <div className="flex-grow overflow-y-auto">
                {cards[date.toLocaleDateString()].map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="border p-2 mb-2 bg-default-200 flex items-center relative"
                  >
                    <span>{card.title}</span>
                    <img
                      src={card.imageUrl}
                      alt="Card"
                      className="w-16 h-16 object-cover ml-2"
                    />
                    <button
                      className="absolute top-0 right-0 text-red-500"
                      onClick={() => handleDeleteCard(dayIndex, cardIndex)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        selectedDish={selectedDish}
        setSelectedDish={setSelectedDish}
        handleAddCard={handleAddCard}
        setSelectedDayIndex={setSelectedDayIndex}
      />
    </div>
  );
};

export default WebCalendar;
