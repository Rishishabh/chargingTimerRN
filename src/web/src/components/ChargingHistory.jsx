
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Battery, BatteryCharging, Zap } from 'lucide-react';
import { formatDuration, formatDate } from '@/lib/formatters';

const ChargingHistory = ({ sessions }) => {
  const sortedSessions = [...sessions].sort((a, b) => b.startTime - a.startTime);

  return (
    <div className="space-y-6">
      <motion.div 
        className="glass-card rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Calendar className="h-6 w-6" />
          Charging History
        </h2>

        {sortedSessions.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            <BatteryCharging className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No charging history yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedSessions.map((session, index) => (
              <motion.div 
                key={session.id}
                className="bg-secondary/30 rounded-lg p-4 border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Battery className="h-5 w-5 text-primary" />
                    <span className="font-medium">
                      {formatDate(session.startTime)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(session.startTime).toLocaleTimeString()} - {' '}
                    {new Date(session.endTime).toLocaleTimeString()}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Duration
                    </span>
                    <span className="font-semibold">
                      {formatDuration((session.endTime - session.startTime) / 1000)}
                    </span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Battery className="h-3 w-3" /> Start → End
                    </span>
                    <span className="font-semibold">
                      {session.startLevel}% → {session.endLevel}%
                    </span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Gained
                    </span>
                    <span className="font-semibold text-primary">
                      +{session.endLevel - session.startLevel}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChargingHistory;
