import React from "react";
import {Select, SelectItem} from "@nextui-org/react";


export const animals = [
  {label: "Abnehmen", value: "Abnehmen", description: "The second most popular pet in the world"},
  {label: "Zunehmen", value: "Zunehmen", description: "The most popular pet in the world"},
  {label: "Gesunde Ernährung", value: "AnderGesunde Ernährunge", description: "The largest land animal"},
];


export default function App() {
  return (
    <Select
      isRequired
      label="Wähle deinen Plan"
      placeholder="Dein Plan"
      defaultSelectedKeys={["Abnehmen"]}
      className="max-w-xs"
    >
      {animals.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  );
}
