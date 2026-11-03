import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatAudioTime,
  sanitizeSongTitle,
  isValidAudioFile,
  calculateRpmPlaybackRate
} from './audioHelpers';

test('formatAudioTime formats seconds to mm:ss correctly', () => {
  assert.equal(formatAudioTime(0), '00:00');
  assert.equal(formatAudioTime(65), '01:05');
  assert.equal(formatAudioTime(215), '03:35');
  assert.equal(formatAudioTime(NaN), '00:00');
  assert.equal(formatAudioTime(-10), '00:00');
});

test('sanitizeSongTitle cleans filenames properly', () => {
  assert.equal(sanitizeSongTitle('Stayin_Alive_BeeGees.mp3'), 'Stayin Alive BeeGees');
  assert.equal(sanitizeSongTitle('superstition-funk-1976.wav'), 'superstition funk 1976');
  assert.equal(sanitizeSongTitle('track.ogg'), 'track');
  assert.equal(sanitizeSongTitle(''), 'Untitled Track');
});

test('isValidAudioFile checks mime type and extensions', () => {
  assert.equal(isValidAudioFile({ type: 'audio/mpeg', name: 'song.mp3' }), true);
  assert.equal(isValidAudioFile({ type: 'audio/wav', name: 'track.wav' }), true);
  assert.equal(isValidAudioFile({ type: '', name: 'groovy.flac' }), true);
  assert.equal(isValidAudioFile({ type: 'image/png', name: 'cover.png' }), false);
  assert.equal(isValidAudioFile({ type: 'video/mp4', name: 'video.mp4' }), false);
});

test('calculateRpmPlaybackRate returns authentic vinyl speeds', () => {
  assert.equal(calculateRpmPlaybackRate('33'), 1.0);
  assert.equal(calculateRpmPlaybackRate('45'), 1.15);
  assert.equal(calculateRpmPlaybackRate('78'), 1.35);
});
