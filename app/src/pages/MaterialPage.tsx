import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2, CheckCircle } from 'lucide-react';
import { useGameStore, BODY_PARTS } from '../store/gameStore';
import type { BodyPart } from '../store/gameStore';
import { GameHeader } from '../components/game/GameHeader';
import { ProgressBar } from '../components/game/ProgressBar';
import characterImg from '../assets/images/character.png';
import eyeImg from '../assets/images/eye.png';
import noseImg from '../assets/images/nose.png';
import earImg from '../assets/images/ear.png';
import mouthImg from '../assets/images/mouth.png';
import handImg from '../assets/images/hand.png';
import footImg from '../assets/images/foot.png';

const bodyPartImages: Record<BodyPart, string> = {
  mata: eyeImg,
  hidung: noseImg,
  telinga: earImg,
  mulut: mouthImg,
  tangan: handImg,
  kaki: footImg,
};

interface Hotspot {
  id: BodyPart;
  x: number;
  y: number;
  size: number;
}

const hotspots: Hotspot[] = [
  { id: 'mata', x: 35, y: 22, size: 40 },
  { id: 'hidung', x: 50, y: 32, size: 30 },
  { id: 'telinga', x: 72, y: 30, size: 30 },
  { id: 'mulut', x: 50, y: 42, size: 35 },
  { id: 'tangan', x: 78, y: 60, size: 45 },
  { id: 'kaki', x: 55, y: 85, size: 50 },
];

export function MaterialPage() {
  const { setPage, learnedParts, learnPart } = useGameStore();
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const selectedPartInfo = selectedPart
    ? BODY_PARTS.find((p) => p.id === selectedPart)
    : null;

  const allLearned = learnedParts.length === BODY_PARTS.length;

  const handleHotspotClick = (partId: BodyPart) => {
    setSelectedPart(partId);
    learnPart(partId);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.8;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="game-container relative min-h-screen bg-gradient-to-b from-cream to-cream-dark">
      <GameHeader
        title="Kenalan dengan Tubuhku"
        showBack={true}
        onBack={() => setPage('story')}
        showHelp={true}
      />

      <div className="p-4 space-y-4">
        {/* Progress */}
        <ProgressBar current={learnedParts.length} total={BODY_PARTS.length} color="bg-sky" />

        {/* Character with Hotspots */}
        <div className="relative flex justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={characterImg}
              alt="Tubuh Manusia"
              className="w-56 h-auto"
            />

            {/* Hotspots */}
            {hotspots.map((hotspot) => (
              <motion.button
                key={hotspot.id}
                className={`absolute rounded-full flex items-center justify-center transition-all ${
                  learnedParts.includes(hotspot.id)
                    ? 'bg-mint/60 border-2 border-mint-dark'
                    : 'bg-yellow-soft/70 border-2 border-yellow-dark animate-pulse-soft'
                } ${selectedPart === hotspot.id ? 'ring-4 ring-sky scale-110' : ''}`}
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  width: `${hotspot.size}px`,
                  height: `${hotspot.size}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => handleHotspotClick(hotspot.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {learnedParts.includes(hotspot.id) && (
                  <CheckCircle className="w-5 h-5 text-white" />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Instruction */}
        {!selectedPart && (
          <motion.p
            className="text-center text-darkgray/70 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Klik lingkaran berkedip pada tubuh untuk mempelajarinya!
          </motion.p>
        )}

        {/* Info Panel */}
        <AnimatePresence mode="wait">
          {selectedPartInfo && (
            <motion.div
              key={selectedPartInfo.id}
              className="bg-white rounded-2xl shadow-game p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                {/* Body Part Image */}
                <motion.div
                  className="w-20 h-20 bg-cream rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                >
                  <img
                    src={bodyPartImages[selectedPartInfo.id]}
                    alt={selectedPartInfo.name}
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-deep">
                    {selectedPartInfo.name}
                  </h3>
                  <p className="text-darkgray text-sm mt-1">
                    {selectedPartInfo.function}
                  </p>
                </div>

                {/* Sound Button */}
                <motion.button
                  onClick={() =>
                    speakText(
                      `${selectedPartInfo.name}. ${selectedPartInfo.function}`
                    )
                  }
                  className={`p-3 rounded-full flex-shrink-0 transition-all ${
                    isSpeaking
                      ? 'bg-sky text-white animate-pulse'
                      : 'bg-sky-light text-deep hover:bg-sky'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Volume2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        {allLearned && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => setPage('mission1')}
              className="w-full py-4 bg-mint text-white font-bold text-lg rounded-2xl shadow-game flex items-center justify-center gap-2 hover:shadow-game-hover active:scale-95 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Lanjut ke Misi 1
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
