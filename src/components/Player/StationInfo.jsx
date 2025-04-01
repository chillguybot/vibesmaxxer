import React from 'react';
import { isColorDark } from '../../utils/constants.js';

const StationInfo = ({ station, vibeColor }) => {
  return (
    <div className="station-info">
      <h2>Now Playing</h2>
      <h3 style={{ 
        color: vibeColor,
        textShadow: `0 0 8px ${vibeColor}`
      }}>
        {station.name}
      </h3>
    </div>
  );
};

export default StationInfo;
