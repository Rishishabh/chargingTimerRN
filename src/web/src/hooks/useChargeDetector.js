
import { useState, useEffect } from 'react';

export function useChargeDetector() {
  const [batteryInfo, setBatteryInfo] = useState({
    isCharging: false,
    batteryLevel: 100,
    isSupported: false
  });

  useEffect(() => {
    // Check if Battery API is supported
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        // Initial battery state
        updateBatteryInfo(battery);

        // Add event listeners for battery changes
        battery.addEventListener('chargingchange', () => updateBatteryInfo(battery));
        battery.addEventListener('levelchange', () => updateBatteryInfo(battery));
        
        // Cleanup event listeners
        return () => {
          battery.removeEventListener('chargingchange', () => updateBatteryInfo(battery));
          battery.removeEventListener('levelchange', () => updateBatteryInfo(battery));
        };
      });
    } else {
      // Fallback for browsers without Battery API
      console.log('Battery API not supported');
      
      // For demo purposes, simulate battery behavior
      simulateBatteryBehavior();
    }
  }, []);

  const updateBatteryInfo = (battery) => {
    setBatteryInfo({
      isCharging: battery.charging,
      batteryLevel: Math.round(battery.level * 100),
      isSupported: true
    });
  };

  const simulateBatteryBehavior = () => {
    // Initial simulated state
    let simulatedLevel = 65;
    let simulatedCharging = false;
    
    setBatteryInfo({
      isCharging: simulatedCharging,
      batteryLevel: simulatedLevel,
      isSupported: false
    });

    // Simulate battery level changes
    const interval = setInterval(() => {
      if (simulatedCharging) {
        simulatedLevel = Math.min(100, simulatedLevel + 1);
        if (simulatedLevel >= 100) {
          simulatedCharging = false;
        }
      } else {
        simulatedLevel = Math.max(5, simulatedLevel - 0.5);
        if (simulatedLevel <= 20 && Math.random() > 0.7) {
          simulatedCharging = true;
        }
      }

      setBatteryInfo({
        isCharging: simulatedCharging,
        batteryLevel: Math.round(simulatedLevel),
        isSupported: false
      });
    }, 5000);

    // Allow manual toggling for demo purposes
    const toggleInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        simulatedCharging = !simulatedCharging;
        setBatteryInfo(prev => ({
          ...prev,
          isCharging: simulatedCharging
        }));
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(toggleInterval);
    };
  };

  return {
    isCharging: batteryInfo.isCharging,
    batteryLevel: batteryInfo.batteryLevel,
    isSupported: batteryInfo.isSupported
  };
}
