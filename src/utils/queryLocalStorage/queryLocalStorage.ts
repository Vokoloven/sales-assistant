type TSetLocalStorage<K, T> = (key: K, value: T) => void;
type TGetLocalStorage<K, T> = (key: K) => T | null;

export const queryLocalStorage = <K extends string, T>() => {
  const setLocalStorage: TSetLocalStorage<K, T> = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getLocalStorage: TGetLocalStorage<K, T> = (key: K): T | null => {
    const value = localStorage.getItem(key);

    if (value) {
      const parsedValue = JSON.parse(value) as T;
      return parsedValue;
    }

    return null;
  };

  return {setLocalStorage, getLocalStorage};
};
