import React from 'react';
import { formatTimerDisplay, calculateProgress } from '../../utils/timeUtils';

const Timer = ({ timerMode, timeRemaining, maxTime, vibeColor }) => {
  // Determine timer progress bar color based on mode and vibe color
  const getProgressBarColor = () => {
    if (timerMode === 'work') {
      return vibeColor || 'var(--accent-color)';
    } else if (timerMode === 'break') {
      return 'var(--blue)';
    } else {
      return 'var(--purple)';
    }
  };

  // Determine mode label background color
  const getModeColor = () => {
    if (timerMode === 'work') {
      return vibeColor || 'var(--accent-color)';
    } else if (timerMode === 'break') {
      return 'var(--blue)';
    } else {
      return 'var(--purple)';
    }
  };

  return (
    <div className="timer-display">
      <div className="timer-mode-indicator">
        <span 
          className={`mode-label ${timerMode}`}
          style={{ backgroundColor: getModeColor() }}
        >
          {timerMode === 'work' ? 'FOCUS' : timerMode === 'break' ? 'SHORT BREAK' : 'LONG BREAK'}
        </span>
      </div>
      
      <div className="timer-progress-container">
        <div 
          className="timer-progress-bar" 
          style={{ 
            width: `${calculateProgress(maxTime, timeRemaining)}%`,
            backgroundColor: getProgressBarColor()
          }}
        ></div>
      </div>
      <div className="timer-time">{formatTimerDisplay(timeRemaining)}</div>
    </div>
  );
};

export default Timer;
