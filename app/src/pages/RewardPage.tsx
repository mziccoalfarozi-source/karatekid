import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, RotateCcw, Download, Home } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { ConfettiEffect } from '../components/game/ConfettiEffect';
import { StarDisplay } from '../components/game/StarDisplay';
import html2canvas from 'html2canvas';
import characterCompleteImg from '../assets/images/character-complete.png';

export function RewardPage() {
  const { setPage, score, stars, resetGame, playerName, quizAnswers } = useGameStore();
  const certificateRef = useRef<HTMLDivElement>(null);

  const correctAnswers = quizAnswers.filter((a) => a).length;
  const totalQuestions = 10;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const handleDownloadCertificate = useCallback(async () => {
    if (certificateRef.current === null) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `sertifikat-sahabat-tubuh-${playerName || 'hebat'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate certificate:', err);
    }
  }, [playerName]);

  return (
    <div className="game-container min-h-screen bg-gradient-to-b from-yellow-soft/30 via-cream to-sky-light/30">
      <ConfettiEffect trigger={true} duration={5000} />

      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-yellow-soft/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-dark fill-yellow-soft" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-black text-deep">Selamat!</h1>
          <p className="text-darkgray mt-1">Kamu telah menyelesaikan petualangan!</p>
        </motion.div>

        {/* Character */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
        >
          <motion.img
            src={characterCompleteImg}
            alt="Karate Kid Lengkap"
            className="w-36 h-auto drop-shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Results Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-game p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center mb-4">
            <StarDisplay count={Math.min(3, stars)} size="lg" animated />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-cream rounded-xl p-3 text-center">
              <p className="text-xs text-darkgray/60">Total Skor</p>
              <p className="text-2xl font-black text-sky">{score}</p>
            </div>
            <div className="bg-cream rounded-xl p-3 text-center">
              <p className="text-xs text-darkgray/60">Quiz</p>
              <p className="text-2xl font-black text-mint-dark">
                {percentage}%
              </p>
            </div>
          </div>

          {/* Badge */}
          <motion.div
            className="mt-4 bg-gradient-to-r from-sky-light to-mint-light rounded-xl p-4 text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xs font-semibold text-deep/70 uppercase tracking-wider">
              Badge Penghargaan
            </p>
            <p className="text-lg font-black text-deep mt-1">
              Sahabat Tubuh Hebat
            </p>
          </motion.div>
        </motion.div>

        {/* Certificate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div
            ref={certificateRef}
            className="bg-white rounded-3xl shadow-xl p-6 border-4 border-yellow-soft/50"
            style={{
              background: 'linear-gradient(135deg, #FFFDF5 0%, #FFF8E7 50%, #B8E0F0 100%)',
            }}
          >
            <div className="text-center">
              <motion.div
                className="inline-block"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-12 h-12 text-yellow-soft fill-yellow-soft mx-auto" />
              </motion.div>

              <h2 className="text-xl font-black text-deep mt-3">
                SERTIFIKAT
              </h2>
              <p className="text-sm text-darkgray/70 mt-1">
                Sahabat Tubuh Hebat
              </p>

              <div className="my-4 py-3 border-y-2 border-dashed border-sky/30">
                <p className="text-sm text-darkgray">
                  Diberikan kepada:
                </p>
                <p className="text-2xl font-black text-deep mt-1">
                  {playerName || 'Pejuang Tubuh'}
                </p>
              </div>

              <p className="text-sm text-darkgray leading-relaxed">
                Selamat! Kamu berhasil menyelesaikan petualangan mengenal
                bagian tubuh dan menjadi{' '}
                <span className="font-bold text-deep">Sahabat Tubuh Hebat</span>.
              </p>

              <div className="mt-4 flex justify-center gap-4 text-xs text-darkgray/60">
                <span>Skor: {score}</span>
                <span>|</span>
                <span>Bintang: {stars}</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <motion.button
            onClick={handleDownloadCertificate}
            className="w-full mt-3 py-3 bg-yellow-soft text-darkgray font-bold rounded-2xl flex items-center justify-center gap-2 shadow-game hover:shadow-game-hover"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-5 h-5" />
            Unduh Sertifikat
          </motion.button>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <motion.button
            onClick={() => {
              resetGame();
              setPage('home');
            }}
            className="w-full py-3 bg-sky text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-game hover:shadow-game-hover"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-5 h-5" />
            Main Lagi
          </motion.button>

          <motion.button
            onClick={() => setPage('home')}
            className="w-full py-3 bg-cream-dark text-deep font-bold rounded-2xl flex items-center justify-center gap-2 border-2 border-sky/30 hover:border-sky transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </motion.button>
        </div>
      </div>
    </div>
  );
}
