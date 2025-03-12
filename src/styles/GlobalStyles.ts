import { createGlobalStyle } from "styled-components";
import { ThemeType } from "@/types/theme";

const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html,
  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.tight};
    margin-bottom: ${({ theme }) => theme.space[4]};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  h1 {
    font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  }
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  }
  
  h4 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  
  h5 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  
  h6 {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.space[4]};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  button, input, textarea, select {
    font-family: ${({ theme }) => theme.fonts.body};
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default GlobalStyles;
