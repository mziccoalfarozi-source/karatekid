import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Lightbulb, CheckCircle } from 'lucide-react';
import { useGameStore, BODY_PARTS } from '../store/gameStore';
import type { BodyPart } from '../store/gameStore';
import { GameHeader } from '../components/game/GameHeader';
import { StarDisplay } from '../components/game/StarDisplay';
import { ConfettiEffect } from '../components/game/ConfettiEffect';
import characterImg from '../assets/images/character.png';
import characterCompleteImg from '../assets/images/character-complete.png';
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

interface Slot {
  id: BodyPart;
  x: number;
  y: number;
  label: string;
}

const slots: Slot[] = [
  { id: 'mata', x: 35, y: 22, label: 'Mata' },
  { id: 'hidung', x: 50, y: 35, label: 'Hidung' },
  { id: 'telinga', x: 72, y: 28, label: 'Telinga' },
  { id: 'mulut', x: 50, y: 48, label: 'Mulut' },
  { id: 'tangan', x: 78, y: 58, label: 'Tangan' },
  { id: 'kaki', x: 55, y: 85, label: 'Kaki' },
];

export function Mission3Page() {
  const { setPage, addScore, addStar, completeMission, setMission3Completed } = useGameStore();
  const [placedParts, setPlacedParts] = useState<Record<string, BodyPart>>({});
  const [availableParts, setAvailableParts] = useState<BodyPart[]>(
    BODY_PARTS.map((p) => p.id).sort(() => Math.random() - 0.5)
  );
  const [draggedPart, setDraggedPart] = useState<BodyPart | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; correct: boolean } | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState<BodyPart | null>(null);
  const [missionScore, setMissionScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const allPlaced = slots.every((slot) => placedParts[slot.id] === slot.id);

  const handleDragStart = (part: BodyPart) => {
    setDraggedPart(part);
    setFeedback(null);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, slotId: BodyPart) => {
      e.preventDefault();
      if (!draggedPart) return;

      if (draggedPart === slotId) {
        // Correct placement
        setPlacedParts((prev) => ({ ...prev, [slotId]: draggedPart }));
        setAvailableParts((prev) => prev.filter((p) => p !== draggedPart));
        const hintPenalty = hintsUsed > 0 ? 10 : 0;
        addScore(Math.max(20, 30 - hintPenalty));
        setMissionScore((prev) => prev + Math.max(20, 30 - hintPenalty));
        setFeedback({
          message: 'Keren! Kamu berhasil memasang bagian tubuh dengan tepat.',
          correct: true,
        });
      } else {
        // Wrong placement
        setFeedback({
          message: 'Itu belum tepat. Coba perhatikan letaknya lagi.',
          correct: false,
        });
      }
      setDraggedPart(null);
    },
    [draggedPart, hintsUsed, addScore]
  );

  const handleHint = () => {
    if (hintsUsed >= 3) return;
    
    // Find a slot that hasn't been correctly filled
    const unplacedSlot = slots.find((slot) => placedParts[slot.id] !== slot.id);
    if (unplacedSlot) {
      setShowHint(unplacedSlot.id);
      setHintsUsed((prev) => prev + 1);
      setTimeout(() => setShowHint(null), 2000);
    }
  };

  const handleComplete = () => {
    const stars = hintsUsed === 0 ? 3 : hintsUsed === 1 ? 2 : 1;
    addStar(stars);
    completeMission(3);
    setMission3Completed(true);
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div className="game-container min-h-screen bg-gradient-to-b from-yellow-soft/30 to-cream">
        <GameHeader title="Misi 3 Selesai!" showBack={false} />
        <ConfettiEffect trigger={true} />

        <div className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-80px)]">
          <motion.div
            className="bg-white rounded-3xl shadow-game p-8 text-center w-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <motion.img
              src={characterCompleteImg}
              alt="Karate Kid Lengkap"
              className="w-40 h-auto mx-auto"
              initial={{ y: 20 }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            />

            <h2 className="text-2xl font-bold text-deep mt-4">
              Tubuh Lengkap!
            </h2>
            <p className="text-darkgray mt-2">
              Kamu berhasil melengkapi semua bagian tubuh!
            </p>

            <div className="mt-6">
              <StarDisplay count={hintsUsed === 0 ? 3 : hintsUsed === 1 ? 2 : 1} size="lg" animated />
            </div>

            <p className="text-3xl font-black text-sky mt-4">{missionScore} Poin</p>

            <motion.button
              onClick={() => setPage('quiz')}
              className="w-full mt-6 py-4 bg-sky text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-game"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ke Quiz Akhir
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container min-h-screen bg-gradient-to-b from-yellow-soft/20 to-cream">
      <GameHeader
        title="Misi 3: Lengkapi Tubuhku"
        showBack={true}
        onBack={() => setPage('mission2')}
        showHelp={true}
      />

      <div className="p-4 space-y-4">
        {/* Progress and Hint */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-darkgray">
            {Object.keys(placedParts).length}/{slots.length} terpasang
          </div>
          <motion.button
            onClick={handleHint}
            disabled={hintsUsed >= 3}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
              hintsUsed >= 3
                ? 'bg-gray-200 text-gray-400'
                : 'bg-yellow-soft/50 text-darkgray hover:bg-yellow-soft'
            }`}
            whileHover={hintsUsed < 3 ? { scale: 1.05 } : {}}
            whileTap={hintsUsed < 3 ? { scale: 0.95 } : {}}
          >
            <Lightbulb className="w-4 h-4" />
            Hint ({3 - hintsUsed})
          </motion.button>
        </div>

        {/* Character Body with Slots */}
        <div className="relative flex justify-center">
          <div className="relative">
            <img
              src={characterImg}
              alt="Siluet Tubuh"
              className="w-56 h-auto opacity-80"
            />

            {/* Slots */}
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`absolute rounded-xl flex items-center justify-center transition-all ${
                  placedParts[slot.id] === slot.id
                    ? 'bg-mint/40 border-2 border-mint-dark'
                    : showHint === slot.id
                    ? 'bg-yellow-soft/60 border-2 border-yellow-dark animate-pulse'
                    : 'bg-white/40 border-2 border-dashed border-sky/50'
                }`}
                style={{
                  left: `${slot.x}%`,
                  top: `${slot.y}%`,
                  width: '55px',
                  height: '55px',
                  transform: 'translate(-50%, -50%)',
                }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, slot.id)}
              >
                {placedParts[slot.id] === slot.id ? (
                  <motion.img
                    src={bodyPartImages[slot.id]}
                    alt={slot.label}
                    className="w-10 h-10 object-contain"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  />
                ) : (
                  <span className="text-xs text-sky-dark/50 font-medium text-center">
                    {slot.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Parts to Drag */}
        <div className="bg-white rounded-2xl shadow-game p-4">
          <p className="text-sm font-semibold text-darkgray mb-3 text-center">
            Seret bagian tubuh ke tempat yang benar:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <AnimatePresence>
              {availableParts.map((part) => (
                <motion.div
                  key={part}
                  draggable
                  onDragStart={() => handleDragStart(part)}
                  className="w-16 h-16 bg-cream rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing shadow-sm border-2 border-sky/20 hover:border-sky hover:shadow-md transition-all"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <img
                    src={bodyPartImages[part]}
                    alt={part}
                    className="w-12 h-12 object-contain pointer-events-none"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              className={`rounded-2xl p-3 text-center ${
                feedback.correct ? 'bg-mint-light' : 'bg-coral-light'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-center gap-2">
                {feedback.correct ? (
                  <CheckCircle className="w-5 h-5 text-mint-dark" />
                ) : null}
                <p
                  className={`font-bold text-sm ${
                    feedback.correct ? 'text-mint-dark' : 'text-coral-dark'
                  }`}
                >
                  {feedback.message}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Complete Button */}
        {allPlaced && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              onClick={handleComplete}
              className="w-full py-4 bg-mint text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-game"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Star className="w-5 h-5 fill-white" />
              Selesaikan Misi
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
