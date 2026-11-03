import React from 'react';
import { ArrowUp, Code, Disc, MapPin, Mail, Sparkles } from 'lucide-react';
import { RetroDaisy } from './RetroGraphics';
import { FESTIVAL_DETAILS } from '../data/festivalData';
import { retroAudio } from '../utils/audioPlayer';

interface FooterProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenExport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentRoute, onNavigate, onOpenExport }) => {
  const scrollToTop = () => {
    retroAudio.playGroovyChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Events', href: '#events' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Register', href: '#register' },
  ];

  const handleLinkClick = (href: string) => {
    retroAudio.playGroovyChime();
    onNavigate(href);
  };

  return (
    <footer className="bg-[#713D29] text-[#FAF0DF] pt-12 pb-10 border-t-4 border-[#D8753E] relative overflow-hidden mt-auto">
      {/* Subtle retro stripe accent */}
      <div className="absolute top-0 left-0 right-0 h-2.5 retro-stripes" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-[#FAF0DF]/20">
          {/* Brand lockup */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <RetroDaisy size={36} petalColor="#FAF0DF" centerColor="#E7B84B" />
              <h3 className="font-groovy text-3xl sm:text-4xl text-[#E7B84B] tracking-wide">
                {FESTIVAL_DETAILS.name}
              </h3>
            </div>
            <p className="font-alfa text-sm text-[#F3E4C8]/90">
              "{FESTIVAL_DETAILS.tagline}"
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-retro-mono text-[#F3E4C8]/70 mt-2">
              <span>{FESTIVAL_DETAILS.dates}</span>
              <span>•</span>
              <span>{FESTIVAL_DETAILS.college}</span>
            </div>
          </div>

          {/* Quick Nav Mirror with aria-current="page" */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-retro-mono font-bold text-[#F3E4C8]/90">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.href;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleLinkClick(link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#E7B84B] text-[#713D29]'
                      : 'hover:text-[#E7B84B]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-[#FAF0DF] text-[#713D29] text-xs font-retro-mono font-bold rounded-xl border-2 border-[#FAF0DF] hover:bg-[#E7B84B] transition-all cursor-pointer shadow-retro-sm shrink-0"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lower row: Copyright & Standalone Code Access */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-retro-mono text-[#F3E4C8]/70 gap-4">
          <div className="text-center sm:text-left">
            <span>Golden Times, Unforgettable Memories · 12-14 Feb 2027</span>
          </div>

          {onOpenExport && (
            <button
              type="button"
              onClick={onOpenExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D8753E] text-[#F3E4C8] rounded-xl border border-[#FAF0DF]/40 hover:bg-[#c96630] transition-colors font-bold cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Standalone Source (index.html / style.css / script.js)</span>
            </button>
          )}

          <div>
            <span>© 1976–2027 RETROFEST · All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
