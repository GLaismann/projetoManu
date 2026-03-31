import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const reasons = [
  "Sua franja me encanta a qualquer momento.",
  "O jeito único e carinhoso que você cuida de mim.",
  "Nossas conversas idiotas e profundas.",
  "A paz e a segurança que sinto quando estou com você.",
  "Sua risada gostosa que só você tem.",
  "A forma como você me apoia e acredita nos nossos sonhos."
];

function FlipCard({ reason, index }: { reason: string; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-64 cursor-pointer group"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-sm border border-rose-50 flex flex-col items-center justify-center p-6 group-hover:shadow-md transition-shadow"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <Heart className="w-8 h-8 text-rose-400" />
          </div>
          <h3 className="font-serif text-2xl text-rose-900">Motivo #{index + 1}</h3>
          <p className="text-[10px] text-rose-400 uppercase tracking-widest mt-3 font-bold opacity-70">Passe o mouse ou clique</p>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-rose-400 to-rose-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <Heart className="w-8 h-8 text-rose-100 mb-4 fill-rose-100 opacity-80" />
          <p className="text-white font-serif text-lg md:text-xl leading-relaxed drop-shadow-sm">
            "{reason}"
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function Reasons() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {reasons.map((reason, idx) => (
        <FlipCard key={idx} reason={reason} index={idx} />
      ))}
    </div>
  );
}
