// src/pages/_app.tsx
import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/ThemeContext";
import GlobalStyles from "@/styles/GlobalStyles";
import theme from "@/styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <GlobalStyles theme={theme} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
