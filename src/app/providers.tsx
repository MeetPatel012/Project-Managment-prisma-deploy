"use client";

import StoreProvider from "./redux";
import { useEffect } from "react";
import { useAppSelector } from "./redux";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return children;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  );
}
