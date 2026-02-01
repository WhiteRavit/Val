
import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

interface ValentineCardProps {
  onYes: () => void;
  onNoInteraction: () => void;
  interactionCount: number;
}

const ValentineCard: React.FC<ValentineCardProps> = ({ onYes, onNoInteraction, interactionCount }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const teleportTimeoutRef = useRef<number | null>(null);

  // Growth logic
  const yesScale = 1 + interactionCount * 0.25;
  const noScale = Math.max(0.1, 1 - interactionCount * 0.15);
  
  useEffect(() => {
    return () => {
      if (teleportTimeoutRef.current) window.clearTimeout(teleportTimeoutRef.current);
    };
  }, []);

  const teleportNoButton = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (teleportTimeoutRef.current) window.clearTimeout(teleportTimeoutRef.current);
    
    teleportTimeoutRef.current = window.setTimeout(() => {
      onNoInteraction();
      const padding = 120;
      const maxX = window.innerWidth - padding;
      const maxY = window.innerHeight - padding;
      const newX = Math.random() * (maxX - padding) + padding / 2;
      const newY = Math.random() * (maxY - padding) + padding / 2;
      setNoPosition({ x: newX, y: newY });
    }, 50);
  };

  const phrases = [
    "Will you be my Valentine?",
    "Are you sure?",
    "Think again! 🥺",
    "Don't do this to me...",
    "Pretty please? ❤️",
    "I'll be very sad...",
    "You're breaking my heart! 💔",
    "Is that your final answer?",
    "Wait, look at the big button! 👀",
    "Just click Yes already! 😂"
  ];

  const currentPhrase = phrases[Math.min(interactionCount, phrases.length - 1)];

  return (
    <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12 max-h-screen overflow-y-auto py-10">
      <div className="text-center flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        <div className="mb-4 text-8xl transform hover:scale-110 transition-transform duration-300 cursor-default select-none">
          🐶
        </div>
        
        <h1 className="text-5xl md:text-7xl font-cursive text-pink-600 drop-shadow-sm px-4 mt-2 mb-2">
          {currentPhrase}
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 relative min-h-[200px] w-full max-w-lg">
        <button
          onClick={onYes}
          style={{ transform: `scale(${yesScale})` }}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-5 px-12 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 flex items-center gap-2 z-20"
        >
          <Heart fill="white" size={24} className="animate-pulse" />
          YES!
        </button>

        <button
          onMouseEnter={teleportNoButton}
          onTouchStart={teleportNoButton}
          onClick={teleportNoButton}
          style={
            interactionCount > 0 
            ? { 
                position: 'fixed', 
                left: `${noPosition.x}px`, 
                top: `${noPosition.y}px`, 
                transform: `scale(${noScale})`,
                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              } 
            : { transform: `scale(${noScale})` }
          }
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-full shadow-md whitespace-nowrap z-30 hover-wiggle"
        >
          No
        </button>
      </div>

      {interactionCount > 3 && (
        <p className="text-pink-400 text-xl font-medium animate-bounce mt-4 text-center px-4">
          Clicking "Yes" makes everything better! ✨
        </p>
      )}
    </div>
  );
};

export default ValentineCard;
