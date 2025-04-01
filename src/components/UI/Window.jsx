import React from 'react';

/**
 * Window component - used as a container for all panels
 */
const Window = ({ title, children }) => {
  return (
    <div className="window">
      <div className="window-header">
        <div className="window-title">{title}</div>
        <div className="window-controls">
          <div className="window-button"></div>
          <div className="window-button"></div>
          <div className="window-button"></div>
        </div>
      </div>
      
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};

export default Window;
