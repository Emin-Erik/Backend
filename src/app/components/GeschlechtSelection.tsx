import React from "react";
import {Select, SelectItem} from "@nextui-org/react";


export const animals = [
  {label: "Mann", value: "Mann", description: "The second most popular pet in the world"},
  {label: "Frau", value: "Frau", description: "The most popular pet in the world"},
  {label: "Andere", value: "Andere", description: "The largest land animal"},
];


export default function App() {
  return (
    <Select
      isRequired
      label="Dein Geschlecht"
      placeholder="Wähle dein Geschlecht"
      defaultSelectedKeys={["Mann"]}
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
