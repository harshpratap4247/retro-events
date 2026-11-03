/**
 * Core pure logic for RETROFEST '26
 * Handles dual-criteria event filtering, schedule time-slot grouping & clash detection,
 * form validation with first-error focus resolution, and ticket pass generation.
 */

import { FestivalEvent, EventCategory, FestivalDay } from '../data/festivalData';

export type CategoryFilter = 'All' | EventCategory;
export type DayFilter = 'All' | FestivalDay;

export interface RegistrationFormData {
  name: string;
  email: string;
  college: string;
  phone?: string;
  selectedEvent: string;
  message?: string;
}

export type RegistrationFieldKey = 'name' | 'email' | 'college' | 'phone' | 'selectedEvent' | 'message';

export interface RegistrationValidationResult {
  isValid: boolean;
  errors: Partial<Record<RegistrationFieldKey, string>>;
  firstInvalidField?: RegistrationFieldKey;
}

export interface IssuedTicket {
  ticketId: string;
  name: string;
  email: string;
  college: string;
  selectedEvent: string;
  issuedAt: string;
  passType: string;
}

export interface ScheduleTimeGroup {
  timeKey: string;
  startTime: string;
  events: FestivalEvent[];
  isClash: boolean;
}

/**
 * Filter festival events dynamically based on Category AND Day working together.
 */
export function filterEvents(
  events: FestivalEvent[],
  category: CategoryFilter,
  day: DayFilter
): FestivalEvent[] {
  return events.filter((event) => {
    const matchesCategory = category === 'All' || event.category === category;
    const matchesDay = day === 'All' || event.day === day;
    return matchesCategory && matchesDay;
  });
}

/**
 * Helper to parse a time string like "10:00 AM" into minutes from midnight for accurate chronological sorting.
 */
export function parseTimeToMinutes(timeStr: string): number {
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();

  if (meridiem === 'PM' && hours < 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

/**
 * Groups events of a specific day by their start time, sorted chronologically.
 * Flags slots with more than 1 event as a clash (`isClash: true`).
 */
export function groupEventsByTime(events: FestivalEvent[], targetDay: FestivalDay): ScheduleTimeGroup[] {
  const dayEvents = events.filter((e) => e.day === targetDay);

  // Group by startTime
  const groupedMap = new Map<string, FestivalEvent[]>();
  for (const event of dayEvents) {
    const existing = groupedMap.get(event.startTime) || [];
    existing.push(event);
    groupedMap.set(event.startTime, existing);
  }

  // Convert to array and sort chronologically
  const groups: ScheduleTimeGroup[] = Array.from(groupedMap.entries()).map(([startTime, slotEvents]) => ({
    timeKey: startTime,
    startTime,
    events: slotEvents,
    isClash: slotEvents.length > 1,
  }));

  groups.sort((a, b) => parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime));

  return groups;
}

/**
 * Validates registration form inputs per strict specs:
 * - name: required
 * - email: required, format-validated
 * - college: required
 * - phone: optional (if provided, must be 10-15 digits)
 * - selectedEvent: required
 * - message: optional
 *
 * Returns errors and the key of the first invalid field for auto-focusing.
 */
export function validateRegistration(data: RegistrationFormData): RegistrationValidationResult {
  const errors: Partial<Record<RegistrationFieldKey, string>> = {};
  const orderedFieldKeys: RegistrationFieldKey[] = ['name', 'email', 'college', 'phone', 'selectedEvent'];

  // Name (required)
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Full name is required (minimum 2 characters)';
  }

  // Email (required, format-validated)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address (e.g. user@domain.edu)';
  }

  // College (required)
  if (!data.college || data.college.trim().length < 2) {
    errors.college = 'College or University name is required';
  }

  // Phone (optional - validate only if entered)
  if (data.phone && data.phone.trim().length > 0) {
    const cleanPhone = data.phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(cleanPhone)) {
      errors.phone = 'Please enter a valid phone number (10 to 15 digits)';
    }
  }

  // Event dropdown (required)
  if (!data.selectedEvent || data.selectedEvent.trim().length === 0) {
    errors.selectedEvent = 'Please select an event or All-Access Festival Pass';
  }

  const isValid = Object.keys(errors).length === 0;
  const firstInvalidField = isValid ? undefined : orderedFieldKeys.find((key) => Boolean(errors[key]));

  return {
    isValid,
    errors,
    firstInvalidField,
  };
}

/**
 * Generates an official vintage ticket pass confirmation
 */
export function generateTicket(data: RegistrationFormData): IssuedTicket {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `RF70-${randomSuffix}`;
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    ticketId,
    name: data.name.trim(),
    email: data.email.trim(),
    college: data.college.trim(),
    selectedEvent: data.selectedEvent,
    issuedAt: dateFormatted,
    passType: 'OFFICIAL 1970s ADMISSION BADGE',
  };
}

/**
 * Checks if a file is an acceptable image
 */
export function isValidImageFile(file: File): boolean {
  if (!file) return false;
  const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  if (validMimeTypes.includes(file.type)) return true;

  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
  const fileName = file.name.toLowerCase();
  return validExtensions.some((ext) => fileName.endsWith(ext));
}
