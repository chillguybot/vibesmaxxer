import React from 'react';

const AmbientButton = ({ sound, toggleAmbientSound, vibeColor }) => {
  return (
    <button 
      className={`ambient-btn ${sound.active ? 'active' : ''}`} 
      onClick={() => toggleAmbientSound(sound.id)}
      style={{ 
        borderColor: vibeColor,
        ...(sound.active && { backgroundColor: vibeColor, color: '#181b30' })
      }}
    >
      {sound.name}
    </button>
  );
};

export default AmbientButton;
