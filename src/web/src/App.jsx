
import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import ChargingTimer from '@/components/ChargingTimer';
import ChargingHistory from '@/components/ChargingHistory';
import ChargingStats from '@/components/ChargingStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Battery, History, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChargeDetector } from '@/hooks/useChargeDetector';
import { useChargingData } from '@/hooks/useChargingData';

function App() {
  const { toast } = useToast();
  const { isCharging, batteryLevel } = useChargeDetector();
  const { 
    chargingSessions, 
    currentSession, 
    startCharging, 
    stopCharging, 
    updateCurrentSession 
  } = useChargingData();

  // Start charging session when device is plugged in
  useEffect(() => {
    if (isCharging && !currentSession) {
      startCharging(batteryLevel);
      toast({
        title: "Charging Started",
        description: `Initial battery level: ${batteryLevel}%`,
      });
    } else if (!isCharging && currentSession) {
      stopCharging(batteryLevel);
      toast({
        title: "Charging Stopped",
        description: `Final battery level: ${batteryLevel}%`,
      });
    } else if (isCharging && currentSession) {
      updateCurrentSession(batteryLevel);
    }
  }, [isCharging, batteryLevel]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <motion.header 
        className="py-6 px-4 gradient-bg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Battery className="h-8 w-8" />
            Charging Timer
          </h1>
        </div>
      </motion.header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="current" className="flex items-center gap-2">
              <Battery className="h-4 w-4" />
              Current
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Stats
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <ChargingTimer 
              isCharging={isCharging} 
              batteryLevel={batteryLevel} 
              currentSession={currentSession}
            />
          </TabsContent>
          
          <TabsContent value="history">
            <ChargingHistory sessions={chargingSessions} />
          </TabsContent>
          
          <TabsContent value="stats">
            <ChargingStats sessions={chargingSessions} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="py-4 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <span className="text-sm text-muted-foreground">
            Charging Timer App - All data stored locally on your device
          </span>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
}

export default App;
