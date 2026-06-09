import type { BodyPart } from '../store/gameStore';
import { BODY_PARTS } from '../store/gameStore';

export interface Mission1Question {
  id: number;
  patientRequest: string;
  correctAnswer: BodyPart;
  options: BodyPart[];
  correctFeedback: string;
  wrongFeedback: string;
}

export const mission1Questions: Mission1Question[] = [
  {
    id: 1,
    patientRequest: 'Aku ingin melihat pelangi. Bagian tubuh mana yang harus kugunakan?',
    correctAnswer: 'mata',
    options: ['mata', 'telinga', 'hidung', 'mulut'],
    correctFeedback: 'Hebat! Mata digunakan untuk melihat.',
    wrongFeedback: 'Belum tepat. Untuk melihat kita menggunakan mata.',
  },
  {
    id: 2,
    patientRequest: 'Aku ingin mencium bunga mawar. Bagian tubuh mana yang harus kugunakan?',
    correctAnswer: 'hidung',
    options: ['mata', 'hidung', 'telinga', 'kaki'],
    correctFeedback: 'Pintar! Hidung digunakan untuk mencium bau.',
    wrongFeedback: 'Belum tepat. Untuk mencium bau kita menggunakan hidung.',
  },
  {
    id: 3,
    patientRequest: 'Aku ingin mendengar lagu favoritku. Bagian tubuh mana yang harus kugunakan?',
    correctAnswer: 'telinga',
    options: ['mata', 'mulut', 'telinga', 'tangan'],
    correctFeedback: 'Keren! Telinga digunakan untuk mendengar.',
    wrongFeedback: 'Belum tepat. Untuk mendengar kita menggunakan telinga.',
  },
  {
    id: 4,
    patientRequest: 'Aku ingin makan kue yang lezat. Bagian tubuh mana yang harus kugunakan?',
    correctAnswer: 'mulut',
    options: ['hidung', 'mulut', 'tangan', 'kaki'],
    correctFeedback: 'Hebat! Mulut digunakan untuk makan.',
    wrongFeedback: 'Belum tepat. Untuk makan kita menggunakan mulut.',
  },
  {
    id: 5,
    patientRequest: 'Aku ingin memegang boneka kesayanganku. Bagian tubuh mana yang harus kugunakan?',
    correctAnswer: 'tangan',
    options: ['kaki', 'telinga', 'tangan', 'mata'],
    correctFeedback: 'Luar biasa! Tangan digunakan untuk memegang benda.',
    wrongFeedback: 'Belum tepat. Untuk memegang benda kita menggunakan tangan.',
  },
  {
    id: 6,
    patientRequest: 'Aku ingin berlari di taman. Bagian tubuh mana yang harus kugunakan?',
    correctAnswer: 'kaki',
    options: ['tangan', 'mata', 'kaki', 'hidung'],
    correctFeedback: 'Mantap! Kaki digunakan untuk berjalan dan berlari.',
    wrongFeedback: 'Belum tepat. Untuk berlari kita menggunakan kaki.',
  },
];

export interface Mission2Question {
  id: number;
  instruction: string;
  targetPart: BodyPart;
  distractorParts: BodyPart[];
  correctFeedback: string;
}

