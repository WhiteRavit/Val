
import React, { useEffect, useState } from 'react';
import { Heart, Stars } from 'lucide-react';

const SuccessScreen: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center text-center space-y-10 transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
      <div className="relative">
        <div className="absolute -top-12 -right-12 animate-spin-slow">
          <Stars size={80} className="text-yellow-400 drop-shadow-lg" />
        </div>
        <div className="absolute -bottom-12 -left-12">
          <Heart size={64} fill="#ef4444" className="text-red-500 animate-bounce" />
        </div>
        
        <div className="space-y-4 flex flex-col items-center">
          <div className="mb-2 text-8xl transform hover:scale-110 transition-transform duration-300 cursor-default select-none animate-bounce">
            ❤️
          </div>
          
          <h2 className="text-8xl md:text-9xl font-cursive text-red-600 drop-shadow-lg animate-pulse">
            YaY🥰
          </h2>
          <p className="text-3xl md:text-4xl text-pink-700 font-bold max-w-xl mx-auto px-4">
            I'm so happy! Best day ever! ❤️
          </p>
        </div>
      </div>

      <div className="flex gap-6">
        {[...Array(6)].map((_, i) => (
          <Heart 
            key={i} 
            fill="#ef4444" 
            className="text-red-500 animate-bounce" 
            style={{ animationDelay: `${i * 0.15}s` }}
            size={40}
          />
        ))}
      </div>

      <div className="pt-8">
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-white border-2 border-pink-200 text-pink-500 rounded-full font-bold hover:bg-pink-50 transition-all shadow-md active:scale-95"
        >
          Play again?
        </button>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SuccessScreen;
