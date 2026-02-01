
import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';

const HeartBackground: React.FC = () => {
  const hearts = useMemo(() => {
    return [...Array(25)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.2 + 0.1
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-red-200"
          style={{
            left: h.left,
            top: h.top,
            opacity: h.opacity,
            animation: `float-heart ${h.duration}s ease-in-out infinite alternate`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <Heart size={h.size} fill="currentColor" />
        </div>
      ))}
      <style>{`
        @keyframes float-heart {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HeartBackground;
