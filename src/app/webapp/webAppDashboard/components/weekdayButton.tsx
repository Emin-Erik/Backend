// WeekdayButton.tsx
import React from "react";

interface WeekdayButtonProps {
  day?: string;
  onAddCard?: () => void;
  showTitle?: boolean;
}

const WeekdayButton: React.FC<WeekdayButtonProps> = ({
  day,
  onAddCard,
  showTitle,
}) => {
  return (
    <div className="border p-2 text-center">
      {showTitle && <div>{day}</div>}
      {onAddCard && (
        <button
          className="block mt-2 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={onAddCard}
        >
          +
        </button>
      )}
    </div>
  );
};

export default WeekdayButton;
