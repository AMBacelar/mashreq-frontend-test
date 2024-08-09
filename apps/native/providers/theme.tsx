import React, { createContext, useState, useContext, ReactNode } from 'react';

export const validCountries = [
  {
    name: 'United Kingdom',
    code: 'UK',
  },
  {
    name: 'United Arab Emirates',
    code: 'UAE',
  },
  {
    name: 'India',
    code: 'India',
  },
  {
    name: 'Portugal',
    code: 'Portugal',
  }
] as const;

export const countries = validCountries.map(country => country.name);
type Country = typeof validCountries[number]['code'];

interface ThemeContextType {
  country: Country;
  theme: string;
  setCountry: (country: Country) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const getThemeByCountry = (country: Country): string => {
  switch (country) {
    case 'UK':
      return 'British Theme';
    case 'UAE':
      return 'Emirati Theme';
    case 'India':
      return 'Indian Theme';
    case 'Portugal':
      return 'Portuguese Theme';
    default:
      return 'Default Theme';
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [country, setCountry] = useState<Country>('UK');
  const [theme, setTheme] = useState<string>(getThemeByCountry('UK'));

  const handleSetCountry = (newCountry: Country) => {
    setCountry(newCountry);
    setTheme(getThemeByCountry(newCountry));
  };

  return (
    <ThemeContext.Provider value={{ country, theme, setCountry: handleSetCountry }}>
      {children}
    </ThemeContext.Provider>
  );
};
