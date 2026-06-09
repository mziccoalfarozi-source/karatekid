import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, BookOpen, Gamepad2, Trophy, Volume2 } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export function GuideModal() {
  const { isGuideOpen, toggleGuide } = useGameStore();

  return (
    <AnimatePresence>
      {isGuideOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleGuide}
          />
          <motion.div
            className="relative w-full max-w-sm bg-cream rounded-3xl shadow-2xl p-6 overflow-hidden"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-deep">Petunjuk Bermain</h2>
              <button
                onClick={toggleGuide}
                className="p-2 rounded-full hover:bg-sky-light transition-colors"
              >
                <X className="w-5 h-5 text-darkgray" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <GuideItem
                icon={<BookOpen className="w-5 h-5" />}
                title="1. Pelajari Materi"
                description="Klik bagian-bagian tubuh untuk mempelajari nama dan fungsinya."
              />
              <GuideItem
                icon={<Gamepad2 className="w-5 h-5" />}
                title="2. Selesaikan Misi"
                description="Bantu pasien di Rumah Sakit Mini, tangkap bagian tubuh, dan lengkapi tubuh karakter."
              />
              <GuideItem
                icon={<Trophy className="w-5 h-5" />}
                title="3. Jawab Kuis"
                description="Jawab 10 soal kuis untuk menguji pengetahuanmu."
              />
              <GuideItem
                icon={<Play className="w-5 h-5" />}
                title="4. Dapatkan Reward"
                description="Kumpulkan bintang dan dapatkan sertifikat 'Sahabat Tubuh Hebat'!"
              />
              <GuideItem
                icon={<Volume2 className="w-5 h-5" />}
                title="Tips"
                description="Nyalakan suara untuk pengalaman belajar yang lebih seru!"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={toggleGuide}
              className="w-full mt-6 py-3 bg-sky text-white font-bold rounded-2xl hover:bg-deep transition-colors"
            >
              Mengerti!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GuideItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
      <div className="p-2 bg-sky-light rounded-lg text-deep flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-darkgray text-sm">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}
