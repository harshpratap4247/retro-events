import React, { useState } from 'react';
import { Filter, Calendar, Clock, MapPin, Sparkles, Camera, RotateCcw, ArrowRight, Edit3, Mail } from 'lucide-react';
import { FestivalEvent, EventCategory, FestivalDay } from '../data/festivalData';
import { filterEvents, CategoryFilter, DayFilter, isValidImageFile } from '../utils/festivalLogic';
import { RetroDaisy } from '../components/RetroGraphics';
import { EventEditModal } from '../components/EventEditModal';
import { retroAudio } from '../utils/audioPlayer';

interface EventsPageProps {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  events: FestivalEvent[];
  onUpdateEvent: (updatedEvent: FestivalEvent) => void;
  categoryFilter: CategoryFilter;
  setCategoryFilter: (cat: CategoryFilter) => void;
  dayFilter: DayFilter;
  setDayFilter: (day: DayFilter) => void;
  customImages: Record<string, string>;
  setCustomImages: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onSelectEventForRegistration: (eventName: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  headingRef,
  events,
  onUpdateEvent,
  categoryFilter,
  setCategoryFilter,
  dayFilter,
  setDayFilter,
  customImages,
  setCustomImages,
  onSelectEventForRegistration,
}) => {
  const [editingEvent, setEditingEvent] = useState<FestivalEvent | null>(null);

  const categoryOptions: CategoryFilter[] = ['All', 'Tech', 'Cultural', 'Fun'];
  const dayOptions: DayFilter[] = ['All', 'Day 1', 'Day 2', 'Day 3'];

  // Apply both filters working together on current dynamic events list
  const filteredEvents = filterEvents(events, categoryFilter, dayFilter);

  const handleCategoryClick = (cat: CategoryFilter) => {
    retroAudio.playGroovyChime();
    setCategoryFilter(cat);
  };

  const handleDayClick = (day: DayFilter) => {
    retroAudio.playGroovyChime();
    setDayFilter(day);
  };

  const handleResetFilters = () => {
    retroAudio.playGroovyChime();
    setCategoryFilter('All');
    setDayFilter('All');
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
    onSelectEventForRegistration(event.title);
  };

  const handleOpenEdit = (event: FestivalEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    retroAudio.playTapeClick();
    setEditingEvent(event);
  };

  // Helper vintage card illustrations for each event
  const renderCardIllustration = (event: FestivalEvent) => {
    switch (event.category) {
      case 'Tech':
        return (
          <div className="w-full h-32 bg-[#D8753E]/15 border-2 border-[#713D29] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
            <div className="font-retro-mono text-xs text-[#713D29] leading-tight select-none opacity-85 text-center">
              <span className="text-[#D8753E] font-bold">10 PRINT "{event.title.toUpperCase()}"</span><br />
              <span className="text-[#6D7851]">20 FOR I = 1 TO 1976</span><br />
              <span className="text-[#713D29]">30 GOTO WIN_TROPHY</span>
            </div>
            <div className="absolute -bottom-3 -right-3 opacity-40">
              <RetroDaisy size={48} petalColor="#FAF0DF" centerColor="#D8753E" />
            </div>
          </div>
        );
      case 'Cultural':
        return (
          <div className="w-full h-32 bg-[#E7B84B]/20 border-2 border-[#713D29] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
            <div className="text-center">
              <div className="font-groovy text-2xl sm:text-3xl text-[#713D29]">GROOVY SOUL</div>
              <div className="text-xs font-retro-mono font-bold text-[#D8753E] tracking-wider">LIVE STAGE '76</div>
            </div>
            <div className="absolute top-2 right-2 opacity-50">
              <RetroDaisy size={32} petalColor="#FAF0DF" centerColor="#E7B84B" />
            </div>
          </div>
        );
      case 'Fun':
      default:
        return (
          <div className="w-full h-32 bg-[#6D7851]/15 border-2 border-[#713D29] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
            <div className="text-center">
              <div className="font-groovy text-2xl sm:text-3xl text-[#6D7851]">GOOD VIBES</div>
              <div className="text-xs font-retro-mono font-bold text-[#713D29] tracking-wider">100% RETRO FUN</div>
            </div>
            <div className="absolute -bottom-2 -left-2 opacity-40">
              <RetroDaisy size={42} petalColor="#FAF0DF" centerColor="#6D7851" />
            </div>
          </div>
        );
    }
  };

  const getCategoryBadgeStyle = (category: EventCategory) => {
    switch (category) {
      case 'Tech':
        return 'bg-[#D8753E] text-[#FAF0DF] border-[#713D29]';
      case 'Cultural':
        return 'bg-[#E7B84B] text-[#713D29] border-[#713D29]';
      case 'Fun':
        return 'bg-[#6D7851] text-[#FAF0DF] border-[#713D29]';
      default:
        return 'bg-[#713D29] text-[#FAF0DF] border-[#713D29]';
    }
  };

  return (
    <div className="w-full flex flex-col flex-1 bg-[#F3E4C8] py-10 md:py-16 paper-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-retro-mono font-bold tracking-widest text-[#D8753E] uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>FESTIVAL CATALOG · 12-14 FEB 2027</span>
          </div>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-groovy text-4xl sm:text-5xl md:text-6xl text-[#713D29] leading-tight mb-3 outline-none focus:ring-4 focus:ring-[#D8753E] rounded-xl"
          >
            FESTIVAL EVENTS
          </h1>
          <p className="text-base sm:text-lg text-[#713D29]/90 font-medium">
            Explore 12 signature challenges across Technology, Cultural Arts, and Retro Fun. Use the dual filters to curate your line-up!
          </p>
        </div>

        {/* Dual Filter Controls (Category AND Day working together) */}
        <div className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-5 sm:p-6 shadow-retro mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Filter 1: Category Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full lg:w-auto">
              <span className="text-xs font-retro-mono font-bold text-[#713D29] uppercase tracking-wide flex items-center gap-1.5 shrink-0">
                <Filter className="w-4 h-4 text-[#D8753E]" />
                <span>CATEGORY:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((cat) => {
                  const isActive = categoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryClick(cat)}
                      aria-pressed={isActive}
                      className={`px-3.5 py-1.5 rounded-xl font-retro-mono text-xs font-bold border-2 border-[#713D29] transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#D8753E] text-[#FAF0DF] shadow-retro-sm -translate-y-0.5'
                          : 'bg-[#F3E4C8] text-[#713D29] hover:bg-[#E7B84B]/40'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider on mobile / desktop */}
            <div className="hidden lg:block w-px h-8 bg-[#713D29]/30" />

            {/* Filter 2: Day Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full lg:w-auto">
              <span className="text-xs font-retro-mono font-bold text-[#713D29] uppercase tracking-wide flex items-center gap-1.5 shrink-0">
                <Calendar className="w-4 h-4 text-[#6D7851]" />
                <span>DAY:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {dayOptions.map((day) => {
                  const isActive = dayFilter === day;
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayClick(day)}
                      aria-pressed={isActive}
                      className={`px-3.5 py-1.5 rounded-xl font-retro-mono text-xs font-bold border-2 border-[#713D29] transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#6D7851] text-[#FAF0DF] shadow-retro-sm -translate-y-0.5'
                          : 'bg-[#F3E4C8] text-[#713D29] hover:bg-[#E7B84B]/40'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs font-retro-mono text-[#713D29]/80 mb-6 px-1">
          <div>
            Showing <strong className="text-[#D8753E] text-sm">{filteredEvents.length}</strong> of{' '}
            {events.length} events
            {(categoryFilter !== 'All' || dayFilter !== 'All') && (
              <span className="ml-2 text-[#713D29]">
                (Category: <strong className="text-[#713D29]">{categoryFilter}</strong>, Day:{' '}
                <strong className="text-[#713D29]">{dayFilter}</strong>)
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#6D7851] font-bold hidden sm:inline">
              💡 Tip: Click "Edit Date/Time/Mail" on any card to update event timing or contact
            </span>
            {(categoryFilter !== 'All' || dayFilter !== 'All') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[#D8753E] hover:underline font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Events Grid OR Empty State */}
        {filteredEvents.length === 0 ? (
          <div className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto shadow-retro my-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#D8753E]/20 border-2 border-[#713D29] rounded-2xl flex items-center justify-center">
              <Filter className="w-8 h-8 text-[#D8753E]" />
            </div>
            <h2 className="font-groovy text-3xl text-[#713D29] mb-2">No events match</h2>
            <p className="text-sm font-retro-mono text-[#713D29]/80 mb-6">
              No events were found for category "<strong>{categoryFilter}</strong>" on "<strong>{dayFilter}</strong>".
              Try switching your filters!
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-6 py-3 bg-[#D8753E] text-[#FAF0DF] font-alfa text-sm rounded-xl border-2 border-[#713D29] shadow-retro hover:-translate-y-0.5 cursor-pointer"
            >
              SHOW ALL EVENTS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-5 shadow-retro flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 group"
              >
                <div>
                  {/* Top Illustration Banner with Custom Image Upload & Edit Options */}
                  <div className="relative group/banner mb-4">
                    {customImages[event.id] ? (
                      <div className="w-full h-32 border-2 border-[#713D29] rounded-xl overflow-hidden relative shadow-inner bg-[#24140E]">
                        <img
                          src={customImages[event.id]}
                          alt={`${event.title} custom poster`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/banner:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                          <label className="px-2.5 py-1 bg-[#D8753E] text-[#F3E4C8] text-[11px] font-retro-mono font-bold rounded border border-[#713D29] cursor-pointer flex items-center gap-1 shadow-retro-sm hover:bg-[#c96630]">
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
                            className="px-2.5 py-1 bg-[#FAF0DF] text-[#713D29] text-[11px] font-retro-mono font-bold rounded border border-[#713D29] cursor-pointer flex items-center gap-1 shadow-retro-sm hover:bg-[#E7B84B]/30"
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

                        {/* Direct Upload Image Option */}
                        <label
                          title="Upload your own custom image or photo for this event"
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

                  {/* Category Badge & Day indicator & EDIT BUTTON */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-retro-mono font-bold border ${getCategoryBadgeStyle(
                        event.category
                      )}`}
                    >
                      {event.category.toUpperCase()}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-retro-mono font-bold text-[#6D7851]">
                        {event.day}
                      </span>
                      {/* EDIT OPTION FOR DATE, TIME, AND MAIL */}
                      <button
                        type="button"
                        onClick={(e) => handleOpenEdit(event, e)}
                        title="Edit this event's date, start time, end time, and coordinator email"
                        className="px-2 py-1 bg-[#E7B84B]/30 hover:bg-[#E7B84B] text-[#713D29] border border-[#713D29] rounded-lg text-[10px] font-retro-mono font-bold flex items-center gap-1 shadow-retro-sm transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3 text-[#D8753E]" />
                        <span>Edit Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-groovy text-xl sm:text-2xl text-[#713D29] mb-2 leading-snug group-hover:text-[#D8753E] transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#713D29]/85 leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Date, Time, Venue, and Coordinator Mail Specs */}
                  <div className="border-t border-[#713D29]/20 pt-3 space-y-2 text-xs font-retro-mono text-[#713D29] mb-4">
                    {/* Date */}
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#D8753E] shrink-0" />
                        <span className="font-semibold">{event.date}</span>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#E7B84B] shrink-0" />
                        <span className="font-semibold">
                          {event.startTime} – {event.endTime}
                        </span>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#6D7851] shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>

                    {/* Coordinator Email (Requested edit/display field) */}
                    <div className="flex items-center gap-2 pt-1 border-t border-[#713D29]/10 text-[11px]">
                      <Mail className="w-3.5 h-3.5 text-[#D8753E] shrink-0" />
                      <span className="text-[#713D29]/70 shrink-0">Mail:</span>
                      <a
                        href={`mailto:${event.contactEmail || 'groove@retrofest26.starlight.edu'}`}
                        className="truncate text-[#D8753E] hover:underline font-bold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {event.contactEmail || 'groove@retrofest26.starlight.edu'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Actions: Quick Edit Button & Register Button */}
                <div className="space-y-2 mt-2">
                  <button
                    type="button"
                    onClick={(e) => handleOpenEdit(event, e)}
                    className="w-full py-1.5 px-3 bg-[#FAF0DF] hover:bg-[#E7B84B]/30 text-[#713D29] border border-[#713D29] rounded-xl font-retro-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-retro-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#D8753E]" />
                    <span>EDIT DATE, TIME & MAIL</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRegisterEvent(event)}
                    className="w-full py-2.5 px-4 bg-[#FAF0DF] hover:bg-[#D8753E] text-[#713D29] hover:text-[#FAF0DF] border-2 border-[#713D29] rounded-xl font-retro-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-retro-sm group-hover:bg-[#D8753E] group-hover:text-[#FAF0DF]"
                  >
                    <span>REGISTER FOR THIS EVENT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Dedicated Edit Modal */}
        <EventEditModal
          event={editingEvent}
          isOpen={Boolean(editingEvent)}
          onClose={() => setEditingEvent(null)}
          onSave={onUpdateEvent}
        />
      </div>
    </div>
  );
};
