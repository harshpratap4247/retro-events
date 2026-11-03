import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, MapPin, ArrowRight, Ticket } from 'lucide-react';
import { RetroDaisy, RetroVinyl, RetroCassette, RetroSunburstHeaderArt } from './RetroGraphics';
import { FESTIVAL_DETAILS } from '../data/festivalData';
import { retroAudio } from '../utils/audioPlayer';

export const Hero: React.FC = () => {
  // Live countdown to festival date
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 30,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    retroAudio.playGroovyChime();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 md:py-20 border-b-4 border-[#713D29] bg-[#F3E4C8] paper-grain">
      
      {/* Decorative Floating Groovy Motifs */}
      <div className="absolute top-6 left-6 opacity-80 pointer-events-none select-none hidden md:block">
        <RetroDaisy size={64} petalColor="#FAF0DF" centerColor="#E7B84B" />
      </div>
      <div className="absolute top-12 right-10 opacity-80 pointer-events-none select-none hidden md:block">
        <RetroDaisy size={52} petalColor="#E7B84B" centerColor="#D8753E" />
      </div>
      <div className="absolute bottom-8 left-12 opacity-70 pointer-events-none select-none hidden lg:block">
        <RetroCassette width={130} height={84} />
      </div>
      <div className="absolute bottom-6 right-8 opacity-70 pointer-events-none select-none hidden lg:block">
        <RetroVinyl size={100} spinning={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Retro Badge Header Pill-Free Clean Kicker */}
        <div className="flex items-center justify-center gap-2 mb-4 text-xs md:text-sm font-retro-mono font-bold text-[#713D29] tracking-wider uppercase">
          <span>Starlight University Presents</span>
          <span aria-hidden="true" className="text-[#D8753E]">•</span>
          <span>Annual Golden Jubilee Inter-College Fest</span>
          <span aria-hidden="true" className="text-[#D8753E]">•</span>
          <span>Est. 1976</span>
        </div>

        {/* Centerpiece Hero Layout */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Main 70s Heading */}
          <h1 className="font-groovy text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#713D29] tracking-tight leading-[1.08] mb-4 drop-shadow-[2px_2px_0px_#FAF0DF]">
            LET'S GO BACK TO THE 70s!
          </h1>

          {/* Golden Tagline */}
          <div className="inline-block bg-[#E7B84B] px-6 py-2 border-3 border-[#713D29] rounded-xl shadow-retro transform -rotate-1 mb-6">
            <p className="font-retro-slab text-base sm:text-xl md:text-2xl text-[#713D29] tracking-wide">
              {FESTIVAL_DETAILS.tagline}
            </p>
          </div>

          {/* Sunburst Artwork Feature */}
          <div className="my-6 max-w-md mx-auto relative">
            <RetroSunburstHeaderArt className="drop-shadow-lg" />
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
              <span className="bg-[#FAF0DF] border-2 border-[#713D29] px-4 py-1 rounded-full text-xs font-retro-mono font-bold shadow-retro-sm text-[#713D29]">
                50 YEARS OF CAMPUS GROOVE
              </span>
            </div>
          </div>

          {/* Short Introduction */}
          <p className="text-base sm:text-lg md:text-xl text-[#713D29] leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
            Step through the time warp for an unforgettable 2-day extravaganza! Where Woodstock spirit meets cutting-edge engineering, acoustic soul fuses with analog synths, and the brightest creative minds across 40+ colleges unite.
          </p>

          {/* Festival Date & Venue Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10 text-xs md:text-sm font-retro-mono text-[#713D29]">
            <div className="flex items-center gap-2 bg-[#FAF0DF] px-4 py-2 border-2 border-[#713D29] rounded-lg shadow-retro-sm font-bold">
              <Calendar className="w-4 h-4 text-[#D8753E]" />
              <span>{FESTIVAL_DETAILS.dates}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF0DF] px-4 py-2 border-2 border-[#713D29] rounded-lg shadow-retro-sm font-bold">
              <MapPin className="w-4 h-4 text-[#6D7851]" />
              <span>{FESTIVAL_DETAILS.venue}</span>
            </div>
          </div>

          {/* Prominent Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            <button
              type="button"
              onClick={() => scrollToSection('events')}
              className="btn-retro px-6 sm:px-8 py-3.5 sm:py-4 bg-[#D8753E] text-[#F3E4C8] text-sm sm:text-base md:text-lg font-retro-slab tracking-wider border-3 border-[#713D29] rounded-xl shadow-retro-lg flex items-center gap-2.5 cursor-pointer hover:bg-[#c66530]"
            >
              <span>EXPLORE EVENTS</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('jukebox')}
              className="btn-retro px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E7B84B] text-[#713D29] text-sm sm:text-base md:text-lg font-retro-slab tracking-wider border-3 border-[#713D29] rounded-xl shadow-retro-lg flex items-center gap-2.5 cursor-pointer hover:bg-[#d8a83a]"
            >
              <Sparkles className="w-5 h-5 text-[#D8753E]" />
              <span>UPLOAD SONG</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('register')}
              className="btn-retro px-6 sm:px-8 py-3.5 sm:py-4 bg-[#6D7851] text-[#FAF0DF] text-sm sm:text-base md:text-lg font-retro-slab tracking-wider border-3 border-[#713D29] rounded-xl shadow-retro-lg flex items-center gap-2.5 cursor-pointer hover:bg-[#5b6543]"
            >
              <Ticket className="w-5 h-5" />
              <span>CLAIM PASS</span>
            </button>
          </div>

          {/* 70s Analog Countdown Clock */}
          <div className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-4 sm:p-6 shadow-retro max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs font-retro-mono font-bold text-[#713D29] mb-3 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#D8753E]" />
              <span>Festival Countdown to Showtime</span>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              <div className="bg-[#F3E4C8] border-2 border-[#713D29] rounded-lg p-2 sm:p-3 shadow-retro-sm">
                <span className="block font-retro-mono text-2xl sm:text-3xl font-bold text-[#D8753E] tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-[#713D29] uppercase">Days</span>
              </div>
              <div className="bg-[#F3E4C8] border-2 border-[#713D29] rounded-lg p-2 sm:p-3 shadow-retro-sm">
                <span className="block font-retro-mono text-2xl sm:text-3xl font-bold text-[#713D29] tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-[#713D29] uppercase">Hours</span>
              </div>
              <div className="bg-[#F3E4C8] border-2 border-[#713D29] rounded-lg p-2 sm:p-3 shadow-retro-sm">
                <span className="block font-retro-mono text-2xl sm:text-3xl font-bold text-[#6D7851] tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-[#713D29] uppercase">Mins</span>
              </div>
              <div className="bg-[#F3E4C8] border-2 border-[#713D29] rounded-lg p-2 sm:p-3 shadow-retro-sm">
                <span className="block font-retro-mono text-2xl sm:text-3xl font-bold text-[#D8753E] tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-[#713D29] uppercase">Secs</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
