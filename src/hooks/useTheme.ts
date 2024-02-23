import {useState, useEffect} from "react";

import {queryLocalStorage} from "utils/queryLocalStorage/queryLocalStorage";

export const ThemeConfig = {
  Name: "theme",
  Light: "light",
  Dark: "dark",
} as const;

type ThemeMode = {
  [K in keyof typeof ThemeConfig]: (typeof ThemeConfig)[K] extends "light" | "dark" ? (typeof ThemeConfig)[K] : never;
}[keyof typeof ThemeConfig];

const {Dark, Light, Name} = ThemeConfig;
const html = document.querySelector("html") as HTMLElement;

const {getLocalStorage, setLocalStorage} = queryLocalStorage<typeof Name, ThemeMode>();

export const getTheme = () => {
  const theme = html.dataset[Name] as ThemeMode;

  return theme;
};

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const themeLocalStorage = getLocalStorage(Name);

    if (themeLocalStorage) {
      return themeLocalStorage;
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
    setLocalStorage(Name, theme);
  }, [theme]);

  return {themeSwitcher};
};
