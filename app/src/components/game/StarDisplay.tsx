import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface StarDisplayProps {
  count: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function StarDisplay({ count, max = 3, size = 'md', animated = false }: StarDisplayProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          initial={animated ? { scale: 0, rotate: -180 } : false}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
        >
          <Star
            className={`${sizeClasses[size]} ${
              i < count
                ? 'text-yellow-soft fill-yellow-soft'
                : 'text-gray-300 fill-gray-200'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}
