import React from 'react';
import { Play, ExternalLink, Music } from 'lucide-react';

export function MusicPlayer({ playlistId }: { playlistId: string }) {
  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;

  return (
    <div className="bg-[#181818] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl w-full flex flex-col items-center text-center relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-rose-500/10 blur-[100px] pointer-events-none group-hover:bg-rose-500/20 transition-colors duration-700" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 bg-gradient-to-br from-rose-500/20 to-rose-900/40 rounded-full flex items-center justify-center mb-6 shadow-lg border border-rose-500/20 group-hover:scale-110 transition-transform duration-500">
          <Music className="w-12 h-12 text-rose-400" />
        </div>
        
        

        <a 
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-black hover:bg-rose-50 hover:text-rose-600 font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(225,29,72,0.3)]"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Ouvir no YouTube</span>
          <ExternalLink className="w-4 h-4 ml-1 opacity-50" />
        </a>
      </div>
    </div>
  );
}
