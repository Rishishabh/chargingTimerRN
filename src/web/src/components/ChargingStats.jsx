
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, Battery, Zap, Calendar } from 'lucide-react';
import { formatDuration } from '@/lib/formatters';

const ChargingStats = ({ sessions }) => {
  const stats = useMemo(() => {
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        totalChargingTime: 0,
        averageChargingTime: 0,
        totalBatteryGained: 0,
        averageBatteryGained: 0,
        fastestChargeRate: 0,
        longestSession: 0,
        shortestSession: 0,
      };
    }

    const totalSessions = sessions.length;
    
    const totalChargingTime = sessions.reduce(
      (total, session) => total + (session.endTime - session.startTime) / 1000,
      0
    );
    
    const averageChargingTime = totalChargingTime / totalSessions;
    
    const totalBatteryGained = sessions.reduce(
      (total, session) => total + (session.endLevel - session.startLevel),
      0
    );
    
    const averageBatteryGained = totalBatteryGained / totalSessions;
    
    const chargeRates = sessions.map(session => {
      const durationHours = (session.endTime - session.startTime) / (1000 * 60 * 60);
      const batteryGained = session.endLevel - session.startLevel;
      return batteryGained / durationHours;
    });
    
    const fastestChargeRate = Math.max(...chargeRates);
    
    const sessionDurations = sessions.map(
      session => (session.endTime - session.startTime) / 1000
    );
    
    const longestSession = Math.max(...sessionDurations);
    const shortestSession = Math.min(...sessionDurations);

    return {
      totalSessions,
      totalChargingTime,
      averageChargingTime,
      totalBatteryGained,
      averageBatteryGained,
      fastestChargeRate,
      longestSession,
      shortestSession,
    };
  }, [sessions]);

  return (
    <div className="space-y-6">
      <motion.div 
        className="glass-card rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <BarChart3 className="h-6 w-6" />
          Charging Statistics
        </h2>

        {stats.totalSessions === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No data available yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-secondary/30 p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>Total Sessions</span>
                </div>
                <div className="text-2xl font-bold">{stats.totalSessions}</div>
              </motion.div>
              
              <motion.div 
                className="bg-secondary/30 p-4 rounded-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span>Total Charging Time</span>
                </div>
                <div className="text-2xl font-bold">{formatDuration(stats.totalChargingTime)}</div>
              </motion.div>
              
              <motion.div 
                className="bg-secondary/30 p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Battery className="h-4 w-4" />
                  <span>Total Battery Gained</span>
                </div>
                <div className="text-2xl font-bold text-primary">+{stats.totalBatteryGained}%</div>
              </motion.div>
              
              <motion.div 
                className="bg-secondary/30 p-4 rounded-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Zap className="h-4 w-4" />
                  <span>Fastest Charge Rate</span>
                </div>
                <div className="text-2xl font-bold">{stats.fastestChargeRate.toFixed(1)}% / hour</div>
              </motion.div>
            </div>
            
            <motion.div 
              className="bg-secondary/30 p-4 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4">Average Stats</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground mb-1">Average Charging Time</div>
                  <div className="text-xl font-semibold">{formatDuration(stats.averageChargingTime)}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1">Average Battery Gained</div>
                  <div className="text-xl font-semibold text-primary">+{stats.averageBatteryGained.toFixed(1)}%</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1">Longest Session</div>
                  <div className="text-xl font-semibold">{formatDuration(stats.longestSession)}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1">Shortest Session</div>
                  <div className="text-xl font-semibold">{formatDuration(stats.shortestSession)}</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChargingStats;
