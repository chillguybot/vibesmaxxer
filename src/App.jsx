// App.jsx
import { useState, useEffect, useRef } from 'react'
import './App.css'
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorage'
import { DEFAULT_RADIO_STATIONS, DEFAULT_AMBIENT_SOUNDS } from './utils/constants'

// Components
import VibeGoal from './components/VibeGoal'
import Player from './components/Player'
import Pomodoro from './components/Pomodoro'
import Ambient from './components/Ambient'
import Modal from './components/UI/Modal'

function App() {
  // State for radio stations
  const [stations, setStations] = useState(() => 
    loadFromLocalStorage('lofiStations', DEFAULT_RADIO_STATIONS)
  );
  
  // State for ambient sounds
  const [ambientSounds, setAmbientSounds] = useState(() => 
    loadFromLocalStorage('lofiAmbientSounds', DEFAULT_AMBIENT_SOUNDS)
  );
  
  // Vibe state
  const [vibeGoal, setVibeGoal] = useState(() => 
    loadFromLocalStorage('lofiVibeGoal', '')
  );
  const [vibeColor, setVibeColor] = useState(() => 
    loadFromLocalStorage('lofiVibeColor', '#e9c46a')
  );
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentStation, setCurrentStation] = useState(0);
  const [time, setTime] = useState(new Date());
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('station'); // 'station', 'sound', or 'manage'
  const [newItemName, setNewItemName] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('');
  const [newItemColor, setNewItemColor] = useState('#9370DB');
  
  // Audio references
  const audioRef = useRef(null);
  const ambientSoundRefs = useRef({});
  
  // Save stations to localStorage when they change
  useEffect(() => {
    saveToLocalStorage('lofiStations', stations);
  }, [stations]);
  
  // Save ambient sounds to localStorage when they change
  useEffect(() => {
    saveToLocalStorage('lofiAmbientSounds', ambientSounds);
  }, [ambientSounds]);
  
  useEffect(() => {
    // Convert hex color to RGB for CSS variables
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        '233, 196, 106';
    };
    
    // Update CSS variable for RGB
    document.documentElement.style.setProperty('--vibe-rgb', hexToRgb(vibeColor));
  }, [vibeColor]);
  
  // Save vibe goal and color to localStorage when they change
  useEffect(() => {
    if (vibeGoal) {
      saveToLocalStorage('lofiVibeGoal', vibeGoal);
    }
    saveToLocalStorage('lofiVibeColor', vibeColor);
  }, [vibeGoal, vibeColor]);
  
  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Adjust volume for main audio and ambient sounds
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    
    ambientSounds.forEach(sound => {
      if (ambientSoundRefs.current[sound.id]) {
        ambientSoundRefs.current[sound.id].volume = volume * 0.3;
      }
    });
  }, [volume, ambientSounds]);
  
  // Handle station changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = stations[currentStation].url;
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.error("Error playing audio:", e);
            alert(`Could not play station: ${stations[currentStation].name}. Try another one or check your connection.`);
            setIsPlaying(false);
          });
        }
      }
    }
  }, [currentStation, stations]);
  
  // Handle play/pause toggle
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.error("Error playing audio:", e);
            alert(`Could not play station: ${stations[currentStation].name}. Try another one or check your connection.`);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  // Handle ambient sound changes
  useEffect(() => {
    ambientSounds.forEach(sound => {
      const audioEl = ambientSoundRefs.current[sound.id];
      if (!audioEl) return;
      
      if (sound.active) {
        if (audioEl.paused) {
          const playPromise = audioEl.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(e => {
              console.error(`Error playing ${sound.name}:`, e);
              alert(`Could not play ambient sound: ${sound.name}. The sound file may be unavailable.`);
              setAmbientSounds(prev => prev.map(s => 
                s.id === sound.id ? {...s, active: false} : s
              ));
            });
          }
        }
      } else {
        audioEl.pause();
      }
      
      audioEl.volume = volume * 0.3;
      audioEl.loop = true;
    });
  }, [ambientSounds, volume]);
  
  // Player functions
  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const changeStation = (direction) => {
    setCurrentStation((prev) => {
      return (prev + direction + stations.length) % stations.length;
    });
  };
  
  // Ambient sound functions
  const toggleAmbientSound = (id) => {
    setAmbientSounds(prev => prev.map(sound => 
      sound.id === id ? {...sound, active: !sound.active} : sound
    ));
  };
  
