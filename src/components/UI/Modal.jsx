import React from 'react';

const Modal = ({ 
  type, 
  closeModal, 
  newItemName, 
  setNewItemName, 
  newItemUrl, 
  setNewItemUrl, 
  handleAddItem, 
  stations, 
  ambientSounds, 
  removeItem, 
  resetToDefaults,
  vibeColor
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{type === 'manage' ? 'Manage Library' : `Add New ${type === 'station' ? 'Station' : 'Sound'}`}</h2>
        
        {type === 'manage' ? (
          <div className="manage-section">
            <h3>Stations</h3>
            <ul className="manage-list">
              {stations.map(station => (
                <li key={station.id} className="manage-item">
                  <span>{station.name}</span>
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem('station', station.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
              <li>
                <button className="reset-btn" onClick={() => resetToDefaults('station')}>
                  Reset to Defaults
                </button>
              </li>
            </ul>
            
            <h3>Ambient Sounds</h3>
            <ul className="manage-list">
              {ambientSounds.map(sound => (
                <li key={sound.id} className="manage-item">
                  <span>{sound.name}</span>
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem('sound', sound.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
              <li>
                <button className="reset-btn" onClick={() => resetToDefaults('sound')}>
                  Reset to Defaults
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <form className="modal-form" onSubmit={(e) => { e.preventDefault(); handleAddItem(); }}>
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder={`Enter ${type} name`}
                required
              />
            </div>
            
            <div className="form-group">
              <label>URL:</label>
              <input 
                type="url" 
                value={newItemUrl}
                onChange={(e) => setNewItemUrl(e.target.value)}
                placeholder="https://example.com/stream"
                required
              />
            </div>
            
            <div className="modal-actions">
              <button 
                type="submit" 
                className="submit-btn"
                style={{ backgroundColor: vibeColor }}
              >
                Add
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={closeModal}
                style={{ borderColor: vibeColor, color: vibeColor }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        
        {type === 'manage' && (
          <div className="modal-actions">
            <button 
              className="cancel-btn" 
              onClick={closeModal}
              style={{ borderColor: vibeColor, color: vibeColor }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
