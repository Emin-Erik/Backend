import React, { useState, useEffect } from "react";
import { Modal, Button, useDisclosure } from "@nextui-org/react";
import Card from "./card";
import WeekdayButton from "./weekdayButton";
import ModalComponent from "./modalComponent";
import NavCalendar from "./navCalender";
import { dishOptions } from "./dishOptions";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

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
    setCurrentWeekDates(getWeekDates(prevWeek)); // Update currentWeekDates here
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
    setCurrentWeekDates(getWeekDates(nextWeek)); // Update currentWeekDates here
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
    // Implement your save logic here
    console.log("Saving calendar data:", cards);
    // Example: Make an API call to save the data
    // axios.post("/api/saveCalendarData", { cards, otherData });
  };

  const moveCardWithinDay = (
    dayIndex: number,
    fromIndex: number,
    toIndex: number
  ) => {
    const selectedDateString = currentWeekDates[dayIndex].toLocaleDateString();
    const newCards = { ...cards };
    const [removedCard] = newCards[selectedDateString].splice(fromIndex, 1);
    newCards[selectedDateString].splice(toIndex, 0, removedCard);
    setCards(newCards);
  };

  const moveCardToDifferentDay = (
    fromDayIndex: number,
    toDayIndex: number,
    cardIndex: number
  ) => {
    const fromDateString = currentWeekDates[fromDayIndex].toLocaleDateString();
    const toDateString = currentWeekDates[toDayIndex].toLocaleDateString();
    const newCards = { ...cards };
    const [removedCard] = newCards[fromDateString].splice(cardIndex, 1);
    if (!newCards[toDateString]) {
      newCards[toDateString] = [];
    }
    newCards[toDateString].push(removedCard);
    setCards(newCards);
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

    const onDragEnd = (result: DropResult) => {
      if (!result.destination) return;

      const sourceIndex = result.source.index;
      const destinationIndex = result.destination.index;

      // Move the card within the same day
      if (result.source.droppableId === result.destination.droppableId) {
        moveCardWithinDay(dayIndex, sourceIndex, destinationIndex);
      } else {
        // Move the card to a different day
        moveCardToDifferentDay(
          +result.source.droppableId.split("-")[1], // fromDayIndex
          +result.destination.droppableId.split("-")[1], // toDayIndex
          sourceIndex // cardIndex
        );
      }
    };

    return (
      <Droppable droppableId={`day-${dayIndex}`} key={`day-${dayIndex}`}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-grow overflow-y-auto"
          >
            {cards[selectedDateString].map((card, index) => (
              <Draggable
                key={index}
                draggableId={`${selectedDateString}-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="border p-2 mb-2 bg-default-200 flex items-center relative"
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
                    <img
                      src={card.imageUrl}
                      alt="Card"
                      className="w-16 h-16 object-cover mr-2"
                    />
                    <span>{card.title}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Kalender</h2>
      <Button onClick={saveCalendarData}>Save</Button>
      <NavCalendar
        currentDate={currentDate}
        setCurrentWeekDates={setCurrentWeekDates}
        currentWeekDates={currentWeekDates}
        handlePreviousWeek={handlePreviousWeek}
        handleNextWeek={handleNextWeek} // Pass handlePreviousWeek as prop
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
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;
          if (!destination) return;
          if (source.droppableId === destination.droppableId) {
            // Moving within the same day
            moveCardWithinDay(
              +source.droppableId.split("-")[1],
              source.index,
              destination.index
            );
          } else {
            // Moving to a different day
            moveCardToDifferentDay(
              +source.droppableId.split("-")[1],
              +destination.droppableId.split("-")[1],
              source.index
            );
          }
        }}
      >
        <div className="grid grid-cols-7 gap-4 mt-4">
          {currentWeekDates.map((date, index) => (
            <div key={index} className="border p-2 flex flex-col w-full">
              <Droppable droppableId={`day-${index}`}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-grow overflow-y-auto"
                  >
                    {renderCardsForDay(index)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
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
