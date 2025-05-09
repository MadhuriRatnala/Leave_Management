import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const theme = {
    colors: {
      primary: darkMode ? 'rgb(147, 51, 234)' : 'rgb(126, 34, 206)', // purple-600/500
      secondary: darkMode ? 'rgb(88, 28, 135)' : 'rgb(107, 33, 168)', // purple-800/700
      background: darkMode ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)', // gray-900/white
      text: darkMode ? 'rgb(243, 244, 246)' : 'rgb(17, 24, 39)', // gray-100/900
      accent: darkMode ? 'rgb(192, 132, 252)' : 'rgb(168, 85, 247)', // purple-400/500
    },
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};