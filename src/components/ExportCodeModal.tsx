import React, { useState } from 'react';
import { X, Copy, Check, FileCode } from 'lucide-react';
import { retroAudio } from '../utils/audioPlayer';

interface ExportCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportCodeModal: React.FC<ExportCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const standaloneHTML = `<!-- RETROFEST '26 — Single-Page Visibility Architecture (Option A) -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home · RETROFEST '26 | 1970s Vintage Festival</title>
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Plus+Jakarta+Sans:wght@400;600;700&family=Shrikhand&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
</head>
<body class="vintage-body">

  <!-- Sticky Header with Route Highlighting -->
  <header class="navbar" id="siteHeader">
    <div class="nav-container">
      <a href="#home" class="logo" onclick="navigateTo('#home'); return false;">RETROFEST '26</a>
      <nav class="nav-links" id="desktopNav">
        <a href="#home" class="nav-link active" data-route="#home" aria-current="page" onclick="navigateTo('#home'); return false;">Home</a>
        <a href="#events" class="nav-link" data-route="#events" onclick="navigateTo('#events'); return false;">Events</a>
        <a href="#schedule" class="nav-link" data-route="#schedule" onclick="navigateTo('#schedule'); return false;">Schedule</a>
        <a href="#register" class="nav-link" data-route="#register" onclick="navigateTo('#register'); return false;">Register</a>
      </nav>
      <button class="hamburger-btn" id="menuToggle" aria-label="Toggle menu" onclick="toggleMenu()">☰</button>
      <a href="#register" class="btn btn-primary nav-cta" onclick="navigateTo('#register'); return false;">GET PASS</a>
    </div>
    <!-- Mobile Drawer -->
    <div class="mobile-menu hidden" id="mobileMenu">
      <a href="#home" class="mobile-link" onclick="navigateTo('#home'); return false;">Home</a>
      <a href="#events" class="mobile-link" onclick="navigateTo('#events'); return false;">Events</a>
      <a href="#schedule" class="mobile-link" onclick="navigateTo('#schedule'); return false;">Schedule</a>
      <a href="#register" class="mobile-link" onclick="navigateTo('#register'); return false;">Register</a>
    </div>
  </header>

  <main id="mainContainer">
    <!-- PAGE 1: HOME (Only one page visible at a time) -->
    <section id="page-home" class="app-page">
      <div class="hero-card">
        <div class="pill-badge">EST. 1976 · GOLDEN JUBILEE</div>
        <h1 id="heading-home" tabindex="-1" class="page-title">RETROFEST '26</h1>
        <p class="tagline">"Good Vibes. Golden Times. Unforgettable Memories."</p>
        <div class="meta-strip">
          <span>📅 12-14 Feb 2027</span>
          <span>•</span>
          <span>📍 Golden Valley Quad & Woodstock Amphitheatre</span>
        </div>
        
        <!-- Live Countdown -->
        <div class="countdown-box">
          <div class="cd-item"><span id="cd-days">00</span><small>DAYS</small></div>
          <div class="cd-item"><span id="cd-hours">00</span><small>HOURS</small></div>
          <div class="cd-item"><span id="cd-mins">00</span><small>MINS</small></div>
          <div class="cd-item"><span id="cd-secs">00</span><small>SECS</small></div>
        </div>

        <div class="hero-actions">
          <a href="#register" class="btn btn-primary" onclick="navigateTo('#register'); return false;">REGISTER NOW →</a>
          <a href="#events" class="btn btn-mustard" onclick="navigateTo('#events'); return false;">BROWSE EVENTS</a>
        </div>
      </div>

      <!-- 3 Navigation Tiles -->
      <div class="tiles-grid">
        <div class="nav-tile" onclick="navigateTo('#events')">
          <div class="tile-tag">PAGE 02</div>
          <h3>EVENTS</h3>
          <p>Explore 10+ Tech, Cultural and Fun challenges across 3 festival days.</p>
          <span class="tile-action">VIEW ALL EVENTS →</span>
        </div>
        <div class="nav-tile" onclick="navigateTo('#schedule')">
          <div class="tile-tag">PAGE 03</div>
          <h3>SCHEDULE</h3>
          <p>Sorted 3-day multi-track timetable with time-slot clash detection.</p>
          <span class="tile-action">OPEN TIMETABLE →</span>
        </div>
        <div class="nav-tile" onclick="navigateTo('#register')">
          <div class="tile-tag">PAGE 04</div>
          <h3>REGISTER</h3>
          <p>Claim your free personalized 1970s concert admission badge.</p>
          <span class="tile-action">GET PASS NOW →</span>
        </div>
      </div>
    </section>

    <!-- PAGE 2: EVENTS -->
    <section id="page-events" class="app-page hidden">
      <div class="page-header">
        <h1 id="heading-events" tabindex="-1" class="page-title">FESTIVAL EVENTS</h1>
        <p class="subtitle">Curate your line-up using category and day filters simultaneously.</p>
      </div>

      <!-- Filter Controls -->
      <div class="filter-panel">
        <div class="filter-row">
          <span class="filter-label">CATEGORY:</span>
          <div class="button-group" id="catFilters">
            <button class="filter-btn active" data-cat="All">All</button>
            <button class="filter-btn" data-cat="Tech">Tech</button>
            <button class="filter-btn" data-cat="Cultural">Cultural</button>
            <button class="filter-btn" data-cat="Fun">Fun</button>
          </div>
        </div>
        <div class="filter-row">
          <span class="filter-label">DAY:</span>
          <div class="button-group" id="dayFilters">
            <button class="filter-btn active" data-day="All">All</button>
            <button class="filter-btn" data-day="Day 1">Day 1</button>
            <button class="filter-btn" data-day="Day 2">Day 2</button>
            <button class="filter-btn" data-day="Day 3">Day 3</button>
          </div>
        </div>
      </div>

      <div class="results-bar">
        <span id="resultsCount">Showing 11 events</span>
        <button id="resetFiltersBtn" class="link-btn hidden" onclick="resetFilters()">Reset Filters</button>
      </div>

      <!-- Events Cards Grid & Empty State -->
      <div id="eventsGrid" class="cards-grid"></div>
      <div id="eventsEmpty" class="empty-state hidden">
        <h3>No events match</h3>
        <p>No events found for your selected filters. Try switching category or day.</p>
        <button class="btn btn-primary" onclick="resetFilters()">SHOW ALL EVENTS</button>
      </div>
    </section>

    <!-- PAGE 3: SCHEDULE -->
    <section id="page-schedule" class="app-page hidden">
      <div class="page-header">
        <h1 id="heading-schedule" tabindex="-1" class="page-title">FESTIVAL SCHEDULE</h1>
        <p class="subtitle">Sorted 3-day timetable. Concurrent events grouped side-by-side with CLASH indicators.</p>
      </div>

      <!-- Collapsible Note -->
      <div class="collapsible-card">
        <button class="collapsible-toggle" onclick="toggleCollapsible()">
          <span>ℹ How the schedule stays readable</span>
          <span id="collapsibleIcon">▲</span>
        </button>
        <div class="collapsible-content" id="collapsibleText">
          <p>Our festival schedule organizes events chronologically by start time so you never miss an opening bell. When two or more events run concurrently in parallel venues, they are grouped cleanly under a single shared time heading and flagged with a vibrant red CLASH indicator. On desktop, parallel tracks appear side by side for effortless comparison, while mobile screens stack them comfortably without horizontal scrolling. Every event card features a category color bar, stage venue, and immediate registration shortcut.</p>
        </div>
      </div>

      <!-- Schedule Day Tabs -->
      <div class="day-tabs" id="scheduleDayTabs">
        <button class="tab-btn active" data-day="Day 1" onclick="switchScheduleDay('Day 1')">DAY 1 (Feb 12)</button>
        <button class="tab-btn" data-day="Day 2" onclick="switchScheduleDay('Day 2')">DAY 2 (Feb 13)</button>
        <button class="tab-btn" data-day="Day 3" onclick="switchScheduleDay('Day 3')">DAY 3 (Feb 14)</button>
      </div>

      <!-- Grouped Timeline Output -->
      <div id="scheduleTimeline" class="timeline-container"></div>
    </section>

    <!-- PAGE 4: REGISTER -->
    <section id="page-register" class="app-page hidden">
      <div class="page-header">
        <h1 id="heading-register" tabindex="-1" class="page-title">FESTIVAL REGISTRATION</h1>
        <p class="subtitle">Lock in your spot at RETROFEST '26. Receive an instant 1970s concert pass.</p>
      </div>

      <!-- Form Box -->
      <div class="form-container" id="formWrapper">
        <form id="registrationForm" novalidate onsubmit="handleRegistrationSubmit(event)">
          <div class="form-group">
            <label for="regName">Full Name *</label>
            <input type="text" id="regName" placeholder="e.g. Stevie Nicks" required>
            <span class="error-msg" id="err-name"></span>
          </div>

          <div class="form-group">
            <label for="regEmail">Email Address *</label>
            <input type="email" id="regEmail" placeholder="e.g. stevie@fleetwood.edu" required>
            <span class="error-msg" id="err-email"></span>
          </div>

          <div class="form-group">
            <label for="regCollege">College / University *</label>
            <input type="text" id="regCollege" placeholder="e.g. Berkeley Music & Tech Academy" required>
            <span class="error-msg" id="err-college"></span>
          </div>

          <div class="form-group">
            <label for="regPhone">Phone Number (Optional)</label>
            <input type="tel" id="regPhone" placeholder="e.g. 555-700-1976">
            <span class="error-msg" id="err-phone"></span>
          </div>

          <div class="form-group">
            <label for="regEvent">Select Event *</label>
            <select id="regEvent" required></select>
            <span class="error-msg" id="err-event"></span>
          </div>

          <div class="form-group">
            <label for="regMessage">Message / Team Note (Optional)</label>
            <textarea id="regMessage" rows="3" placeholder="Optional notes..."></textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-block">CONFIRM REGISTRATION & GET PASS →</button>
        </form>

        <!-- On-Screen Confirmation Screen -->
        <div id="confirmationScreen" class="confirmation-box hidden">
          <h2>🎉 REGISTRATION CONFIRMED!</h2>
          <p>Welcome to RETROFEST '26! Below is your personalized concert badge.</p>
          <div class="ticket-card">
            <div class="ticket-header">
              <span>RETROFEST '26 OFFICIAL PASS</span>
              <span id="ticketIdBadge">RF70-1976</span>
            </div>
            <div class="ticket-body">
              <p><strong>ATTENDEE:</strong> <span id="confName"></span></p>
              <p><strong>CHOSEN EVENT:</strong> <span id="confEvent" style="color:var(--color-burnt-orange);"></span></p>
              <p><strong>COLLEGE:</strong> <span id="confCollege"></span></p>
              <p><strong>EMAIL:</strong> <span id="confEmail"></span></p>
              <p><strong>DATE:</strong> 12-14 Feb 2027</p>
            </div>
          </div>
          <div class="conf-actions">
            <button class="btn btn-olive" onclick="window.print()">PRINT / SAVE PASS</button>
            <button class="btn btn-primary" onclick="resetRegistrationForm()">REGISTER ANOTHER</button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Sticky / Bottom Pinned Footer -->
  <footer class="site-footer">
    <div class="footer-container">
      <div>
        <h3>RETROFEST '26</h3>
        <p>"Good Vibes. Golden Times. Unforgettable Memories." · 12-14 Feb 2027</p>
      </div>
      <div class="footer-links">
        <a href="#home" onclick="navigateTo('#home'); return false;">Home</a>
        <a href="#events" onclick="navigateTo('#events'); return false;">Events</a>
        <a href="#schedule" onclick="navigateTo('#schedule'); return false;">Schedule</a>
        <a href="#register" onclick="navigateTo('#register'); return false;">Register</a>
      </div>
      <button class="btn btn-sm" onclick="window.scrollTo({top:0, behavior:'smooth'})">BACK TO TOP ↑</button>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`;

  const standaloneCSS = `:root {
  --color-cream: #F3E4C8;
  --color-burnt-orange: #D8753E;
  --color-mustard: #E7B84B;
  --color-olive: #6D7851;
  --color-dark-brown: #713D29;
  --color-paper: #FAF0DF;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body.vintage-body {
  background-color: var(--color-cream);
  color: var(--color-dark-brown);
  font-family: 'Plus Jakarta Sans', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1, h2, h3, .logo { font-family: 'Shrikhand', cursive; }
.btn, .tab-btn, .filter-btn, .tagline { font-family: 'Alfa Slab One', cursive; }
.pill-badge, .meta-strip, .countdown-box, .error-msg, .filter-label { font-family: 'Space Mono', monospace; }

/* Sticky Header */
.navbar {
  position: sticky; top: 0; z-index: 100;
  background-color: rgba(243, 228, 200, 0.98);
  border-bottom: 4px solid var(--color-dark-brown);
  padding: 14px 20px;
}
.nav-container { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
.logo { font-size: 26px; text-decoration: none; color: var(--color-dark-brown); }
.nav-links a { text-decoration: none; color: var(--color-dark-brown); font-family: 'Space Mono', monospace; font-weight: 700; margin: 0 10px; padding: 6px 12px; border-radius: 8px; border: 2px solid transparent; }
.nav-links a.active { background: var(--color-burnt-orange); color: var(--color-paper); border-color: var(--color-dark-brown); box-shadow: 2px 2px 0 var(--color-dark-brown); }
.hamburger-btn { display: none; background: var(--color-paper); border: 2px solid var(--color-dark-brown); font-size: 20px; padding: 4px 10px; border-radius: 8px; cursor: pointer; }

.mobile-menu { display: flex; flex-direction: column; gap: 8px; padding-top: 12px; }
.mobile-link { padding: 8px 12px; text-decoration: none; color: var(--color-dark-brown); font-weight: bold; background: var(--color-paper); border: 2px solid var(--color-dark-brown); border-radius: 8px; }

/* Buttons */
.btn { display: inline-block; padding: 12px 24px; text-decoration: none; border-radius: 12px; border: 3px solid var(--color-dark-brown); box-shadow: 4px 4px 0 var(--color-dark-brown); cursor: pointer; transition: transform 0.15s; }
.btn:hover { transform: translate(-2px, -2px); }
.btn-primary { background: var(--color-burnt-orange); color: var(--color-paper); }
.btn-mustard { background: var(--color-mustard); color: var(--color-dark-brown); }
.btn-olive { background: var(--color-olive); color: var(--color-paper); }
.btn-block { width: 100%; text-align: center; }

/* Page Routing Display */
.app-page { width: 100%; max-width: 1200px; margin: 0 auto; padding: 40px 20px; animation: pageFade 0.22s ease-out; }
.hidden { display: none !important; }

@keyframes pageFade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .app-page { animation: none !important; }
}

/* Hero & Tiles */
.hero-card { background: var(--color-paper); border: 4px solid var(--color-dark-brown); border-radius: 24px; padding: 40px 20px; text-align: center; box-shadow: 6px 6px 0 var(--color-dark-brown); margin-bottom: 40px; }
.page-title { font-size: clamp(2.4rem, 5vw, 4rem); margin: 12px 0; outline: none; }
.tagline { color: var(--color-burnt-orange); font-size: 1.3rem; margin-bottom: 20px; }
.meta-strip { font-size: 14px; font-weight: bold; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px; }
.countdown-box { display: flex; gap: 12px; justify-content: center; margin-bottom: 30px; }
.cd-item { background: #24140E; color: var(--color-mustard); border: 2px solid var(--color-dark-brown); padding: 10px 16px; border-radius: 12px; font-size: 24px; font-weight: bold; text-align: center; }
.cd-item small { display: block; font-size: 10px; color: var(--color-paper); }
.hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

.tiles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.nav-tile { background: var(--color-paper); border: 3px solid var(--color-dark-brown); border-radius: 20px; padding: 24px; box-shadow: 4px 4px 0 var(--color-dark-brown); cursor: pointer; transition: transform 0.2s; }
.nav-tile:hover { transform: translateY(-4px); }
.tile-tag { font-size: 11px; font-weight: bold; color: var(--color-olive); margin-bottom: 8px; }
.tile-action { display: inline-block; margin-top: 16px; font-weight: bold; color: var(--color-burnt-orange); font-size: 13px; }

/* Filter Controls */
.filter-panel { background: var(--color-paper); border: 3px solid var(--color-dark-brown); border-radius: 16px; padding: 20px; box-shadow: 4px 4px 0 var(--color-dark-brown); margin-bottom: 24px; display: flex; flex-direction: column; gap: 16px; }
.filter-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.filter-label { font-size: 12px; font-weight: bold; }
.button-group { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn { padding: 6px 14px; border: 2px solid var(--color-dark-brown); border-radius: 10px; background: var(--color-cream); font-size: 12px; cursor: pointer; }
.filter-btn.active { background: var(--color-burnt-orange); color: var(--color-paper); box-shadow: 2px 2px 0 var(--color-dark-brown); }

.results-bar { display: flex; justify-content: space-between; font-family: 'Space Mono', monospace; font-size: 12px; margin-bottom: 20px; }
.link-btn { background: none; border: none; color: var(--color-burnt-orange); font-weight: bold; text-decoration: underline; cursor: pointer; }

/* Cards Grid */
.cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.event-card { background: var(--color-paper); border: 3px solid var(--color-dark-brown); border-radius: 18px; padding: 20px; box-shadow: 4px 4px 0 var(--color-dark-brown); display: flex; flex-direction: column; justify-content: space-between; }
.card-badge { display: inline-block; padding: 4px 8px; border: 1px solid var(--color-dark-brown); border-radius: 6px; font-size: 11px; font-weight: bold; margin-bottom: 8px; }

/* Schedule */
.collapsible-card { background: var(--color-paper); border: 3px solid var(--color-dark-brown); border-radius: 14px; margin-bottom: 24px; overflow: hidden; }
.collapsible-toggle { width: 100%; padding: 14px 20px; display: flex; justify-content: space-between; background: none; border: none; font-family: 'Space Mono', monospace; font-weight: bold; font-size: 14px; cursor: pointer; }
.collapsible-content { padding: 0 20px 16px; font-size: 13px; line-height: 1.6; border-top: 1px solid var(--color-dark-brown); background: rgba(243, 228, 200, 0.4); }

.day-tabs { display: flex; gap: 12px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap; }
.tab-btn { padding: 12px 24px; border: 3px solid var(--color-dark-brown); border-radius: 14px; background: var(--color-paper); cursor: pointer; font-size: 14px; }
.tab-btn.active { background: var(--color-burnt-orange); color: var(--color-paper); box-shadow: 3px 3px 0 var(--color-dark-brown); }

.time-slot-group { background: var(--color-paper); border: 3px solid var(--color-dark-brown); border-radius: 20px; padding: 20px; margin-bottom: 24px; box-shadow: 4px 4px 0 var(--color-dark-brown); }
.slot-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(113, 61, 41, 0.2); padding-bottom: 12px; margin-bottom: 16px; }
.clash-badge { background: #D8753E; color: #FAF0DF; border: 2px solid #713D29; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: bold; font-family: 'Space Mono', monospace; }
.slot-events-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.slot-event-item { background: var(--color-cream); border: 2px solid var(--color-dark-brown); border-radius: 12px; padding: 14px; position: relative; overflow: hidden; }
.cat-bar { position: absolute; top: 0; left: 0; right: 0; height: 6px; }

/* Forms */
.form-container { background: var(--color-paper); border: 4px solid var(--color-dark-brown); border-radius: 24px; padding: 30px 20px; max-width: 650px; margin: 0 auto; box-shadow: 6px 6px 0 var(--color-dark-brown); }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-family: 'Space Mono', monospace; font-size: 12px; font-weight: bold; margin-bottom: 6px; }
.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px; border: 2px solid var(--color-dark-brown); border-radius: 10px; background: var(--color-cream); font-family: 'Space Mono', monospace; font-size: 13px; outline: none; }
.error-msg { display: block; color: var(--color-burnt-orange); font-size: 11px; font-weight: bold; margin-top: 4px; }
.ticket-card { border: 2px dashed var(--color-dark-brown); padding: 16px; border-radius: 12px; background: var(--color-cream); margin: 20px 0; font-family: 'Space Mono', monospace; }

/* Footer */
.site-footer { background: var(--color-dark-brown); color: var(--color-paper); padding: 30px 20px; border-top: 4px solid var(--color-burnt-orange); margin-top: auto; }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
.footer-links a { color: var(--color-paper); text-decoration: none; margin: 0 8px; font-family: 'Space Mono', monospace; font-size: 13px; }

@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger-btn { display: block; }
}`;

  const standaloneJS = `// ==========================================
// RETROFEST '26 — MASTER FESTIVAL EVENTS DATA
// At least 9 events across Tech, Cultural & Fun over 3 days, with time-slot clashes.
// ==========================================
const FESTIVAL_EVENTS = [
  { id: 'code-sprint', title: 'Code Sprint', category: 'Tech', day: 'Day 1', date: 'Friday, Feb 12, 2027', startTime: '10:00 AM', endTime: '01:00 PM', venue: 'Ada Lovelace Tech Pavilion', desc: 'Algorithmic marathon tackling retro logic puzzles and 8-bit optimization.' },
  { id: 'retro-arcade', title: 'Retro Arcade Tournament', category: 'Fun', day: 'Day 1', date: 'Friday, Feb 12, 2027', startTime: '10:00 AM', endTime: '01:00 PM', venue: 'Neon Pinball Lounge', desc: 'High-score championship on Space Invaders, Pong, and Pac-Man cabinets.' },
  { id: 'dance-battle', title: 'Dance Battle', category: 'Cultural', day: 'Day 1', date: 'Friday, Feb 12, 2027', startTime: '05:30 PM', endTime: '08:30 PM', venue: 'Groovy Sunset Stage', desc: 'High-energy dance showdown across funk, disco, locking, and breaking.' },

  { id: 'robotics-challenge', title: 'Robotics Challenge', category: 'Tech', day: 'Day 2', date: 'Saturday, Feb 13, 2027', startTime: '10:30 AM', endTime: '01:30 PM', venue: 'Silicon Garage Arena', desc: 'Autonomous moon-landing rover obstacle navigation with line sensors.' },
  { id: 'tech-quiz', title: 'Tech Quiz', category: 'Tech', day: 'Day 2', date: 'Saturday, Feb 13, 2027', startTime: '02:00 PM', endTime: '04:30 PM', venue: 'Babbage Memorial Auditorium', desc: 'Rapid-fire buzzer trivia exploring five decades of Silicon Valley computing.' },
  { id: 'singing-star', title: 'Singing Star', category: 'Cultural', day: 'Day 2', date: 'Saturday, Feb 13, 2027', startTime: '02:00 PM', endTime: '05:00 PM', venue: 'Woodstock Main Amphitheatre', desc: 'Vocal showcase celebrating 70s rock ballads and Motown harmonies.' },
  { id: 'costume-karaoke', title: 'Bell-Bottoms Karaoke Jam', category: 'Fun', day: 'Day 2', date: 'Saturday, Feb 13, 2027', startTime: '06:00 PM', endTime: '09:00 PM', venue: 'Psychedelic Patio Terrace', desc: 'Open-mic karaoke in bell-bottoms, tie-dye shirts, and afro wigs.' },

  { id: 'hack-future', title: 'Retro Future Hackathon', category: 'Tech', day: 'Day 3', date: 'Sunday, Feb 14, 2027', startTime: '10:00 AM', endTime: '02:00 PM', venue: 'Ada Lovelace Tech Pavilion', desc: 'Build retro-styled web apps utilizing modern AI and web audio APIs.' },
  { id: 'fashion-walk', title: 'Fashion Walk', category: 'Cultural', day: 'Day 3', date: 'Sunday, Feb 14, 2027', startTime: '03:00 PM', endTime: '05:30 PM', venue: 'Woodstock Main Amphitheatre', desc: 'Runway pageant featuring bohemian floral prints and denim flares.' },
  { id: 'vinyl-hunt', title: 'Vintage Vinyl & Treasure Hunt', category: 'Fun', day: 'Day 3', date: 'Sunday, Feb 14, 2027', startTime: '03:00 PM', endTime: '05:30 PM', venue: 'Golden Valley Quad', desc: 'Solve cryptographic clues hidden in vintage album liner notes.' },
  { id: 'bands-finale', title: 'Battle of the Bands Finale', category: 'Cultural', day: 'Day 3', date: 'Sunday, Feb 14, 2027', startTime: '06:30 PM', endTime: '10:00 PM', venue: 'Woodstock Main Amphitheatre', desc: 'Monumental climax with student bands electrifying the night.' }
];

// Active State
let currentCategoryFilter = 'All';
let currentDayFilter = 'All';
let currentScheduleDay = 'Day 1';

// ROUTING: Show only one page at a time based on hash
function navigateTo(hash) {
  const valid = ['#home', '#events', '#schedule', '#register'];
  const target = valid.includes(hash) ? hash : '#home';

  // Update hash
  if (window.location.hash !== target) {
    window.location.hash = target;
  }

  // Toggle pages visibility
  document.querySelectorAll('.app-page').forEach(page => page.classList.add('hidden'));
  const activePage = document.getElementById('page-' + target.replace('#', ''));
  if (activePage) activePage.classList.remove('hidden');

  // Update desktop and mobile nav states (aria-current="page")
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.dataset.route === target) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // Close mobile drawer
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) mobileMenu.classList.add('hidden');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update document.title
  const titles = {
    '#home': "Home · RETROFEST '26 | 1970s Vintage Festival",
    '#events': "Events · RETROFEST '26 | Tech, Cultural & Fun",
    '#schedule': "Schedule · RETROFEST '26 | 3-Day Timetable",
    '#register': "Register · RETROFEST '26 | Official 1970s Pass"
  };
  document.title = titles[target] || "RETROFEST '26";

  // Focus page heading
  setTimeout(() => {
    const heading = document.getElementById('heading-' + target.replace('#', ''));
    if (heading) heading.focus();
  }, 50);
}

window.addEventListener('hashchange', () => navigateTo(window.location.hash));
window.addEventListener('popstate', () => navigateTo(window.location.hash));

function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('hidden');
}

// EVENTS PAGE: Filtering
function renderEvents() {
  const filtered = FESTIVAL_EVENTS.filter(e => {
    const matchCat = currentCategoryFilter === 'All' || e.category === currentCategoryFilter;
    const matchDay = currentDayFilter === 'All' || e.day === currentDayFilter;
    return matchCat && matchDay;
  });

  const grid = document.getElementById('eventsGrid');
  const empty = document.getElementById('eventsEmpty');
  const countSpan = document.getElementById('resultsCount');
  const resetBtn = document.getElementById('resetFiltersBtn');

  countSpan.textContent = 'Showing ' + filtered.length + ' events';
  if (currentCategoryFilter !== 'All' || currentDayFilter !== 'All') {
    resetBtn.classList.remove('hidden');
  } else {
    resetBtn.classList.add('hidden');
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  grid.innerHTML = filtered.map(e => \`
    <div class="event-card">
      <div>
        <span class="card-badge" style="background:\${e.category === 'Tech' ? '#D8753E' : e.category === 'Cultural' ? '#E7B84B' : '#6D7851'}; color:#FAF0DF;">\${e.category.toUpperCase()}</span>
        <span style="font-size:11px; font-weight:bold; float:right;">\${e.day}</span>
        <h3 style="margin:8px 0; font-size:22px;">\${e.title}</h3>
        <p style="font-size:13px; line-height:1.5; margin-bottom:12px;">\${e.desc}</p>
        <div style="font-size:12px; font-family:'Space Mono',monospace; opacity:0.85;">
          <p>📅 \${e.date}</p>
          <p>⏰ \${e.startTime} – \${e.endTime}</p>
          <p>📍 \${e.venue}</p>
        </div>
      </div>
      <button class="btn btn-primary" style="margin-top:14px; width:100%; font-size:12px;" onclick="registerForEvent('\${e.title}')">REGISTER FOR THIS EVENT →</button>
    </div>
  \`).join('');
}

function resetFilters() {
  currentCategoryFilter = 'All';
  currentDayFilter = 'All';
  document.querySelectorAll('#catFilters .filter-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === 'All'));
  document.querySelectorAll('#dayFilters .filter-btn').forEach(b => b.classList.toggle('active', b.dataset.day === 'All'));
  renderEvents();
}

document.querySelectorAll('#catFilters .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#catFilters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategoryFilter = btn.dataset.cat;
    renderEvents();
  });
});

document.querySelectorAll('#dayFilters .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#dayFilters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDayFilter = btn.dataset.day;
    renderEvents();
  });
});

function registerForEvent(title) {
  const sel = document.getElementById('regEvent');
  if (sel) sel.value = title;
  navigateTo('#register');
}

// SCHEDULE PAGE: Grouping & Clash Detection
function renderSchedule() {
  const dayEvents = FESTIVAL_EVENTS.filter(e => e.day === currentScheduleDay);
  const groups = {};
  dayEvents.forEach(e => {
    if (!groups[e.startTime]) groups[e.startTime] = [];
    groups[e.startTime].push(e);
  });

  const timeline = document.getElementById('scheduleTimeline');
  timeline.innerHTML = Object.entries(groups).map(([time, events]) => {
    const isClash = events.length > 1;
    return \`
      <div class="time-slot-group">
        <div class="slot-header">
          <div>
            <span style="font-size:11px; font-family:'Space Mono',monospace; opacity:0.7;">START TIME</span>
            <h3 style="font-size:22px;">\${time}</h3>
          </div>
          \${isClash ? '<span class="clash-badge">⚠ CLASH (' + events.length + ' PARALLEL TRACKS)</span>' : '<span style="font-size:12px; font-weight:bold; color:var(--color-olive);">SOLO STAGE</span>'}
        </div>
        <div class="slot-events-grid">
          \${events.map(ev => \`
            <div class="slot-event-item">
              <div class="cat-bar" style="background:\${ev.category === 'Tech' ? '#D8753E' : ev.category === 'Cultural' ? '#E7B84B' : '#6D7851'};"></div>
              <div style="font-size:11px; font-weight:bold; margin-bottom:4px; margin-top:4px;">\${ev.category.toUpperCase()} · \${ev.startTime} – \${ev.endTime}</div>
              <h4 style="font-family:'Shrikhand',cursive; font-size:18px; margin-bottom:6px;">\${ev.title}</h4>
              <p style="font-size:12px; margin-bottom:10px;">\${ev.desc}</p>
              <p style="font-size:12px; font-weight:bold; color:var(--color-olive); margin-bottom:12px;">📍 \${ev.venue}</p>
              <button class="btn btn-mustard" style="padding:6px 12px; font-size:11px; width:100%;" onclick="registerForEvent('\${ev.title}')">REGISTER FOR THIS EVENT →</button>
            </div>
          \`).join('')}
        </div>
      </div>
    \`;
  }).join('');
}

function switchScheduleDay(day) {
  currentScheduleDay = day;
  document.querySelectorAll('#scheduleDayTabs .tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.day === day);
  });
  renderSchedule();
}

function toggleCollapsible() {
  const text = document.getElementById('collapsibleText');
  const icon = document.getElementById('collapsibleIcon');
  if (text.style.display === 'none') {
    text.style.display = 'block';
    icon.textContent = '▲';
  } else {
    text.style.display = 'none';
    icon.textContent = '▼';
  }
}

// REGISTER PAGE: Form validation with focus on first invalid field
function populateEventDropdown() {
  const sel = document.getElementById('regEvent');
  sel.innerHTML = '<option value="">-- Choose an Event or All-Access Pass --</option>' +
    '<option value="All-Access Festival Pass (All 3 Days)">★ All-Access Festival Pass (All 3 Days)</option>' +
    FESTIVAL_EVENTS.map(e => \`<option value="\${e.title}">\${e.title} (\${e.day} · \${e.startTime})</option>\`).join('');
}

function handleRegistrationSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const college = document.getElementById('regCollege').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const eventVal = document.getElementById('regEvent').value;

  let firstInvalid = null;

  // Clear errors
  ['name', 'email', 'college', 'phone', 'event'].forEach(k => document.getElementById('err-' + k).textContent = '');

  if (!name || name.length < 2) {
    document.getElementById('err-name').textContent = '⚠ Full name is required (min 2 characters)';
    if (!firstInvalid) firstInvalid = 'regName';
  }

  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.getElementById('err-email').textContent = '⚠ Valid email address is required';
    if (!firstInvalid) firstInvalid = 'regEmail';
  }

  if (!college || college.length < 2) {
    document.getElementById('err-college').textContent = '⚠ College / University is required';
    if (!firstInvalid) firstInvalid = 'regCollege';
  }

  if (phone) {
    const cleanPhone = phone.replace(/[\\s\\-()]/g, '');
    if (cleanPhone.length < 10) {
      document.getElementById('err-phone').textContent = '⚠ Valid phone number (10+ digits) required if provided';
      if (!firstInvalid) firstInvalid = 'regPhone';
    }
  }

  if (!eventVal) {
    document.getElementById('err-event').textContent = '⚠ Please select an event';
    if (!firstInvalid) firstInvalid = 'regEvent';
  }

  if (firstInvalid) {
    document.getElementById(firstInvalid).focus();
    return;
  }

  // Show Confirmation Screen
  document.getElementById('registrationForm').classList.add('hidden');
  const conf = document.getElementById('confirmationScreen');
  conf.classList.remove('hidden');

  document.getElementById('confName').textContent = name;
  document.getElementById('confEvent').textContent = eventVal;
  document.getElementById('confCollege').textContent = college;
  document.getElementById('confEmail').textContent = email;
  document.getElementById('ticketIdBadge').textContent = 'RF70-' + Math.floor(1000 + Math.random() * 9000);
}

function resetRegistrationForm() {
  document.getElementById('registrationForm').reset();
  document.getElementById('registrationForm').classList.remove('hidden');
  document.getElementById('confirmationScreen').classList.add('hidden');
}

// Countdown Timer
function startCountdown() {
  const target = new Date('2027-02-12T09:00:00').getTime();
  setInterval(() => {
    const diff = target - new Date().getTime();
    if (diff > 0) {
      document.getElementById('cd-days').textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      document.getElementById('cd-hours').textContent = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      document.getElementById('cd-mins').textContent = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
      document.getElementById('cd-secs').textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    }
  }, 1000);
}

// Initial Boot
window.addEventListener('DOMContentLoaded', () => {
  populateEventDropdown();
  renderEvents();
  renderSchedule();
  startCountdown();
  navigateTo(window.location.hash || '#home');
});
`;

  const getContent = () => {
    if (activeTab === 'html') return standaloneHTML;
    if (activeTab === 'css') return standaloneCSS;
    return standaloneJS;
  };

  const handleCopy = () => {
    retroAudio.playGroovyChime();
    navigator.clipboard.writeText(getContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF0DF] border-4 border-[#713D29] rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-retro-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F3E4C8] border-b-3 border-[#713D29] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#D8753E]" />
            <h3 className="font-groovy text-xl text-[#713D29]">
              STANDALONE SOURCE CODE (HTML / CSS / JS)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#713D29] hover:bg-[#D8753E] hover:text-[#F3E4C8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#FAF0DF] border-b-2 border-[#713D29]/20">
          <div className="flex items-center gap-2">
            {(['html', 'css', 'js'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  retroAudio.playGroovyChime();
                  setActiveTab(tab);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-retro-mono font-bold uppercase border border-[#713D29] transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#D8753E] text-[#F3E4C8] shadow-retro-sm'
                    : 'bg-[#F3E4C8] text-[#713D29] hover:bg-[#E7B84B]/30'
                }`}
              >
                {tab === 'html' ? 'index.html' : tab === 'css' ? 'style.css' : 'script.js'}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF0DF] text-[#713D29] text-xs font-retro-mono font-bold border-2 border-[#713D29] rounded-lg hover:bg-[#E7B84B] transition-all shadow-retro-sm cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED!' : 'COPY CODE'}</span>
          </button>
        </div>

        {/* Code Content Viewer */}
        <div className="p-4 flex-1 overflow-auto bg-[#24140E] text-[#FAF0DF] font-mono text-xs">
          <pre className="whitespace-pre-wrap leading-relaxed">
            {getContent()}
          </pre>
        </div>
      </div>
    </div>
  );
};
