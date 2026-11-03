import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Mail, MapPin, Check, RotateCcw, Sparkles } from 'lucide-react';
import { FestivalEvent, FestivalDay, FESTIVAL_EVENTS } from '../data/festivalData';
import { retroAudio } from '../utils/audioPlayer';

interface EventEditModalProps {
  event: FestivalEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedEvent: FestivalEvent) => void;
}

export const EventEditModal: React.FC<EventEditModalProps> = ({
  event,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen || !event) return null;

  const [date, setDate] = useState(event.date);
  const [day, setDay] = useState<FestivalDay>(event.day);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [venue, setVenue] = useState(event.venue);
  const [contactEmail, setContactEmail] = useState(event.contactEmail || '');
  const [emailError, setEmailError] = useState('');

  // Keep state synced whenever event prop changes
  useEffect(() => {
    if (event) {
      setDate(event.date);
      setDay(event.day);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setVenue(event.venue);
      setContactEmail(event.contactEmail || '');
      setEmailError('');
    }
  }, [event]);

  const handleDaySelect = (selectedDay: FestivalDay) => {
    retroAudio.playTapeClick();
    setDay(selectedDay);
    if (selectedDay === 'Day 1') setDate('Friday, Feb 12, 2027');
    if (selectedDay === 'Day 2') setDate('Saturday, Feb 13, 2027');
    if (selectedDay === 'Day 3') setDate('Sunday, Feb 14, 2027');
  };

  const handleResetToDefault = () => {
    retroAudio.playTapeClick();
    const original = FESTIVAL_EVENTS.find((e) => e.id === event.id);
    if (original) {
      setDate(original.date);
      setDay(original.day);
      setStartTime(original.startTime);
      setEndTime(original.endTime);
      setVenue(original.venue);
      setContactEmail(original.contactEmail || '');
      setEmailError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email format check if provided
    if (contactEmail && contactEmail.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactEmail.trim())) {
        setEmailError('Please enter a valid email address (e.g. lead@retrofest.edu)');
        return;
      }
    }

    retroAudio.playGroovyChime();
    onSave({
      ...event,
      date: date.trim(),
      day,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      venue: venue.trim(),
      contactEmail: contactEmail.trim(),
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-event-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF0DF] border-4 border-[#713D29] rounded-3xl w-full max-w-xl my-auto p-5 sm:p-8 shadow-retro-lg max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#713D29]/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D8753E]" />
            <h2 id="edit-event-modal-title" className="font-groovy text-2xl text-[#713D29]">
              EDIT EVENT DETAILS
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border-2 border-[#713D29] bg-[#F3E4C8] hover:bg-[#D8753E] hover:text-[#FAF0DF] text-[#713D29] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <span className="text-[11px] font-retro-mono font-bold text-[#D8753E] uppercase tracking-wider block">
            {event.category} · CURRENT EVENT
          </span>
          <h3 className="font-groovy text-xl sm:text-2xl text-[#713D29]">
            {event.title}
          </h3>
          <p className="text-xs font-retro-mono text-[#713D29]/70 mt-1">
            Update the event date, time slots, and coordinator email. Changes reflect live on Event cards, Schedule timetable, and Registration dropdown!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Festival Day Selector */}
          <div>
            <label className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5">
              FESTIVAL DAY
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Day 1', 'Day 2', 'Day 3'] as FestivalDay[]).map((d) => {
                const isActive = day === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleDaySelect(d)}
                    className={`py-2 px-3 rounded-xl font-retro-mono text-xs font-bold border-2 border-[#713D29] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#D8753E] text-[#FAF0DF] shadow-retro-sm -translate-y-0.5'
                        : 'bg-[#F3E4C8] text-[#713D29] hover:bg-[#E7B84B]/30'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Event Date Input */}
          <div>
            <label htmlFor="edit-date" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D8753E]" />
              <span>EVENT DATE</span>
            </label>
            <input
              id="edit-date"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. Friday, Feb 12, 2027"
              className="w-full px-3.5 py-2.5 bg-[#F3E4C8] border-2 border-[#713D29] rounded-xl font-retro-mono text-xs sm:text-sm text-[#713D29] outline-none focus:ring-2 focus:ring-[#D8753E]"
              required
            />
          </div>

          {/* 3. Start Time & End Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="edit-start-time" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E7B84B]" />
                <span>START TIME</span>
              </label>
              <input
                id="edit-start-time"
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="e.g. 10:00 AM"
                className="w-full px-3.5 py-2.5 bg-[#F3E4C8] border-2 border-[#713D29] rounded-xl font-retro-mono text-xs sm:text-sm text-[#713D29] outline-none focus:ring-2 focus:ring-[#D8753E]"
                required
              />
            </div>

            <div>
              <label htmlFor="edit-end-time" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E7B84B]" />
                <span>END TIME</span>
              </label>
              <input
                id="edit-end-time"
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="e.g. 01:00 PM"
                className="w-full px-3.5 py-2.5 bg-[#F3E4C8] border-2 border-[#713D29] rounded-xl font-retro-mono text-xs sm:text-sm text-[#713D29] outline-none focus:ring-2 focus:ring-[#D8753E]"
                required
              />
            </div>
          </div>

          {/* Quick Time Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-retro-mono text-[#713D29]/75 pt-1">
            <span className="font-bold">Quick Presets:</span>
            {[
              { label: '10:00 AM – 01:00 PM', s: '10:00 AM', e: '01:00 PM' },
              { label: '02:00 PM – 05:00 PM', s: '02:00 PM', e: '05:00 PM' },
              { label: '05:30 PM – 08:30 PM', s: '05:30 PM', e: '08:30 PM' },
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  retroAudio.playTapeClick();
                  setStartTime(p.s);
                  setEndTime(p.e);
                }}
                className="px-2 py-0.5 bg-[#F3E4C8] hover:bg-[#E7B84B]/40 border border-[#713D29] rounded cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* 4. Coordinator / Contact Email (Requested Feature) */}
          <div>
            <label htmlFor="edit-email" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#6D7851]" />
              <span>COORDINATOR / CONTACT EMAIL</span>
            </label>
            <input
              id="edit-email"
              type="email"
              value={contactEmail}
              onChange={(e) => {
                setContactEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              placeholder="e.g. lead@retrofest26.starlight.edu"
              className={`w-full px-3.5 py-2.5 bg-[#F3E4C8] border-2 rounded-xl font-retro-mono text-xs sm:text-sm text-[#713D29] outline-none ${
                emailError
                  ? 'border-[#D8753E] bg-[#D8753E]/10 focus:ring-2 focus:ring-[#D8753E]'
                  : 'border-[#713D29] focus:ring-2 focus:ring-[#6D7851]'
              }`}
            />
            {emailError && (
              <p className="mt-1 text-xs font-retro-mono font-bold text-[#D8753E]">
                ⚠ {emailError}
              </p>
            )}
          </div>

          {/* 5. Venue */}
          <div>
            <label htmlFor="edit-venue" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#713D29]" />
              <span>VENUE / STAGE</span>
            </label>
            <input
              id="edit-venue"
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Ada Lovelace Tech Pavilion"
              className="w-full px-3.5 py-2.5 bg-[#F3E4C8] border-2 border-[#713D29] rounded-xl font-retro-mono text-xs sm:text-sm text-[#713D29] outline-none focus:ring-2 focus:ring-[#6D7851]"
              required
            />
          </div>

          {/* Actions */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-[#713D29]/20">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="w-full sm:w-auto px-4 py-2.5 bg-[#FAF0DF] hover:bg-[#E7B84B]/30 text-[#713D29] font-retro-mono text-xs font-bold rounded-xl border-2 border-[#713D29] shadow-retro-sm cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2.5 bg-[#FAF0DF] text-[#713D29] font-retro-mono text-xs font-bold rounded-xl border-2 border-[#713D29] hover:bg-[#713D29]/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 sm:w-auto px-6 py-2.5 bg-[#D8753E] hover:bg-[#c6652e] text-[#FAF0DF] font-alfa text-xs sm:text-sm rounded-xl border-2 border-[#713D29] shadow-retro-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>SAVE CHANGES</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
