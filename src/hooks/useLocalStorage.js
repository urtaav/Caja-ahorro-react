import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Obtener los datos del localStorage, o usar el valor inicial si no existe
  const [storedValue, setStoredValue] = useState(() => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }
    return initialValue;
  });

  // Función para actualizar el valor en el state y en el localStorage
  const setValue = (value) => {
    setStoredValue(value);

    // Guardar el valor en el localStorage
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
