import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { GameHeader } from '../components/game/GameHeader';
import characterImg from '../assets/images/character.png';

export function StoryPage() {
  const { setPage } = useGameStore();
  const [displayedText, setDisplayedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  
  const fullText = 'Oh tidak! Karate Kid kehilangan beberapa bagian tubuhnya setelah latihan yang sangat keras. Bantulah dia menemukan kembali bagian tubuhnya dengan menyelesaikan misi-misi berikut!';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="game-container relative min-h-screen bg-gradient-to-b from-sky-light/50 to-cream">
      <GameHeader
        title="Cerita"
        showBack={true}
        onBack={() => setPage('home')}
        showHelp={false}
      />

      <div className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-80px)]">
        {/* Story Card */}
        <motion.div
          className="w-full bg-cream rounded-3xl shadow-game p-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-light/30 rounded-full -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-mint-light/30 rounded-full translate-y-6 -translate-x-6" />

          {/* Character with missing parts effect */}
          <div className="relative flex justify-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <img
                src={characterImg}
                alt="Karate Kid"
                className="w-40 h-auto"
              />
              {/* Missing parts indicators */}
              <motion.div
                className="absolute top-10 left-8 w-8 h-8 border-2 border-dashed border-coral rounded-full animate-pulse-soft"
                title="Mata hilang"
              />
              <motion.div
                className="absolute top-14 right-8 w-6 h-6 border-2 border-dashed border-coral rounded-full animate-pulse-soft"
                style={{ animationDelay: '0.3s' }}
                title="Telinga hilang"
              />
              <motion.div
                className="absolute bottom-4 left-10 w-10 h-6 border-2 border-dashed border-coral rounded-full animate-pulse-soft"
                style={{ animationDelay: '0.6s' }}
                title="Kaki hilang"
              />
            </motion.div>
          </div>

          {/* Story Text */}
          <div className="relative z-10">
            <p className="text-darkgray text-base leading-relaxed font-medium min-h-[80px]">
              {displayedText}
              {!showButton && (
                <span className="inline-block w-0.5 h-4 bg-deep ml-0.5 animate-pulse" />
              )}
            </p>
          </div>

          {/* Continue Button */}
          {showButton && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => setPage('material')}
                className="w-full py-3 bg-sky text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-game hover:shadow-game-hover active:scale-95 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Lanjutkan
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
