import {useState, useEffect, useRef} from 'react';

const ThemeConfig = {
  Name: 'theme',
  Light: 'light',
  Dark: 'dark',
} as const;

type ThemeMode = {
  [K in keyof typeof ThemeConfig]: (typeof ThemeConfig)[K] extends 'light' | 'dark' ? (typeof ThemeConfig)[K] : never;
}[keyof typeof ThemeConfig];

const {Dark, Light, Name} = ThemeConfig;

const html = document.querySelector('html')!;

export const getTheme = () => {
  const theme = html.dataset[Name] as ThemeMode;
  return theme;
};

export const useTheme = () => {
  const storageTheme = useRef<ThemeMode | null>(localStorage.getItem(Name) as ThemeMode);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (!storageTheme.current) {
      return Light;
    } else {
      return storageTheme.current!;
    }
  });

  const themeSwitcher = () => {
    if (theme === Light) {
      setTheme(Dark);
    } else {
      setTheme(Light);
    }
  };

  useEffect(() => {
    html.dataset[Name] = theme;

    if (storageTheme.current === theme) {
      return;
    }

    localStorage.setItem(Name, JSON.stringify(theme) as ThemeMode);
  }, [theme]);

  return {themeSwitcher};
};
