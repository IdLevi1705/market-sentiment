const theme = {
  colors: {
    primary: "#3B82F6", // Bright blue
    secondary: "#60A5FA", // Light blue
    success: "#10B981", // Green
    danger: "#EF4444", // Red
    warning: "#F59E0B", // Amber
    info: "#3B82F6", // Blue
    light: "#2D3748", // Dark gray (for dark mode)
    dark: "#1A202C", // Very dark gray
    white: "#F7FAFC", // Off-white
    black: "#000000",
    // Sentiment colors
    great: "#10B981", // Green
    good: "#34D399", // Light green
    neutral: "#6B7280", // Gray
    bad: "#F97316", // Orange
    terrible: "#EF4444", // Red
    background: "#0F172A", // Very dark blue
    cardBackground: "#1E293B", // Dark blue-gray
    border: "#334155", // Medium blue-gray
    text: {
      primary: "#F1F5F9", // Light gray/white
      secondary: "#94A3B8", // Medium gray
      light: "#64748B", // Darker gray
    },
  },
  fonts: {
    body: "Inter, system-ui, -apple-system, sans-serif",
    heading: "Inter, system-ui, -apple-system, sans-serif",
    monospace: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    loose: 1.75,
  },
  space: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
  },
  radii: {
    none: "0",
    sm: "0.125rem", // 2px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
    highlight: "0 0 0 3px rgba(59, 130, 246, 0.5)", // For focus states
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

export default theme;
