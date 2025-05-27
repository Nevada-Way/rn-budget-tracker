// contexts/ThemeContext.tsx
import React, { createContext, ReactNode, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  // You could add a setTheme function here later if you want to toggle themes
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useCustomTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};

interface CustomThemeProviderProps {
  children: ReactNode;
  forcedTheme: Theme; // Accept the theme to be forced
}

export const CustomThemeProvider = ({ children, forcedTheme }: CustomThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={{ theme: forcedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};