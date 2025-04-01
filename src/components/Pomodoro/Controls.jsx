import React from 'react';

const Controls = ({ timerActive, toggleTimer, resetTimer, switchTimerMode, vibeColor }) => {
  return (
    <div className="pomodoro-controls">
      <button 
        className="pomodoro-btn" 
        onClick={toggleTimer}
        style={{ borderColor: vibeColor, color: vibeColor }}
      >
        {timerActive ? 'PAUSE' : 'START'}
      </button>
      
      <button 
        className="pomodoro-btn" 
        onClick={resetTimer}
        style={{ borderColor: vibeColor, color: vibeColor }}
      >
        RESET
      </button>
      
      <button 
        className="pomodoro-btn" 
        onClick={switchTimerMode}
        style={{ borderColor: vibeColor, color: vibeColor }}
      >
        SKIP
      </button>
    </div>
  );
};

export default Controls;
