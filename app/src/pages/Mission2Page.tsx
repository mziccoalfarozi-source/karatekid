import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Timer, Star } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import type { BodyPart } from '../store/gameStore';
import { GameHeader } from '../components/game/GameHeader';
import { ProgressBar } from '../components/game/ProgressBar';
import { StarDisplay } from '../components/game/StarDisplay';
import { mission2Questions } from '../data/gameData';
import { getBodyPartById } from '../data/gameData';
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

interface FloatingPart {
  id: string;
  partId: BodyPart;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

export function Mission2Page() {
  const { setPage, addScore, addStar, completeMission } = useGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [floatingParts, setFloatingParts] = useState<FloatingPart[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [missionScore, setMissionScore] = useState(0);
  const [missionComplete, setMissionComplete] = useState(false);
  const [gameActive, setGameActive] = useState(true);

  const currentQuestion = mission2Questions[currentIndex];

  // Generate floating parts
  const generateFloatingParts = useCallback(() => {
    const parts: FloatingPart[] = [];
    const allParts: BodyPart[] = ['mata', 'hidung', 'telinga', 'mulut', 'tangan', 'kaki'];
    
    // Add target part
    parts.push({
      id: 'target',
      partId: currentQuestion.targetPart,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 50,
      size: 70,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
    });

    // Add distractors
    currentQuestion.distractorParts.forEach((part, i) => {
      parts.push({
        id: `distractor-${i}`,
        partId: part,
        x: 10 + Math.random() * 70,
        y: 15 + Math.random() * 55,
        size: 60 + Math.random() * 20,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: (Math.random() - 0.5) * 1.2,
      });
    });

    // Add extra random parts
    const remainingParts = allParts.filter(
      (p) => p !== currentQuestion.targetPart && !currentQuestion.distractorParts.includes(p)
    );
    remainingParts.slice(0, 2).forEach((part, i) => {
      parts.push({
        id: `extra-${i}`,
        partId: part,
        x: 15 + Math.random() * 65,
        y: 20 + Math.random() * 50,
        size: 55 + Math.random() * 15,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
      });
    });

    setFloatingParts(parts);
  }, [currentQuestion]);

  useEffect(() => {
    generateFloatingParts();
    setTimeLeft(30);
    setGameActive(true);
    setShowFeedback(false);
  }, [currentIndex, generateFloatingParts]);

  // Timer
  useEffect(() => {
    if (!gameActive || showFeedback) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowFeedback(true);
          setFeedbackCorrect(false);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, showFeedback]);

  // Animate floating parts
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setFloatingParts((prev) =>
        prev.map((part) => {
          let newX = part.x + part.speedX;
          let newY = part.y + part.speedY;

          // Bounce off walls
          if (newX < 5 || newX > 85) part.speedX *= -1;
          if (newY < 10 || newY > 70) part.speedY *= -1;

          newX = Math.max(5, Math.min(85, newX));
          newY = Math.max(10, Math.min(70, newY));

          return { ...part, x: newX, y: newY };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [gameActive]);

  const handleCatch = (partId: BodyPart) => {
    if (!gameActive || showFeedback) return;

    const correct = partId === currentQuestion.targetPart;
    setFeedbackCorrect(correct);
    setShowFeedback(true);
    setGameActive(false);

    if (correct) {
      const timeBonus = Math.floor(timeLeft / 5);
      addScore(20 + timeBonus);
      setMissionScore((prev) => prev + 20 + timeBonus);
    }
  };

  const handleNext = () => {
    if (currentIndex < mission2Questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const stars = missionScore >= 100 ? 3 : missionScore >= 60 ? 2 : 1;
      addStar(stars);
      completeMission(2);
      setMissionComplete(true);
    }
  };

  if (missionComplete) {
    return (
      <div className="game-container min-h-screen bg-gradient-to-b from-mint-light to-cream">
        <GameHeader title="Misi 2 Selesai!" showBack={false} />

        <div className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-80px)]">
          <motion.div
            className="bg-white rounded-3xl shadow-game p-8 text-center w-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <Star className="w-16 h-16 text-yellow-soft fill-yellow-soft mx-auto" />
            </motion.div>

            <h2 className="text-2xl font-bold text-deep mt-4">Misi 2 Selesai!</h2>
            <p className="text-darkgray mt-2">
              Kamu berhasil menangkap semua bagian tubuh!
            </p>

            <div className="mt-6">
              <StarDisplay
                count={Math.min(3, Math.ceil(missionScore / 40))}
                size="lg"
                animated
              />
            </div>

            <p className="text-3xl font-black text-sky mt-4">{missionScore} Poin</p>

            <motion.button
              onClick={() => setPage('mission3')}
              className="w-full mt-6 py-4 bg-sky text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-game"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Lanjut ke Misi 3
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container min-h-screen bg-gradient-to-b from-mint-light/30 to-cream">
      <GameHeader
        title="Misi 2: Tangkap Bagian Tubuh"
        showBack={true}
        onBack={() => setPage('mission1')}
        showHelp={true}
      />

      <div className="p-4 space-y-4">
        {/* Timer and Progress */}
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${
              timeLeft <= 10 ? 'bg-coral-light animate-timer-pulse' : 'bg-sky-light'
            }`}
          >
            <Timer
              className={`w-5 h-5 ${
                timeLeft <= 10 ? 'text-coral' : 'text-deep'
              }`}
            />
            <span
              className={`font-bold ${
                timeLeft <= 10 ? 'text-coral-dark' : 'text-deep'
              }`}
            >
              {timeLeft}s
            </span>
          </div>
          <ProgressBar
            current={currentIndex}
            total={mission2Questions.length}
            color="bg-mint"
          />
        </div>

        {/* Instruction */}
        <motion.div
          className="bg-white rounded-2xl shadow-game p-4 text-center"
          key={currentQuestion.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-lg font-bold text-deep">
            {currentQuestion.instruction}
          </p>
        </motion.div>

        {/* Game Area */}
        <div className="relative h-72 bg-white/50 rounded-2xl overflow-hidden border-2 border-dashed border-sky/30">
          {/* Grid pattern background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle, #8ECAE6 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Floating Parts */}
          <AnimatePresence>
            {floatingParts.map((part) => (
              <motion.button
                key={part.id}
                className="absolute transition-all"
                style={{
                  left: `${part.x}%`,
                  top: `${part.y}%`,
                  width: `${part.size}px`,
                  height: `${part.size}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => handleCatch(part.partId)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              >
                <img
                  src={bodyPartImages[part.partId]}
                  alt={part.partId}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              className={`rounded-2xl p-4 text-center ${
                feedbackCorrect ? 'bg-mint-light' : 'bg-coral-light'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p
                className={`font-bold text-lg ${
                  feedbackCorrect ? 'text-mint-dark' : 'text-coral-dark'
                }`}
              >
                {feedbackCorrect ? 'Berhasil!' : 'Waktu Habis!'}
              </p>
              <p className="text-darkgray text-sm mt-1">
                {feedbackCorrect
                  ? currentQuestion.correctFeedback
                  : `Yang benar adalah ${getBodyPartById(currentQuestion.targetPart)?.name}`}
              </p>

              <motion.button
                onClick={handleNext}
                className="mt-3 px-6 py-2 bg-white text-deep font-bold rounded-xl shadow-sm flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lanjut
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
