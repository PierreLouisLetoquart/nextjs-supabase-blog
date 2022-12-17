import { createContext } from 'react';
import { Theme } from '../@types';

interface Context {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<Context>({
  theme: 'light',
  toggleTheme: () => {}
});