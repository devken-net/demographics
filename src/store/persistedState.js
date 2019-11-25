import { useEffect, useState } from "react";

/**
 * This will saves React States to LocalStorage.
 * TODO: Implement hashed `key` for security purposes.
 */
const usePersistedState = (key, defaultValue) => {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export { usePersistedState };