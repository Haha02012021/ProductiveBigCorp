import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.screen.width <= 1000 ? setIsMobile(true) : setIsMobile(false);
  }, [window.screen.width]);

  function detectWindowSize() {
    window.innerWidth <= 1000 ? setIsMobile(true) : setIsMobile(false);
  }
  window.onresize = detectWindowSize;
  return (
    <ThemeContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </ThemeContext.Provider>
  );
}
