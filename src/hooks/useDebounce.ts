import { useEffect, useState } from 'react';

export const useDebounce = (input: string, time: number = 500) => {
  const [debaunceValue, setDebounceValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, time]);

  return { debaunceValue };
};
