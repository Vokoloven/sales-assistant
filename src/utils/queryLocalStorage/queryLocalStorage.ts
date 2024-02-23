type TSetLocalStorage<K, T> = (key: K, value: T) => void;
type TGetLocalStorage<K, T> = (key: K) => T | null;
type TRemoveLocalStorage<K> = (key: K) => void;

export const queryLocalStorage = <K extends string, T>() => {
  const setLocalStorage: TSetLocalStorage<K, T> = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocalStorage: TGetLocalStorage<K, T> = (key: K): T | null => {
    const value = localStorage.getItem(key);

    if (value) {
      try {
        const parsedValue = JSON.parse(value) as T;
        return parsedValue;
      } catch (error) {
        console.error("Error parsing value from local storage:", error);
        return null;
      }
    }

    return null;
  };

  const removeLocalStorage: TRemoveLocalStorage<K> = (key) => {
    localStorage.removeItem(key);
  };

  return {setLocalStorage, getLocalStorage, removeLocalStorage};
};
