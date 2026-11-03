import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterEvents,
  groupEventsByTime,
  parseTimeToMinutes,
  validateRegistration,
  generateTicket,
  isValidImageFile
} from './festivalLogic';
import { FESTIVAL_EVENTS } from '../data/festivalData';

test('filterEvents works with both Category and Day filters simultaneously', () => {
  // All + All
  const all = filterEvents(FESTIVAL_EVENTS, 'All', 'All');
  assert.equal(all.length, FESTIVAL_EVENTS.length);

  // Tech + Day 1
  const techDay1 = filterEvents(FESTIVAL_EVENTS, 'Tech', 'Day 1');
  assert.ok(techDay1.length >= 1);
  assert.ok(techDay1.every(e => e.category === 'Tech' && e.day === 'Day 1'));

  // Cultural + Day 2
  const culturalDay2 = filterEvents(FESTIVAL_EVENTS, 'Cultural', 'Day 2');
  assert.ok(culturalDay2.length >= 1);
  assert.ok(culturalDay2.every(e => e.category === 'Cultural' && e.day === 'Day 2'));

  // Fun + Day 3
  const funDay3 = filterEvents(FESTIVAL_EVENTS, 'Fun', 'Day 3');
  assert.ok(funDay3.length >= 1);
  assert.ok(funDay3.every(e => e.category === 'Fun' && e.day === 'Day 3'));
});

test('parseTimeToMinutes converts 12h clock correctly', () => {
  assert.equal(parseTimeToMinutes('10:00 AM'), 600);
  assert.equal(parseTimeToMinutes('10:30 AM'), 630);
  assert.equal(parseTimeToMinutes('02:00 PM'), 840);
  assert.equal(parseTimeToMinutes('06:30 PM'), 1110);
});

test('groupEventsByTime detects clashes accurately for Day 1 and Day 2', () => {
  // Day 1 has Code Sprint (10:00 AM) and Retro Arcade (10:00 AM)
  const day1Groups = groupEventsByTime(FESTIVAL_EVENTS, 'Day 1');
  const tenAmGroup = day1Groups.find(g => g.startTime === '10:00 AM');
  assert.ok(tenAmGroup, '10:00 AM group must exist');
  assert.equal(tenAmGroup.isClash, true);
  assert.equal(tenAmGroup.events.length, 2);

  // Day 2 has Tech Quiz (02:00 PM) and Singing Star (02:00 PM)
  const day2Groups = groupEventsByTime(FESTIVAL_EVENTS, 'Day 2');
  const twoPmGroup = day2Groups.find(g => g.startTime === '02:00 PM');
  assert.ok(twoPmGroup, '02:00 PM group must exist');
  assert.equal(twoPmGroup.isClash, true);
  assert.equal(twoPmGroup.events.length, 2);
});

test('validateRegistration requires name, valid email, college, event and allows optional phone', () => {
  // Missing required fields
  const invalid = validateRegistration({
    name: '',
    email: 'bad-email',
    college: '',
    phone: '',
    selectedEvent: ''
  });
  assert.equal(invalid.isValid, false);
  assert.equal(invalid.firstInvalidField, 'name');
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.college);
  assert.ok(invalid.errors.selectedEvent);
  // Phone is optional when empty, so no phone error here
  assert.equal(invalid.errors.phone, undefined);

  // Invalid optional phone
  const badPhone = validateRegistration({
    name: 'Jim Morrison',
    email: 'jim@woodstock.org',
    college: 'UCLA',
    phone: '1234', // too short
    selectedEvent: 'Code Sprint'
  });
  assert.equal(badPhone.isValid, false);
  assert.equal(badPhone.firstInvalidField, 'phone');
  assert.ok(badPhone.errors.phone);

  // Valid with phone
  const valid = validateRegistration({
    name: 'Jimi Hendrix',
    email: 'jimi@experience.com',
    college: 'Seattle Music & Tech Academy',
    phone: '555-700-1976',
    selectedEvent: 'Battle of the Bands Finale'
  });
  assert.equal(valid.isValid, true);
  assert.equal(valid.firstInvalidField, undefined);
  assert.equal(Object.keys(valid.errors).length, 0);

  // Valid ticket generation
  const ticket = generateTicket({
    name: 'Jimi Hendrix',
    email: 'jimi@experience.com',
    college: 'Seattle Music & Tech Academy',
    selectedEvent: 'Battle of the Bands Finale'
  });
  assert.ok(ticket.ticketId.startsWith('RF70-'));
  assert.equal(ticket.name, 'Jimi Hendrix');
  assert.equal(ticket.selectedEvent, 'Battle of the Bands Finale');
});

test('isValidImageFile checks valid and invalid images', () => {
  const pngFile = { type: 'image/png', name: 'poster.png' } as unknown as File;
  const exeFile = { type: 'application/x-msdownload', name: 'malware.exe' } as unknown as File;
  assert.equal(isValidImageFile(pngFile), true);
  assert.equal(isValidImageFile(exeFile), false);
});
