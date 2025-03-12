import { useEffect, useState } from 'react';

/**
 * Custom hook for debouncing a value.
 * @param value The input value to debounce
 * @param delay Delay in milliseconds before updating debounced value
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
