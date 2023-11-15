// GroeßeSlider component
import React from "react";
import { Slider, SliderValue, Tooltip } from "@nextui-org/react";

interface GroeßeSlider {
  // Add any specific props you need for GroeßeSlider
}

const GroeßeSlider: React.FC<GroeßeSlider> = () => {
  const [value, setValue] = React.useState<SliderValue>(100);
  const [inputValue, setInputValue] = React.useState<string>("160");

  const handleChange = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setValue(value);
    setInputValue(value.toString());
  };

  return (
    <Slider
      label="Körpergröße"
      size="lg"
      step={1}
      maxValue={220}
      minValue={120}
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
            content="Gebe deine Größe in cm an"
            placement="left"
          >
            <input
              className="px-1 py-0.5 w-16 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
              type="text"
              aria-label="Körpergröße"
              value={`${inputValue} cm`}
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

export default GroeßeSlider;
