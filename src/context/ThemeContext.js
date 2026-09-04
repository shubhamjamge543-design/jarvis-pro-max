import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext({});

const DARK_THEME = {
  background: '#0a0e27',
  surface: '#1a1f3a',
  surfaceLight: '#2a2f4a',
  primary: '#00d4ff',
  primaryDark: '#0099cc',
  accent: '#ff00ff',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  error: '#ff4444',
  success: '#00ff88',
  warning: '#ffaa00',
  border: '#3a3f5a',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DARK_THEME);

  const toggleTheme = () => {
    // Can add light theme later
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
