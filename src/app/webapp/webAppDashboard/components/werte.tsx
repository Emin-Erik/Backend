import { Progress } from "@nextui-org/react";
import React from "react";

export function Werte() {
  return (
      <div className="py-2">
          <div className="grid grid-flow-col min-h-[27rem] min-w-[17rem] md:min-h-[30rem]">
            <div className="px-8">
            {/* Kalorien */}
              <div className="flex justify-center items-center">
                <Progress
                  label="Kalorien:"
                  size="md"
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
              {/* Other essentials list */}
              <div className="flex flex-col justify-center items-center px-8">
                <Progress
                  size="sm"
                  label="Zucker"
                  color="warning"
                  aria-label="Loading..."
                  showValueLabel={true}
                  value={70}
                  className="mt-2 md:mt-4 max-w-2xl"
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
                  className="mt-6 md:mt-4 max-w-2xl"
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
                  className="mt-6 md:mt-4 max-w-2xl"
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
                  className="mt-6 md:mt-4 max-w-2xl"
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
                  className="mt-6 md:mt-4 max-w-2xl"
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

        
        );
      }
      
export default Werte;
