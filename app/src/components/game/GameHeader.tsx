import { ArrowLeft, Volume2, VolumeX, HelpCircle } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { StarDisplay } from './StarDisplay';

interface GameHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showStars?: boolean;
  starCount?: number;
  showHelp?: boolean;
}

export function GameHeader({
  title,
  showBack = true,
  onBack,
  showStars = false,
  starCount = 0,
  showHelp = false,
}: GameHeaderProps) {
  const { isSoundOn, toggleSound, toggleGuide } = useGameStore();

  return (
    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-sky-light hover:bg-sky transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-deep" />
          </button>
        )}
        <h1 className="text-lg font-bold text-deep">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {showStars && <StarDisplay count={starCount} size="sm" />}
        
        <button
          onClick={toggleSound}
          className="p-2 rounded-full bg-sky-light hover:bg-sky transition-colors active:scale-95"
        >
          {isSoundOn ? (
            <Volume2 className="w-5 h-5 text-deep" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {showHelp && (
          <button
            onClick={toggleGuide}
            className="p-2 rounded-full bg-yellow-soft/50 hover:bg-yellow-soft transition-colors active:scale-95"
          >
            <HelpCircle className="w-5 h-5 text-darkgray" />
          </button>
        )}
      </div>
    </div>
  );
}
