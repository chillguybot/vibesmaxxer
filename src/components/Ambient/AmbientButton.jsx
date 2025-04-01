import React from 'react';

const AmbientButton = ({ sound, toggleAmbientSound }) => {
  return (
    <button 
      className={`ambient-btn ${sound.active ? 'active' : ''}`} 
      onClick={() => toggleAmbientSound(sound.id)}
    >
      {sound.name}
    </button>
  );
};

export default AmbientButton;
