import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { HomePage } from './pages/HomePage';
import { StoryPage } from './pages/StoryPage';
import { MaterialPage } from './pages/MaterialPage';
import { Mission1Page } from './pages/Mission1Page';
import { Mission2Page } from './pages/Mission2Page';
import { Mission3Page } from './pages/Mission3Page';
import { QuizPage } from './pages/QuizPage';
import { RewardPage } from './pages/RewardPage';

const pageComponents: Record<string, React.ComponentType> = {
  home: HomePage,
  story: StoryPage,
  material: MaterialPage,
  mission1: Mission1Page,
  mission2: Mission2Page,
  mission3: Mission3Page,
  quiz: QuizPage,
  reward: RewardPage,
};

export default function App() {
  const { currentPage } = useGameStore();
  const CurrentPageComponent = pageComponents[currentPage] || HomePage;

  return (
    <div className="min-h-screen w-full bg-cream flex justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <CurrentPageComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
