"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === "green-dark") {
      setTheme("green-light");
    } else {
      setTheme("green-dark");
    }
  };

  const toggleSwitch = theme === "green-dark";

  if (!mounted) return null;

  return (
    <>
      <Switch
        defaultSelected={toggleSwitch}
        size="lg"
        color="primary"
        onChange={toggleTheme}
        startContent={<MoonIcon />}
        endContent={<SunIcon />}
      ></Switch>
    </>
  );
}
