
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'charging-sessions';

export function useChargingData() {
  const [chargingSessions, setChargingSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedSessions = localStorage.getItem(STORAGE_KEY);
    if (savedSessions) {
      try {
        setChargingSessions(JSON.parse(savedSessions));
      } catch (error) {
        console.error('Error parsing saved sessions:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (chargingSessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chargingSessions));
    }
  }, [chargingSessions]);

  // Start a new charging session
  const startCharging = (batteryLevel) => {
    if (currentSession) {
      return; // Don't start a new session if one is already active
    }
    
    const newSession = {
      id: Date.now().toString(),
      startTime: Date.now(),
      startLevel: batteryLevel,
      ongoing: true
    };
    
    setCurrentSession(newSession);
  };

  // Update the current session with the latest battery level
  const updateCurrentSession = (batteryLevel) => {
    if (!currentSession) {
      return;
    }
    
    setCurrentSession(prev => ({
      ...prev,
      currentLevel: batteryLevel
    }));
  };

  // End the current charging session
  const stopCharging = (batteryLevel) => {
    if (!currentSession) {
      return;
    }
    
    const completedSession = {
      ...currentSession,
      endTime: Date.now(),
      endLevel: batteryLevel,
      ongoing: false
    };
    
    setChargingSessions(prev => [...prev, completedSession]);
    setCurrentSession(null);
  };

  // Clear all charging history
  const clearHistory = () => {
    setChargingSessions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    chargingSessions,
    currentSession,
    startCharging,
    stopCharging,
    updateCurrentSession,
    clearHistory
  };
}
