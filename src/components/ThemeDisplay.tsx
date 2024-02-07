import React from "react";
import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { Theme } from "@mui/system";
import { useThemeContext } from "../hooks/useThemeContext";

interface ThemeProps {
  children: ReactNode;
}

const ThemeDisplay = ({ children }: ThemeProps) => {
  const { isDarkTheme } = useThemeContext();
  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? "dark" : "light",
      primary: {
        main: isDarkTheme ? "#3f6e26" : "#4a8a6f",
      },
    },
  });

  return <ThemeProvider theme={theme as Theme}>{children}</ThemeProvider>;
};

export default ThemeDisplay;
