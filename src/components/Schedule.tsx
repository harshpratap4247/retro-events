import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Search, Music, Cpu, Sparkles } from 'lucide-react';
import { FESTIVAL_SCHEDULE, ScheduleItem } from '../data/festivalData';
import { RetroDaisy } from './RetroGraphics';
import { retroAudio } from '../utils/audioPlayer';

export const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'Day 1' | 'Day 2' | 'All'>('Day 1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchedule = FESTIVAL_SCHEDULE.filter((item) => {
    const matchesDay = selectedDay === 'All' || item.day === selectedDay;
    const matchesSearch =
      item.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesSearch;
  });

  const handleDaySelect = (day: 'Day 1' | 'Day 2' | 'All') => {
    retroAudio.playGroovyChime();
    setSelectedDay(day);
  };

  return (
    <section id="schedule" className="relative bg-[#FAF0DF] text-[#713D29] py-16 md:py-24 border-b-4 border-[#713D29]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-retro-mono font-bold tracking-widest text-[#6D7851] uppercase mb-2">
            <Clock className="w-4 h-4" />
            <span>Chapter 03 · Master Timetable</span>
          </div>
          <h2 className="font-groovy text-4xl sm:text-5xl md:text-6xl text-[#713D29] leading-tight mb-4">
            FESTIVAL TIMETABLE
          </h2>
          <div className="w-24 h-1.5 bg-[#6D7851] mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg text-[#713D29]/90 font-medium">
            Explore the multi-track schedule across both action-packed days. Overlapping sessions run in separate dedicated venues so you never miss a beat.
          </p>
        </div>

        {/* Day Selectors & Search Bar Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#F3E4C8] border-3 border-[#713D29] rounded-2xl p-4 shadow-retro">
          
          {/* Day Tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {(['Day 1', 'Day 2', 'All'] as const).map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDaySelect(day)}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl font-retro-mono text-xs sm:text-sm font-bold border-2 border-[#713D29] transition-all cursor-pointer whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-[#6D7851] text-[#FAF0DF] shadow-retro-sm -translate-y-0.5'
                    : 'bg-[#FAF0DF] text-[#713D29] hover:bg-[#E7B84B]/30'
                }`}
              >
                {day === 'All' ? 'Both Days' : `${day} (${day === 'Day 1' ? 'Oct 16' : 'Oct 17'})`}
              </button>
            ))}
          </div>

          {/* Quick Search in Schedule */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#713D29]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event, venue, or stage..."
              aria-label="Search schedule"
              className="w-full pl-9 pr-4 py-2 bg-[#FAF0DF] border-2 border-[#713D29] rounded-xl text-xs sm:text-sm font-retro-mono text-[#713D29] placeholder-[#713D29]/50 focus:outline-none focus:ring-2 focus:ring-[#D8753E]"
            />
          </div>

        </div>

        {/* Timetable Items List */}
        <div className="space-y-4">
          {filteredSchedule.length === 0 ? (
            <div className="bg-[#F3E4C8] border-2 border-[#713D29] rounded-2xl p-8 text-center text-[#713D29]">
              <p className="font-retro-mono text-sm font-bold mb-2">No events match your search.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDay('All');
                  setSearchQuery('');
                }}
                className="text-xs font-retro-mono text-[#D8753E] underline font-bold"
              >
                Reset timetable filters
              </button>
            </div>
          ) : (
            filteredSchedule.map((item) => (
              <div
                key={item.id}
                className={`bg-[#F3E4C8] border-3 border-[#713D29] rounded-2xl p-5 sm:p-6 shadow-retro transition-all hover:-translate-y-0.5 ${
                  item.featured ? 'border-l-8 border-l-[#D8753E]' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left Column: Time & Day Badge */}
                  <div className="lg:w-64 shrink-0 flex lg:flex-col items-center lg:items-start justify-between gap-2 border-b lg:border-b-0 lg:border-r border-[#713D29]/20 pb-3 lg:pb-0 lg:pr-6">
                    <div className="flex items-center gap-2">
                      <span className="font-retro-mono text-xs font-bold text-[#6D7851] uppercase">
                        {item.day} · {item.date}
                      </span>
                    </div>
                    <div className="font-retro-mono text-sm sm:text-base font-bold text-[#D8753E] tabular-nums">
                      {item.timeSlot}
                    </div>
                  </div>

                  {/* Middle Column: Event Title, Category, Description */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs font-retro-mono text-[#713D29]/80 mb-1">
                      <span className="font-bold text-[#713D29]">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#6D7851] font-semibold">{item.venue}</span>
                    </div>
                    <h3 className="font-groovy text-xl sm:text-2xl text-[#713D29] mb-1">
                      {item.eventName}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#713D29]/85 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Right Column: Stage Indicator & Category Glyph */}
                  <div className="shrink-0 flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#713D29]/20">
                    <div className="flex items-center gap-1.5 text-xs font-retro-mono font-bold text-[#713D29] bg-[#FAF0DF] px-3 py-1.5 border border-[#713D29] rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-[#D8753E]" />
                      <span className="truncate max-w-[150px]">{item.venue}</span>
                    </div>
                    {item.category === 'Technical' && (
                      <div className="p-2 bg-[#FAF0DF] border border-[#713D29] rounded-lg text-[#6D7851]">
                        <Cpu className="w-4 h-4" />
                      </div>
                    )}
                    {item.category === 'Cultural' && (
                      <div className="p-2 bg-[#FAF0DF] border border-[#713D29] rounded-lg text-[#D8753E]">
                        <Music className="w-4 h-4" />
                      </div>
                    )}
                    {item.category === 'Special' && (
                      <div className="p-2 bg-[#E7B84B] border border-[#713D29] rounded-lg text-[#713D29]">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Timetable Notes */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-retro-mono text-[#713D29]/75 gap-3 pt-4 border-t border-[#713D29]/20">
          <span>* Doors open 45 minutes before scheduled start time.</span>
          <span>Venue map available at the Welcome Kiosk at Quad Entrance.</span>
        </div>

      </div>
    </section>
  );
};
