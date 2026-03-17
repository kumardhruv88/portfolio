import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loading = ({ onComplete }) => {
  const [progress, setProgress] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Slower loading time to allow neural connections to build up gracefully
    const speed = 40; // 40ms per 1% = ~4 seconds total to reach 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, speed);

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 4500); // Wait bit after 100%

    const completionTimer = setTimeout(() => {
      onComplete();
    }, 5500); // Give time for fade out

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  // Nodes for the neural network
  const numNodes = 12;
  const nodes = Array.from({ length: numNodes });

  // Generate connections with specific activation percentage thresholds
  const connections = useMemo(() => {
    const conns = [];
    // We want a good number of connections to form gradually from 10% to 95%
    let thresholdPercent = 10;
    
    // Connect outer nodes with random other outer nodes
    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            // about 40% chance of a connection between any two nodes
            if (Math.random() > 0.6) {
                conns.push({
                    i, 
                    j, 
                    threshold: thresholdPercent
                });
                // increment threshold so they appear sequentially
                thresholdPercent += Math.floor(Math.random() * 4) + 1; 
                if (thresholdPercent > 95) thresholdPercent = 95;
            }
        }
    }
    
    // Add connections from center (we'll represent center as index 'center') to all nodes
    for (let i = 0; i < numNodes; i++) {
        conns.push({
            i: i,
            j: 'center',
            threshold: 15 + (i * 7) > 95 ? 95 : 15 + (i * 7) // Stagger center connections
        });
    }

    // Sort by threshold so they build up nicely
    return conns.sort((a, b) => a.threshold - b.threshold);
  }, []);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {connections.map((conn, idx) => {
            if (progress < conn.threshold) return null; // Don't render until progress hits threshold

            const isCenterI = conn.i === 'center';
            const isCenterJ = conn.j === 'center';

            const x1 = isCenterI ? 128 : 128 + Math.cos((conn.i * 30 * Math.PI) / 180) * 90;
            const y1 = isCenterI ? 128 : 128 + Math.sin((conn.i * 30 * Math.PI) / 180) * 90;
            
            const x2 = isCenterJ ? 128 : 128 + Math.cos((conn.j * 30 * Math.PI) / 180) * 90;
            const y2 = isCenterJ ? 128 : 128 + Math.sin((conn.j * 30 * Math.PI) / 180) * 90;

            const isCenterConnection = isCenterI || isCenterJ;

            return (
              <motion.line
                key={`conn-${idx}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isCenterConnection ? "rgba(255, 0, 128, 0.6)" : "rgba(255, 0, 128, 0.3)"}
                strokeWidth={isCenterConnection ? "2" : "1.2"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: isCenterConnection ? [0.4, 0.9, 0.4] : [0.2, 0.6, 0.2]
                }}
                transition={{
                  pathLength: { duration: 0.8, ease: "easeOut" },
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((_, i) => {
          // Node lights up more after passing certain percentage
          const nodeActiveThreshold = (i / numNodes) * 100;
          const isActive = progress >= nodeActiveThreshold;
          
          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full z-10 transition-all duration-500"
              style={{
                left: `calc(50% + ${Math.cos((i * 30 * Math.PI) / 180) * 90}px - 6px)`,
                top: `calc(50% + ${Math.sin((i * 30 * Math.PI) / 180) * 90}px - 6px)`,
                backgroundColor: isActive ? "#fff" : "rgba(255,255,255,0.2)",
                boxShadow: isActive ? "0 0 15px #fff, 0 0 5px #ff0080" : "none"
              }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: isActive ? [1, 1.3, 1] : 0.8,
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
                repeatType: "reverse",
              }}
            />
          );
        })}

        {/* Center Core */}
        <motion.div
           className="absolute w-12 h-12 bg-secondary rounded-full z-20 flex items-center justify-center transition-all duration-300"
           style={{
             boxShadow: `0 0 ${20 + (progress/100)*40}px #ff0080, 0 0 ${10 + (progress/100)*20}px #ff0080 inset`,
             transform: `scale(${0.8 + (progress/100)*0.3})`
           }}
        >
          <div className="w-5 h-5 bg-white rounded-full animate-pulse shadow-[0_0_10px_#fff]"></div>
        </motion.div>
      </div>
      
      {/* Loading Text */}
      <motion.div
        className="mt-12 flex flex-col items-center gap-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-secondary font-space tracking-[0.4em] font-bold text-sm md:text-base uppercase flex items-center justify-center gap-2">
          Initializing Neural Weights
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>...</motion.span>
        </div>
        <div className="text-white font-display text-2xl md:text-4xl font-bold tracking-wider">
          {progress}%
        </div>
      </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
