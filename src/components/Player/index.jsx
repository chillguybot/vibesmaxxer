import React from 'react';
import Window from '../UI/Window';
import PixelScene from './PixelScene';
import StationInfo from './StationInfo';
import Controls from './Controls';

const Player = ({ 
  station, 
  isPlaying, 
  togglePlay, 
  changeStation, 
  volume, 
  setVolume, 
  time,
  ambientSounds = []
}) => {
  return (
    <Window title="Chill Lofi Radio">
      <PixelScene time={time} ambientSounds={ambientSounds} />
      
      <StationInfo station={station} />
      
      <Controls 
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        changeStation={changeStation}
        volume={volume}
        setVolume={setVolume}
      />
    </Window>
  );
};

export default Player;
