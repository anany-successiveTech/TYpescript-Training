"use client";

import { useState, useEffect } from "react";

function useLocalestorage<T>(
  key: string,
  initialValue: T
): [(value: T) => void, () => void, T | undefined] {
  const [storedValue, setStoredValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      setStoredValue(item ? (JSON.parse(item) as T) : initialValue);
    } catch (error) {
      console.error(`Error getting item from localStorage for key "${key}":`, error);
      setStoredValue(initialValue);
    }
  }, [key]);

  const setValue = (value: T): void => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage for key "${key}":`, error);
    }
  };

  const removeValue = (): void => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [setValue, removeValue, storedValue];
}

export default useLocalestorage;
