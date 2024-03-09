"use client";
import React, { useState } from "react";

const WebCalendar: React.FC = () => {
  const getWeekDates = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjustierung auf Montag
    const monday = new Date(today.setDate(diff));

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  // Wochentage
  const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

  // Erstellen des Datumsarrays
  const weekDates = getWeekDates();

  // State für die Paar Cards pro Tag
  const [cards, setCards] = useState<Array<Array<string>>>([[], [], [], [], [], [], []]);

  // Funktion zum Hinzufügen einer Card zu einem bestimmten Tag
  const addCardToDay = (dayIndex: number) => {
    const newCards = [...cards];
    const cardContent = `Card ${newCards[dayIndex].length + 1}`;
    newCards[dayIndex].push(cardContent);
    setCards(newCards);
  };

  // Funktion zum Verschieben einer Card zwischen den Tagen
  const moveCard = (fromDayIndex: number, toDayIndex: number, cardIndex: number) => {
    const newCards = [...cards];
    const [movedCard] = newCards[fromDayIndex].splice(cardIndex, 1);
    newCards[toDayIndex].push(movedCard);
    setCards(newCards);
  };

  // Funktion zum Rendern der Cards für jeden Tag
  const renderCardsForDay = (dayIndex: number) => {
    return cards[dayIndex].map((content, index) => (
      <div
        key={index}
        className="border p-2 mb-2 bg-gray-200 cursor-move"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", JSON.stringify({ fromDayIndex: dayIndex, cardIndex: index }));
        }}
      >
        {content}
      </div>
    ));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Kalender</h2>
      <div className="grid grid-cols-7 gap-4">
        {weekdays.map((day, index) => (
          <div key={index} className="border p-2 text-center">
            {day}
            <button
              className="block mt-2 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => addCardToDay(index)}
            >
              Add Card
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4 mt-4">
        {weekDates.map((date, index) => (
          <div
            key={index}
            className="border p-2 flex flex-col w-full"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const { fromDayIndex, cardIndex } = JSON.parse(e.dataTransfer.getData("text/plain"));
              moveCard(fromDayIndex, index, cardIndex);
            }}
          >
            <div className="flex-grow overflow-y-auto">{renderCardsForDay(index)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebCalendar;
