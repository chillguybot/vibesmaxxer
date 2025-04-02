import React, { useState } from 'react';
import { COLOR_PALETTE } from '../../utils/constants.js';

const VibeGoal = ({ vibeGoal, setVibeGoal, vibeColor, setVibeColor }) => {
  const [editingVibe, setEditingVibe] = useState(!vibeGoal);
  const [showColorPalette, setShowColorPalette] = useState(false);
  
  // Handle vibe input
  const handleVibeSubmit = (e) => {
    e.preventDefault();
    setEditingVibe(false);
    setShowColorPalette(false);
  };
  
  // Handle color selection
  const handleColorSelect = (color) => {
    setVibeColor(color);
    setShowColorPalette(false);
  };
  
  return (
    <div className="vibe-goal-container">
      <h2 className="vibe-title">Today's Vibe</h2>
      {editingVibe ? (
        <form onSubmit={handleVibeSubmit} className="vibe-form">
          <label htmlFor="vibe-input">What vibe will you be maxxing today?</label>
          <div className="vibe-input-group">
            <input
              id="vibe-input"
              type="text"
              value={vibeGoal}
              onChange={(e) => setVibeGoal(e.target.value)}
              placeholder="Enter your vibe..."
              className="vibe-input"
            />
            <div className="color-picker-container">
              <div 
                className="vibe-color-display"
                style={{ backgroundColor: vibeColor }}
                onClick={() => setShowColorPalette(!showColorPalette)}
              ></div>
              
              {showColorPalette && (
                <div className="color-palette">
                  {COLOR_PALETTE.map(color => (
                    <div 
                      key={color}
                      className="color-option"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                    ></div>
                  ))}
                  <input
                    type="color"
                    value={vibeColor}
                    onChange={(e) => setVibeColor(e.target.value)}
                    className="custom-color-picker"
                    title="Choose custom color"
                  />
                </div>
              )}
            </div>
            <button 
              type="submit" 
              className="btn btn-primary filled set-vibe-btn" 
            >
              Set Vibe
            </button>
          </div>
        </form>
      ) : (
        <div className="vibe-display">
          <span>Maxxing: <strong>{vibeGoal}</strong></span>
          <button 
            onClick={() => setEditingVibe(true)} 
            className="btn btn-secondary"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default VibeGoal;
