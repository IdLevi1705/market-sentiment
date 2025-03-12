// src/types/theme.ts
export interface ThemeType {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    light: string;
    dark: string;
    white: string;
    black: string;
    great: string;
    good: string;
    neutral: string;
    bad: string;
    terrible: string;
    background: string;
    cardBackground: string;
    border: string;
    text: {
      primary: string;
      secondary: string;
      light: string;
    };
  };
  fonts: {
    body: string;
    heading: string;
    monospace: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
  };
  fontWeights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeights: {
    tight: number;
    normal: number;
    loose: number;
  };
  space: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
  };
  radii: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    highlight: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
  };
}
