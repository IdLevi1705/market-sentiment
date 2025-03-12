// src/components/Layout/ThemeToggle.tsx
import React from "react";
import styled from "styled-components";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #94a3b8; /* Default color in case theme is not available */
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 9999px;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
`;

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const ThemeToggle: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <ThemeToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      {themeMode === "dark" ? <SunIcon /> : <MoonIcon />}
    </ThemeToggleButton>
  );
};

export default ThemeToggle;
