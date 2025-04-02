import React from 'react';

const StationInfo = ({ station }) => {
  return (
    <div className="station-info">
      <h2>Now Playing</h2>
      <h3>{station.name}</h3>
    </div>
  );
};

export default StationInfo;
