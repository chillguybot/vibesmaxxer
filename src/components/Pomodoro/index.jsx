import React, { useState, useEffect, useRef } from 'react';
import { 
  DEFAULT_WORK_TIME,
  DEFAULT_BREAK_TIME,
  DEFAULT_LONG_BREAK_TIME,
  DEFAULT_SESSIONS_BEFORE_LONG_BREAK
} from '../../utils/constants';
import Window from '../UI/Window';
import Timer from './Timer';
import Controls from './Controls';

const Pomodoro = ({ vibeGoal, vibeColor }) => {
  // Timer state
  const [timerActive, setTimerActive] = useState(false);
  const [timerMode, setTimerMode] = useState('work'); // 'work' or 'break' or 'longBreak'
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_WORK_TIME);
  const [maxTime, setMaxTime] = useState(DEFAULT_WORK_TIME);
  const [sessionCount, setSessionCount] = useState(0);
  const timerRef = useRef(null);
  
  // Function to start/pause the timer
  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };
  
  // Function to reset the timer
  const resetTimer = () => {
    setTimerActive(false);
    
    if (timerMode === 'work') {
      setTimeRemaining(DEFAULT_WORK_TIME);
      setMaxTime(DEFAULT_WORK_TIME);
    } else if (timerMode === 'break') {
      setTimeRemaining(DEFAULT_BREAK_TIME);
      setMaxTime(DEFAULT_BREAK_TIME);
    } else {
      setTimeRemaining(DEFAULT_LONG_BREAK_TIME);
      setMaxTime(DEFAULT_LONG_BREAK_TIME);
    }
  };
  
  // Function to switch between work and break modes
  const switchTimerMode = () => {
    setTimerActive(false);
    
    if (timerMode === 'work') {
      // Completed a work session
      const newSessionCount = sessionCount + 1;
      setSessionCount(newSessionCount);
      
      // Check if we should have a long break
      if (newSessionCount % DEFAULT_SESSIONS_BEFORE_LONG_BREAK === 0) {
        setTimerMode('longBreak');
        setTimeRemaining(DEFAULT_LONG_BREAK_TIME);
        setMaxTime(DEFAULT_LONG_BREAK_TIME);
      } else {
        setTimerMode('break');
        setTimeRemaining(DEFAULT_BREAK_TIME);
        setMaxTime(DEFAULT_BREAK_TIME);
      }
    } else {
      // Completed a break, switching back to work
      setTimerMode('work');
      setTimeRemaining(DEFAULT_WORK_TIME);
      setMaxTime(DEFAULT_WORK_TIME);
    }
  };
  
  // Timer countdown effect
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Timer finished
            clearInterval(timerRef.current);
            switchTimerMode();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerActive]);
  
  return (
    <Window title="Pomodoro Vibe Timer">
      <div className="pomodoro-container">
        {vibeGoal && (
          <div className="pomodoro-vibe">
            <span>Maxxing: <strong style={{ color: vibeColor }}>{vibeGoal}</strong></span>
          </div>
        )}
        
        <Timer 
          timerMode={timerMode}
          timeRemaining={timeRemaining}
          maxTime={maxTime}
          vibeColor={vibeColor}
        />
        
        <Controls 
          timerActive={timerActive}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
          switchTimerMode={switchTimerMode}
          vibeColor={vibeColor}
        />
        
        <div className="session-counter">
          <span>Sessions completed: {sessionCount}</span>
        </div>
      </div>
    </Window>
  );
};

export default Pomodoro;
