/**
 * RETROFEST '26 — Official College Festival Website Prototype
 * Structure: Hash-routed Multi-Page Application (Single-Page Visibility Architecture)
 * Valid Pages: #home | #events | #schedule | #register
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { SchedulePage } from './pages/SchedulePage';
import { RegisterPage } from './pages/RegisterPage';
import { JukeboxModal } from './components/JukeboxModal';
import { ExportCodeModal } from './components/ExportCodeModal';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { CategoryFilter, DayFilter, RegistrationFormData } from './utils/festivalLogic';
import { FestivalDay, FestivalEvent, FESTIVAL_EVENTS } from './data/festivalData';

type RouteKey = '#home' | '#events' | '#schedule' | '#register';

const VALID_ROUTES: RouteKey[] = ['#home', '#events', '#schedule', '#register'];

export default function App() {
  // 1. Hash Routing State
  const [currentRoute, setCurrentRoute] = useState<RouteKey>(() => {
    const hash = window.location.hash.toLowerCase() as RouteKey;
    return VALID_ROUTES.includes(hash) ? hash : '#home';
  });

  // Modal States
  const [isJukeboxOpen, setIsJukeboxOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Dynamic Editable Festival Events State (date, time, venue, mail)
  const [events, setEvents] = useState<FestivalEvent[]>(FESTIVAL_EVENTS);

  const handleUpdateEvent = (updatedEvent: FestivalEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
  };

  // 2. Preserved Application State across page navigation
  // Events Page filters & custom images
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [dayFilter, setDayFilter] = useState<DayFilter>('All');
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  // Schedule Page active day
  const [activeScheduleDay, setActiveScheduleDay] = useState<FestivalDay>('Day 1');

  // Register Page persistent form data
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    college: '',
    phone: '',
    selectedEvent: '',
    message: '',
  });

  // Page Heading Refs for focus management
  const homeHeadingRef = useRef<HTMLHeadingElement>(null);
  const eventsHeadingRef = useRef<HTMLHeadingElement>(null);
  const scheduleHeadingRef = useRef<HTMLHeadingElement>(null);
  const registerHeadingRef = useRef<HTMLHeadingElement>(null);

  // Helper to sync route, document.title, scroll, and focus
  const handleRouteChange = (newHash: string) => {
    const normalized = (newHash.toLowerCase() as RouteKey);
    const validHash = VALID_ROUTES.includes(normalized) ? normalized : '#home';

    setCurrentRoute(validHash);

    // Update URL hash without reload if needed
    if (window.location.hash !== validHash) {
      window.location.hash = validHash;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update document.title
    switch (validHash) {
      case '#home':
        document.title = "Home · RETROFEST '26 | 1970s Vintage Festival";
        break;
      case '#events':
        document.title = "Events · RETROFEST '26 | Tech, Cultural & Fun";
        break;
      case '#schedule':
        document.title = "Schedule · RETROFEST '26 | 3-Day Timetable";
        break;
      case '#register':
        document.title = "Register · RETROFEST '26 | Official 1970s Pass";
        break;
      default:
        document.title = "RETROFEST '26 | Good Vibes. Golden Times.";
    }

    // Move keyboard focus to the page heading
    setTimeout(() => {
      if (validHash === '#home') homeHeadingRef.current?.focus();
      if (validHash === '#events') eventsHeadingRef.current?.focus();
      if (validHash === '#schedule') scheduleHeadingRef.current?.focus();
      if (validHash === '#register') registerHeadingRef.current?.focus();
    }, 50);
  };

  // Sync with browser back/forward buttons and initial hash
  useEffect(() => {
    const onHashChange = () => {
      handleRouteChange(window.location.hash);
    };

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onHashChange);

    // Run once on initial load
    handleRouteChange(window.location.hash || '#home');

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onHashChange);
    };
  }, []);

  // When user clicks "Register for this Event" on an event card
  const handleSelectEventForRegistration = (eventName: string) => {
    setFormData((prev) => ({ ...prev, selectedEvent: eventName }));
    handleRouteChange('#register');
  };

  return (
    <AudioPlayerProvider>
      <div className="min-h-screen flex flex-col justify-between bg-[#F3E4C8] text-[#713D29] font-sans selection:bg-[#D8753E] selection:text-[#F3E4C8]">
        {/* Sticky Header with Route Highlighting (aria-current="page") */}
        <Navbar
          currentRoute={currentRoute}
          onNavigate={handleRouteChange}
          onOpenJukebox={() => setIsJukeboxOpen(true)}
        />

        {/* SINGLE PAGE VIEWPORT CONTAINER: ONLY ONE PAGE IS VISIBLE AT A TIME */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 flex flex-col w-full page-transition outline-none"
        >
          {currentRoute === '#home' && (
            <HomePage
              headingRef={homeHeadingRef}
              onNavigate={handleRouteChange}
              onOpenJukebox={() => setIsJukeboxOpen(true)}
            />
          )}

          {currentRoute === '#events' && (
            <EventsPage
              headingRef={eventsHeadingRef}
              events={events}
              onUpdateEvent={handleUpdateEvent}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              dayFilter={dayFilter}
              setDayFilter={setDayFilter}
              customImages={customImages}
              setCustomImages={setCustomImages}
              onSelectEventForRegistration={handleSelectEventForRegistration}
            />
          )}

          {currentRoute === '#schedule' && (
            <SchedulePage
              headingRef={scheduleHeadingRef}
              events={events}
              activeDay={activeScheduleDay}
              setActiveDay={setActiveScheduleDay}
              onUpdateEvent={handleUpdateEvent}
              onSelectEventForRegistration={handleSelectEventForRegistration}
            />
          )}

          {currentRoute === '#register' && (
            <RegisterPage
              headingRef={registerHeadingRef}
              events={events}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </main>

        {/* Sticky/Bottom Footer - Stays at bottom even on short pages */}
        <Footer
          currentRoute={currentRoute}
          onNavigate={handleRouteChange}
          onOpenExport={() => setIsExportOpen(true)}
        />

        {/* 1976 Hi-Fi Stereo Jukebox Modal (Song Uploader, Vinyl Turntable, VU Meters, 33/45/78 RPM) */}
        <JukeboxModal
          isOpen={isJukeboxOpen}
          onClose={() => setIsJukeboxOpen(false)}
        />

        {/* Standalone Source Files Modal (index.html / style.css / script.js) */}
        <ExportCodeModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
        />
      </div>
    </AudioPlayerProvider>
  );
}
