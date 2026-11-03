import React, { useRef, useState } from 'react';
import { Sparkles, Ticket, CheckCircle2, User, Mail, School, Phone, Calendar, MessageSquare, ArrowRight, Printer, RotateCcw } from 'lucide-react';
import { FESTIVAL_EVENTS, FestivalEvent } from '../data/festivalData';
import {
  RegistrationFormData,
  RegistrationFieldKey,
  validateRegistration,
  generateTicket,
  IssuedTicket
} from '../utils/festivalLogic';
import { retroAudio } from '../utils/audioPlayer';
import { RetroDaisy } from '../components/RetroGraphics';

interface RegisterPageProps {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  events: FestivalEvent[];
  formData: RegistrationFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationFormData>>;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  headingRef,
  events,
  formData,
  setFormData,
}) => {
  const [errors, setErrors] = useState<Partial<Record<RegistrationFieldKey, string>>>({});
  const [issuedTicket, setIssuedTicket] = useState<IssuedTicket | null>(null);

  // Field element refs for focusing the first invalid field
  const fieldRefs: Record<RegistrationFieldKey, React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>> = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    college: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    selectedEvent: useRef<HTMLSelectElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const handleInputChange = (field: RegistrationFieldKey, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateRegistration(formData);

    if (!result.isValid) {
      retroAudio.playTapeClick();
      setErrors(result.errors);
      // Move keyboard focus to the first invalid field per specification!
      if (result.firstInvalidField && fieldRefs[result.firstInvalidField]?.current) {
        fieldRefs[result.firstInvalidField].current?.focus();
      }
      return;
    }

    // Success: Generate ticket confirmation
    retroAudio.playGroovyChime();
    const ticket = generateTicket(formData);
    setIssuedTicket(ticket);
    setErrors({});
  };

  const handleResetForm = () => {
    retroAudio.playGroovyChime();
    setIssuedTicket(null);
    setFormData({
      name: '',
      email: '',
      college: '',
      phone: '',
      selectedEvent: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <div className="w-full flex flex-col flex-1 bg-[#F3E4C8] py-10 md:py-16 paper-grain">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-retro-mono font-bold tracking-widest text-[#D8753E] uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>ADMISSION PASS · 100% FREE</span>
          </div>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-groovy text-4xl sm:text-5xl md:text-6xl text-[#713D29] leading-tight mb-3 outline-none focus:ring-4 focus:ring-[#D8753E] rounded-xl"
          >
            FESTIVAL REGISTRATION
          </h1>
          <p className="text-base sm:text-lg text-[#713D29]/90 font-medium">
            Lock in your spot at RETROFEST '26. Instant confirmation with your personalized 1970s concert pass!
          </p>
        </div>

        {/* ON-SCREEN CONFIRMATION TICKET OR FORM */}
        {issuedTicket ? (
          <div className="bg-[#FAF0DF] border-4 border-[#713D29] rounded-3xl p-6 sm:p-10 shadow-retro-lg max-w-2xl mx-auto text-center relative overflow-hidden animate-fade-in">
            {/* Top Retro Stripes */}
            <div className="absolute top-0 left-0 right-0 h-3 retro-stripes" />

            <div className="w-16 h-16 mx-auto mt-2 mb-4 bg-[#6D7851]/20 border-3 border-[#713D29] rounded-full flex items-center justify-center text-[#6D7851]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-retro-mono font-bold tracking-widest text-[#D8753E] uppercase block mb-1">
              REGISTRATION CONFIRMED!
            </span>
            <h2 className="font-groovy text-3xl sm:text-4xl text-[#713D29] mb-4">
              WELCOME, {issuedTicket.name.toUpperCase()}!
            </h2>
            <p className="text-sm font-retro-mono text-[#713D29]/80 mb-6 max-w-md mx-auto">
              You are officially registered for <strong className="text-[#D8753E]">{issuedTicket.selectedEvent}</strong> at RETROFEST '26.
              Keep this pass handy on your mobile device.
            </p>

            {/* The 1970s Pass Card */}
            <div className="bg-[#F3E4C8] border-3 border-dashed border-[#713D29] rounded-2xl p-5 sm:p-6 text-left mb-8 shadow-retro-sm relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#713D29]/30 pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-retro-mono font-bold text-[#D8753E] tracking-widest uppercase">
                    RETROFEST '26 ADMISSION TICKET
                  </span>
                  <div className="font-groovy text-xl text-[#713D29]">12-14 FEB 2027</div>
                </div>
                <div className="font-retro-mono text-xs font-bold bg-[#D8753E] text-[#FAF0DF] px-3 py-1 rounded-md border border-[#713D29]">
                  {issuedTicket.ticketId}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-retro-mono mb-4">
                <div>
                  <span className="text-[#713D29]/60 block uppercase font-bold text-[10px]">ATTENDEE NAME</span>
                  <span className="font-bold text-sm text-[#713D29]">{issuedTicket.name}</span>
                </div>
                <div>
                  <span className="text-[#713D29]/60 block uppercase font-bold text-[10px]">CHOSEN EVENT</span>
                  <span className="font-bold text-sm text-[#D8753E]">{issuedTicket.selectedEvent}</span>
                </div>
                <div>
                  <span className="text-[#713D29]/60 block uppercase font-bold text-[10px]">COLLEGE / INSTITUTION</span>
                  <span className="font-bold text-[#713D29]">{issuedTicket.college}</span>
                </div>
                <div>
                  <span className="text-[#713D29]/60 block uppercase font-bold text-[10px]">EMAIL ADDRESS</span>
                  <span className="font-bold text-[#713D29] truncate block">{issuedTicket.email}</span>
                </div>
              </div>

              {/* Decorative 70s Barcode */}
              <div className="pt-3 border-t-2 border-[#713D29]/30 flex flex-col items-center">
                <div className="h-8 w-48 flex justify-between items-center bg-[#713D29]/10 px-2 py-1 rounded">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-[#713D29]"
                      style={{
                        width: i % 3 === 0 ? '4px' : i % 2 === 0 ? '2px' : '1px',
                        height: '100%',
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-retro-mono text-[#713D29]/70 mt-1">
                  NO BACKEND · PURE CLIENT PROTOTYPE
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 bg-[#6D7851] text-[#FAF0DF] font-alfa text-sm rounded-xl border-2 border-[#713D29] shadow-retro hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT / SAVE PASS</span>
              </button>

              <button
                type="button"
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-3 bg-[#FAF0DF] text-[#713D29] font-alfa text-sm rounded-xl border-2 border-[#713D29] shadow-retro hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 hover:bg-[#E7B84B]/30"
              >
                <RotateCcw className="w-4 h-4" />
                <span>REGISTER ANOTHER PERSON</span>
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#FAF0DF] border-4 border-[#713D29] rounded-3xl p-6 sm:p-10 shadow-retro-lg max-w-2xl mx-auto relative"
          >
            {/* Top Retro Stripes */}
            <div className="absolute top-0 left-0 right-0 h-3 retro-stripes rounded-t-2xl" />

            <div className="mb-6 pt-2">
              <h2 className="font-groovy text-2xl sm:text-3xl text-[#713D29] mb-1">
                PASS HOLDER DETAILS
              </h2>
              <p className="text-xs font-retro-mono text-[#713D29]/75">
                Fields marked with <span className="text-[#D8753E] font-bold">*</span> are required.
              </p>
            </div>

            <div className="space-y-5">
              {/* Field 1: Full Name (Required) */}
              <div>
                <label htmlFor="reg-name" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D8753E]" />
                  <span>FULL NAME <span className="text-[#D8753E]">*</span></span>
                </label>
                <input
                  id="reg-name"
                  ref={fieldRefs.name}
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g. Stevie Nicks"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'error-name' : undefined}
                  className={`w-full px-4 py-3 bg-[#F3E4C8] border-2 rounded-xl font-retro-mono text-sm text-[#713D29] placeholder-[#713D29]/40 outline-none transition-all ${
                    errors.name
                      ? 'border-[#D8753E] bg-[#D8753E]/10 focus:ring-2 focus:ring-[#D8753E]'
                      : 'border-[#713D29] focus:ring-2 focus:ring-[#6D7851]'
                  }`}
                />
                {errors.name && (
                  <p id="error-name" className="mt-1.5 text-xs font-retro-mono font-bold text-[#D8753E] flex items-center gap-1">
                    <span>⚠</span>
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Field 2: Email (Required, format-validated) */}
              <div>
                <label htmlFor="reg-email" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D8753E]" />
                  <span>EMAIL ADDRESS <span className="text-[#D8753E]">*</span></span>
                </label>
                <input
                  id="reg-email"
                  ref={fieldRefs.email}
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="e.g. stevie@fleetwood.edu"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  className={`w-full px-4 py-3 bg-[#F3E4C8] border-2 rounded-xl font-retro-mono text-sm text-[#713D29] placeholder-[#713D29]/40 outline-none transition-all ${
                    errors.email
                      ? 'border-[#D8753E] bg-[#D8753E]/10 focus:ring-2 focus:ring-[#D8753E]'
                      : 'border-[#713D29] focus:ring-2 focus:ring-[#6D7851]'
                  }`}
                />
                {errors.email && (
                  <p id="error-email" className="mt-1.5 text-xs font-retro-mono font-bold text-[#D8753E] flex items-center gap-1">
                    <span>⚠</span>
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Field 3: College (Required) */}
              <div>
                <label htmlFor="reg-college" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-[#D8753E]" />
                  <span>COLLEGE / UNIVERSITY <span className="text-[#D8753E]">*</span></span>
                </label>
                <input
                  id="reg-college"
                  ref={fieldRefs.college}
                  type="text"
                  value={formData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                  placeholder="e.g. Berkeley College of Music & Tech"
                  aria-invalid={Boolean(errors.college)}
                  aria-describedby={errors.college ? 'error-college' : undefined}
                  className={`w-full px-4 py-3 bg-[#F3E4C8] border-2 rounded-xl font-retro-mono text-sm text-[#713D29] placeholder-[#713D29]/40 outline-none transition-all ${
                    errors.college
                      ? 'border-[#D8753E] bg-[#D8753E]/10 focus:ring-2 focus:ring-[#D8753E]'
                      : 'border-[#713D29] focus:ring-2 focus:ring-[#6D7851]'
                  }`}
                />
                {errors.college && (
                  <p id="error-college" className="mt-1.5 text-xs font-retro-mono font-bold text-[#D8753E] flex items-center gap-1">
                    <span>⚠</span>
                    <span>{errors.college}</span>
                  </p>
                )}
              </div>

              {/* Field 4: Phone (Optional) */}
              <div>
                <label htmlFor="reg-phone" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#6D7851]" />
                  <span>PHONE NUMBER <span className="text-[#713D29]/50 font-normal">(OPTIONAL)</span></span>
                </label>
                <input
                  id="reg-phone"
                  ref={fieldRefs.phone}
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="e.g. +1 555-700-1976"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'error-phone' : undefined}
                  className={`w-full px-4 py-3 bg-[#F3E4C8] border-2 rounded-xl font-retro-mono text-sm text-[#713D29] placeholder-[#713D29]/40 outline-none transition-all ${
                    errors.phone
                      ? 'border-[#D8753E] bg-[#D8753E]/10 focus:ring-2 focus:ring-[#D8753E]'
                      : 'border-[#713D29] focus:ring-2 focus:ring-[#6D7851]'
                  }`}
                />
                {errors.phone && (
                  <p id="error-phone" className="mt-1.5 text-xs font-retro-mono font-bold text-[#D8753E] flex items-center gap-1">
                    <span>⚠</span>
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Field 5: Event Dropdown (Filled from Events Data) (Required) */}
              <div>
                <label htmlFor="reg-event" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D8753E]" />
                  <span>SELECT EVENT <span className="text-[#D8753E]">*</span></span>
                </label>
                <select
                  id="reg-event"
                  ref={fieldRefs.selectedEvent}
                  value={formData.selectedEvent}
                  onChange={(e) => handleInputChange('selectedEvent', e.target.value)}
                  aria-invalid={Boolean(errors.selectedEvent)}
                  aria-describedby={errors.selectedEvent ? 'error-event' : undefined}
                  className={`w-full px-4 py-3 bg-[#F3E4C8] border-2 rounded-xl font-retro-mono text-sm text-[#713D29] outline-none transition-all cursor-pointer ${
                    errors.selectedEvent
                      ? 'border-[#D8753E] bg-[#D8753E]/10 focus:ring-2 focus:ring-[#D8753E]'
                      : 'border-[#713D29] focus:ring-2 focus:ring-[#6D7851]'
                  }`}
                >
                  <option value="">-- Choose an Event or All-Access Pass --</option>
                  <option value="All-Access Festival Pass (All 3 Days)">
                    ★ All-Access Festival Pass (All 3 Days)
                  </option>
                  <optgroup label="Technical Events">
                    {events.filter((e) => e.category === 'Tech').map((ev) => (
                      <option key={ev.id} value={ev.title}>
                        {ev.title} ({ev.day} · {ev.startTime})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Cultural Events">
                    {events.filter((e) => e.category === 'Cultural').map((ev) => (
                      <option key={ev.id} value={ev.title}>
                        {ev.title} ({ev.day} · {ev.startTime})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Fun & Social Events">
                    {events.filter((e) => e.category === 'Fun').map((ev) => (
                      <option key={ev.id} value={ev.title}>
                        {ev.title} ({ev.day} · {ev.startTime})
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.selectedEvent && (
                  <p id="error-event" className="mt-1.5 text-xs font-retro-mono font-bold text-[#D8753E] flex items-center gap-1">
                    <span>⚠</span>
                    <span>{errors.selectedEvent}</span>
                  </p>
                )}
              </div>

              {/* Field 6: Message (Optional) */}
              <div>
                <label htmlFor="reg-message" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#6D7851]" />
                  <span>NOTE / TEAM DETAILS <span className="text-[#713D29]/50 font-normal">(OPTIONAL)</span></span>
                </label>
                <textarea
                  id="reg-message"
                  ref={fieldRefs.message}
                  rows={3}
                  value={formData.message || ''}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Any special requests, team member names, or accessibility accommodations..."
                  className="w-full px-4 py-3 bg-[#F3E4C8] border-2 border-[#713D29] rounded-xl font-retro-mono text-sm text-[#713D29] placeholder-[#713D29]/40 outline-none focus:ring-2 focus:ring-[#6D7851] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 py-4 bg-[#D8753E] hover:bg-[#c6652e] text-[#FAF0DF] font-alfa text-base sm:text-lg rounded-2xl border-3 border-[#713D29] shadow-retro hover:shadow-retro-lg hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Ticket className="w-5 h-5" />
                <span>CONFIRM REGISTRATION & GET PASS</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
