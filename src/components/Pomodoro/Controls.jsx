import React from 'react';

const Controls = ({ timerActive, toggleTimer, resetTimer, switchTimerMode }) => {
  return (
    <div className="pomodoro-controls">
      <button 
        className="btn btn-primary"
        onClick={toggleTimer}
      >
        <span className="btn-icon-left">{timerActive ? '⏸️' : '▶️'}</span>
        {timerActive ? 'PAUSE' : 'START'}
      </button>
      
      <button 
        className="btn btn-primary"
        onClick={resetTimer}
      >
        <span className="btn-icon-left">🔄</span>
        RESET
      </button>
      
      <button 
        className="btn btn-primary"
        onClick={switchTimerMode}
      >
        <span className="btn-icon-left">⏭️</span>
        SKIP
      </button>
    </div>
  );
};

export default Controls;
