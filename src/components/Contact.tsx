import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, Instagram, Youtube, MessageSquare, Disc, Heart } from 'lucide-react';
import { FESTIVAL_DETAILS, FESTIVAL_FAQS } from '../data/festivalData';
import { RetroDaisy } from './RetroGraphics';
import { retroAudio } from '../utils/audioPlayer';

export const Contact: React.FC = () => {
  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sentMessage, setSentMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.name || !inquiry.email || !inquiry.message) return;
    retroAudio.playGroovyChime();
    setSentMessage(true);
  };

  return (
    <section id="contact" className="relative bg-[#FAF0DF] text-[#713D29] py-16 md:py-24 border-b-4 border-[#713D29]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-retro-mono font-bold tracking-widest text-[#D8753E] uppercase mb-2">
            <Mail className="w-4 h-4" />
            <span>Chapter 05 · Get In Touch</span>
          </div>
          <h2 className="font-groovy text-4xl sm:text-5xl md:text-6xl text-[#713D29] leading-tight mb-4">
            CAMPUS COORDINATION & HELP DESK
          </h2>
          <div className="w-24 h-1.5 bg-[#E7B84B] mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg text-[#713D29]/90 font-medium">
            Have questions about event rules, team accommodation, or campus directions? Reach out to the student organizing council!
          </p>
        </div>

        {/* Contact Info & Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          
          {/* Left Column: Official Placeholders & Coordination Info */}
          <div className="bg-[#F3E4C8] border-3 border-[#713D29] rounded-3xl p-6 sm:p-8 shadow-retro flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#713D29]/20 mb-6">
                <div>
                  <h3 className="font-retro-slab text-xl sm:text-2xl text-[#713D29]">
                    Festival Headquarters
                  </h3>
                  <span className="text-xs font-retro-mono text-[#D8753E] font-bold">
                    Official Campus Placeholders
                  </span>
                </div>
                <RetroDaisy size={40} petalColor="#FAF0DF" centerColor="#E7B84B" />
              </div>

              {/* Contact List */}
              <div className="space-y-5 text-sm sm:text-base">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0DF] border-2 border-[#713D29] flex items-center justify-center text-[#D8753E] shrink-0 shadow-retro-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-retro-mono font-bold text-[#713D29]/70 uppercase">
                      College & Venue
                    </span>
                    <strong className="text-[#713D29] font-retro-slab text-base">
                      {FESTIVAL_DETAILS.college}
                    </strong>
                    <p className="text-xs sm:text-sm text-[#713D29]/80 mt-0.5">
                      {FESTIVAL_DETAILS.venue}
                    </p>
                    <p className="text-xs font-retro-mono text-[#6D7851] mt-0.5">
                      {FESTIVAL_DETAILS.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0DF] border-2 border-[#713D29] flex items-center justify-center text-[#6D7851] shrink-0 shadow-retro-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-retro-mono font-bold text-[#713D29]/70 uppercase">
                      Contact Email
                    </span>
                    <a
                      href={`mailto:${FESTIVAL_DETAILS.contactEmail}`}
                      className="font-retro-mono font-bold text-sm sm:text-base text-[#D8753E] hover:underline"
                    >
                      {FESTIVAL_DETAILS.contactEmail}
                    </a>
                    <p className="text-xs text-[#713D29]/80 mt-0.5">
                      Response within 2 hours during fest week.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0DF] border-2 border-[#713D29] flex items-center justify-center text-[#E7B84B] shrink-0 shadow-retro-sm">
                    <Phone className="w-5 h-5 text-[#713D29]" />
                  </div>
                  <div>
                    <span className="block text-xs font-retro-mono font-bold text-[#713D29]/70 uppercase">
                      Helpline Hotline
                    </span>
                    <span className="font-retro-mono font-bold text-sm sm:text-base text-[#713D29]">
                      {FESTIVAL_DETAILS.contactPhone}
                    </span>
                    <p className="text-xs text-[#713D29]/80 mt-0.5">
                      Toll-free student helpdesk (9:00 AM – 9:00 PM).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-6 mt-6 border-t-2 border-[#713D29]/20">
              <span className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-3">
                Follow The Golden Groove:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { name: 'Instagram', icon: Instagram, handle: '@retrofest26' },
                  { name: 'YouTube', icon: Youtube, handle: 'RetrofestTV' },
                  { name: 'Discord', icon: MessageSquare, handle: 'Retrofest26' },
                  { name: 'Spotify', icon: Disc, handle: '70s Fest Playlist' }
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        retroAudio.playGroovyChime();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF0DF] border-2 border-[#713D29] rounded-lg text-xs font-retro-mono font-bold text-[#713D29] hover:bg-[#E7B84B]/30 hover:text-[#D8753E] transition-all shadow-retro-sm"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{s.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Quick Student Inquiry Note */}
          <div className="bg-[#F3E4C8] border-3 border-[#713D29] rounded-3xl p-6 sm:p-8 shadow-retro">
            <h3 className="font-retro-slab text-xl sm:text-2xl text-[#713D29] mb-1">
              Send a Note to Student Council
            </h3>
            <p className="text-xs sm:text-sm text-[#713D29]/80 mb-6 font-medium">
              We respond promptly to volunteer requests, band submissions, and travel queries.
            </p>

            {sentMessage ? (
              <div className="bg-[#FAF0DF] border-2 border-[#6D7851] rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#6D7851] mx-auto" />
                <h4 className="font-retro-slab text-lg text-[#6D7851]">
                  Message Received, Groover!
                </h4>
                <p className="text-xs sm:text-sm text-[#713D29]/90">
                  Our student committee has received your message and will reply to <strong>{inquiry.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSentMessage(false);
                    setInquiry({ name: '', email: '', message: '' });
                  }}
                  className="text-xs font-retro-mono font-bold text-[#D8753E] underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="inquiryName" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="inquiryName"
                    required
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    placeholder="e.g. Freddie Starr"
                    className="w-full px-4 py-2.5 bg-[#FAF0DF] border-2 border-[#713D29] rounded-xl text-sm font-medium text-[#713D29] focus:outline-none focus:ring-2 focus:ring-[#D8753E]"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryEmail" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="inquiryEmail"
                    required
                    value={inquiry.email}
                    onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                    placeholder="e.g. freddie@campus.edu"
                    className="w-full px-4 py-2.5 bg-[#FAF0DF] border-2 border-[#713D29] rounded-xl text-sm font-medium text-[#713D29] focus:outline-none focus:ring-2 focus:ring-[#D8753E]"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryMsg" className="block text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-1">
                    Message / Question
                  </label>
                  <textarea
                    id="inquiryMsg"
                    rows={4}
                    required
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    placeholder="Tell us about your team, question, or inquiry..."
                    className="w-full px-4 py-2.5 bg-[#FAF0DF] border-2 border-[#713D29] rounded-xl text-sm font-medium text-[#713D29] focus:outline-none focus:ring-2 focus:ring-[#D8753E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-retro py-3 bg-[#6D7851] text-[#FAF0DF] text-xs sm:text-sm font-retro-slab tracking-wider border-2 border-[#713D29] rounded-xl shadow-retro flex items-center justify-center gap-2 cursor-pointer hover:bg-[#5b6543]"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Festival FAQs Accordion Section */}
        <div className="bg-[#F3E4C8] border-3 border-[#713D29] rounded-3xl p-6 sm:p-10 shadow-retro">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-groovy text-2xl sm:text-3xl text-[#713D29]">
              FREQUENTLY ASKED QUESTIONS
            </h3>
            <p className="text-xs font-retro-mono text-[#D8753E] font-bold mt-1">
              EVERYTHING YOU NEED TO KNOW ABOUT RETROFEST '26
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FESTIVAL_FAQS.map((faq, i) => (
              <div key={i} className="bg-[#FAF0DF] border-2 border-[#713D29] rounded-xl p-5 shadow-retro-sm">
                <h4 className="font-retro-slab text-sm sm:text-base text-[#713D29] mb-2">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-[#713D29]/85 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
