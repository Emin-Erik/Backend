// WebCalendar.tsx
import React, { useState, useEffect } from "react";
import { Modal, Button, useDisclosure } from "@nextui-org/react";
import Card from "./card";
import WeekdayButton from "./weekdayButton";
import ModalComponent from "./modalComponent";
import NavCalendar from "./navCalender";

const WebCalendar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cards, setCards] = useState<{ [key: string]: { title: string; imageUrl: string }[] }>({});
  const [selectedCard, setSelectedCard] = useState<{ title: string; imageUrl: string } | null>(null);
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
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
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
      const selectedDateString = currentWeekDates[selectedDayIndex].toLocaleDateString();
      const cardContent = {
        title: selectedDish,
        imageUrl: "https://pommes-selbermachen.de/wp-content/uploads/portion-pommes.jpg"
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

  const removeCard = (dayIndex: number, cardIndex: number) => {
    const newCards = { ...cards };
    const selectedDateString = currentWeekDates[dayIndex].toLocaleDateString();
    newCards[selectedDateString].splice(cardIndex, 1);
    setCards(newCards);
  };

  const renderCardsForDay = (dayIndex: number) => {
    const selectedDateString = currentWeekDates[dayIndex].toLocaleDateString();
    if (!cards[selectedDateString]) return null;
    const renderedCards = cards[selectedDateString].map((card, index) => (
      <div
        key={index}
        className="border p-2 mb-2 bg-default-200 cursor-move flex items-center relative"
      >
        <button
          className="absolute top-0 right-0 text-red-500 text-xl p-1"
          onClick={(e) => {
            e.stopPropagation();
            removeCard(dayIndex, index);
          }}
        >
          X
        </button>
        <img src={card.imageUrl} alt="Card" className="w-16 h-16 object-cover mr-2" />
        <span>{card.title}</span>
      </div>
    ));

    return renderedCards;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Kalender</h2>
      <NavCalendar
  currentDate={currentDate}
  setCurrentWeekDates={setCurrentWeekDates}
  currentWeekDates={currentWeekDates} // Pass currentWeekDates as prop
/>
      <div className="grid grid-cols-7 gap-4">
        {currentWeekDates.map((date, index) => (
          <WeekdayButton
            key={index}
            day={date.toLocaleDateString("en-US", { weekday: "long" })}
            onAddCard={() => addCardToDay(index)}
          />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4 mt-4">
        {currentWeekDates.map((date, index) => (
          <div
            key={index}
            className="border p-2 flex flex-col w-full"
          >
            <div className="flex-grow overflow-y-auto">
              {renderCardsForDay(index)}
            </div>
          </div>
        ))}
      </div>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        selectedDish={selectedDish}
        setSelectedDish={setSelectedDish}
        handleAddCard={handleAddCard}
        setSelectedDayIndex={function (
          value: React.SetStateAction<number | null>
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Card
        card={selectedCard ?? undefined}
        onRemove={() => setSelectedCard(null)}
      />
    </div>
  );
};

export default WebCalendar;
