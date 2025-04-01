/**
 * Format a Date object as HH:MM
 * @param {Date} date - date to format
 * @returns {string} - formatted time string
 */
export const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Format seconds as MM:SS
 * @param {number} seconds - seconds to format
 * @returns {string} - formatted time string
 */
export const formatTimerDisplay = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculate progress percentage
 * @param {number} maxTime - maximum time in seconds
 * @param {number} timeRemaining - time remaining in seconds
 * @returns {number} - progress percentage (0-100)
 */
export const calculateProgress = (maxTime, timeRemaining) => {
  return ((maxTime - timeRemaining) / maxTime) * 100;
};
