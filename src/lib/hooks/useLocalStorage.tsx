import { useEffect, useState } from 'react';

type Props<T> = {
  key: string;
  defaultValue: T;
} & (
  | { method: 'get' }
  | { method: 'set'; value: T }
);

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
        setValue(props.defaultValue);
      } else {
        setValue(JSON.parse(value));
      }
    }
  }, [props.key]);

  if (props.method === 'set') {
    setValue(props.value);
  }

  return [storedValue, setValue];
}
