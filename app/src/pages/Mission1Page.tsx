import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Star, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import type { BodyPart } from '../store/gameStore';
import { GameHeader } from '../components/game/GameHeader';
import { ProgressBar } from '../components/game/ProgressBar';
import { StarDisplay } from '../components/game/StarDisplay';
import { mission1Questions } from '../data/gameData';
import { getBodyPartById, getRandomCompliment } from '../data/gameData';
import doctorImg from '../assets/images/doctor.png';

export function Mission1Page() {
  const {
    setPage,
    addScore,
    addStar,
    loseLife,
    resetLives,
    lives,
    completeMission,
  } = useGameStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<BodyPart | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [missionScore, setMissionScore] = useState(0);
  const [missionComplete, setMissionComplete] = useState(false);

  const currentQuestion = mission1Questions[currentIndex];

  const handleAnswer = (answer: BodyPart) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      addScore(10);
      setMissionScore((prev) => prev + 10);
    } else {
      loseLife();
    }
  };

  const handleNext = () => {
    if (currentIndex < mission1Questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowFeedback(false);
    } else {
      // Mission complete
      const correctCount = missionScore / 10 + (isCorrect ? 1 : 0);
      const stars = correctCount >= 5 ? 3 : correctCount >= 3 ? 2 : 1;
      addStar(stars);
      completeMission(1);
      setMissionComplete(true);
    }
  };

  const handleRetry = () => {
    resetLives();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setMissionScore(0);
    setMissionComplete(false);
  };

  if (missionComplete) {
    return (
      <div className="game-container min-h-screen bg-gradient-to-b from-mint-light to-cream">
        <GameHeader title="Misi 1 Selesai!" showBack={false} />

        <div className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-80px)]">
          <motion.div
            className="bg-white rounded-3xl shadow-game p-8 text-center w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <Star className="w-16 h-16 text-yellow-soft fill-yellow-soft mx-auto" />
            </motion.div>

            <h2 className="text-2xl font-bold text-deep mt-4">Misi 1 Selesai!</h2>
            <p className="text-darkgray mt-2">Kamu telah membantu semua pasien!</p>

            <div className="mt-6">
              <StarDisplay
                count={Math.min(3, Math.ceil(missionScore / 20))}
                size="lg"
                animated
              />
            </div>

            <p className="text-3xl font-black text-sky mt-4">{missionScore} Poin</p>

            <motion.button
              onClick={() => setPage('mission2')}
              className="w-full mt-6 py-4 bg-sky text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-game hover:shadow-game-hover"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Lanjut ke Misi 2
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (lives <= 0) {
    return (
      <div className="game-container min-h-screen bg-gradient-to-b from-coral-light to-cream">
        <GameHeader title="Misi 1" showBack={false} />

        <div className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-80px)]">
          <motion.div
            className="bg-white rounded-3xl shadow-game p-8 text-center w-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <Heart className="w-16 h-16 text-coral mx-auto" />
            <h2 className="text-2xl font-bold text-coral-dark mt-4">
              Nyawa Habis!
            </h2>
            <p className="text-darkgray mt-2">Jangan menyerah, coba lagi!</p>

            <motion.button
              onClick={handleRetry}
              className="w-full mt-6 py-4 bg-coral text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-game"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="w-5 h-5" />
              Coba Lagi
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container min-h-screen bg-gradient-to-b from-sky-light/30 to-cream">
      <GameHeader
        title="Misi 1: Rumah Sakit"
        showBack={true}
        onBack={() => setPage('material')}
        showHelp={true}
      />

      <div className="p-4 space-y-4">
        {/* Lives and Progress */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-6 h-6 ${
                  i < lives ? 'text-coral fill-coral' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <ProgressBar
            current={currentIndex}
            total={mission1Questions.length}
            color="bg-sky"
          />
        </div>

        {/* Doctor and Patient */}
        <div className="bg-white rounded-2xl shadow-game p-4">
          <div className="flex items-start gap-3">
            <motion.img
              src={doctorImg}
              alt="Dokter"
              className="w-16 h-16 object-contain"
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="flex-1 bg-sky-light/50 rounded-xl p-3 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={currentQuestion.id}
            >
              {/* Speech bubble tail */}
              <div className="absolute -left-2 top-4 w-4 h-4 bg-sky-light/50 rotate-45" />
              <p className="text-darkgray text-sm font-medium relative z-10">
                {currentQuestion.patientRequest}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => {
            const partInfo = getBodyPartById(option);
            const isSelected = selectedAnswer === option;
            const isAnswerCorrect = option === currentQuestion.correctAnswer;

            let cardClass = 'bg-white border-2 border-transparent';
            if (showFeedback) {
              if (isAnswerCorrect) {
                cardClass = 'bg-mint border-2 border-mint-dark';
              } else if (isSelected && !isCorrect) {
                cardClass = 'bg-coral-light border-2 border-coral';
              }
            } else if (isSelected) {
              cardClass = 'bg-sky-light border-2 border-sky';
            }

            return (
              <motion.button
                key={option}
                className={`${cardClass} rounded-2xl shadow-game p-4 flex flex-col items-center gap-2 transition-all`}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!showFeedback ? { scale: 1.03 } : {}}
                whileTap={!showFeedback ? { scale: 0.97 } : {}}
              >
                <span className="text-lg font-bold text-deep">
                  {partInfo?.name}
                </span>
                {showFeedback && isAnswerCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <Star className="w-6 h-6 text-yellow-soft fill-yellow-soft" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              className={`rounded-2xl p-4 text-center ${
                isCorrect ? 'bg-mint-light' : 'bg-coral-light'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p
                className={`font-bold text-lg ${
                  isCorrect ? 'text-mint-dark' : 'text-coral-dark'
                }`}
              >
                {isCorrect ? getRandomCompliment() : 'Belum tepat'}
              </p>
              <p className="text-darkgray text-sm mt-1">
                {isCorrect
                  ? currentQuestion.correctFeedback
                  : currentQuestion.wrongFeedback}
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
