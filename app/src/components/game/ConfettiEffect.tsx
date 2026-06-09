import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger: boolean;
  duration?: number;
}

export function ConfettiEffect({ trigger, duration = 3000 }: ConfettiEffectProps) {
  useEffect(() => {
    if (!trigger) return;

    const endTime = Date.now() + duration;
    const colors = ['#8ECAE6', '#A8D5BA', '#FFE082', '#FFAB91', '#FFF8E7'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        shapes: ['circle', 'square'],
        scalar: 0.8,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        shapes: ['circle', 'square'],
        scalar: 0.8,
      });

      if (Date.now() < endTime) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Big burst at start
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      shapes: ['circle', 'square', 'star'],
      scalar: 1.2,
    });
  }, [trigger, duration]);

  return null;
}