export const mission2Questions: Mission2Question[] = [
  {
    id: 1,
    instruction: 'Cari mata!',
    targetPart: 'mata',
    distractorParts: ['hidung', 'telinga'],
    correctFeedback: 'Benar! Mata digunakan untuk melihat.',
  },
  {
    id: 2,
    instruction: 'Cari hidung!',
    targetPart: 'hidung',
    distractorParts: ['mata', 'mulut'],
    correctFeedback: 'Pintar! Hidung digunakan untuk mencium bau.',
  },
  {
    id: 3,
    instruction: 'Cari telinga!',
    targetPart: 'telinga',
    distractorParts: ['mata', 'kaki'],
    correctFeedback: 'Hebat! Telinga digunakan untuk mendengar.',
  },
  {
    id: 4,
    instruction: 'Cari mulut!',
    targetPart: 'mulut',
    distractorParts: ['hidung', 'tangan'],
    correctFeedback: 'Keren! Mulut digunakan untuk makan dan berbicara.',
  },
  {
    id: 5,
    instruction: 'Cari tangan!',
    targetPart: 'tangan',
    distractorParts: ['kaki', 'telinga'],
    correctFeedback: 'Mantap! Tangan digunakan untuk memegang benda.',
  },
  {
    id: 6,
    instruction: 'Cari kaki!',
    targetPart: 'kaki',
    distractorParts: ['tangan', 'mata'],
    correctFeedback: 'Luar biasa! Kaki digunakan untuk berjalan dan berlari.',
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  image?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Bagian tubuh apa yang digunakan untuk melihat?',
    options: ['Mata', 'Hidung', 'Telinga', 'Mulut'],
    correctIndex: 0,
    explanation: 'Mata digunakan untuk melihat. Dengan mata, kita bisa melihat warna-warna indah di sekitar kita!',
  },
  {
    id: 2,
    question: 'Bagian tubuh apa yang digunakan untuk mencium bau?',
    options: ['Mata', 'Hidung', 'Telinga', 'Kaki'],
    correctIndex: 1,
    explanation: 'Hidung digunakan untuk mencium bau. Hidung kita bisa mencium bau bunga yang harum!',
  },
  {
    id: 3,
    question: 'Bagian tubuh apa yang digunakan untuk mendengar?',
    options: ['Mulut', 'Mata', 'Telinga', 'Tangan'],
    correctIndex: 2,
    explanation: 'Telinga digunakan untuk mendengar. Dengan telinga, kita bisa mendengar musik dan suara teman-teman!',
  },
  {
    id: 4,
    question: 'Bagian tubuh apa yang digunakan untuk makan?',
    options: ['Hidung', 'Kaki', 'Mulut', 'Mata'],
    correctIndex: 2,
    explanation: 'Mulut digunakan untuk makan. Di mulut, makanan dikunyah supaya bisa ditelan!',
  },
  {
    id: 5,
    question: 'Bagian tubuh apa yang digunakan untuk memegang benda?',
    options: ['Kaki', 'Tangan', 'Telinga', 'Mata'],
    correctIndex: 1,
    explanation: 'Tangan digunakan untuk memegang benda. Dengan tangan, kita bisa memegang pensil, buku, dan mainan!',
  },
  {
    id: 6,
    question: 'Bagian tubuh apa yang digunakan untuk berjalan?',
    options: ['Tangan', 'Mata', 'Kaki', 'Hidung'],
    correctIndex: 2,
    explanation: 'Kaki digunakan untuk berjalan dan berlari. Dengan kaki, kita bisa pergi ke sekolah dan bermain di taman!',
  },
  {
    id: 7,
    question: 'Berapa jumlah mata manusia?',
    options: ['Satu', 'Dua', 'Tiga', 'Empat'],
    correctIndex: 1,
    explanation: 'Manusia memiliki dua mata. Dua mata membantu kita melihat lebih jelas dan merasakan kedalaman!',
  },
  {
    id: 8,
    question: 'Di mana letak hidung?',
    options: ['Di kaki', 'Di tangan', 'Di tengah wajah', 'Di belakang kepala'],
    correctIndex: 2,
    explanation: 'Hidung terletak di tengah wajah, di antara dua mata dan di atas mulut.',
  },
  {
    id: 9,
    question: 'Apa fungsi telinga?',
    options: ['Untuk melihat', 'Untuk mencium', 'Untuk mendengar', 'Untuk makan'],
    correctIndex: 2,
    explanation: 'Telinga berfungsi untuk mendengar. Telinga juga membantu kita menjaga keseimbangan!',
  },
  {
    id: 10,
    question: 'Bagian tubuh mana yang membantu kita berlari cepat?',
    options: ['Mata', 'Kaki', 'Telinga', 'Hidung'],
    correctIndex: 1,
    explanation: 'Kaki membantu kita berlari cepat. Semakin sering berlatih, kaki kita akan semakin kuat!',
  },
];

export const compliments = [
  'Hebat sekali!',
  'Pintar!',
  'Keren!',
  'Luar biasa!',
  'Mantap!',
  'Hebat!',
];

export const getRandomCompliment = () => {
  return compliments[Math.floor(Math.random() * compliments.length)];
};

export const getBodyPartById = (id: BodyPart) => {
  return BODY_PARTS.find((part) => part.id === id);
};
