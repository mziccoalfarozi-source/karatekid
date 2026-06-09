import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Volume2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { GameHeader } from '../components/game/GameHeader';
import { ProgressBar } from '../components/game/ProgressBar';
import { quizQuestions, getRandomCompliment } from '../data/gameData';

export function QuizPage() {
  const { setPage, addScore, addStar, addQuizAnswer } = useGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const currentQuestion = quizQuestions[currentIndex];

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);
    addQuizAnswer(correct);
    setAnswers((prev) => [...prev, correct]);

    if (correct) {
      addScore(10);
      setQuizScore((prev) => prev + 10);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      // Quiz complete
      const correctCount = answers.filter((a) => a).length + (isCorrect ? 1 : 0);
      const stars = correctCount >= 8 ? 3 : correctCount >= 6 ? 2 : correctCount >= 4 ? 1 : 0;
      addStar(stars);
      setQuizComplete(true);
    }
  };

  if (quizComplete) {
    const totalCorrect = answers.filter((a) => a).length;
    const percentage = Math.round((totalCorrect / quizQuestions.length) * 100);

    return (
      <div className="game-container min-h-screen bg-gradient-to-b from-sky-light/30 to-cream">
        <GameHeader title="Quiz Selesai!" showBack={false} />

        <div className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-80px)]">
          <motion.div
            className="bg-white rounded-3xl shadow-game p-8 text-center w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-mint-light rounded-full flex items-center justify-center mx-auto">
                <Star className="w-10 h-10 text-yellow-soft fill-yellow-soft" />
              </div>
            </motion.div>

            <h2 className="text-2xl font-bold text-deep mt-4">Quiz Selesai!</h2>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center px-4 py-2 bg-cream rounded-xl">
                <span className="text-darkgray font-medium">Skor</span>
                <span className="text-2xl font-black text-sky">
                  {percentage}
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-2 bg-cream rounded-xl">
                <span className="text-darkgray font-medium">Benar</span>
                <span className="text-lg font-bold text-mint-dark">
                  {totalCorrect}/{quizQuestions.length}
                </span>
              </div>
            </div>

            {/* Stars */}
            <div className="mt-6 flex justify-center gap-2">
              {[1, 2, 3].map((star) => (
                <motion.div
                  key={star}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + star * 0.2, type: 'spring' }}
                >
                  <Star
                    className={`w-12 h-12 ${
                      star <= (totalCorrect >= 8 ? 3 : totalCorrect >= 6 ? 2 : totalCorrect >= 4 ? 1 : 0)
                        ? 'text-yellow-soft fill-yellow-soft'
                        : 'text-gray-300 fill-gray-200'
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => setPage('reward')}
              className="w-full mt-6 py-4 bg-sky text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-game"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Lihat Reward
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container min-h-screen bg-gradient-to-b from-cream to-cream-dark">
      <GameHeader
        title="Quiz Akhir"
        showBack={true}
        onBack={() => setPage('mission3')}
        showHelp={true}
      />

      <div className="p-4 space-y-4">
        {/* Progress */}
        <ProgressBar
          current={currentIndex}
          total={quizQuestions.length}
          color="bg-yellow-soft"
        />

        {/* Score */}
        <div className="text-center">
          <span className="text-sm font-semibold text-darkgray">
            Skor: {quizScore}
          </span>
        </div>

        {/* Question Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-game p-5"
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-deep leading-snug flex-1">
              {currentQuestion.question}
            </h3>
            <motion.button
              onClick={() => speakText(currentQuestion.question)}
              className="p-2 bg-sky-light rounded-full flex-shrink-0 hover:bg-sky transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Volume2 className="w-4 h-4 text-deep" />
            </motion.button>
          </div>
        </motion.div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, index) => {
            let cardClass = 'bg-white border-2 border-transparent hover:border-sky/50';
            
            if (showFeedback) {
              if (index === currentQuestion.correctIndex) {
                cardClass = 'bg-mint border-2 border-mint-dark';
              } else if (index === selectedAnswer && !isCorrect) {
                cardClass = 'bg-coral-light border-2 border-coral';
              }
            }

            return (
              <motion.button
                key={`${currentQuestion.id}-${index}`}
                className={`${cardClass} rounded-xl shadow-game p-4 text-left transition-all flex items-center gap-3`}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={!showFeedback ? { scale: 1.02, x: 5 } : {}}
                whileTap={!showFeedback ? { scale: 0.98 } : {}}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    showFeedback && index === currentQuestion.correctIndex
                      ? 'bg-mint-dark text-white'
                      : showFeedback && index === selectedAnswer && !isCorrect
                      ? 'bg-coral text-white'
                      : 'bg-sky-light text-deep'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-semibold text-darkgray">{option}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              className={`rounded-2xl p-4 ${
                isCorrect ? 'bg-mint-light' : 'bg-coral-light'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p
                className={`font-bold text-lg text-center ${
                  isCorrect ? 'text-mint-dark' : 'text-coral-dark'
                }`}
              >
                {isCorrect ? getRandomCompliment() : 'Belum tepat'}
              </p>
              {!isCorrect && (
                <p className="text-darkgray text-sm mt-2 text-center">
                  {currentQuestion.explanation}
                </p>
              )}

              <motion.button
                onClick={handleNext}
                className="w-full mt-3 py-3 bg-white text-deep font-bold rounded-xl shadow-sm flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentIndex < quizQuestions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
