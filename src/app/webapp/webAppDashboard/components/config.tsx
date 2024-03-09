"use client";
import { Input, Progress, Select, SelectItem } from "@nextui-org/react";
import React from "react";


export function Config() {
  const plan = [
    {
      label: "Abnehmen",
      value: "Abnehmen",
      description: "hi",
    },
    {
      label: "Zunehmen",
      value: "Zunehmen",
      description: "hi",
    },
    {
      label: "Gesunde Ernährung",
      value: "Ander Gesunde Ernährunge",
      description: "hi",
    },
  ];

  const geschlechter = [
    {
      label: "Mann",
      value: "Mann",
    },
    {
      label: "Frau",
      value: "Frau",
    },
    {
      label: "Andere",
      value: "Andere",
    },
  ];

  const sport = [
    {
      label: "Viel",
      value: "Viel",
    },
    {
      label: "Normal",
      value: "Normal",
    },
    {
      label: "Wenig",
      value: "Wenig",
    },
    {
      label: "Kaum",
      value: "Kaum",
    },
  ];


        {/* 
        RESPONSIV VALUES HAVE TO BE ADJUSTED LIKE WISHED FOR NOW ITS OKAY
      
      */}
  return (
    <div className="py-2">
    <h2 className="mt-2 ml-4">
      Dein Plan
    </h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-2 gap-2 px-2 md:px-8">
        <Input
          type="email"
          label="Gewicht"
         
          placeholder="110kg"
          defaultValue="110kg"
          className="xs:max-w-[120px] md:max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] 2xl:max-w-[300px] 3xl:max-w-[350px] ml-4 mr-4"
          classNames={{
            label: "md:text-xs",
          }}
        />
        <Input
          type="email"
          label="Zielgewicht"
         
          placeholder="90kg"
          defaultValue="90kg"
          className="max-w-[120px] md:md:max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] 2xl:max-w-[300px] 3xl:max-w-[350px] ml-4 mr-4"
          classNames={{
            label: "xs:text-xs md:text-md",
          }}
        />

        <Select
          label="Dein Geschlecht"
          placeholder="Dein Geschlecht"
         
          className="xs:max-w-[120px] md:md:max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] 2xl:max-w-[300px] 3xl:max-w-[350px] ml-4 mr-4"
          classNames={{
            label: "md:text-xs",
          }}
        >
          {geschlechter.map((geschlecht) => (
            <SelectItem key={geschlecht.value} value={geschlecht.value}>
              {geschlecht.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Deine Aktivität"
          placeholder="Viel Sport"
         
          className="max-w-[120px] md:md:max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] 2xl:max-w-[300px] 3xl:max-w-[350px] ml-4 mr-4"
          classNames={{
            label: "md:text-xs",
          }}
        >
          {sport.map((sporter) => (
            <SelectItem key={sporter.value} value={sporter.value}>
              {sporter.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Wähle deinen Plan"
          placeholder="Dein Plan"
         
          className="xs:max-w-[120px] md:md:max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] 2xl:max-w-[300px] 3xl:max-w-[350px] ml-4 mr-4"
          classNames={{
            label: "md:text-xs",
          }}
        >
          {plan.map((plans) => (
            <SelectItem key={plans.value} value={plans.value}>
              {plans.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          type="email"
          label="Deine Größe"
         
          placeholder="180cm"
          defaultValue="180cm"
          className="max-w-[120px] md:md:max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] 2xl:max-w-[300px] 3xl:max-w-[350px]   ml-4 mr-4"
          classNames={{
            label: "md:text-xs",
          }}
        />
      </div>
    </div>
);
}

export default Config;
