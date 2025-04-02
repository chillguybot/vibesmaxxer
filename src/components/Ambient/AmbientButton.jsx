import React from 'react';

const AmbientButton = ({ sound, toggleAmbientSound }) => {
  return (
    <button 
      className={`btn btn-secondary ${sound.active ? 'active' : ''}`} 
      onClick={() => toggleAmbientSound(sound.id)}
    >
      {sound.name}
    </button>
  );
};

export default AmbientButton;
