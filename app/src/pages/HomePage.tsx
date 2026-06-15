import { motion } from 'framer-motion';
import { Play, HelpCircle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { GuideModal } from '../components/game/GuideModal';
import characterImg from '../assets/images/character.png';

export function HomePage() {
  const { setPage, toggleGuide } = useGameStore();

  return (
    <div className="game-container relative min-h-screen flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/bg-playground.jpg')] md:bg-[url('/images/bg-playground-laptop.png')]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-light/30 to-cream/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen p-6">
        {/* Logo Area */}
        <motion.div
          className="text-center mt-8 md:mt-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-deep text-shadow tracking-tight">
            Aku Dan
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-deep text-shadow tracking-tight -mt-1 md:-mt-3">
            Tubuhku
          </h1>
          <p className="text-darkgray/80 font-semibold mt-2 md:mt-6 text-sm md:text-xl lg:text-2xl">
            Petualangan Mengenal Tubuhku
          </p>
        </motion.div>

        {/* Character */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.img
            src={characterImg}
            alt="Karate Kid"
            className="w-64 md:w-80 lg:w-96 h-auto drop-shadow-xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="w-full max-w-md md:max-w-lg space-y-3 mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={() => setPage('story')}
            className="w-full py-4 bg-sky text-white font-bold text-xl rounded-3xl shadow-game hover:shadow-game-hover flex items-center justify-center gap-3 active:scale-95 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Play className="w-6 h-6 fill-white" />
            Mulai Bermain
          </motion.button>

          <motion.button
            onClick={toggleGuide}
            className="w-full py-3 bg-cream-dark text-deep font-bold text-lg rounded-3xl shadow-game hover:shadow-game-hover flex items-center justify-center gap-3 border-2 border-sky/50 active:scale-95 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <HelpCircle className="w-5 h-5" />
            Petunjuk
          </motion.button>
        </motion.div>

        {/* Footer / Group Members */}
        <motion.div
          className="text-[10px] md:text-xs text-darkgray/80 text-center mb-2 bg-white/40 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-bold text-sky-dark mb-1 text-sm md:text-base">Anggota Kelompok:</p>
          <p>Diva Sonia Afriza (2422101144)</p>
          <p>Gisha Nur Ledyanita (2422101090)</p>
          <p>Indri Lestari (2422101118)</p>
          <p>Khaira Talita Silvia (2422101047)</p>
          <p>Ilma Zakiah Rachmah (2322402001)</p>
        </motion.div>
      </div>

      <GuideModal />
    </div>
  );
}
