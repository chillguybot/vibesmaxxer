/**
 * Load data from localStorage
 * @param {string} key - localStorage key
 * @param {any} defaultValue - default value to return if localStorage is empty
 * @returns {any} - parsed data or default value
 */
export const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsedData = JSON.parse(saved);
      // Filter out Jazz Hop Café if it's still in localStorage (for stations)
      if (key === 'lofiStations') {
        return parsedData.filter(station => station.id !== 'jazzhop');
      }
      return parsedData;
    }
    return defaultValue;
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e);
    return defaultValue;
  }
};

/**
 * Save data to localStorage
 * @param {string} key - localStorage key
 * @param {any} data - data to save
 */
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
};
