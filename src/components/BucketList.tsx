import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Plane, Utensils, Home, Camera, MapPin, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

const initialItems = [
  { id: 1, text: "Comer nosso primeiro shawarma", completed: true, icon: Utensils },
  { id: 2, text: "Fazer um piquenique no parque", completed: true, icon: Camera },
  { id: 3, text: "Ir na cachoeira", completed: true, icon: MapPin },
  { id: 4, text: "Viajar para a praia juntos", completed: false, icon: Plane },
  { id: 5, text: "Ir morar fora do Brasil", completed: false, icon: Globe },
  { id: 6, text: "Montar nosso próprio cantinho", completed: false, icon: Home },
];

export function BucketList() {
  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(i => i.completed).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-xl border border-rose-100 p-8 md:p-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50 pointer-events-none" />

      <div className="relative z-10">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold uppercase tracking-widest text-rose-400">Progresso dos Sonhos</span>
            <span className="text-2xl font-serif font-bold text-rose-900">{completedCount}/{items.length}</span>
          </div>
          <div className="w-full h-3 bg-rose-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-rose-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleItem(item.id)}
                className={cn(
                  "group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border",
                  item.completed 
                    ? "bg-rose-50/50 border-rose-100" 
                    : "bg-white border-gray-100 hover:border-rose-200 hover:shadow-md"
                )}
              >
                <div className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300",
                  item.completed ? "bg-rose-200 text-rose-600" : "bg-gray-50 text-gray-400 group-hover:bg-rose-50 group-hover:text-rose-400"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <span className={cn(
                  "flex-1 text-lg font-medium transition-all duration-300",
                  item.completed ? "text-rose-900/50 line-through decoration-rose-300" : "text-gray-700 group-hover:text-rose-900"
                )}>
                  {item.text}
                </span>

                <div className="flex-shrink-0">
                  {item.completed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-rose-500" />
                    </motion.div>
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 group-hover:text-rose-300 transition-colors" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
