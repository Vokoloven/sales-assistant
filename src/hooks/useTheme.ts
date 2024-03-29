import {useState, useEffect} from "react";

import {localStorageService} from "../redux/service/localStorageService";
import {FilterKeys} from "../utils/types/filterKeys";

export const ThemeConfig = {
  Name: "theme",
  Light: "light",
  Dark: "dark",
} as const;

export type ThemeMode = FilterKeys<typeof ThemeConfig, "light" | "dark">;

const {Dark, Light, Name} = ThemeConfig;
const html = document.querySelector("html") as HTMLElement;

const {getLocalStorage, setLocalStorage} = localStorageService<typeof Name, ThemeMode>();

export const getTheme = () => {
  const theme = html.dataset[Name] as ThemeMode;

  return theme;
};

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const themeLocalStorage = getLocalStorage(Name);

    if (themeLocalStorage === Light || themeLocalStorage === Dark) {
      return themeLocalStorage;
    } else {
      return Light;
    }
  });

  const themeSwitcher = () => {
    if (theme) {
      setTheme((prevTheme) => {
        const newTheme = prevTheme === Light ? Dark : Light;

        setLocalStorage(Name, newTheme);

        html.dataset[Name] = newTheme;
        return newTheme;
      });
    }
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === Name) {
        themeSwitcher();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    html.dataset[Name] = theme;
  }, []);

  return {themeSwitcher};
};
