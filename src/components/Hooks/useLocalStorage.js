import { useState } from "react";

export function useLocalStorage(key, initValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : JSON.parse(initValue);
    } catch (error) {
      return initValue;
    }
  });

  const setValue = (value) => {
    try {
      setStored(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [stored, setValue]; 
}
