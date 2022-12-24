import { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <ThemeContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </ThemeContext.Provider>
  );
}
