import {useState, useEffect} from 'react';

export const ThemeConfig = {
  Name: 'theme',
  Light: 'light',
  Dark: 'dark',
} as const;

type ThemeMode = {
  [K in keyof typeof ThemeConfig]: (typeof ThemeConfig)[K] extends 'light' | 'dark' ? (typeof ThemeConfig)[K] : never;
}[keyof typeof ThemeConfig];

const {Dark, Light, Name} = ThemeConfig;
const html = document.querySelector('html') as HTMLElement;

export const getTheme = () => {
  const theme = html.dataset[Name] as ThemeMode;

  return theme;
};

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const localStorageTheme = localStorage.getItem(Name);

    if (localStorageTheme) {
      const theme = JSON.parse(localStorageTheme) as ThemeMode;

      return theme;
    } else {
      return Light;
    }
  });

  const themeSwitcher = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === Light ? Dark : Light;

      html.dataset[Name] = newTheme;
      return newTheme;
    });
  };

  useEffect(() => {
    html.dataset[Name] = theme;
  }, []);

  useEffect(() => {
    localStorage.setItem(Name, JSON.stringify(theme) as ThemeMode);
  }, [theme]);

  return {themeSwitcher};
};
