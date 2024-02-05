import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
function NavCalendar() {
  return (
    <div>
      <div className="flex flex-row">
        <IoChevronBackOutline className="text-6xl" />
        <IoChevronForward className="text-6xl ml-4" />
        <div>
          <p>13 Kalenderwoche</p>
          <h1 className="text-4xl mt-3 ml-4"> April 13 - 19, 2024</h1>
        </div>
      </div>
    </div>
  );
}

export default NavCalendar;
