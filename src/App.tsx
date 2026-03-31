import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Calendar, Clock, Camera, MessageCircleHeart, ChevronDown, Sparkles, Star, X, ChevronLeft, ChevronRight, Music, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "./lib/utils";
import { MusicPlayer } from "./components/MusicPlayer";
import { Particles } from "./components/Particles";
import { Reasons } from "./components/Reasons";
import { BucketList } from "./components/BucketList";

const Section = ({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={cn("py-16 md:py-24 px-6 max-w-7xl mx-auto", className)}>
    {children}
  </section>
);

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const startDate = new Date("2026-01-01T00:00:00");
  const [timeStats, setTimeStats] = useState({ days: 0, hours: 0, months: 0 });

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diffTime = Math.max(0, now.getTime() - startDate.getTime());
      
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diffTime / (1000 * 60 * 60));
      
      // Calculate months in a more 'human-friendly' way (rounding to nearest)
      const months = Math.round(diffTime / (1000 * 60 * 60 * 24 * 30.44));
      
      setTimeStats({ days, hours, months: Math.max(0, months) });
    };

    calculate();
    const timer = setInterval(calculate, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Dias", value: timeStats.days.toString(), icon: Calendar },
    { label: "Horas", value: timeStats.hours.toLocaleString(), icon: Clock },
    { label: "Memórias", value: "∞", icon: Camera },
  ];

  const milestones = [
    {
      month: "Mês 1",
      title: "O Início",
      description: "O frio na barriga do incio. Cada dia se tornando mais especial que o outro",
      image: "/photos/milestone1.jpg",
      tag: "ESTRELA",
      icon: Sparkles
    },
    {
      month: "Mês 2",
      title: "A Conexão",
      description: "Realização de que fomos feito um para o outro",
      image: "/photos/milestone2.jpg",
      tag: "CONEXÃO",
      icon: Heart
    },
    {
      month: "Mês 3",
      title: "Hoje",
      description: " A certeza de querer estar ao seu lado. Três meses do mais sincero amor.",
      image: "/photos/milestone3.jpg",
      tag: "CELEBRAÇÃO",
      icon: Star
    },
  ];

  const galleryImages = [
    { url: "/photos/gallery1.jpg", caption: "Nosso dia da cachoeira" },
    { url: "/photos/gallery2.jpg", caption: "Show ruim do arana" },
    { url: "/photos/gallery3.jpg", caption: "Strogonoff na sua casa" },
    { url: "/photos/gallery4.jpg", caption: "Conhecendo o pessoal do meu trabalho" },
    { url: "/photos/gallery5.jpg", caption: "Fotos no meio do mato" },
    { url: "/photos/gallery6.jpg", caption: "Primeiro natal com você" },
    { url: "/photos/gallery7.jpg", caption: "O mais esperado pedido" },
    { url: "/photos/gallery8.jpg", caption: "Seu olhar mais lindo" },
    { url: "/photos/gallery9.jpg", caption: "A tranquilidade sob seus braços" },
    { url: "/photos/gallery10.jpg", caption: "Dia do pequinique" },
    { url: "/photos/gallery11.jpg", caption: "Conhecendo sua familia de Foz" },
    { url: "/photos/gallery12.jpg", caption: "Minha gatinha com sua Marie" },
    { url: "/photos/gallery13.jpg", caption: "Meu amor fazendo a melhor maquiagem" },
    { url: "/photos/gallery14.jpg", caption: "Estar perto de você me acalma" },
    { url: "/photos/gallery15.jpg", caption: "Momentos gostosos contigo" },
    { url: "/photos/gallery16.jpg", caption: "Brincar na piscina igual criança" },
  ];

  const nextImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  }, [selectedImageIndex, galleryImages.length]);

  const prevImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  }, [selectedImageIndex, galleryImages.length]);

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, nextImage, prevImage, closeLightbox]);

  return (
    <div className="min-h-screen bg-[#fffcf9] text-[#2d2424] font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-rose-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span className="font-serif italic text-xl font-semibold text-rose-800">Nossa História</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase text-rose-900/60">
            <a href="#memories" className="hover:text-rose-600 transition-colors">Memórias</a>
            <a href="#milestones" className="hover:text-rose-600 transition-colors">Jornada</a>
            <a href="#reasons" className="hover:text-rose-600 transition-colors">Motivos</a>
            <a href="#plans" className="hover:text-rose-600 transition-colors">Planos</a>
            <a href="#letter" className="hover:text-rose-600 transition-colors">Carta</a>
            <a href="#gallery" className="hover:text-rose-600 transition-colors">Galeria</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/photos/hero.jpg" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fffcf9] via-transparent to-black/20" />
        </div>
        
        <Particles />
        
        <div className="relative z-20 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="font-serif italic text-6xl md:text-9xl text-rose-900 mb-4 drop-shadow-sm"
          >
            {timeStats.months} {timeStats.months === 1 ? 'Mês' : 'Meses'} de Nós
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl tracking-[0.3em] uppercase text-rose-800/80 mb-8"
          >
            Três meses de descobertas e amor sem fim
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <a 
              href="#memories"
              className="inline-flex items-center gap-2 bg-rose-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-rose-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-200"
            >
              Nossa Jornada
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </header>

      {/* Intro Section */}
      <Section id="memories" className="grid md:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <div className="relative group">
            <div className="absolute -inset-4 bg-rose-100 rounded-2xl -z-10 group-hover:rotate-2 transition-transform duration-500" />
            <img 
              src="/photos/intro.jpg" 
              alt="Momento especial" 
              className="w-full aspect-[4/5] object-cover rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </FadeIn>
        
        <div className="space-y-8">
          <FadeIn delay={0.2}>
            <h2 className="font-serif text-4xl md:text-6xl text-rose-900 leading-tight">
              Cada detalhe <br /> <span className="italic">importa...</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-lg leading-relaxed text-rose-900/70">
              Nesses últimos 90 dias, o mundo pareceu ganhar novas cores. Desde aquele primeiro shawarma até os planos para o futuro, cada momento foi uma peça fundamental no que estamos construindo. Não são apenas três meses, são muitas risadas, alguns jantares e um sentimento que só cresce.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={0.6 + i * 0.1} className="h-full">
                <div className="bg-white p-3 sm:p-6 rounded-2xl text-center shadow-sm border border-rose-50 hover:shadow-md transition-shadow flex flex-col items-center justify-center h-full">
                  <stat.icon className="w-5 h-5 mx-auto mb-2 sm:mb-3 text-rose-400" />
                  <span className="block text-lg sm:text-2xl md:text-3xl font-serif font-bold text-rose-900">{stat.value}</span>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-rose-400 font-bold mt-1">{stat.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* Timeline Section */}
      <div className="bg-rose-50/30">
        <Section id="milestones">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="font-serif text-5xl md:text-7xl text-rose-900 mb-4 italic">Nossa Jornada</h2>
              <div className="w-24 h-1 bg-rose-200 mx-auto rounded-full" />
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {milestones.map((item, i) => (
              <FadeIn key={item.month} delay={i * 0.2}>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="w-14 h-14 bg-rose-50 flex items-center justify-center rounded-full mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-rose-500" />
                  </div>
                  <h3 className="font-serif text-2xl text-rose-900 mb-2">{item.month}: {item.title}</h3>
                  <p className="text-rose-900/60 italic mb-6 text-sm">"{item.description}"</p>
                  <div className="relative overflow-hidden rounded-2xl aspect-video mb-6">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest bg-rose-100 text-rose-600 px-4 py-1.5 rounded-full uppercase">
                    {item.tag}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      </div>

      {/* Reasons Section */}
      <div className="bg-rose-50/10">
        <Section id="reasons" className="py-24">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="font-serif text-4xl md:text-6xl text-rose-900 mb-4 italic">Por que eu te amo</h2>
              <p className="text-rose-400 uppercase tracking-widest text-xs font-bold mb-6">6 de infinitos motivos</p>
              <div className="w-24 h-1 bg-rose-200 mx-auto rounded-full" />
            </FadeIn>
          </div>
          
          <FadeIn delay={0.2}>
            <Reasons />
          </FadeIn>
        </Section>
      </div>

      {/* Bucket List Section */}
      <div className="bg-white">
        <Section id="plans" className="py-24">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="font-serif text-4xl md:text-6xl text-rose-900 mb-4 italic">Nossa Bucket List</h2>
              <p className="text-rose-400 uppercase tracking-widest text-xs font-bold mb-6">Sonhos para realizarmos juntos</p>
              <div className="w-24 h-1 bg-rose-200 mx-auto rounded-full" />
            </FadeIn>
          </div>
          
          <FadeIn delay={0.2}>
            <BucketList />
          </FadeIn>
        </Section>
      </div>

      {/* Love Letter Section */}
      <Section id="letter" className="max-w-4xl">
        <FadeIn>
          <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden border border-rose-50">
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-50/50 rounded-bl-full -z-0" />
            <MessageCircleHeart className="w-12 h-12 text-rose-200 mb-8" />
            
            <article className="relative z-10 space-y-8 leading-loose text-rose-900/80 text-lg md:text-xl font-serif">
              <p>Meu amor,</p>
              <p>
                Montar isso me faz reviver cada segundo desses últimos meses. Parece pouco tempo, mas para nós, foi o suficiente para construir um universo inteiro. Lembro com clareza de como você sorriu na primeira vez que nos vimos, te levar pra casa por mais simples que foi, nos rendeu uma conexão inimaginavel e como aquele sorriso daquele dia se tornou meu porto seguro.
              </p>
              <p>
                Obrigado por ser minha calma nos dias agitados e minha alegria nos momentos simples. Ver seu cuidado por mim, nos meus dias doentes, nas dificuldades que passamos, me faz ter a certeza que você é a mulher com quem quero estar. Nesses três meses, você me ensinou que o amor não é apenas sobre grandes gestos, mas sobre estar presente, sobre o carinho e o conforto de saber que tenho você.
              </p>
              <p>
                Este é apenas o nosso "prefacio". Quero ainda escrever todos os outros capítulos ao seu lado. Feliz 3 meses para nós, hoje e sempre.
              </p>
              
              <div className="pt-12 text-right">
                <p className="italic text-2xl md:text-3xl text-rose-600">Com todo o meu amor, para sempre.</p>
              </div>
            </article>
          </div>
        </FadeIn>
      </Section>

      {/* Gallery Section */}
      <Section id="gallery" className="pb-32">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="font-serif text-5xl text-rose-900 mb-4 italic">Nossa Galeria</h2>
            <p className="text-rose-400 uppercase tracking-widest text-xs font-bold">Clique para ler nossa história</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <FadeIn key={i} delay={i * 0.05} className={cn(i % 2 !== 0 && "md:translate-y-8")}>
              <button 
                onClick={() => setSelectedImageIndex(i)}
                className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg group relative"
              >
                <img 
                  src={img.url} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={`Gallery ${i + 1}`} 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <Sparkles className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 mb-2" />
                  <p className="text-white text-[10px] font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                    {img.caption}
                  </p>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-[110]"
            >
              <X className="w-8 h-8" />
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors p-2 z-[110]"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors p-2 z-[110]"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div 
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative flex flex-col items-center max-w-5xl w-full"
            >
              <img 
                src={galleryImages[selectedImageIndex].url} 
                alt="Expanded view" 
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl mb-6"
                referrerPolicy="no-referrer"
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center max-w-2xl"
              >
                <h4 className="font-serif italic text-2xl md:text-3xl text-white mb-2">
                  {galleryImages[selectedImageIndex].caption}
                </h4>
                <div className="text-rose-400 text-xs font-bold uppercase tracking-[0.3em]">
                  Memória {selectedImageIndex + 1} de {galleryImages.length}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Soundtrack Section - Spotify Inspired */}
      <div className="bg-[#121212] text-white py-24 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-rose-900/20 to-transparent pointer-events-none" />
        
        <Section id="soundtrack">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <FadeIn className="w-full md:w-1/3">
              <div className="relative group aspect-square max-w-sm mx-auto">
                <div className="absolute -inset-4 bg-rose-500/20 rounded-2xl blur-2xl group-hover:bg-rose-500/30 transition-all duration-700" />
                <img 
                  src="/photos/gallery1.jpg" 
                  alt="Playlist Cover" 
                  className="w-full h-full object-cover rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <Music className="w-16 h-16 text-rose-500 animate-bounce" />
                </div>
              </div>
            </FadeIn>

            <div className="flex-1 space-y-8 w-full">
              <FadeIn delay={0.2}>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500">Playlist Exclusiva</span>
                  <h2 className="font-serif text-5xl md:text-7xl leading-tight">Nossa Trilha</h2>
                  <p className="text-gray-400 text-lg max-w-xl">
                    Músicas que contam nossa história. Cada batida é um lembrete de um momento que vivemos juntos nestes 3 meses.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4} className="w-full">
                <MusicPlayer playlistId="PLyfkbRRDO8jy3BaXZGBGakOhFfdO2OkSY" />
              </FadeIn>
            </div>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-rose-50/50 text-center border-t border-rose-100">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span className="font-serif italic text-lg text-rose-800">Nossa História</span>
        </div>
        <div className="flex justify-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-rose-400 mb-4">
          <a href="#" className="hover:text-rose-600 transition-colors">Nossas Memórias</a>
          <a href="#" className="hover:text-rose-600 transition-colors">3 Meses</a>
          <a href="#" className="hover:text-rose-600 transition-colors">Futuro</a>
        </div>
        <p className="text-[10px] tracking-widest uppercase text-rose-300">Com amor, para sempre & sempre</p>
      </footer>
    </div>
  );
}
