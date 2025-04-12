import { useEffect, useState } from 'react';

type Props<T> = {
  method: 'get' | 'set';
  key: string;
  value: T;
  defaultValue: T;
};

export default function useLocalStorage<T>(
  props: Props<T>
): [T | null, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T | null>(null);

  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(props.key, JSON.stringify(value));
  };

  useEffect(() => {
    if (props.method === 'get') {
      const value = localStorage.getItem(props.key);

      if (!value) {
        setStoredValue(props.defaultValue);
      } else {
        setStoredValue(JSON.parse(value));
      }
    }
  }, [props.key]);

  if (props.method === 'set') {
    setValue(props.value);
  }

  return [storedValue, setValue];
}
