// GewichtSlider component
import React from "react";
import { Slider, SliderValue, Tooltip } from "@nextui-org/react";

interface GewichtSliderProps {
  // Add any specific props you need for GewichtSlider
}

const GewichtSlider: React.FC<GewichtSliderProps> = () => {
  const [value, setValue] = React.useState<SliderValue>(100);
  const [inputValue, setInputValue] = React.useState<string>("100");

  const handleChange = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setValue(value);
    setInputValue(value.toString());
  };

  return (
    <Slider
      label="Kilogrammgewicht"
      size="sm"
      step={1}
      maxValue={200}
      minValue={40}
      color="success"
      classNames={{
        base: "max-w-md",
        label: "text-medium",
      }}
      // we extract the default children to render the input
      renderValue={({ children, ...props }) => (
        <output {...props}>
          <Tooltip
            className="text-tiny text-default-500 rounded-md"
            content="Press Enter to confirm"
            placement="left"
          >
            <input
              className="px-1 py-0.5 w-14 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
              type="text"
              aria-label="Kilogrammgewicht"
              value={`${inputValue} kg`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value;

                setInputValue(v);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                  setValue(Number(inputValue));
                }
              }}
            />
          </Tooltip>
        </output>
      )}
      value={value}
      onChange={handleChange}
    />
  );
};

export default GewichtSlider;
