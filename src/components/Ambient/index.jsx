import React from 'react';
import Window from '../UI/Window';
import AmbientButton from './AmbientButton';

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
          className="add-btn" 
          onClick={() => openAddModal('sound')}
          title="Add new ambient sound"
        >
          +
        </button>
        {/* Add an invisible element to ensure proper wrapping when odd number of buttons */}
        <div className="flex-spacer"></div>
      </div>
      
      <h3>Manage</h3>
      <div className="manage-controls">
        <button className="manage-btn" onClick={() => openAddModal('station')}>
          Add Station
        </button>
        <button className="manage-btn" onClick={() => openAddModal('manage')}>
          Manage Library
        </button>
      </div>
    </Window>
  );
};

export default Ambient;
