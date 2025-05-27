// contexts/ThemeContext.tsx
import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
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
  const [theme, setTheme] = useState<Theme>(forcedTheme);

  // Optional: Update theme if forcedTheme prop changes externally after initial mount
  useEffect(() => {
    setTheme(forcedTheme);
  }, [forcedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};