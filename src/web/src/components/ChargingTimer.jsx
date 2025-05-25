
import React from 'react';
import { motion } from 'framer-motion';
import { Battery, BatteryCharging, Clock, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { formatDuration } from '@/lib/formatters';

const ChargingTimer = ({ isCharging, batteryLevel, currentSession }) => {
  const elapsedTime = currentSession 
    ? Math.floor((Date.now() - currentSession.startTime) / 1000) 
    : 0;
  
  const batteryGain = currentSession 
    ? batteryLevel - currentSession.startLevel 
    : 0;

  return (
    <div className="space-y-6">
      <motion.div 
        className="glass-card rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {isCharging ? (
              <BatteryCharging className="h-6 w-6 text-primary battery-animation" />
            ) : (
              <Battery className="h-6 w-6" />
            )}
            Battery Status
          </h2>
          <div className="text-3xl font-bold text-primary">{batteryLevel}%</div>
        </div>
        
        <Progress value={batteryLevel} className="h-6 mb-4" />
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-secondary/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Zap className="h-4 w-4" />
              <span>Charging Status</span>
            </div>
            <div className="text-xl font-semibold">
              {isCharging ? (
                <span className="text-primary">Charging</span>
              ) : (
                <span>Not Charging</span>
              )}
            </div>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span>Session Duration</span>
            </div>
            <div className="text-xl font-semibold">
              {currentSession ? formatDuration(elapsedTime) : "No active session"}
            </div>
          </div>
        </div>
      </motion.div>

      {currentSession && (
        <motion.div 
          className="glass-card rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-4">Current Session</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="text-muted-foreground mb-1">Start Level</div>
              <div className="text-xl font-semibold">{currentSession.startLevel}%</div>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="text-muted-foreground mb-1">Current Level</div>
              <div className="text-xl font-semibold">{batteryLevel}%</div>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="text-muted-foreground mb-1">Battery Gained</div>
              <div className="text-xl font-semibold text-primary">+{batteryGain}%</div>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="text-muted-foreground mb-1">Started At</div>
              <div className="text-xl font-semibold">
                {new Date(currentSession.startTime).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {!isCharging && !currentSession && (
        <motion.div 
          className="text-center p-8 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BatteryCharging className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">
            Connect your device to a power source to start tracking
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ChargingTimer;
