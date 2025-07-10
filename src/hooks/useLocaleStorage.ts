import { useState } from "react";

/**
 * A strongly typed custom hook for localStorage access.
 * @param key The localStorage key to use.
 * @param initialValue The initial value if nothing is found.
 * @returns A tuple: [setValue, removeValue, getStoredValue]
 */
function useLocalestorage<T>(
  key: string,
  initialValue: T
): [(value: T) => void, () => void, () => T] {
  // Reads value from localStorage or returns the initial value
  const getStoredValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error getting item from localStorage for key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Save new value to state and localStorage
  const setValue = (value: T): void => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage for key "${key}":`, error);
    }
  };

  // Remove value from localStorage and reset state
  const removeValue = (): void => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [setValue, removeValue, getStoredValue];
}

export default useLocalestorage;
