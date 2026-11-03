import React, { useState } from 'react';
import { Ticket, CheckCircle2, AlertCircle, Printer, RotateCcw, Sparkles, User, Mail, Phone, GraduationCap, Calendar } from 'lucide-react';
import { FESTIVAL_EVENTS } from '../data/festivalData';
import { validateRegistration, generateTicket, RegistrationData, ValidationErrors, IssuedTicket } from '../utils/festivalLogic';
import { RetroDaisy, RetroVinyl } from './RetroGraphics';
import { retroAudio } from '../utils/audioPlayer';

interface RegisterProps {
  selectedEventPreFill?: string;
  onClearPreFill?: () => void;
}

export const Register: React.FC<RegisterProps> = ({ selectedEventPreFill, onClearPreFill }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    selectedEvent: selectedEventPreFill || 'All-Access Golden Festival Pass'
  });

  // Keep pre-fill in sync when user clicks "Register for this Event" on any card
  React.useEffect(() => {
    if (selectedEventPreFill) {
      setFormData(prev => ({ ...prev, selectedEvent: selectedEventPreFill }));
    }
  }, [selectedEventPreFill]);

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submittedTicket, setSubmittedTicket] = useState<IssuedTicket | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    retroAudio.playGroovyChime();

    const { isValid, errors: validationErrors } = validateRegistration(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ticket = generateTicket(formData);
      setSubmittedTicket(ticket);
      setIsSubmitting(false);
      retroAudio.playGroovyChime();
    }, 400);
  };

  const handleReset = () => {
    retroAudio.playGroovyChime();
    setSubmittedTicket(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      collegeName: '',
      selectedEvent: 'All-Access Golden Festival Pass'
    });
    setErrors({});
    if (onClearPreFill) onClearPreFill();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="register" className="relative bg-[#F3E4C8] text-[#713D29] py-16 md:py-24 border-b-4 border-[#713D29] paper-grain">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-retro-mono font-bold tracking-widest text-[#D8753E] uppercase mb-2">
            <Ticket className="w-4 h-4" />
            <span>Chapter 04 · Festival Pass Desk</span>
          </div>
          <h2 className="font-groovy text-4xl sm:text-5xl md:text-6xl text-[#713D29] leading-tight mb-4">
            CLAIM YOUR FESTIVAL PASS
          </h2>
          <div className="w-24 h-1.5 bg-[#D8753E] mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg text-[#713D29]/90 font-medium">
            Lock in your admission across both days of RETROFEST '26. Receive an instant personalized vintage printable golden pass!
          </p>
        </div>

        {/* If Ticket has been submitted: render 1970s Concert Ticket Pass */}
        {submittedTicket ? (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            
            {/* Success Alert Banner */}
            <div className="bg-[#FAF0DF] border-3 border-[#6D7851] rounded-2xl p-4 sm:p-5 mb-8 shadow-retro flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#6D7851] shrink-0" />
              <div>
                <h4 className="font-retro-slab text-base sm:text-lg text-[#6D7851]">
                  Registration Successful! You're Going Back to the 70s!
                </h4>
                <p className="text-xs sm:text-sm text-[#713D29]/90 font-medium">
                  Your registration has been confirmed. Present this official vintage festival pass at the entrance gate.
                </p>
              </div>
            </div>

            {/* Authentic 1970s Golden Concert Pass Card */}
            <div className="bg-[#FAF0DF] border-4 border-[#713D29] rounded-3xl p-6 sm:p-10 shadow-retro-lg relative overflow-hidden">
              
              {/* Top Rainbow Stripe Ribbon */}
              <div className="h-4 retro-stripes -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-6 border-b-2 border-[#713D29]" />

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b-3 border-dashed border-[#713D29]/40">
                <div>
                  <div className="text-xs font-retro-mono text-[#D8753E] font-bold uppercase tracking-widest">
                    Official Admission Credential
                  </div>
                  <h3 className="font-groovy text-3xl sm:text-4xl text-[#713D29]">
                    RETROFEST '26 PASS
                  </h3>
                  <div className="text-xs font-retro-mono text-[#713D29]/80 mt-1">
                    October 16 - 17, 2026 · Sunset Valley Campus & Amphitheatre
                  </div>
                </div>
                
                {/* Golden Badge */}
                <div className="text-right">
                  <div className="inline-block bg-[#E7B84B] border-2 border-[#713D29] rounded-xl px-4 py-2 font-retro-mono font-bold text-xs text-[#713D29] shadow-retro-sm">
                    {submittedTicket.tier}
                  </div>
                  <div className="text-xs font-retro-mono text-[#D8753E] font-bold mt-1">
                    ID: {submittedTicket.ticketId}
                  </div>
                </div>
              </div>

              {/* Pass Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b-3 border-dashed border-[#713D29]/40">
                <div>
                  <span className="block text-[11px] font-retro-mono font-bold text-[#713D29]/60 uppercase">
                    Attendee Name
                  </span>
                  <span className="font-retro-slab text-base sm:text-lg text-[#713D29] break-words">
                    {submittedTicket.attendeeName}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-retro-mono font-bold text-[#713D29]/60 uppercase">
                    Institution / College
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-[#713D29] break-words">
                    {submittedTicket.college}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-retro-mono font-bold text-[#713D29]/60 uppercase">
                    Registered Track
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-[#D8753E] break-words">
                    {submittedTicket.eventName}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-retro-mono font-bold text-[#713D29]/60 uppercase">
                    Date Issued
                  </span>
                  <span className="font-retro-mono text-sm sm:text-base text-[#6D7851] font-bold">
                    {submittedTicket.issueDate}
                  </span>
                </div>
              </div>

              {/* Barcode & Holographic Verification Row */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* SVG 70s Barcode */}
                <div className="space-y-1">
                  <svg width="220" height="42" className="text-[#713D29] opacity-85">
                    {/* Retro Variable Barcode Lines */}
                    {[4, 12, 18, 26, 32, 40, 48, 58, 68, 76, 88, 96, 108, 120, 132, 142, 154, 168, 180, 192, 204].map((x, i) => (
                      <line
                        key={x}
                        x1={x}
                        y1="2"
                        x2={x}
                        y2="38"
                        stroke="#713D29"
                        strokeWidth={i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1}
                      />
                    ))}
                  </svg>
                  <div className="text-[10px] font-retro-mono text-center tracking-widest text-[#713D29]/70">
                    * {submittedTicket.ticketId} *
                  </div>
                </div>

                {/* Decorative Daisy Seal */}
                <div className="flex items-center gap-3 bg-[#F3E4C8] border-2 border-[#713D29] rounded-xl px-4 py-2 shadow-retro-sm">
                  <RetroDaisy size={32} petalColor="#FAF0DF" centerColor="#E7B84B" />
                  <div className="text-left">
                    <span className="block text-[10px] font-retro-mono font-bold text-[#713D29] leading-tight">
                      ALL-ACCESS STAMP
                    </span>
                    <span className="text-[9px] font-retro-mono text-[#D8753E] font-bold">
                      DOORS OPEN 9:00 AM
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Ticket Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={handlePrint}
                className="btn-retro px-6 py-3 bg-[#D8753E] text-[#F3E4C8] font-retro-slab text-sm border-2 border-[#713D29] rounded-xl shadow-retro flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT / SAVE PASS</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn-retro px-6 py-3 bg-[#FAF0DF] text-[#713D29] font-retro-slab text-sm border-2 border-[#713D29] rounded-xl shadow-retro flex items-center gap-2 cursor-pointer hover:bg-[#E7B84B]/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>REGISTER ANOTHER ATTENDEE</span>
              </button>
            </div>

          </div>
        ) : (
          /* Registration Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#FAF0DF] border-4 border-[#713D29] rounded-3xl p-6 sm:p-10 shadow-retro-lg relative"
          >
            {/* Form Header */}
            <div className="flex items-center justify-between pb-6 border-b-2 border-[#713D29]/20 mb-6">
              <div>
                <h3 className="font-retro-slab text-xl sm:text-2xl text-[#713D29]">
                  Attendee Information Form
                </h3>
                <p className="text-xs sm:text-sm text-[#713D29]/80 mt-1 font-medium">
                  Fields marked with <span className="text-[#D8753E] font-bold">*</span> are required for entry credential issuance.
                </p>
              </div>
              <RetroDaisy size={40} petalColor="#F3E4C8" centerColor="#E7B84B" className="hidden sm:inline-block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Field 1: Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D8753E]" />
                  <span>Full Name <span className="text-[#D8753E]">*</span></span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Jimi Morrison"
                  className={`w-full px-4 py-2.5 bg-[#F3E4C8] border-2 rounded-xl text-sm font-medium text-[#713D29] placeholder-[#713D29]/40 focus:outline-none transition-colors ${
                    errors.fullName
                      ? 'border-red-600 focus:ring-2 focus:ring-red-500'
                      : 'border-[#713D29] focus:ring-2 focus:ring-[#D8753E]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs font-retro-mono text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Field 2: Email Address */}
              <div>
                <label htmlFor="email" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D8753E]" />
                  <span>Email Address <span className="text-[#D8753E]">*</span></span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. jimi@starlight.edu"
                  className={`w-full px-4 py-2.5 bg-[#F3E4C8] border-2 rounded-xl text-sm font-medium text-[#713D29] placeholder-[#713D29]/40 focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-red-600 focus:ring-2 focus:ring-red-500'
                      : 'border-[#713D29] focus:ring-2 focus:ring-[#D8753E]'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs font-retro-mono text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Field 3: Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#6D7851]" />
                  <span>Phone Number (10+ digits) <span className="text-[#D8753E]">*</span></span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className={`w-full px-4 py-2.5 bg-[#F3E4C8] border-2 rounded-xl text-sm font-medium text-[#713D29] placeholder-[#713D29]/40 focus:outline-none transition-colors ${
                    errors.phone
                      ? 'border-red-600 focus:ring-2 focus:ring-red-500'
                      : 'border-[#713D29] focus:ring-2 focus:ring-[#D8753E]'
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs font-retro-mono text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Field 4: College Name */}
              <div>
                <label htmlFor="collegeName" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#6D7851]" />
                  <span>College / University <span className="text-[#D8753E]">*</span></span>
                </label>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  placeholder="e.g. Starlight Institute of Technology"
                  className={`w-full px-4 py-2.5 bg-[#F3E4C8] border-2 rounded-xl text-sm font-medium text-[#713D29] placeholder-[#713D29]/40 focus:outline-none transition-colors ${
                    errors.collegeName
                      ? 'border-red-600 focus:ring-2 focus:ring-red-500'
                      : 'border-[#713D29] focus:ring-2 focus:ring-[#D8753E]'
                  }`}
                />
                {errors.collegeName && (
                  <p className="text-xs font-retro-mono text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.collegeName}</span>
                  </p>
                )}
              </div>

              {/* Field 5: Select Event */}
              <div className="md:col-span-2">
                <label htmlFor="selectedEvent" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E7B84B]" />
                  <span>Select Event or Access Pass <span className="text-[#D8753E]">*</span></span>
                </label>
                <select
                  id="selectedEvent"
                  name="selectedEvent"
                  value={formData.selectedEvent}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-[#F3E4C8] border-2 rounded-xl text-sm font-medium text-[#713D29] focus:outline-none cursor-pointer transition-colors ${
                    errors.selectedEvent
                      ? 'border-red-600 focus:ring-2 focus:ring-red-500'
                      : 'border-[#713D29] focus:ring-2 focus:ring-[#D8753E]'
                  }`}
                >
                  <option value="All-Access Golden Festival Pass">
                    🌟 All-Access Golden Festival Pass (Both Days · All Tracks)
                  </option>
                  <optgroup label="Technical Events">
                    {FESTIVAL_EVENTS.filter(e => e.category === 'Technical').map(e => (
                      <option key={e.id} value={e.name}>
                        {e.name} ({e.day} · {e.venue})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Cultural Events">
                    {FESTIVAL_EVENTS.filter(e => e.category === 'Cultural').map(e => (
                      <option key={e.id} value={e.name}>
                        {e.name} ({e.day} · {e.venue})
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.selectedEvent && (
                  <p className="text-xs font-retro-mono text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.selectedEvent}</span>
                  </p>
                )}
              </div>

            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t-2 border-[#713D29]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-retro-mono text-[#713D29]/75 text-center sm:text-left">
                Instant confirmation · No fee required · 100% Free student registration
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto btn-retro px-8 py-3.5 bg-[#D8753E] text-[#F3E4C8] text-sm md:text-base font-retro-slab tracking-wider border-3 border-[#713D29] rounded-xl shadow-retro flex items-center justify-center gap-2 cursor-pointer hover:bg-[#c66530] disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'GENERATING PASS...' : 'SUBMIT REGISTRATION'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
