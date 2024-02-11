import React from "react";
import NavCalender from "./navCalender";
import WebCalender from "./webCalender";

const Calender = () => {
  return (
    <div>
      <div className="h-48 md:h-28 px-4 py-6 lg:px-8 mt-10 rounded-lg bg-black/25 drop-shadow-3xl mr-4">
        <NavCalender />
      </div>
      <div className="h-[54.25rem] md:h-[34rem] md:mb-[3.25rem] px-4 py-6 rounded-lg lg:px-8 bg-black/25 mt-4 mr-4 drop-shadow-3xl">
        <WebCalender />
      </div>
    </div>
  );
};

export default Calender;
