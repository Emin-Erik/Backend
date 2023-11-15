import React from "react";
import {Slider} from "@nextui-org/react";

export default function App() {

  return (
    <Slider 
      label="Wie oft treibst du Sport" 
      color="foreground"
      size="lg"
      step={1} 
      maxValue={7}
      showSteps={true} 
      minValue={0}
      marks={[
        {
          value: 1,
          label: `wenig bis kaum`,
        },
        {
            value: 3,
            label: `ab und zu`,
          },
    
        {
            value: 7,
            label: `jeden Tag`,
          },
      ]}
      defaultValue={3}
      className="max-w-lg"
    />
  );
}
