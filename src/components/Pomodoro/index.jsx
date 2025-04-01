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
  const audioRef = useRef(null);
  
  // Initialize audio for notifications
  useEffect(() => {
    audioRef.current = new Audio("https://cdn.freesound.org/previews/414/414346_5121236-lq.mp3");
    audioRef.current.volume = 0.3;
    return () => {
      audioRef.current = null;
    };
  }, []);
  
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
      
      // Play completion sound
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Could not play notification sound"));
      }
      
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
      // Play completion sound
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Could not play notification sound"));
      }
      
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
  
  // Calculate remaining focus sessions before long break
  const sessionsUntilLongBreak = DEFAULT_SESSIONS_BEFORE_LONG_BREAK - (sessionCount % DEFAULT_SESSIONS_BEFORE_LONG_BREAK);
  
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
          {timerMode === 'work' && sessionsUntilLongBreak > 0 && (
            <span> | Long break in: {sessionsUntilLongBreak}</span>
          )}
        </div>
      </div>
    </Window>
  );
};

export default Pomodoro;
