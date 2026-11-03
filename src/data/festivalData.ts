/**
 * Central Data Store for RETROFEST '26
 *
 * All events are kept in this single array so they are easy to edit.
 * At least 9 events across Tech, Cultural, and Fun, spread over 3 days (12-14 Feb 2027),
 * with deliberate time-slot clashes.
 */

export type EventCategory = 'Tech' | 'Cultural' | 'Fun';
export type FestivalDay = 'Day 1' | 'Day 2' | 'Day 3';

export interface FestivalEvent {
  id: string;
  title: string;
  category: EventCategory;
  day: FestivalDay;
  date: string;
  startTime: string; // 24h or standard format, e.g. "10:00 AM"
  endTime: string;   // e.g. "01:00 PM"
  venue: string;
  description: string;
  contactEmail?: string; // Event-specific coordinator / lead email (editable)
  teamSize?: string;
  prizePool?: string;
  tag?: string;
}

export const FESTIVAL_DETAILS = {
  name: "RETROFEST '26",
  tagline: "Good Vibes. Golden Times. Unforgettable Memories.",
  dates: "12-14 Feb 2027",
  datesLong: "February 12 – 14, 2027",
  venue: "Golden Valley Quad & Woodstock Amphitheatre, Starlight University",
  college: "Starlight Institute of Technology & Cultural Arts",
  edition: "50th Anniversary Golden Jubilee (1976 – 2026/27)",
  contactEmail: "groove@retrofest26.starlight.edu",
  contactPhone: "+1 (555) 70s-GROOVE",
  address: "76 Golden Gate Boulevard, Sunshine Valley, CA 94102",
  targetDate: "2027-02-12T09:00:00",
};

/**
 * MASTER FESTIVAL EVENTS LIST
 * Contains 11 events across Tech, Cultural, and Fun across Day 1, Day 2, and Day 3.
 * Notice the time-slot clashes:
 * - Day 1 at 10:00 AM: Code Sprint (Tech) AND Retro Arcade Tournament (Fun) [CLASH]
 * - Day 2 at 02:00 PM: Tech Quiz (Tech) AND Singing Star (Cultural) [CLASH]
 * - Day 3 at 03:00 PM: Fashion Walk (Cultural) AND Mystery Vinyl & Board Game Hunt (Fun) [CLASH]
 */
