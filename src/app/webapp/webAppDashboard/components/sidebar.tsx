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
              <div className="px-4 ml-14 mt-4 w-48 md:w-48 md:ml-24">
                <Progress
                  label="Kalorien:"
                  size="sm"
                  classNames={{
                    base: "max-w-md",
                    track: "drop-shadow-md  border-default",
                    indicator:
                      "bg-gradient-to-r from-green-200 to-yellow-400 to-red-600",
                    label: "tracking-wider font-medium text-white",
                  }}
                  value={9000}
                  maxValue={10000}
                  color="warning"
                  showValueLabel={true}
                  className="max-w-md"
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${4206} kcal`}
                />
              </div>
              <div className="flex flex-col ml-16 w-52 mt-2 md:mt-0 md:w-60 md:grid md:grid-cols-1 md:pl-10">
                <Progress
                  size="sm"
                  label="Zucker"
                  color="warning"
                  aria-label="Loading..."
                  showValueLabel={true}
                  value={70}
                  className="mt-2 md:mt-4"
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${200} kcal`}
                  classNames={{
                    label: "text-sm md:text-xs",
                    value: "md:text-xs",
                  }}
                />
                <Progress
                  size="sm"
                  label="Salz"
                  color="warning"
                  aria-label="Loading..."
                  value={60}
                  showValueLabel={true}
                  className="mt-6 md:mt-4 "
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${2000} kcal`}
                  classNames={{
                    label: "text-sm md:text-xs",
                    value: "md:text-xs",
                  }}
                />
                <Progress
                  size="sm"
                  label="Fette"
                  color="danger"
                  aria-label="Loading..."
                  value={95}
                  showValueLabel={true}
                  className="mt-6 md:mt-4 "
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${2000} kcal`}
                  classNames={{
                    label: "text-sm md:text-xs",
                    value: "md:text-xs",
                  }}
                />
                <Progress
                  size="sm"
                  label="Kohlenhydrate"
                  color="success"
                  aria-label="Loading..."
                  value={50}
                  showValueLabel={true}
                  className="mt-6 md:mt-4"
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${2000} kcal`}
                  classNames={{
                    label: "text-sm md:text-xs",
                    value: "md:text-xs",
                  }}
                />
                <Progress
                  size="sm"
                  label="Nährstoffe"
                  color="primary"
                  aria-label="Loading..."
                  value={40}
                  showValueLabel={true}
                  className="mt-6 md:mt-4"
                  maxValue={100}
                  formatOptions={{ style: "decimal" }}
                  valueLabel={`${2000} kcal`}
                  classNames={{
                    label: "text-sm md:text-xs",
                    value: "md:text-xs",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-2 bg-cover rounded-lg bg-black/25  mt-11 drop-shadow-2xl rounded-lg transition duration-240 ease-in-out hover:scale-105">
          <h2 className="relative px-4 text-lg font-semibold tracking-tight ml-14 mt-4 w-48 md:text-sm md:ml-28">
            Dein Plan
          </h2>
          <div className="h-[28.05rem] md:h-[12.5rem]">
            <div className="w-full flex flex-row flex-wrap gap-4 ml-1 mt-8 md:mt-6  md:grid md:grid-cols-2 md:gap-2">
              <Input
                type="email"
                label="Gewicht"
                color="success"
                key="success"
                variant="bordered"
                placeholder="110kg"
                defaultValue="110kg"
                className="max-w-[220px] md:max-w-[140px] ml-2"
                classNames={{
                  label: "md:text-xs",
                }}
              />
              <Select
                label="Wähle deinen Plan"
                placeholder="Dein Plan"
                color="success"
                key="success"
                variant="bordered"
                className="max-w-[220px] md:max-w-[140px] ml-2"
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
              <Select
                label="Dein Geschlecht"
                placeholder="Dein Geschlecht"
                color="success"
                key="success"
                variant="bordered"
                className="max-w-[220px] md:max-w-[140px] ml-2"
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
              <Input
                type="email"
                label="Email"
                variant="bordered"
                color="success"
                key="success"
                placeholder="Enter your email"
                defaultValue="junior@nextui.org"
                className="max-w-[220px] md:max-w-[140px] ml-2"
                classNames={{
                  label: "md:text-xs",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
