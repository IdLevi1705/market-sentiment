// src/contexts/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import darkTheme from "@/styles/theme"; // Dark theme as default

// Define theme type
type ThemeMode = "dark" | "light";

// Create context interface
interface ThemeContextProps {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextProps>({
  themeMode: "dark",
  toggleTheme: () => {},
});

// Context provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get theme from localStorage or default to dark
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  // Initialize theme from localStorage when component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme: ThemeMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <StyledThemeProvider theme={darkTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme context
export const useTheme = () => useContext(ThemeContext);
