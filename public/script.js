// ==========================================
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

  if (countSpan) countSpan.textContent = 'Showing ' + filtered.length + ' events';
  if (resetBtn) {
    if (currentCategoryFilter !== 'All' || currentDayFilter !== 'All') {
      resetBtn.classList.remove('hidden');
    } else {
      resetBtn.classList.add('hidden');
    }
  }

  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');

  grid.innerHTML = filtered.map(e => `
    <div class="event-card">
      <div>
        <span class="card-badge" style="background:${e.category === 'Tech' ? '#D8753E' : e.category === 'Cultural' ? '#E7B84B' : '#6D7851'}; color:#FAF0DF;">${e.category.toUpperCase()}</span>
        <span style="font-size:11px; font-weight:bold; float:right;">${e.day}</span>
        <h3 style="margin:8px 0; font-size:22px;">${e.title}</h3>
        <p style="font-size:13px; line-height:1.5; margin-bottom:12px;">${e.desc}</p>
        <div style="font-size:12px; font-family:'Space Mono',monospace; opacity:0.85;">
          <p>📅 ${e.date}</p>
          <p>⏰ ${e.startTime} – ${e.endTime}</p>
          <p>📍 ${e.venue}</p>
        </div>
      </div>
      <button class="btn btn-primary" style="margin-top:14px; width:100%; font-size:12px;" onclick="registerForEvent('${e.title}')">REGISTER FOR THIS EVENT →</button>
    </div>
  `).join('');
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
  if (!timeline) return;

  timeline.innerHTML = Object.entries(groups).map(([time, events]) => {
    const isClash = events.length > 1;
    return `
      <div class="time-slot-group">
        <div class="slot-header">
          <div>
            <span style="font-size:11px; font-family:'Space Mono',monospace; opacity:0.7;">START TIME</span>
            <h3 style="font-size:22px;">${time}</h3>
          </div>
          ${isClash ? '<span class="clash-badge">⚠ CLASH (' + events.length + ' PARALLEL TRACKS)</span>' : '<span style="font-size:12px; font-weight:bold; color:var(--color-olive);">SOLO STAGE</span>'}
        </div>
        <div class="slot-events-grid">
          ${events.map(ev => `
            <div class="slot-event-item">
              <div class="cat-bar" style="background:${ev.category === 'Tech' ? '#D8753E' : ev.category === 'Cultural' ? '#E7B84B' : '#6D7851'};"></div>
              <div style="font-size:11px; font-weight:bold; margin-bottom:4px; margin-top:4px;">${ev.category.toUpperCase()} · ${ev.startTime} – ${ev.endTime}</div>
              <h4 style="font-family:'Shrikhand',cursive; font-size:18px; margin-bottom:6px;">${ev.title}</h4>
              <p style="font-size:12px; margin-bottom:10px;">${ev.desc}</p>
              <p style="font-size:12px; font-weight:bold; color:var(--color-olive); margin-bottom:12px;">📍 ${ev.venue}</p>
              <button class="btn btn-mustard" style="padding:6px 12px; font-size:11px; width:100%;" onclick="registerForEvent('${ev.title}')">REGISTER FOR THIS EVENT →</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
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
  if (!text) return;
  if (text.style.display === 'none') {
    text.style.display = 'block';
    if (icon) icon.textContent = '▲';
  } else {
    text.style.display = 'none';
    if (icon) icon.textContent = '▼';
  }
}

// REGISTER PAGE: Form validation with focus on first invalid field
function populateEventDropdown() {
  const sel = document.getElementById('regEvent');
  if (!sel) return;
  sel.innerHTML = '<option value="">-- Choose an Event or All-Access Pass --</option>' +
    '<option value="All-Access Festival Pass (All 3 Days)">★ All-Access Festival Pass (All 3 Days)</option>' +
    FESTIVAL_EVENTS.map(e => `<option value="${e.title}">${e.title} (${e.day} · ${e.startTime})</option>`).join('');
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
  ['name', 'email', 'college', 'phone', 'event'].forEach(k => {
    const el = document.getElementById('err-' + k);
    if (el) el.textContent = '';
  });

  if (!name || name.length < 2) {
    document.getElementById('err-name').textContent = '⚠ Full name is required (min 2 characters)';
    if (!firstInvalid) firstInvalid = 'regName';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.getElementById('err-email').textContent = '⚠ Valid email address is required';
    if (!firstInvalid) firstInvalid = 'regEmail';
  }

  if (!college || college.length < 2) {
    document.getElementById('err-college').textContent = '⚠ College / University is required';
    if (!firstInvalid) firstInvalid = 'regCollege';
  }

  if (phone) {
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
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
  if (conf) conf.classList.remove('hidden');

  document.getElementById('confName').textContent = name;
  document.getElementById('confEvent').textContent = eventVal;
  document.getElementById('confCollege').textContent = college;
  document.getElementById('confEmail').textContent = email;
  document.getElementById('ticketIdBadge').textContent = 'RF70-' + Math.floor(1000 + Math.random() * 9000);
}

function resetRegistrationForm() {
  document.getElementById('registrationForm').reset();
  document.getElementById('registrationForm').classList.remove('hidden');
  const conf = document.getElementById('confirmationScreen');
  if (conf) conf.classList.add('hidden');
}

// Countdown Timer
function startCountdown() {
  const target = new Date('2027-02-12T09:00:00').getTime();
  setInterval(() => {
    const diff = target - new Date().getTime();
    if (diff > 0) {
      const d = document.getElementById('cd-days');
      const h = document.getElementById('cd-hours');
      const m = document.getElementById('cd-mins');
      const s = document.getElementById('cd-secs');
      if (d) d.textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      if (h) h.textContent = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      if (m) m.textContent = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
      if (s) s.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
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
