import React from "react";
import { Textarea } from "@nextui-org/react";

const Calender = () => {
  return (
    <div>
      <Textarea
        label="Description"
        placeholder="Enter your description"
        className="max-w"
      />
    </div>
  );
};

export default Calender;
