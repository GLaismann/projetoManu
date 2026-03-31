import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

export function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles only on the client side
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random horizontal position (%)
      size: Math.random() * 4 + 2, // Random size between 2px and 6px
      duration: Math.random() * 15 + 15, // Random duration between 15s and 30s
      delay: Math.random() * 10, // Random start delay
      drift: (Math.random() - 0.5) * 50, // Random horizontal drift
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-rose-200 rounded-full shadow-[0_0_10px_rgba(254,205,211,0.8)]"
          style={{
            left: `${p.x}%`,
            bottom: '-20px', // Start slightly below the screen
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ['0vh', '-120vh'], // Float upwards past the screen
            x: [0, p.drift, -p.drift, 0], // Sway left and right
            opacity: [0, 0.8, 0.8, 0], // Fade in, stay visible, fade out
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay },
            x: { duration: p.duration * 0.6, repeat: Infinity, ease: 'easeInOut', delay: p.delay },
            opacity: { duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay },
          }}
        />
      ))}
    </div>
  );
}
