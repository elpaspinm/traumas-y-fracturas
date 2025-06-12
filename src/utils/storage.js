export const getFromStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const addToStorage = (key, value) => {
  try {
    const current = getFromStorage(key) || [];
    if (Array.isArray(current)) {
      saveToStorage(key, [...current, value]);
    } else {
      // Si current no es un array, inicializarlo como un array con el nuevo valor
      saveToStorage(key, [value]);
    }
  } catch (error) {
    console.error('Error adding to localStorage:', error);
  }
};

// DONE