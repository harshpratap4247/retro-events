import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight, Clock, Disc3, Music2, Ticket, Award } from 'lucide-react';
import { FESTIVAL_DETAILS } from '../data/festivalData';
import { RetroSunburstHeaderArt, RetroDaisy, RetroCassette, RetroVinyl } from '../components/RetroGraphics';
import { retroAudio } from '../utils/audioPlayer';

interface HomePageProps {
  onNavigate: (route: string) => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onOpenJukebox?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, headingRef, onOpenJukebox }) => {
  // Live Countdown state targeting Feb 12, 2027
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const festivalDate = new Date(FESTIVAL_DETAILS.targetDate).getTime();
      const now = new Date().getTime();
      const difference = festivalDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (route: string) => {
    retroAudio.playGroovyChime();
    onNavigate(route);
  };

  return (
    <div className="w-full flex flex-col flex-1">
      {/* Hero Visual Section */}
      <section className="relative overflow-hidden bg-[#FAF0DF] border-b-4 border-[#713D29] pt-8 pb-16 md:pt-14 md:pb-20">
        {/* Retro 70s Striped Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-3 retro-stripes z-10" />

        {/* Floating Decorative Daisies */}
        <div className="absolute top-8 left-4 sm:left-12 opacity-60 hidden sm:block pointer-events-none animate-spin-slow">
          <RetroDaisy size={72} petalColor="#FAF0DF" centerColor="#D8753E" />
        </div>
        <div className="absolute bottom-8 right-6 sm:right-16 opacity-50 hidden sm:block pointer-events-none">
          <RetroDaisy size={84} petalColor="#FAF0DF" centerColor="#E7B84B" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          {/* Authentic 70s Arch Sunburst Banner Header */}
          <div className="mb-6 flex justify-center">
            <RetroSunburstHeaderArt />
          </div>

          {/* Main Hero Card Container */}
          <div className="bg-[#F3E4C8] border-4 border-[#713D29] rounded-3xl p-6 sm:p-10 md:p-12 shadow-retro text-center relative overflow-hidden">
            {/* Corner Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D8753E] text-[#F3E4C8] border-2 border-[#713D29] rounded-full font-retro-mono text-xs sm:text-sm font-bold shadow-retro-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>COLLEGE FESTIVAL PROTOYPE · EST. 1976</span>
            </div>

            {/* Accessible Focused Heading */}
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-groovy text-5xl sm:text-7xl md:text-8xl text-[#713D29] tracking-tight leading-none mb-4 outline-none focus:ring-4 focus:ring-[#D8753E] rounded-xl"
            >
              {FESTIVAL_DETAILS.name}
            </h1>

            {/* Tagline */}
            <p className="font-alfa text-xl sm:text-2xl md:text-3xl text-[#D8753E] uppercase tracking-wide mb-6">
              "{FESTIVAL_DETAILS.tagline}"
            </p>

            {/* Date and Venue Plaque */}
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl px-6 py-3.5 mb-8 shadow-retro-sm">
              <div className="flex items-center gap-2 text-sm sm:text-base font-retro-mono font-bold text-[#713D29]">
                <Calendar className="w-5 h-5 text-[#D8753E]" />
                <span>{FESTIVAL_DETAILS.dates}</span>
              </div>
              <div className="hidden sm:block text-[#713D29]/40 font-bold">•</div>
              <div className="flex items-center gap-2 text-sm sm:text-base font-retro-mono font-bold text-[#6D7851]">
                <MapPin className="w-5 h-5 text-[#6D7851]" />
                <span>{FESTIVAL_DETAILS.venue}</span>
              </div>
            </div>

            {/* Live Analog Flip / Clock Countdown */}
            <div className="mb-10 max-w-xl mx-auto">
              <div className="text-xs font-retro-mono font-bold tracking-widest text-[#713D29]/80 uppercase mb-3 flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D8753E]" />
                <span>COUNTDOWN TO GATES OPENING (12 FEB 2027)</span>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {[
                  { label: 'DAYS', value: timeLeft.days },
                  { label: 'HOURS', value: timeLeft.hours },
                  { label: 'MINUTES', value: timeLeft.minutes },
                  { label: 'SECONDS', value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#24140E] border-3 border-[#713D29] rounded-2xl p-2 sm:p-3 text-[#FAF0DF] shadow-retro-sm"
                  >
                    <div className="font-retro-mono font-bold text-2xl sm:text-4xl text-[#E7B84B]">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-xs font-retro-mono font-bold text-[#F3E4C8]/70 mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4">
              <button
                type="button"
                onClick={() => handleNavClick('#register')}
                className="w-full sm:w-auto px-8 py-4 bg-[#D8753E] hover:bg-[#c6652e] text-[#FAF0DF] font-alfa text-base sm:text-lg rounded-2xl border-3 border-[#713D29] shadow-retro hover:shadow-retro-lg hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Ticket className="w-5 h-5" />
                <span>REGISTER NOW</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('#events')}
                className="w-full sm:w-auto px-8 py-4 bg-[#E7B84B] hover:bg-[#d8a83a] text-[#713D29] font-alfa text-base sm:text-lg rounded-2xl border-3 border-[#713D29] shadow-retro hover:shadow-retro-lg hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-[#713D29]" />
                <span>BROWSE EVENTS</span>
              </button>
            </div>

            {/* Retro Vinyl Song Jukebox Quick Prompt */}
            {onOpenJukebox && (
              <div className="mt-6 pt-6 border-t-2 border-[#713D29]/20 flex flex-wrap items-center justify-center gap-3">
                <span className="text-xs font-retro-mono text-[#713D29]">
                  🎵 Want vintage 70s funk vibes or upload your own festival track?
                </span>
                <button
                  type="button"
                  onClick={onOpenJukebox}
                  className="px-3.5 py-1.5 bg-[#6D7851] text-[#FAF0DF] rounded-xl border-2 border-[#713D29] font-retro-mono text-xs font-bold shadow-retro-sm hover:bg-[#5b6543] cursor-pointer flex items-center gap-1.5"
                >
                  <Music2 className="w-3.5 h-3.5" />
                  <span>Open Hi-Fi Jukebox & Uploader</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* The 3 Mandatory Link Tiles: Events, Schedule, Register */}
      <section className="bg-[#F3E4C8] py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-[#713D29] paper-grain">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-retro-mono font-bold tracking-widest text-[#D8753E] uppercase">
              YOUR 3 STEPS TO FESTIVAL GLORY
            </span>
            <h2 className="font-groovy text-3xl sm:text-4xl text-[#713D29] mt-1">
              EXPLORE RETROFEST '26
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Tile 1: Events */}
            <div
              onClick={() => handleNavClick('#events')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavClick('#events')}
              className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-6 sm:p-8 shadow-retro hover:shadow-retro-lg hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between group focus:ring-4 focus:ring-[#D8753E] outline-none"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#D8753E]/20 border-2 border-[#713D29] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-[#D8753E]" />
                </div>
                <div className="text-xs font-retro-mono font-bold text-[#6D7851] uppercase tracking-wider mb-1">
                  PAGE 02
                </div>
                <h3 className="font-groovy text-2xl sm:text-3xl text-[#713D29] mb-3 group-hover:text-[#D8753E] transition-colors">
                  EVENTS
                </h3>
                <p className="text-sm text-[#713D29]/85 leading-relaxed mb-6 font-medium">
                  Browse 12+ competitions spanning Tech, Cultural, and Fun arenas across 3 days with custom poster photo uploads.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 font-alfa text-sm text-[#D8753E] group-hover:translate-x-1 transition-transform">
                <span>VIEW ALL EVENTS</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Tile 2: Schedule */}
            <div
              onClick={() => handleNavClick('#schedule')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavClick('#schedule')}
              className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-6 sm:p-8 shadow-retro hover:shadow-retro-lg hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between group focus:ring-4 focus:ring-[#D8753E] outline-none"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#E7B84B]/30 border-2 border-[#713D29] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Calendar className="w-7 h-7 text-[#713D29]" />
                </div>
                <div className="text-xs font-retro-mono font-bold text-[#D8753E] uppercase tracking-wider mb-1">
                  PAGE 03
                </div>
                <h3 className="font-groovy text-2xl sm:text-3xl text-[#713D29] mb-3 group-hover:text-[#D8753E] transition-colors">
                  SCHEDULE
                </h3>
                <p className="text-sm text-[#713D29]/85 leading-relaxed mb-6 font-medium">
                  Sorted 3-day multi-track timetable with time-slot grouping, stage clash detection, and side-by-side venue tracking.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 font-alfa text-sm text-[#713D29] group-hover:translate-x-1 transition-transform">
                <span>OPEN TIMETABLE</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Tile 3: Register */}
            <div
              onClick={() => handleNavClick('#register')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavClick('#register')}
              className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-6 sm:p-8 shadow-retro hover:shadow-retro-lg hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between group focus:ring-4 focus:ring-[#D8753E] outline-none"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#6D7851]/25 border-2 border-[#713D29] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Ticket className="w-7 h-7 text-[#6D7851]" />
                </div>
                <div className="text-xs font-retro-mono font-bold text-[#6D7851] uppercase tracking-wider mb-1">
                  PAGE 04
                </div>
                <h3 className="font-groovy text-2xl sm:text-3xl text-[#713D29] mb-3 group-hover:text-[#D8753E] transition-colors">
                  REGISTER
                </h3>
                <p className="text-sm text-[#713D29]/85 leading-relaxed mb-6 font-medium">
                  Claim your free admission badge with instant verification, custom event selection, and downloadable 1970s concert pass.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 font-alfa text-sm text-[#6D7851] group-hover:translate-x-1 transition-transform">
                <span>GET PASS NOW</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
