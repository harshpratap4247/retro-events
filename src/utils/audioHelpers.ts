/**
 * Audio helpers for file validation, song title formatting, and RPM speed conversion.
 */

export type VinylRpm = '33' | '45' | '78';

export function formatAudioTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function sanitizeSongTitle(filename: string): string {
  if (!filename) return 'Untitled Track';
  // Strip extension
  const withoutExt = filename.replace(/\.[^/.]+$/, '');
  // Replace underscores, hyphens, and multiple spaces
  const clean = withoutExt
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clean || 'Untitled Track';
}

export function isValidAudioFile(file: { type?: string; name?: string }): boolean {
  if (!file) return false;
  if (file.type && file.type.startsWith('audio/')) return true;
  // Fallback extension check
  const ext = (file.name || '').split('.').pop()?.toLowerCase();
  const validExts = ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac', 'weba'];
  return !!ext && validExts.includes(ext);
}

export function calculateRpmPlaybackRate(rpm: VinylRpm): number {
  switch (rpm) {
    case '33':
      return 1.0;
    case '45':
      return 1.15;
    case '78':
      return 1.35;
    default:
      return 1.0;
  }
}
