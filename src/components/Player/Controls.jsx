import React from 'react';

const Controls = ({ isPlaying, togglePlay, changeStation, volume, setVolume }) => {
  return (
    <div className="controls-container">
      <div className="controls">
        <button className="control-btn" onClick={() => changeStation(-1)}>
          <div className="pixel-icon prev"></div>
        </button>
        
        <button className="control-btn play-btn" onClick={togglePlay}>
          {isPlaying ? (
            <div className="pixel-icon pause"></div>
          ) : (
            <div className="pixel-icon play"></div>
          )}
        </button>
        
        <button className="control-btn" onClick={() => changeStation(1)}>
          <div className="pixel-icon next"></div>
        </button>
      </div>
      
      <div className="volume-control">
        <div className="volume-icon"></div>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default Controls;
