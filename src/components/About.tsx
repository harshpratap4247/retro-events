import React, { useState } from 'react';
import { Cpu, Music, Sparkles, Award, Lightbulb, Compass, Radio } from 'lucide-react';
import { RetroDaisy, WavyDivider } from './RetroGraphics';
import { retroAudio } from '../utils/audioPlayer';

export const About: React.FC = () => {
  const [activeCapsule, setActiveCapsule] = useState<number>(0);

  const timeCapsules = [
    {
      year: '1976',
      title: 'The Spark: Garage Computing & Analog Funk',
      description: 'The year Steve Wozniak hand-built the Apple I, the NASA Viking landed on Mars, and Stevie Wonder released Songs in the Key of Life. Our college held its first campus hackathon and acoustic showdown!'
    },
    {
      year: '1986',
      title: 'The Shift: 8-Bit Revolution & Golden Synthesizers',
      description: 'Microprocessors entered student dorms, MIDI controllers revolutionized campus jam sessions, and inter-collegiate coding competitions were born.'
    },
    {
      year: '2026',
      title: 'The Golden Jubilee: Woodstock Meets Silicon Valley',
      description: 'Fifty years later, RETROFEST \'26 bridges generations: combining vintage analog warmth and hands-on maker spirit with next-generation autonomous robotics, algorithms, and cultural fusion.'
    }
  ];

  return (
    <section id="about" className="relative bg-[#FAF0DF] text-[#713D29] pt-16 pb-20 border-b-4 border-[#713D29]">
      
      {/* Top Section Decorative Wavy Curve */}
      <WavyDivider fill="#FAF0DF" stroke="#713D29" className="-mt-16 md:-mt-24 mb-6" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-retro-mono font-bold tracking-widest text-[#D8753E] uppercase mb-2">
            <Radio className="w-4 h-4" />
            <span>Chapter 01 · The Heritage & Philosophy</span>
          </div>
          <h2 className="font-groovy text-4xl sm:text-5xl md:text-6xl text-[#713D29] leading-tight mb-4">
            CELEBRATING TECH, SOUL & INNOVATION
          </h2>
          <div className="w-32 h-1.5 bg-[#D8753E] mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg text-[#713D29]/90 leading-relaxed font-medium">
            RETROFEST '26 is not just a campus fest; it is a full-sensory time machine. We honor the pioneering dreamers of the 1970s who laid the bedrock for personal computers, electronic music, and cultural revolutions, reimagined for the forward-thinking minds of 2026.
          </p>
        </div>

        {/* 3 Vintage Editorial Thematic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: Technology & Hardware */}
          <div className="bg-[#F3E4C8] border-3 border-[#713D29] rounded-2xl p-6 sm:p-8 shadow-retro relative overflow-hidden group hover:-translate-y-1 transition-all duration-200">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#E7B84B]/20 rounded-bl-full pointer-events-none" />
            <div className="w-14 h-14 rounded-xl bg-[#D8753E] border-2 border-[#713D29] flex items-center justify-center text-[#F3E4C8] mb-6 shadow-retro-sm">
              <Cpu className="w-7 h-7" />
            </div>
            <div className="text-xs font-retro-mono text-[#D8753E] font-bold uppercase tracking-wide mb-1">
              Pillar 01 · Engineering
            </div>
            <h3 className="font-retro-slab text-xl sm:text-2xl text-[#713D29] mb-3">
              Pioneering Tech
            </h3>
            <p className="text-sm sm:text-base text-[#713D29]/85 leading-relaxed mb-4">
              From low-level bit manipulation and retro arcade graphics to autonomous rover competitions. Real engineers testing their craft against real algorithmic challenges.
            </p>
            <div className="pt-4 border-t-2 border-[#713D29]/20 text-xs font-retro-mono font-bold text-[#6D7851]">
              Code Sprint · Robotics · Tech Quiz
            </div>
          </div>

          {/* Card 2: Culture & Music */}
          <div className="bg-[#F3E4C8] border-3 border-[#713D29] rounded-2xl p-6 sm:p-8 shadow-retro relative overflow-hidden group hover:-translate-y-1 transition-all duration-200">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D8753E]/20 rounded-bl-full pointer-events-none" />
            <div className="w-14 h-14 rounded-xl bg-[#E7B84B] border-2 border-[#713D29] flex items-center justify-center text-[#713D29] mb-6 shadow-retro-sm">
              <Music className="w-7 h-7" />
            </div>
            <div className="text-xs font-retro-mono text-[#D8753E] font-bold uppercase tracking-wide mb-1">
              Pillar 02 · Expression
            </div>
            <h3 className="font-retro-slab text-xl sm:text-2xl text-[#713D29] mb-3">
              Soulful Culture
            </h3>
            <p className="text-sm sm:text-base text-[#713D29]/85 leading-relaxed mb-4">
              Golden-era rock anthems, disco street dance battles, acoustic showcases, and retro runway styling. Unleashing raw creativity under sunset amphitheatre spotlights.
            </p>
            <div className="pt-4 border-t-2 border-[#713D29]/20 text-xs font-retro-mono font-bold text-[#D8753E]">
              Dance Battle · Singing Star · Fashion Walk
            </div>
          </div>

          {/* Card 3: Creative Community */}
          <div className="bg-[#F3E4C8] border-3 border-[#713D29] rounded-2xl p-6 sm:p-8 shadow-retro relative overflow-hidden group hover:-translate-y-1 transition-all duration-200">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#6D7851]/20 rounded-bl-full pointer-events-none" />
            <div className="w-14 h-14 rounded-xl bg-[#6D7851] border-2 border-[#713D29] flex items-center justify-center text-[#FAF0DF] mb-6 shadow-retro-sm">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="text-xs font-retro-mono text-[#6D7851] font-bold uppercase tracking-wide mb-1">
              Pillar 03 · Community
            </div>
            <h3 className="font-retro-slab text-xl sm:text-2xl text-[#713D29] mb-3">
              Groovy Synergy
            </h3>
            <p className="text-sm sm:text-base text-[#713D29]/85 leading-relaxed mb-4">
              Fostering inter-collegiate camaraderie where computer scientists jam with musicians, and mechanical makers design couture props with fashion choreographers.
            </p>
            <div className="pt-4 border-t-2 border-[#713D29]/20 text-xs font-retro-mono font-bold text-[#713D29]">
              40+ Colleges · 5,000+ Attendees
            </div>
          </div>

        </div>

        {/* Vintage Poster Box: 1976 Time Capsule Explorer */}
        <div className="bg-[#F3E4C8] border-4 border-[#713D29] rounded-3xl p-6 sm:p-10 shadow-retro-lg max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-[#713D29]/30">
            <div>
              <div className="text-xs font-retro-mono text-[#D8753E] font-bold uppercase tracking-widest">
                Interactive Exhibition
              </div>
              <h3 className="font-groovy text-2xl sm:text-3xl text-[#713D29]">
                THE 1970s ANALOG-DIGITAL CAPSULE
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <RetroDaisy size={36} petalColor="#FAF0DF" centerColor="#D8753E" />
              <span className="font-retro-mono text-xs font-bold text-[#713D29]">
                50-YEAR CHRONICLE
              </span>
            </div>
          </div>

          {/* Interactive Year Selector Tabs */}
          <div className="flex items-center gap-2 mt-6 mb-6 overflow-x-auto pb-1">
            {timeCapsules.map((item, index) => (
              <button
                key={item.year}
                type="button"
                onClick={() => {
                  retroAudio.playGroovyChime();
                  setActiveCapsule(index);
                }}
                className={`px-4 py-2 rounded-lg font-retro-mono text-xs sm:text-sm font-bold border-2 border-[#713D29] transition-all whitespace-nowrap cursor-pointer ${
                  activeCapsule === index
                    ? 'bg-[#D8753E] text-[#F3E4C8] shadow-retro-sm -translate-y-0.5'
                    : 'bg-[#FAF0DF] text-[#713D29] hover:bg-[#E7B84B]/30'
                }`}
              >
                {item.year} ERA
              </button>
            ))}
          </div>

          {/* Capsule Content Display */}
          <div className="bg-[#FAF0DF] border-2 border-[#713D29] rounded-xl p-6 shadow-inner">
            <h4 className="font-retro-slab text-lg sm:text-xl text-[#713D29] mb-2">
              {timeCapsules[activeCapsule].title}
            </h4>
            <p className="text-sm sm:text-base text-[#713D29]/90 leading-relaxed font-medium">
              {timeCapsules[activeCapsule].description}
            </p>
          </div>

          {/* Vintage Poster Seal */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-retro-mono text-[#713D29]/75 pt-4 border-t border-[#713D29]/20">
            <span>Official Festival Seal of Accreditation</span>
            <span className="font-bold text-[#D8753E]">VERIFIED RETRO VIBE · 100% ANALOG APPROVED</span>
          </div>

        </div>

      </div>
    </section>
  );
};
