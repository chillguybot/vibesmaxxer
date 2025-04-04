import React from 'react';
import { formatTimerDisplay, calculateProgress } from '../../utils/timeUtils.js';

const Timer = ({ timerMode, timeRemaining, maxTime, vibeColor }) => {
  // Calculate percentage for display purposes
  const progressPercentage = calculateProgress(maxTime, timeRemaining);

  // Determine timer progress bar color based on mode
  const getProgressBarColor = () => {
    if (timerMode === 'work') {
      return vibeColor;
    } else if (timerMode === 'break') {
      return 'var(--blue)';
    } else {
      return 'var(--purple)';
    }
  };

  // Display appropriate icon based on timer mode
  const renderModeIcon = () => {
    if (timerMode === 'work') {
      return (
        <div className="mode-icon work-icon">
          <div className="pixel-laptop">
            <div className="laptop-screen"></div>
            <div className="laptop-keyboard"></div>
          </div>
        </div>
      );
    } else if (timerMode === 'break') {
      return (
        <div className="mode-icon break-icon">
          <div className="pixel-coffee">
            <div className="coffee-cup"></div>
            <div className="coffee-steam"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mode-icon long-break-icon">
          <div className="pixel-bed">
            <div className="bed-frame"></div>
            <div className="bed-pillow"></div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="timer-display">
      <div className="timer-header">
        {renderModeIcon()}
        <span className={`mode-label ${timerMode}`}>
          {timerMode === 'work' ? 'FOCUS' : timerMode === 'break' ? 'SHORT BREAK' : 'LONG BREAK'}
        </span>
      </div>
      
      <div className="timer-time-wrapper">
        <div className="timer-time">{formatTimerDisplay(timeRemaining)}</div>
        <div className="timer-percentage">{Math.round(progressPercentage)}%</div>
      </div>
      
      <div className="timer-progress-container">
        <div 
          className="timer-progress-bar" 
          style={{ 
            width: `${progressPercentage}%`,
            backgroundColor: getProgressBarColor()
          }}
        ></div>
      </div>
      
      <div className="timer-tracks">
        {[...Array(10)].map((_, index) => (
          <div 
            key={index} 
            className={`timer-track ${index < progressPercentage/10 ? 'active' : ''}`}
            style={{ 
              backgroundColor: index < progressPercentage/10 ? getProgressBarColor() : undefined,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Timer;
