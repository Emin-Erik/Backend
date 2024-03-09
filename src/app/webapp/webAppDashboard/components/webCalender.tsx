"use client";
import React, { useState } from "react";

// Komponente für die Anzeige von Karten-Details
const CardDetails: React.FC<{ card: { title: string; imageUrl: string } | null; onClose: () => void }> = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-default p-4 rounded-lg relative">
        <button className="absolute top-2 right-2 text-black-500 text-3xl" onClick={onClose}>
          X
        </button>
        <img src={card.imageUrl} alt="Card" className="w-64 h-64 object-cover mb-4" />
        <h3 className="text-lg font-semibold">{card.title}</h3>
        {/* Hier könnten weitere Details der Karte angezeigt werden */}
        <h1>POMMMMMMMMMMMMMMMMMES</h1>
      </div>
    </div>
  );
};

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
  const [cards, setCards] = useState<Array<Array<{ title: string; imageUrl: string }>>>([[], [], [], [], [], [], []]);
  // State für die angeklickte Karte
  const [selectedCard, setSelectedCard] = useState<{ title: string; imageUrl: string } | null>(null);

  // Funktion zum Hinzufügen einer Card zu einem bestimmten Tag
  const addCardToDay = (dayIndex: number) => {
    const newCards = [...cards];
    const cardContent = { title: `Gericht ${newCards[dayIndex].length + 1}`, imageUrl: "https://pommes-selbermachen.de/wp-content/uploads/portion-pommes.jpg" };
    newCards[dayIndex].push(cardContent);
    setCards(newCards);
  };

   // Funktion zum Entfernen einer Karte aus einem bestimmten Tag
   const removeCard = (dayIndex: number, cardIndex: number) => {
    const newCards = [...cards];
    newCards[dayIndex].splice(cardIndex, 1);
    setCards(newCards);
  };


  // Funktion zum Verschieben einer Card innerhalb desselben Tags
  const moveCardWithinDay = (dayIndex: number, fromIndex: number, toIndex: number) => {
    const newCards = [...cards];
    const [removedCard] = newCards[dayIndex].splice(fromIndex, 1);
    newCards[dayIndex].splice(toIndex, 0, removedCard);
    setCards(newCards);
  };

  // Funktion zum Verschieben einer Card zwischen den Tagen
  const moveCardToDifferentDay = (fromDayIndex: number, toDayIndex: number, cardIndex: number) => {
    const newCards = [...cards];
    const [removedCard] = newCards[fromDayIndex].splice(cardIndex, 1);
    newCards[toDayIndex].push(removedCard);
    setCards(newCards);
  };

  // Funktion zum Rendern der Cards für jeden Tag
  const renderCardsForDay = (dayIndex: number) => {
    return cards[dayIndex].map((card, index) => (
      <div
        key={index}
        className="border p-2 mb-2 bg-default-200 cursor-move flex items-center relative"
        draggable
        onClick={() => setSelectedCard(card)}
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", JSON.stringify({ fromDayIndex: dayIndex, cardIndex: index }));
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const { fromDayIndex, cardIndex } = JSON.parse(e.dataTransfer.getData("text/plain"));
          if (dayIndex === fromDayIndex) {
            moveCardWithinDay(dayIndex, cardIndex, index);
          } else {
            moveCardToDifferentDay(fromDayIndex, dayIndex, cardIndex);
          }
        }}
      >
        <button className="absolute top-0 right-0 text-red-500 text-xl p-1" onClick={(e) => {
          e.stopPropagation();
          removeCard(dayIndex, index); // Hier wird die Karte entfernt
          }}>
          X
        </button>
        <img src={card.imageUrl} alt="Card" className="w-16 h-16 object-cover mr-2" />
        <span>{card.title}</span>
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
              +
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
              moveCardToDifferentDay(fromDayIndex, index, cardIndex);
            }}
          >
            <div className="flex-grow overflow-y-auto">{renderCardsForDay(index)}</div>
          </div>
        ))}
      </div>
      {/* Karten-Details anzeigen, wenn eine Karte ausgewählt ist */}
      <CardDetails card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
};

export default WebCalendar;
