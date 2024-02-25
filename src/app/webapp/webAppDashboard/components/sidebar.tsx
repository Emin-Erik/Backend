"use client";

import { Progress, Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
export function Sidebar() {
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

  return <div></div>;
}
