import {useEffect, useState} from "react";

export const useDebounceValue = <T>(value: T, delay: number = 500) => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(setTimeoutId);
  }, [JSON.stringify(value)]);

  return debounced;
};
