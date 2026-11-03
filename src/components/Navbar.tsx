import React, { useState } from 'react';
import { Menu, X, Disc3, Music2, Ticket } from 'lucide-react';
import { retroAudio } from '../utils/audioPlayer';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenJukebox?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenJukebox }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [crackleOn, setCrackleOn] = useState(false);

  const toggleSound = () => {
    const isPlaying = retroAudio.toggleVinylCrackle();
    setCrackleOn(isPlaying);
    if (isPlaying) {
      retroAudio.playGroovyChime();
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Events', href: '#events' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Register', href: '#register' },
  ];

  const handleLinkClick = (href: string) => {
    retroAudio.playGroovyChime();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F3E4C8]/95 backdrop-blur-md border-b-4 border-[#713D29] px-4 sm:px-6 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('#home')}
          className="group flex items-center gap-2 whitespace-nowrap shrink-0 text-[#713D29] hover:text-[#D8753E] transition-colors cursor-pointer text-left"
          aria-label="RETROFEST '26 Home"
        >
          <span className="font-groovy text-2xl sm:text-3xl md:text-4xl tracking-wide">
            RETROFEST '26
          </span>
          <span className="hidden sm:inline-block text-[11px] font-retro-mono px-2 py-0.5 bg-[#E7B84B] border-2 border-[#713D29] rounded shadow-retro-sm font-bold text-[#713D29]">
            1970s RETRO
          </span>
        </button>

        {/* Desktop Single-Line Navigation Links with aria-current="page" */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-2 lg:gap-4 text-sm font-retro-mono font-bold text-[#713D29]"
        >
          {navLinks.map((link) => {
            const isActive = currentRoute === link.href;
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => handleLinkClick(link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3.5 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D8753E] text-[#FAF0DF] border-[#713D29] shadow-retro-sm -translate-y-0.5'
                    : 'border-transparent hover:border-[#713D29] hover:bg-[#FAF0DF]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Actions: Jukebox modal button + Vinyl sound + Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Vinyl Ambience Audio Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={crackleOn ? 'Pause Vinyl Crackle Ambience' : 'Play Analog Vinyl Ambience'}
            aria-label={crackleOn ? 'Vinyl Crackle On' : 'Vinyl Crackle Off'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-retro-mono font-bold border-2 border-[#713D29] rounded-xl transition-all cursor-pointer ${
              crackleOn
                ? 'bg-[#E7B84B] text-[#713D29] shadow-retro-sm'
                : 'bg-[#FAF0DF] text-[#713D29] hover:bg-[#E7B84B]/30'
            }`}
          >
            <Disc3 className={`w-3.5 h-3.5 ${crackleOn ? 'animate-spin' : ''}`} />
            <span className="hidden lg:inline">{crackleOn ? 'VINYL ON' : 'CRACKLE'}</span>
          </button>

          {/* Jukebox & Song Uploader Trigger */}
          {onOpenJukebox && (
            <button
              type="button"
              onClick={() => {
                retroAudio.playGroovyChime();
                onOpenJukebox();
              }}
              title="Open 1976 Hi-Fi Jukebox & Song Uploader"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-retro-mono font-bold bg-[#FAF0DF] hover:bg-[#E7B84B]/40 text-[#713D29] border-2 border-[#713D29] rounded-xl transition-all cursor-pointer shadow-retro-sm"
            >
              <Music2 className="w-3.5 h-3.5 text-[#D8753E]" />
              <span className="hidden sm:inline">JUKEBOX</span>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => handleLinkClick('#register')}
            className={`hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-alfa tracking-wide border-2 border-[#713D29] rounded-xl shadow-retro transition-all cursor-pointer ${
              currentRoute === '#register'
                ? 'bg-[#6D7851] text-[#FAF0DF]'
                : 'bg-[#D8753E] text-[#FAF0DF] hover:bg-[#c96630]'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>GET PASS</span>
          </button>

          {/* Hamburger Menu Toggle on Small Screens */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="md:hidden p-2 bg-[#FAF0DF] text-[#713D29] border-2 border-[#713D29] rounded-xl shadow-retro-sm cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden mt-3 pt-3 border-t-2 border-[#713D29]/30 flex flex-col gap-2 pb-2 animate-fade-in"
        >
          {navLinks.map((link) => {
            const isActive = currentRoute === link.href;
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => handleLinkClick(link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full py-2.5 px-4 rounded-xl text-left font-retro-mono text-sm font-bold border-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D8753E] text-[#FAF0DF] border-[#713D29] shadow-retro-sm'
                    : 'bg-[#FAF0DF] text-[#713D29] border-[#713D29]/30 hover:border-[#713D29]'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handleLinkClick('#register')}
            className="w-full mt-1 py-3 px-4 bg-[#D8753E] text-[#FAF0DF] font-alfa text-sm rounded-xl border-2 border-[#713D29] shadow-retro text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <Ticket className="w-4 h-4" />
            <span>REGISTER NOW</span>
          </button>
        </nav>
      )}
    </header>
  );
};
