import React from 'react';
import Window from '../UI/Window.jsx';
import AmbientButton from './AmbientButton.jsx';

const Ambient = ({ 
  ambientSounds, 
  toggleAmbientSound, 
  openAddModal
}) => {
  return (
    <Window title="Controls">
      <h3>Ambient Sounds</h3>
      <div className="ambient-controls">
        {ambientSounds.map(sound => (
          <AmbientButton 
            key={sound.id}
            sound={sound}
            toggleAmbientSound={toggleAmbientSound}
          />
        ))}
        <button 
          className="btn btn-primary filled" 
          onClick={() => openAddModal('sound')}
          title="Add new ambient sound"
          style={{fontSize: '24px', padding: '5px 10px'}}
        >
          +
        </button>
        <div className="flex-spacer"></div>
      </div>
      
      <h3>Manage</h3>
      <div className="manage-controls">
        <button 
          className="btn btn-secondary" 
          onClick={() => openAddModal('station')}
        >
          Add Station
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => openAddModal('manage')}
        >
          Manage Library
        </button>
      </div>
    </Window>
  );
};

export default Ambient;