// Modal functions
const openAddModal = (type) => {
  setModalType(type);
  setNewItemName('');
  setNewItemUrl('');
  setShowAddModal(true);
};

const closeAddModal = () => {
  setShowAddModal(false);
};

const handleAddItem = () => {
  if (!newItemName || !newItemUrl) {
    alert("Please fill in all fields");
    return;
  }
  
  if (modalType === 'station') {
    const newStation = {
      id: `custom-${Date.now()}`,
      name: newItemName,
      url: newItemUrl
    };
    setStations([...stations, newStation]);
  } else {
    const newSound = {
      id: `custom-${Date.now()}`,
      name: newItemName,
      url: newItemUrl,
      active: false
    };
    setAmbientSounds([...ambientSounds, newSound]);
  }
  
  closeAddModal();
};
  
  const removeItem = (type, id) => {
    if (confirm("Are you sure you want to remove this item?")) {
      if (type === 'station') {
        if (stations[currentStation].id === id) {
          alert("Cannot remove the currently playing station.");
          return;
        }
        setStations(stations.filter(station => station.id !== id));
      } else {
        if (ambientSoundRefs.current[id] && !ambientSoundRefs.current[id].paused) {
          ambientSoundRefs.current[id].pause();
        }
        setAmbientSounds(ambientSounds.filter(sound => sound.id !== id));
      }
    }
  };
  
  const resetToDefaults = (type) => {
    if (confirm(`Are you sure you want to reset all ${type}s to defaults?`)) {
      if (type === 'station') {
        setStations(DEFAULT_RADIO_STATIONS);
        setCurrentStation(0);
        setIsPlaying(false);
      } else {
        ambientSounds.forEach(sound => {
          if (ambientSoundRefs.current[sound.id]) {
            ambientSoundRefs.current[sound.id].pause();
          }
        });
        setAmbientSounds(DEFAULT_AMBIENT_SOUNDS);
      }
    }
  };

return (
  <div className="lofi-player" style={{ 
    '--vibe-color': vibeColor 
  }}>
    <h1 className="app-title">Lofi Study Zone</h1>
    
    {/* Vibe Goal Component */}
    <VibeGoal 
      vibeGoal={vibeGoal} 
      setVibeGoal={setVibeGoal}
      vibeColor={vibeColor}
      setVibeColor={setVibeColor}
    />
    
    {/* All windows in a single horizontal row with extra wrapper for spacing */}
    <div className="horizontal-layout-wrapper">
      <div className="horizontal-layout">
        {/* Player component */}
        <Player 
          station={stations[currentStation]}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          changeStation={changeStation}
          volume={volume}
          setVolume={setVolume}
          time={time}
          ambientSounds={ambientSounds}
          vibeGoal={vibeGoal}
          vibeColor={vibeColor}
        />
        
        {/* Pomodoro Timer */}
        <Pomodoro 
          vibeGoal={vibeGoal}
          vibeColor={vibeColor}
        />
        
        {/* Control panel */}
        <Ambient 
          ambientSounds={ambientSounds}
          toggleAmbientSound={toggleAmbientSound}
          openAddModal={openAddModal}
          vibeColor={vibeColor}
        />
      </div>
    </div>
      
      {/* Main audio element for radio */}
      <audio ref={audioRef} />
      
      {/* Create audio elements for all ambient sounds */}
      {ambientSounds.map(sound => (
        <audio 
          key={sound.id}
          ref={el => ambientSoundRefs.current[sound.id] = el}
          src={sound.url}
          loop
        />
      ))}
      
      {/* Modal component */}
      {showAddModal && (
        <Modal 
          type={modalType}
          closeModal={closeAddModal}
          newItemName={newItemName}
          setNewItemName={setNewItemName}
          newItemUrl={newItemUrl}
          setNewItemUrl={setNewItemUrl}
          handleAddItem={handleAddItem}
          stations={stations}
          ambientSounds={ambientSounds}
          removeItem={removeItem}
          resetToDefaults={resetToDefaults}
          vibeColor={vibeColor}
        />
      )}
      
      <div className="credits">
        <p>Created with 💜 for lofi vibes</p>
      </div>
    </div>
  )
}

export default App
