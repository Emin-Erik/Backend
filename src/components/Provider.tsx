"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="green-dark">
        <SessionProvider>{children}</SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default Provider;
