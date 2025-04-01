import React from 'react';
import { isColorDark } from '../../utils/constants';

const StationInfo = ({ station }) => {
  return (
    <div className="station-info">
      <h2>Now Playing</h2>
      <h3 style={{ 
        color: isColorDark(station.color) ? '#f0f0f0' : station.color 
      }}>
        {station.name}
      </h3>
    </div>
  );
};

export default StationInfo;
