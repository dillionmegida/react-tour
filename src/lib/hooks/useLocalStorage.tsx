import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../../lib/utils';

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
    setLocalStorage(props.key, value);
  };
  
  useEffect(() => {
    if (props.method === 'get') {
      const value = getLocalStorage<T>(props.key);
      
      if (!value) {
        setValue(props.defaultValue);
      } else {
        setValue(value);
      }
    }
  }, [props.key]);

  if (props.method === 'set') {
    setValue(props.value);
  }

  return [storedValue, setValue];
}
