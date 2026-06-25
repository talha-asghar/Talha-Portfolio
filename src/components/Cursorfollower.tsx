import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Mouse positions ko track karne k liye high-performance motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics taake dot jhatke se na chale, balki smooth follow kare
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Dot ko cursor k bilkul center me lane k liye thoda offset (-8 pixels kyunki width 16px hai)
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full pointer-events-none z-[9999] shadow-[0_0_15px_rgba(59,130,246,0.8),0_0_30px_rgba(139,92,246,0.6)] mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
}