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

  return (
    <div className={"pb-12"}>
      <div className="py-4 pt-10 ">
        <div className="px-3 py-2 drop-shadow-2xl rounded-lg bg-black/25 transition duration-240 ease-in-out hover:scale-105">
          <div className="h-[27rem] md:h-[20rem]">
            <div className="flex flex-col items-center gap-6 w-1/2 justify-start max-w-md ml-4">
              <div className="px-4 ml-14 mt-4 w-48 md:w-48 md:ml-28">
                <Progress
                  label="Kalorien:"
                  size="sm"
                  classNames={{
                    base: "max-w-md",
                    track: "drop-shadow-md  border-default",
                    indicator: "bg-gradient-to-r from-green-800 to-red-400",
                    label: "tracking-wider font-medium text-white",
                  }}
                  value={4000}
                  maxValue={10000}
                  color="warning"
                  showValueLabel={true}
                  className="max-w-md"
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${4206} kcal`}
                />
              </div>
              <div className="flex flex-col ml-16 w-52 mt-2 md:w-52 md:ml-12 md:grid md:grid-cols-2 gap-4 md:text-xs  ">
                <Progress
                  size="sm"
                  label="Zucker"
                  color="warning"
                  aria-label="Loading..."
                  showValueLabel={true}
                  value={70}
                  className="mt-2 md:mt-0 md:mr-4"
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${200} kcal`}
                  classNames={{
                    label: "text-sm md:text-xs",
                    value = "md:text-xs",
                  }}
                />
                <Progress
                  size="sm"
                  label="Salz"
                  color="warning"
                  aria-label="Loading..."
                  value={60}
                  showValueLabel={true}
                  className="mt-6 md:mt-5 md:ml-4"
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${2000} kcal`}
                />
                <Progress
                  size="sm"
                  label="Fette"
                  color="danger"
                  aria-label="Loading..."
                  value={95}
                  showValueLabel={true}
                  className="mt-6"
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${2000} kcal`}
                />
                <Progress
                  size="sm"
                  label="Kohlenhydrate"
                  color="success"
                  aria-label="Loading..."
                  value={40}
                  showValueLabel={true}
                  className="mt-6"
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${2000} kcal`}
                />
                <Progress
                  size="sm"
                  label="Nährstoffe"
                  color="primary"
                  aria-label="Loading..."
                  value={10}
                  showValueLabel={true}
                  className="mt-6"
                  maxValue={10000}
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${2000} kcal`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-2 bg-cover rounded-lg bg-black/25  mt-11 drop-shadow-2xl rounded-lg transition duration-240 ease-in-out hover:scale-105">
          <h2 className="relative px-4 text-lg font-semibold tracking-tight ml-14 mt-4 w-48">
            Dein Plan
          </h2>
          <div className="h-[28.05rem] w-px-1">
            <div className="w-full flex flex-row flex-wrap gap-4 ml-2 mt-8">
              <Input
                type="email"
                label="Gewicht"
                color="success"
                key="success"
                variant="bordered"
                placeholder="110kg"
                defaultValue="110kg"
                className="max-w-[220px] ml-2"
              />
              <Select
                label="Wähle deinen Plan"
                placeholder="Dein Plan"
                color="success"
                key="success"
                variant="bordered"
                className="max-w-[220px] ml-2 text-foreground "
              >
                {plan.map((plans) => (
                  <SelectItem key={plans.value} value={plans.value}>
                    {plans.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Dein Geschlecht"
                placeholder="Dein Geschlecht"
                color="success"
                key="success"
                variant="bordered"
                className="max-w-[220px] ml-2 text-foreground "
              >
                {geschlechter.map((geschlecht) => (
                  <SelectItem key={geschlecht.value} value={geschlecht.value}>
                    {geschlecht.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type="email"
                label="Email"
                variant="bordered"
                color="success"
                key="success"
                placeholder="Enter your email"
                defaultValue="junior@nextui.org"
                className="max-w-[220px] ml-2"
              />
              <Input
                type="email"
                label="Email"
                color="success"
                key="success"
                variant="bordered"
                placeholder="Enter your email"
                defaultValue="junior@nextui.org"
                className="max-w-[220px] ml-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
