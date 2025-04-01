import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/localStorage';

const VibeGoal = ({ vibeGoal, setVibeGoal, vibeColor, setVibeColor }) => {
  const [editingVibe, setEditingVibe] = useState(!vibeGoal);
  
  // Handle vibe input
  const handleVibeSubmit = (e) => {
    e.preventDefault();
    setEditingVibe(false);
  };
  
  return (
    <div className="vibe-goal-container" style={{ borderColor: vibeColor }}>
      <h2 className="vibe-title" style={{ color: vibeColor }}>Today's Vibe</h2>
      {editingVibe ? (
        <form onSubmit={handleVibeSubmit} className="vibe-form">
          <label htmlFor="vibe-input" style={{ color: vibeColor }}>What vibe will you be maxxing today?</label>
          <div className="vibe-input-group">
            <input
              id="vibe-input"
              type="text"
              value={vibeGoal}
              onChange={(e) => setVibeGoal(e.target.value)}
              placeholder="Enter your vibe..."
              className="vibe-input"
              style={{ borderColor: vibeColor }}
            />
            <input
              type="color"
              value={vibeColor}
              onChange={(e) => setVibeColor(e.target.value)}
              className="vibe-color-picker"
              title="Choose vibe color"
            />
            <button 
              type="submit" 
              className="vibe-submit-btn" 
              style={{ backgroundColor: vibeColor, color: '#181b30' }}
            >
              Set Vibe
            </button>
          </div>
        </form>
      ) : (
        <div className="vibe-display">
          <span>Maxxing: <strong style={{ color: vibeColor }}>{vibeGoal}</strong></span>
          <button 
            onClick={() => setEditingVibe(true)} 
            className="vibe-edit-btn"
            style={{ borderColor: vibeColor, color: vibeColor }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default VibeGoal;
