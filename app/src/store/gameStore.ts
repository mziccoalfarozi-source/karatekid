import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BodyPart = 'mata' | 'hidung' | 'telinga' | 'mulut' | 'tangan' | 'kaki';

export type GamePage = 
  | 'home' 
  | 'story' 
  | 'material' 
  | 'mission1' 
  | 'mission2' 
  | 'mission3' 
  | 'quiz' 
  | 'reward';

export interface BodyPartInfo {
  id: BodyPart;
  name: string;
  function: string;
  image: string;
}

export const BODY_PARTS: BodyPartInfo[] = [
  { id: 'mata', name: 'Mata', function: 'Digunakan untuk melihat', image: '/src/assets/images/eye.png' },
  { id: 'hidung', name: 'Hidung', function: 'Digunakan untuk mencium bau', image: '/src/assets/images/nose.png' },
  { id: 'telinga', name: 'Telinga', function: 'Digunakan untuk mendengar', image: '/src/assets/images/ear.png' },
  { id: 'mulut', name: 'Mulut', function: 'Digunakan untuk makan dan berbicara', image: '/src/assets/images/mouth.png' },
  { id: 'tangan', name: 'Tangan', function: 'Digunakan untuk memegang benda', image: '/src/assets/images/hand.png' },
  { id: 'kaki', name: 'Kaki', function: 'Digunakan untuk berjalan dan berlari', image: '/src/assets/images/foot.png' },
];

interface GameState {
  currentPage: GamePage;
  score: number;
  stars: number;
  lives: number;
  learnedParts: BodyPart[];
  completedMissions: number[];
  quizAnswers: boolean[];
  currentQuizIndex: number;
  currentMission1Index: number;
  currentMission2Index: number;
  mission3Completed: boolean;
  playerName: string;
  isGuideOpen: boolean;
  isSoundOn: boolean;
  
  // Actions
  setPage: (page: GamePage) => void;
  addScore: (points: number) => void;
  addStar: (count: number) => void;
  loseLife: () => void;
  resetLives: () => void;
  learnPart: (part: BodyPart) => void;
  completeMission: (missionId: number) => void;
  addQuizAnswer: (isCorrect: boolean) => void;
  setCurrentQuizIndex: (index: number) => void;
  setCurrentMission1Index: (index: number) => void;
  setCurrentMission2Index: (index: number) => void;
  setMission3Completed: (completed: boolean) => void;
  setPlayerName: (name: string) => void;
  toggleGuide: () => void;
  toggleSound: () => void;
  resetGame: () => void;
  getTotalStars: () => number;
}

const initialState = {
  currentPage: 'home' as GamePage,
  score: 0,
  stars: 0,
  lives: 3,
  learnedParts: [],
  completedMissions: [],
  quizAnswers: [],
  currentQuizIndex: 0,
  currentMission1Index: 0,
  currentMission2Index: 0,
  mission3Completed: false,
  playerName: '',
  isGuideOpen: false,
  isSoundOn: true,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setPage: (page) => set({ currentPage: page }),
      
      addScore: (points) => set((state) => ({ score: state.score + points })),
      
      addStar: (count) => set((state) => ({ stars: state.stars + count })),
      
      loseLife: () => set((state) => ({ lives: Math.max(0, state.lives - 1) })),
      
      resetLives: () => set({ lives: 3 }),
      
      learnPart: (part) => set((state) => ({
        learnedParts: state.learnedParts.includes(part) 
          ? state.learnedParts 
          : [...state.learnedParts, part],
      })),
      
      completeMission: (missionId) => set((state) => ({
        completedMissions: state.completedMissions.includes(missionId)
          ? state.completedMissions
          : [...state.completedMissions, missionId],
      })),
      
      addQuizAnswer: (isCorrect) => set((state) => ({
        quizAnswers: [...state.quizAnswers, isCorrect],
      })),
      
      setCurrentQuizIndex: (index) => set({ currentQuizIndex: index }),
      
      setCurrentMission1Index: (index) => set({ currentMission1Index: index }),
      
      setCurrentMission2Index: (index) => set({ currentMission2Index: index }),
      
      setMission3Completed: (completed) => set({ mission3Completed: completed }),
      
      setPlayerName: (name) => set({ playerName: name }),
      
      toggleGuide: () => set((state) => ({ isGuideOpen: !state.isGuideOpen })),
      
      toggleSound: () => set((state) => ({ isSoundOn: !state.isSoundOn })),
      
      resetGame: () => set({
        ...initialState,
        playerName: get().playerName,
      }),
      
      getTotalStars: () => {
        const state = get();
        let total = 0;
        // Stars from missions
        state.completedMissions.forEach(() => total += 1);
        // Stars from quiz
        const correctAnswers = state.quizAnswers.filter(a => a).length;
        if (correctAnswers >= 8) total += 3;
        else if (correctAnswers >= 6) total += 2;
        else if (correctAnswers >= 4) total += 1;
        return total;
      },
    }),
    {
      name: 'aku-dan-tubuhku-game',
      partialize: (state) => ({
        score: state.score,
        stars: state.stars,
        learnedParts: state.learnedParts,
        completedMissions: state.completedMissions,
        quizAnswers: state.quizAnswers,
        playerName: state.playerName,
      }),
    }
  )
);
