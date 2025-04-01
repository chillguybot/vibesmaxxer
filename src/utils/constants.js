// Default radio stations - removed color property
export const DEFAULT_RADIO_STATIONS = [
  {
    id: 'lofi-girl',
    name: "Lofi Girl",
    url: "https://play.streamafrica.net/lofiradio"
  },
  {
    id: 'chillhop',
    name: "Chillhop",
    url: "http://stream.zeno.fm/0r0xa792kwzuv"
  },
  {
    id: 'box-lofi',
    name: "Box Lofi",
    url: "http://stream.zeno.fm/f3wvbbqmdg8uv"
  }
];

// Default ambient sounds
export const DEFAULT_AMBIENT_SOUNDS = [
  {
    id: 'rain',
    name: "Rain",
    url: "https://cdn.freesound.org/previews/346/346170_5858296-lq.mp3",
    active: false
  },
  {
    id: 'cafe',
    name: "Café",
    url: "https://cdn.freesound.org/previews/323/323683_5260872-lq.mp3",
    active: false
  }
];

// Color palette for vibe selection
export const COLOR_PALETTE = [
  "#e9c46a", // Yellow (original accent)
  "#2a9d8f", // Teal
  "#e76f51", // Orange
  "#f4a261", // Light Orange
  "#ff6b6b", // Red
  "#5aa9e6", // Light Blue
  "#7269ef", // Purple
  "#7fb069"  // Green
];

// Default pomodoro settings
export const DEFAULT_WORK_TIME = 25 * 60; // 25 minutes in seconds
export const DEFAULT_BREAK_TIME = 5 * 60; // 5 minutes in seconds
export const DEFAULT_LONG_BREAK_TIME = 15 * 60; // 15 minutes in seconds
export const DEFAULT_SESSIONS_BEFORE_LONG_BREAK = 4;

// Function to determine if a color is dark
export const isColorDark = (hexColor) => {
  if (!hexColor || !hexColor.startsWith('#')) return true;
  try {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    // Calculate relative luminance
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
  } catch (e) {
    console.error("Error processing color:", e);
    return false;
  }
};
