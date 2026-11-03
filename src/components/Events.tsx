import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Trophy, Sparkles, Filter, CheckCircle2, Camera, RotateCcw } from 'lucide-react';
import { FESTIVAL_EVENTS } from '../data/festivalData';
import { filterEvents, FilterKey, FestivalEvent, isValidImageFile } from '../utils/festivalLogic';
import { RetroDaisy } from './RetroGraphics';
import { retroAudio } from '../utils/audioPlayer';

interface EventsProps {
  onSelectEventForRegistration: (eventName: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onSelectEventForRegistration }) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All Events');
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  const filterTabs: FilterKey[] = ['All Events', 'Technical', 'Cultural', 'Day 1', 'Day 2'];

  const displayedEvents = filterEvents(FESTIVAL_EVENTS, activeFilter);

  const handleFilterClick = (tab: FilterKey) => {
    retroAudio.playGroovyChime();
    setActiveFilter(tab);
  };

  const handleImageUpload = (eventId: string, file: File) => {
    if (!isValidImageFile(file)) {
      alert("Please upload a valid image file (.jpg, .jpeg, .png, .webp, .gif, .svg)");
      return;
    }
    retroAudio.playGroovyChime();
    const url = URL.createObjectURL(file);
    setCustomImages(prev => ({ ...prev, [eventId]: url }));
  };

  const handleResetImage = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    retroAudio.playGroovyChime();
    setCustomImages(prev => {
      const next = { ...prev };
      delete next[eventId];
      return next;
    });
  };

  const handleRegisterEvent = (event: FestivalEvent) => {
    retroAudio.playGroovyChime();
    onSelectEventForRegistration(event.name);
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper vintage card illustrations for each event
  const renderCardIllustration = (event: FestivalEvent) => {
    switch (event.id) {
      case 'code-sprint':
        return (
          <div className="w-full h-32 bg-[#D8753E]/15 border-2 border-[#713D29] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
            <div className="font-retro-mono text-xs text-[#713D29] leading-tight select-none opacity-85">
              <span className="text-[#D8753E] font-bold">10 PRINT "RETRO HACK"</span><br />
              <span className="text-[#6D7851]">20 FOR I = 1 TO 1976</span><br />
              <span className="text-[#713D29]">30 GOTO OPTIMIZE</span>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-40">
              <RetroDaisy size={54} petalColor="#FAF0DF" centerColor="#D8753E" />
            </div>
          </div>
        );
      case 'robotics-challenge':
        return (
          <div className="w-full h-32 bg-[#6D7851]/15 border-2 border-[#713D29] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
            <svg width="80" height="70" viewBox="0 0 100 80" fill="none" className="text-[#6D7851]">
              <rect x="25" y="20" width="50" height="40" rx="6" fill="#6D7851" stroke="#713D29" strokeWidth="3" />
              <circle cx="40" cy="35" r="5" fill="#E7B84B" stroke="#713D29" strokeWidth="2" />
              <circle cx="60" cy="35" r="5" fill="#E7B84B" stroke="#713D29" strokeWidth="2" />
              <line x1="38" y1="50" x2="62" y2="50" stroke="#FAF0DF" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="10" x2="50" y2="20" stroke="#713D29" strokeWidth="3" />
              <circle cx="50" cy="8" r="4" fill="#D8753E" />
              <rect x="15" y="32" width="10" height="16" rx="2" fill="#713D29" />
              <rect x="75" y="32" width="10" height="16" rx="2" fill="#713D29" />
            </svg>
            <div className="absolute top-2 left-2 text-[10px] font-retro-mono font-bold text-[#6D7851]">
              CIRCUIT 76
            </div>
          </div>
        );
      case 'tech-quiz':
        return (
          <div className="w-full h-32 bg-[#E7B84B]/20 border-2 border-[#713D29] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
            <div className="text-center">
              <div className="font-groovy text-3xl text-[#713D29]">TRIVIA '76</div>
              <div className="text-xs font-retro-mono font-bold text-[#D8753E]">RAPID BUZZER CLASH</div>
            </div>
            <div className="absolute top-2 right-2">
              <RetroDaisy size={32} petalColor="#FAF0DF" centerColor="#E7B84B" />
            </div>
          </div>
        );
      case 'dance-battle':
        return (
          <div className="w-full h-32 bg-[#D8753E]/20 border-2 border-[#713D29] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
            <div className="text-center">
              <div className="font-groovy text-3xl text-[#D8753E] drop-shadow-sm">DISCO FUNK</div>
              <div className="text-xs font-retro-mono font-bold text-[#713D29]">LOCKING · FREESTYLE · BREAKING</div>
            </div>
            <div className="absolute bottom-1 right-2 opacity-50">
              <RetroDaisy size={40} petalColor="#FAF0DF" centerColor="#D8753E" />
            </div>
          </div>
        );
      case 'singing-star':
        return (
          <div className="w-full h-32 bg-[#FAF0DF] border-2 border-[#713D29] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
              <rect x="40" y="20" width="20" height="36" rx="10" fill="#D8753E" stroke="#713D29" strokeWidth="3" />
              <line x1="50" y1="56" x2="50" y2="76" stroke="#713D29" strokeWidth="4" />
              <path d="M 32 40 C 32 60, 68 60, 68 40" stroke="#713D29" strokeWidth="3" fill="none" />
              <rect x="30" y="76" width="40" height="8" rx="4" fill="#E7B84B" stroke="#713D29" strokeWidth="2" />
            </svg>
            <div className="absolute top-2 left-2 text-[10px] font-retro-mono font-bold text-[#D8753E]">
              GOLDEN VOCALS
            </div>
          </div>
        );
      case 'fashion-walk':
        return (
          <div className="w-full h-32 bg-[#E7B84B]/25 border-2 border-[#713D29] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
            <div className="text-center">
              <div className="font-groovy text-3xl text-[#713D29]">HAUTE RETRO</div>
              <div className="text-xs font-retro-mono font-bold text-[#6D7851]">BELL-BOTTOMS & SUNGLASSES</div>
            </div>
            <div className="absolute top-2 right-2">
              <RetroDaisy size={36} petalColor="#D8753E" centerColor="#FAF0DF" />
            </div>
          </div>
        );
      case 'battle-of-the-bands':
        return (
          <div className="w-full h-32 bg-[#713D29]/10 border-2 border-[#713D29] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
            <div className="text-center">
              <div className="font-groovy text-3xl text-[#713D29]">LIVE ROCK</div>
              <div className="text-xs font-retro-mono font-bold text-[#D8753E]">ANALOG AMPS & DRUMS</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-32 bg-[#FAF0DF] border-2 border-[#713D29] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
            <div className="font-retro-mono text-xs font-bold text-[#713D29] text-center">
              RETRO ARCADE 1976<br />8-BIT CHALLENGE
            </div>
          </div>
        );
    }
  };

  return (
    <section id="events" className="relative bg-[#F3E4C8] text-[#713D29] py-16 md:py-24 border-b-4 border-[#713D29] paper-grain">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-retro-mono font-bold tracking-widest text-[#D8753E] uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Chapter 02 · Main Attractions</span>
          </div>
          <h2 className="font-groovy text-4xl sm:text-5xl md:text-6xl text-[#713D29] leading-tight mb-4">
            FEATURED FESTIVAL EVENTS
          </h2>
          <div className="w-24 h-1.5 bg-[#E7B84B] mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg text-[#713D29]/90 font-medium">
            From technical marathons to cultural showcases, pick your arena and compete for golden trophies, hardware prizes, and glory!
          </p>
        </div>

        {/* Dynamic Interactive Filter Buttons (Segmented Control per Frontend Design) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-retro-mono font-bold text-[#713D29] mr-2">
            <Filter className="w-4 h-4 text-[#D8753E]" />
            <span className="hidden sm:inline">FILTER:</span>
          </div>
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleFilterClick(tab)}
                aria-pressed={isActive}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-retro-mono text-xs sm:text-sm font-bold border-2 border-[#713D29] transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#D8753E] text-[#F3E4C8] shadow-retro-sm -translate-y-0.5'
                    : 'bg-[#FAF0DF] text-[#713D29] hover:bg-[#E7B84B]/30'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Filter Count Text Indicator */}
        <div className="flex items-center justify-between text-xs font-retro-mono text-[#713D29]/75 mb-6 max-w-7xl mx-auto px-2">
          <span>Showing {displayedEvents.length} events for: <strong className="text-[#D8753E]">{activeFilter}</strong></span>
          <span>Click any card to register</span>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {displayedEvents.map((event) => (
            <article
              key={event.id}
              className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-5 shadow-retro flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 group"
            >
              <div>
                {/* Vintage Card Top Illustration Banner with Custom Image Upload Option */}
                <div className="relative group/banner mb-3">
                  {customImages[event.id] ? (
                    <div className="w-full h-32 border-2 border-[#713D29] rounded-xl overflow-hidden relative shadow-inner bg-[#24140E]">
                      <img
                        src={customImages[event.id]}
                        alt={`${event.name} custom poster`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/banner:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                        <label className="btn-retro px-2.5 py-1 bg-[#D8753E] text-[#F3E4C8] text-[11px] font-retro-mono font-bold rounded border border-[#713D29] cursor-pointer flex items-center gap-1 shadow-retro-sm hover:bg-[#c96630]">
                          <Camera className="w-3 h-3" />
                          <span>Change</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && handleImageUpload(event.id, e.target.files[0])}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={(e) => handleResetImage(event.id, e)}
                          className="btn-retro px-2.5 py-1 bg-[#FAF0DF] text-[#713D29] text-[11px] font-retro-mono font-bold rounded border border-[#713D29] cursor-pointer flex items-center gap-1 shadow-retro-sm hover:bg-[#E7B84B]/30"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      </div>
                      <span className="absolute bottom-1 right-2 bg-[#FAF0DF]/90 border border-[#713D29] px-1.5 py-0.5 rounded text-[9px] font-retro-mono font-bold text-[#713D29]">
                        CUSTOM POSTER
                      </span>
                    </div>
                  ) : (
                    <div
                      className="relative rounded-xl overflow-hidden"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files?.[0]) {
                          handleImageUpload(event.id, e.dataTransfer.files[0]);
                        }
                      }}
                    >
                      {renderCardIllustration(event)}

                      {/* Direct Upload Image Option Button on the card illustration */}
                      <label
                        title="Upload your own custom image / photo for this event"
                        className="absolute top-2 right-2 px-2 py-1 bg-[#FAF0DF]/95 hover:bg-[#FAF0DF] border-2 border-[#713D29] rounded-lg text-[10px] font-retro-mono font-bold text-[#713D29] hover:text-[#D8753E] cursor-pointer flex items-center gap-1 shadow-retro-sm transition-all hover:scale-105 select-none"
                      >
                        <Camera className="w-3 h-3 text-[#D8753E]" />
                        <span>Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(event.id, e.target.files[0])}
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Card Title & Unboxed Metadata (Zero-Pill Rule) */}
                <div className="mt-4 mb-2">
                  <div className="flex items-center gap-2 text-xs font-retro-mono font-bold text-[#D8753E] uppercase tracking-wide">
                    <span>{event.category}</span>
                    <span aria-hidden="true" className="text-[#713D29]/40">·</span>
                    <span className="text-[#6D7851]">{event.day}</span>
                    <span aria-hidden="true" className="text-[#713D29]/40">·</span>
                    <span>{event.tag}</span>
                  </div>
                  <h3 className="font-groovy text-xl sm:text-2xl text-[#713D29] mt-1 group-hover:text-[#D8753E] transition-colors leading-snug">
                    {event.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#713D29]/85 leading-relaxed mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Key Details Unboxed */}
                <div className="space-y-1.5 text-xs font-retro-mono text-[#713D29] border-t border-[#713D29]/20 pt-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#D8753E] shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#6D7851] shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#713D29] shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#E7B84B] shrink-0" />
                    <span>{event.teamSize}</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-[#D8753E]">
                    <Trophy className="w-3.5 h-3.5 text-[#D8753E] shrink-0" />
                    <span>{event.prizePool}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleRegisterEvent(event)}
                className="w-full btn-retro py-2.5 px-4 bg-[#D8753E] text-[#F3E4C8] text-xs sm:text-sm font-retro-slab tracking-wider border-2 border-[#713D29] rounded-xl shadow-retro-sm hover:bg-[#c96630] cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>REGISTER FOR THIS EVENT</span>
              </button>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
