import React from "react";

interface CardProps {
    card?: { title: string; imageUrl: string };
    onRemove: () => void;
}
  
const Card: React.FC<CardProps> = ({ card, onRemove }) => {
    if (!card) return null; // Wenn card nicht vorhanden ist, nichts rendern

    return (
        <div className="border p-2 mb-2 bg-default-200 cursor-move flex items-center relative">
            <button className="absolute top-0 right-0 text-red-500 text-xl p-1" onClick={onRemove}>
                X
            </button>
            <img src={card.imageUrl} alt="Card" className="w-16 h-16 object-cover mr-2" />
            <span>{card.title}</span>
        </div>
    );
};

export default Card;
