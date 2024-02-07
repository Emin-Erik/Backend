import { Button } from "@nextui-org/react";
import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
function NavCalendar() {
  return (
    <div>
      <div className="flex flex-row">
        <IoChevronBackOutline className="mt-2 text-7xl" />
        <IoChevronForward className="mt-2 text-7xl ml-4" />
        <div>
          <p className="flex justify-end opacity-75">13 Kalenderwoche</p>
          <h1 className="text-4xl mt-2 ml-4 mb-2">April 13 - 19, 2024</h1>
        </div>
        <div className="flex ml-[27rem]" style={{ gap: "3rem" }}>
          <Button
            className="mt-3"
            color="primary"
            variant="ghost"
            size="lg"
            style={{ height: "3.5rem" }}
          >
            Zufälliges <br></br>Rezept
          </Button>
          <Button className="mt-4" color="primary" variant="ghost" size="lg">
            <FaCirclePlus /> Erstellen
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NavCalendar;
