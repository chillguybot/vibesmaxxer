import React from 'react';
import { PixelCat, PixelPlant } from '../UI/PixelArt';
import { formatTime } from '../../utils/timeUtils';

const PixelScene = ({ time, ambientSounds = [] }) => {
  // Find the rain sound object
  const rainSound = ambientSounds.find(s => s.id === 'rain');
  
  return (
    <div className="pixel-scene">
      <div className="scene-decor">
        <PixelCat />
        <PixelPlant />
      </div>
      
      {/* Ambient overlays */}
      <div className={`ambient-overlay rain-overlay ${rainSound?.active ? 'active' : ''}`}></div>
      
      <div className="digital-clock">{formatTime(time)}</div>
    </div>
  );
};

export default PixelScene;
