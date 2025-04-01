import React from 'react';

const Controls = ({ timerActive, toggleTimer, resetTimer, switchTimerMode, vibeColor }) => {
  return (
    <div className="pomodoro-controls">
      <button 
        className="pomodoro-btn" 
        onClick={toggleTimer}
        style={{ borderColor: vibeColor, color: vibeColor }}
      >
        <span className="btn-icon">{timerActive ? '⏸️' : '▶️'}</span>
        {timerActive ? 'PAUSE' : 'START'}
      </button>
      
      <button 
        className="pomodoro-btn" 
        onClick={resetTimer}
        style={{ borderColor: vibeColor, color: vibeColor }}
      >
        <span className="btn-icon">🔄</span>
        RESET
      </button>
      
      <button 
        className="pomodoro-btn" 
        onClick={switchTimerMode}
        style={{ borderColor: vibeColor, color: vibeColor }}
      >
        <span className="btn-icon">⏭️</span>
        SKIP
      </button>
    </div>
  );
};

export default Controls;