export const FESTIVAL_EVENTS: FestivalEvent[] = [
  // --- DAY 1: Friday, Feb 12, 2027 ---
  {
    id: 'code-sprint',
    title: 'Code Sprint',
    category: 'Tech',
    day: 'Day 1',
    date: 'Friday, Feb 12, 2027',
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    venue: 'Ada Lovelace Tech Pavilion',
    contactEmail: 'codesprint@retrofest26.starlight.edu',
    description: 'A rapid algorithmic marathon tackling retro logic puzzles, 8-bit optimization, and punch-card data structures.',
    teamSize: 'Solo / Duo',
    prizePool: '$1,500 + Golden Trophy',
    tag: 'Algorithms'
  },
  {
    id: 'retro-arcade',
    title: 'Retro Arcade Tournament',
    category: 'Fun',
    day: 'Day 1',
    date: 'Friday, Feb 12, 2027',
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    venue: 'Neon Pinball Lounge & Basement',
    contactEmail: 'arcade@retrofest26.starlight.edu',
    description: 'High-score championship on vintage arcade cabinets featuring Space Invaders, Pong, Pac-Man, and Asteroids.',
    teamSize: 'Solo',
    prizePool: '$800 + Vintage Token Set',
    tag: 'Gaming'
  },
  {
    id: 'tech-trivia-warmup',
    title: 'Analog Computing Workshop',
    category: 'Tech',
    day: 'Day 1',
    date: 'Friday, Feb 12, 2027',
    startTime: '02:00 PM',
    endTime: '04:30 PM',
    venue: 'Silicon Garage Lab B',
    contactEmail: 'analog@retrofest26.starlight.edu',
    description: 'Hands-on breadboarding, operational amplifiers, and building 1970s analog synthesizer filters.',
    teamSize: 'Solo / Duo',
    prizePool: '$750 + Hardware Starter Kits',
    tag: 'Hardware'
  },
  {
    id: 'dance-battle',
    title: 'Dance Battle',
    category: 'Cultural',
    day: 'Day 1',
    date: 'Friday, Feb 12, 2027',
    startTime: '05:30 PM',
    endTime: '08:30 PM',
    venue: 'Groovy Sunset Open Stage',
    contactEmail: 'dance@retrofest26.starlight.edu',
    description: 'High-energy dance showcase across funk, disco, locking, breaking, and 70s soul with live percussion.',
    teamSize: 'Solo / Crews (up to 8)',
    prizePool: '$2,000 + Champion Belt',
    tag: 'Choreography'
  },

  // --- DAY 2: Saturday, Feb 13, 2027 ---
  {
    id: 'robotics-challenge',
    title: 'Robotics Challenge',
    category: 'Tech',
    day: 'Day 2',
    date: 'Saturday, Feb 13, 2027',
    startTime: '10:30 AM',
    endTime: '01:30 PM',
    venue: 'Silicon Garage Arena',
    contactEmail: 'robotics@retrofest26.starlight.edu',
    description: 'Autonomous rovers navigating a 1970s moon-landing crater course with optical sensors and obstacle avoidance.',
    teamSize: 'Teams of 2 to 4',
    prizePool: '$2,200 + Development Boards',
    tag: 'Robotics'
  },
  {
    id: 'tech-quiz',
    title: 'Tech Quiz',
    category: 'Tech',
    day: 'Day 2',
    date: 'Saturday, Feb 13, 2027',
    startTime: '02:00 PM',
    endTime: '04:30 PM',
    venue: 'Babbage Memorial Auditorium',
    contactEmail: 'quiz@retrofest26.starlight.edu',
    description: 'Rapid-fire buzzer trivia exploring five decades of Silicon Valley, internet protocols, and pioneer inventors.',
    teamSize: 'Teams of 2',
    prizePool: '$1,000 + Classic Geek Gear',
    tag: 'Trivia'
  },
  {
    id: 'singing-star',
    title: 'Singing Star',
    category: 'Cultural',
    day: 'Day 2',
    date: 'Saturday, Feb 13, 2027',
    startTime: '02:00 PM',
    endTime: '05:00 PM',
    venue: 'Woodstock Main Amphitheatre',
    contactEmail: 'vocals@retrofest26.starlight.edu',
    description: 'Acoustic and electric vocal showcase celebrating 70s rock ballads, Motown harmonies, and golden oldies.',
    teamSize: 'Solo / Duet',
    prizePool: '$1,500 + Studio Recording Session',
    tag: 'Vocals'
  },
  {
    id: 'costume-karaoke',
    title: 'Bell-Bottoms Karaoke Jam',
    category: 'Fun',
    day: 'Day 2',
    date: 'Saturday, Feb 13, 2027',
    startTime: '06:00 PM',
    endTime: '09:00 PM',
    venue: 'Psychedelic Patio Terrace',
    contactEmail: 'karaoke@retrofest26.starlight.edu',
    description: 'Open-mic karaoke party in bell-bottoms, tie-dye shirts, and afro wigs with live crowd voting.',
    teamSize: 'Open to All',
    prizePool: '$500 + Retro Vinyl Hamper',
    tag: 'Social'
  },

  // --- DAY 3: Sunday, Feb 14, 2027 ---
  {
    id: 'hack-the-retro-future',
    title: 'Retro Future Hackathon',
    category: 'Tech',
    day: 'Day 3',
    date: 'Sunday, Feb 14, 2027',
    startTime: '10:00 AM',
    endTime: '02:00 PM',
    venue: 'Ada Lovelace Tech Pavilion',
    contactEmail: 'hackathon@retrofest26.starlight.edu',
    description: 'Build web and embedded apps styled in 70s aesthetics utilizing modern AI and web audio APIs.',
    teamSize: 'Teams of 2 to 4',
    prizePool: '$2,500 + Cloud Credits',
    tag: 'Hackathon'
  },
  {
    id: 'fashion-walk',
    title: 'Fashion Walk',
    category: 'Cultural',
    day: 'Day 3',
    date: 'Sunday, Feb 14, 2027',
    startTime: '03:00 PM',
    endTime: '05:30 PM',
    venue: 'Woodstock Main Amphitheatre',
    contactEmail: 'fashion@retrofest26.starlight.edu',
    description: 'Runway pageant featuring bohemian floral prints, denim flares, psychedelic textures, and vintage sunglasses.',
    teamSize: 'Solo / Groups',
    prizePool: '$1,800 + Vintage Wardrobe Kit',
    tag: 'Runway'
  },
  {
    id: 'vinyl-treasure-hunt',
    title: 'Vintage Vinyl & Treasure Hunt',
    category: 'Fun',
    day: 'Day 3',
    date: 'Sunday, Feb 14, 2027',
    startTime: '03:00 PM',
    endTime: '05:30 PM',
    venue: 'Golden Valley Quad & Campus Woods',
    contactEmail: 'hunt@retrofest26.starlight.edu',
    description: 'Solve cryptographic clues hidden in vintage album liner notes across campus to claim the Golden Record.',
    teamSize: 'Teams of 2 to 3',
    prizePool: '$1,000 + Rare Vinyl Collection',
    tag: 'Adventure'
  },
  {
    id: 'battle-of-bands',
    title: 'Battle of the Bands Finale',
    category: 'Cultural',
    day: 'Day 3',
    date: 'Sunday, Feb 14, 2027',
    startTime: '06:30 PM',
    endTime: '10:00 PM',
    venue: 'Woodstock Main Amphitheatre',
    contactEmail: 'bands@retrofest26.starlight.edu',
    description: 'The monumental festival climax! Student bands electrify the night with psychedelic rock, funk, and blues.',
    teamSize: 'Bands (3 to 7 members)',
    prizePool: '$3,000 + Headliner Trophy',
    tag: 'Live Band'
  }
];
