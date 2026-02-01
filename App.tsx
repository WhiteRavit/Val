
import React, { useState, useCallback } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import ValentineCard from './components/ValentineCard.tsx';
import SuccessScreen from './components/SuccessScreen.tsx';
import HeartBackground from './components/HeartBackground.tsx';

const App: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonClicks, setNoButtonClicks] = useState(0);

  const handleYesClick = () => {
    setIsAccepted(true);
    
    // Trigger festive confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleNoInteraction = useCallback(() => {
    setNoButtonClicks(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center bg-pink-50">
      <HeartBackground />
      
      <div className="z-10 w-full max-w-4xl px-4">
        {!isAccepted ? (
          <ValentineCard 
            onYes={handleYesClick} 
            onNoInteraction={handleNoInteraction}
            interactionCount={noButtonClicks}
          />
        ) : (
          <SuccessScreen />
        )}
      </div>

      {/* Decorative floating elements */}
      <div className="absolute bottom-10 left-10 animate-bounce text-pink-300 opacity-50">
        <Heart size={48} fill="currentColor" />
      </div>
      <div className="absolute top-10 right-10 animate-pulse text-red-300 opacity-50">
        <Sparkles size={64} />
      </div>
    </div>
  );
};

export default App;
