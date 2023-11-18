import React, { useState, useMemo } from "react";
import { Input } from "@nextui-org/react";

const App: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const validateEmail = (value: string): boolean => {
    return !!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const isInvalid: boolean = useMemo(() => {
    if (value === "") return false;
    return validateEmail(value) ? false : true;
  }, [value]);

  return (
    <Input
      value={value}
      type="email"
      label="Email"
      placeholder="deineMail@.com"
      variant="bordered"
      isInvalid={isInvalid}
      color={isInvalid ? "danger" : "success"}
      errorMessage={isInvalid && "Please enter a valid email"}
      onValueChange={setValue}
      className="max-w-xs"
    />
  );
};

export default App;
