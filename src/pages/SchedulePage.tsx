import React, { useState } from 'react';
import { Calendar, Clock, MapPin, AlertTriangle, ChevronDown, ChevronUp, Sparkles, ArrowRight, Info, Edit3, Mail } from 'lucide-react';
import { FestivalDay, FestivalEvent, EventCategory } from '../data/festivalData';
import { groupEventsByTime } from '../utils/festivalLogic';
import { EventEditModal } from '../components/EventEditModal';
import { retroAudio } from '../utils/audioPlayer';

interface SchedulePageProps {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  events: FestivalEvent[];
  activeDay: FestivalDay;
  setActiveDay: (day: FestivalDay) => void;
  onUpdateEvent: (updatedEvent: FestivalEvent) => void;
  onSelectEventForRegistration: (eventName: string) => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({
  headingRef,
  events,
  activeDay,
  setActiveDay,
  onUpdateEvent,
  onSelectEventForRegistration,
}) => {
  const [isNoteOpen, setIsNoteOpen] = useState(true);
  const [editingEvent, setEditingEvent] = useState<FestivalEvent | null>(null);

  const days: { key: FestivalDay; label: string; date: string }[] = [
    { key: 'Day 1', label: 'DAY 1 · FRIDAY', date: 'Feb 12, 2027' },
    { key: 'Day 2', label: 'DAY 2 · SATURDAY', date: 'Feb 13, 2027' },
    { key: 'Day 3', label: 'DAY 3 · SUNDAY', date: 'Feb 14, 2027' },
  ];

  // Group current dynamic events by time for the active day
  const timeGroups = groupEventsByTime(events, activeDay);

  const handleDayTabClick = (dayKey: FestivalDay) => {
    retroAudio.playGroovyChime();
    setActiveDay(dayKey);
  };

  const getCategoryColorBar = (category: EventCategory) => {
    switch (category) {
      case 'Tech':
        return 'bg-[#D8753E]';
      case 'Cultural':
        return 'bg-[#E7B84B]';
      case 'Fun':
        return 'bg-[#6D7851]';
      default:
        return 'bg-[#713D29]';
    }
  };

  const getCategoryTextColor = (category: EventCategory) => {
    switch (category) {
      case 'Tech':
        return 'text-[#D8753E]';
      case 'Cultural':
        return 'text-[#713D29] font-bold';
      case 'Fun':
        return 'text-[#6D7851]';
      default:
        return 'text-[#713D29]';
    }
  };

  const handleOpenEdit = (event: FestivalEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    retroAudio.playTapeClick();
    setEditingEvent(event);
  };

  return (
    <div className="w-full flex flex-col flex-1 bg-[#F3E4C8] py-10 md:py-16 paper-grain">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-retro-mono font-bold tracking-widest text-[#D8753E] uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>FESTIVAL TIMETABLE · 3-DAY LINEUP</span>
          </div>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-groovy text-4xl sm:text-5xl md:text-6xl text-[#713D29] leading-tight mb-3 outline-none focus:ring-4 focus:ring-[#D8753E] rounded-xl"
          >
            FESTIVAL SCHEDULE
          </h1>
          <p className="text-base sm:text-lg text-[#713D29]/90 font-medium">
            Plan your retro weekend journey. Events sharing the same start time run in parallel across separate campus stages.
          </p>
        </div>

        {/* Collapsible Note: How the schedule stays readable */}
        <div className="mb-8 bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl shadow-retro overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setIsNoteOpen(!isNoteOpen)}
            className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF0DF]/80 font-retro-mono font-bold text-sm text-[#713D29]"
            aria-expanded={isNoteOpen}
          >
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-[#D8753E]" />
              <span>How the schedule stays readable</span>
            </div>
            {isNoteOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isNoteOpen && (
            <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#713D29]/85 font-medium leading-relaxed border-t-2 border-[#713D29]/20 bg-[#F3E4C8]/50">
              <p>
                Our festival schedule organizes events chronologically by start time so you never miss an opening bell.
                When two or more events run concurrently in parallel venues, they are grouped cleanly under a single shared time heading and flagged with a vibrant red CLASH indicator.
                On desktop, parallel tracks appear side by side for effortless comparison, while mobile screens stack them comfortably without horizontal scrolling.
                Every event card features a category color bar, stage venue, coordinator email, and immediate registration shortcut.
              </p>
            </div>
          )}
        </div>

        {/* Day Tabs (Day 1, Day 2, Day 3) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          {days.map((day) => {
            const isActive = activeDay === day.key;
            return (
              <button
                key={day.key}
                type="button"
                onClick={() => handleDayTabClick(day.key)}
                aria-pressed={isActive}
                className={`px-5 sm:px-8 py-3.5 rounded-2xl font-alfa text-sm sm:text-base border-3 border-[#713D29] transition-all cursor-pointer flex flex-col items-center shadow-retro-sm ${
                  isActive
                    ? 'bg-[#D8753E] text-[#FAF0DF] shadow-retro -translate-y-1'
                    : 'bg-[#FAF0DF] text-[#713D29] hover:bg-[#E7B84B]/40'
                }`}
              >
                <span>{day.label}</span>
                <span className={`text-[11px] font-retro-mono font-normal mt-0.5 ${isActive ? 'text-[#FAF0DF]/90' : 'text-[#713D29]/70'}`}>
                  {day.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Schedule Time Groups */}
        <div className="space-y-8">
          {timeGroups.length === 0 ? (
            <div className="text-center py-12 bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl shadow-retro">
              <p className="font-retro-mono text-sm text-[#713D29]">No events scheduled on this day.</p>
            </div>
          ) : (
            timeGroups.map((group) => (
              <div
                key={group.timeKey}
                className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-3xl p-5 sm:p-7 shadow-retro"
              >
                {/* Time Slot Header with Red CLASH Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b-2 border-[#713D29]/25">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#24140E] text-[#E7B84B] border-2 border-[#713D29] flex items-center justify-center font-retro-mono font-bold">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-retro-mono font-bold text-[#713D29]/70 uppercase tracking-widest block">
                        START TIME
                      </span>
                      <span className="font-alfa text-xl sm:text-2xl text-[#713D29]">
                        {group.startTime}
                      </span>
                    </div>
                  </div>

                  {/* Red CLASH Tag when multiple events share this start time */}
                  {group.isClash ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D8753E] text-[#FAF0DF] border-2 border-[#713D29] rounded-xl font-retro-mono text-xs font-bold shadow-retro-sm animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>CLASH ({group.events.length} SIMULTANEOUS TRACKS)</span>
                    </div>
                  ) : (
                    <span className="text-xs font-retro-mono font-bold text-[#6D7851] bg-[#6D7851]/15 px-2.5 py-1 rounded-lg border border-[#6D7851]">
                      SOLO STAGE
                    </span>
                  )}
                </div>

                {/* Side by side on desktop, stacked on mobile */}
                <div
                  className={`grid gap-5 sm:gap-6 ${
                    group.events.length > 1
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
                      : 'grid-cols-1'
                  }`}
                >
                  {group.events.map((event) => (
                    <div
                      key={event.id}
                      className="bg-[#F3E4C8] border-2 border-[#713D29] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-retro-sm hover:-translate-y-0.5 transition-transform relative overflow-hidden"
                    >
                      {/* Category Color Bar at Top of Event Card */}
                      <div className={`absolute top-0 left-0 right-0 h-2.5 ${getCategoryColorBar(event.category)}`} />

                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-retro-mono font-bold tracking-wider uppercase ${getCategoryTextColor(event.category)}`}>
                            {event.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-retro-mono font-bold text-[#713D29]/75 bg-[#FAF0DF] px-2 py-0.5 rounded border border-[#713D29]/30">
                              {event.startTime} – {event.endTime}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleOpenEdit(event, e)}
                              title="Edit event date, time, and coordinator email"
                              className="px-2 py-0.5 bg-[#FAF0DF] hover:bg-[#E7B84B] text-[#713D29] border border-[#713D29] rounded text-[10px] font-retro-mono font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3 text-[#D8753E]" />
                              <span>Edit</span>
                            </button>
                          </div>
                        </div>

                        <h3 className="font-groovy text-xl sm:text-2xl text-[#713D29] mb-2 leading-snug">
                          {event.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#713D29]/85 leading-relaxed mb-3">
                          {event.description}
                        </p>

                        <div className="flex items-center gap-2 text-xs font-retro-mono font-bold text-[#6D7851] mb-2">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>

                        {event.contactEmail && (
                          <div className="flex items-center gap-1.5 text-[11px] font-retro-mono text-[#713D29]/80 mb-4">
                            <Mail className="w-3 h-3 text-[#D8753E] shrink-0" />
                            <span className="truncate">{event.contactEmail}</span>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          retroAudio.playGroovyChime();
                          onSelectEventForRegistration(event.title);
                        }}
                        className="w-full py-2 px-3 bg-[#FAF0DF] hover:bg-[#D8753E] text-[#713D29] hover:text-[#FAF0DF] border-2 border-[#713D29] rounded-xl font-retro-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-retro-sm"
                      >
                        <span>REGISTER FOR THIS EVENT</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for editing directly from schedule */}
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
