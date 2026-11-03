import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { formatAudioTime, sanitizeSongTitle, isValidAudioFile, calculateRpmPlaybackRate, VinylRpm } from '../utils/audioHelpers';
import { retroAudio } from '../utils/audioPlayer';

export interface LoadedTrack {
  id: string;
  title: string;
  artist: string;
  sourceType: 'uploaded' | 'preset';
  url: string;
  fileName?: string;
  fileSize?: string;
}

interface AudioPlayerContextType {
  currentTrack: LoadedTrack;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  rpm: VinylRpm;
  isCrackleActive: boolean;
  isTapeWarmthActive: boolean;
  vuLevel: number;
  handleFileUpload: (file: File) => boolean;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  setRpm: (rpm: VinylRpm) => void;
  toggleCrackle: () => void;
  toggleTapeWarmth: () => void;
  loadPresetTrack: (presetId: 'funk' | 'acoustic') => void;
  openJukeboxModal: () => void;
  closeJukeboxModal: () => void;
  isJukeboxModalOpen: boolean;
}

// Generate a procedural 70s Funk Groovy Audio Loop as a self-contained WAV data URI
function createProceduralFunkAudioUrl(): string {
  const sampleRate = 22050;
  const bpm = 112;
  const beatDuration = 60 / bpm;
  const loopBars = 2; // 8 beats
  const totalDuration = beatDuration * 4 * loopBars;
  const totalSamples = Math.floor(sampleRate * totalDuration);

  // WAV header (44 bytes) + 16-bit PCM samples
  const buffer = new ArrayBuffer(44 + totalSamples * 2);
  const view = new DataView(buffer);

  // RIFF identifier
  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, 36 + totalSamples * 2, true);
  view.setUint32(8, 0x57415645, false); // "WAVE"
  // fmt chunk
  view.setUint32(12, 0x666d7420, false); // "fmt "
  view.setUint32(16, 16, true); // chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate
  view.setUint16(32, 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  // data chunk
  view.setUint32(36, 0x64617461, false); // "data"
  view.setUint32(40, totalSamples * 2, true);

  // 1970s Funk Bassline pattern (F, Ab, Bb, C, Eb)
  const bassNotes = [87.31, 103.83, 116.54, 130.81, 155.61, 116.54, 130.81, 87.31];
  let offset = 44;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const beatIndex = Math.floor((t / (beatDuration / 2)) % 8);
    const noteFreq = bassNotes[beatIndex] || 87.31;
    const beatPhase = (t % (beatDuration / 2)) / (beatDuration / 2);

    // Warm bass pluck envelope
    const bassEnv = Math.exp(-beatPhase * 4.5);
    const bass = (Math.sin(2 * Math.PI * noteFreq * t) + 0.3 * Math.sin(4 * Math.PI * noteFreq * t)) * bassEnv * 0.45;

    // Kick drum on beats 0, 2, 4, 6
    const isKick = beatIndex % 2 === 0;
    const kickPhase = (t % beatDuration) / beatDuration;
    const kick = isKick ? Math.sin(2 * Math.PI * (120 - kickPhase * 80) * t) * Math.exp(-kickPhase * 14) * 0.4 : 0;

    // Snare / clap on beats 2 and 6
    const isSnare = beatIndex === 2 || beatIndex === 6;
    const snarePhase = (t % (beatDuration * 2)) / (beatDuration * 2);
    const snareNoise = isSnare ? (Math.random() * 2 - 1) * Math.exp(-snarePhase * 18) * 0.3 : 0;

    // Hi-hat tick every 16th
    const hatPhase = (t % (beatDuration / 4)) / (beatDuration / 4);
    const hat = (Math.random() * 2 - 1) * Math.exp(-hatPhase * 35) * 0.12;

    let sample = bass + kick + snareNoise + hat;
    sample = Math.max(-1, Math.min(1, sample));
    view.setInt16(offset, sample * 0x7fff, true);
    offset += 2;
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<LoadedTrack>(() => ({
    id: 'funk-default',
    title: "1976 Funk Soul Campus Anthem",
    artist: "The Retrofest All-Stars",
    sourceType: 'preset',
    url: ''
  }));

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [rpm, setRpmState] = useState<VinylRpm>('33');
  const [isCrackleActive, setIsCrackleActive] = useState(false);
  const [isTapeWarmthActive, setIsTapeWarmthActive] = useState(false);
  const [vuLevel, setVuLevel] = useState(0);
  const [isJukeboxModalOpen, setIsJukeboxModalOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize default audio on first user interaction or mount
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'metadata';
    audioRef.current = audio;

    // Create default procedural loop url
    const defaultUrl = createProceduralFunkAudioUrl();
    audio.src = defaultUrl;
    setCurrentTrack(prev => ({ ...prev, url: defaultUrl }));

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (!audio.loop) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // VU meter animation effect while playing
  useEffect(() => {
    if (!isPlaying) {
      setVuLevel(0);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const updateVu = () => {
      // Dynamic realistic analog bounce
      const base = 0.4 + Math.sin(Date.now() / 140) * 0.25;
      const noise = (Math.random() - 0.5) * 0.2;
      const level = Math.max(0.1, Math.min(0.95, base + noise));
      setVuLevel(level);
      animFrameRef.current = requestAnimationFrame(updateVu);
    };

    animFrameRef.current = requestAnimationFrame(updateVu);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const handleFileUpload = (file: File): boolean => {
    if (!isValidAudioFile(file)) {
      alert("Please upload a valid audio file (.mp3, .wav, .ogg, .m4a, .aac, .flac)");
      return false;
    }

    retroAudio.playGroovyChime();
    const objectUrl = URL.createObjectURL(file);
    const cleanTitle = sanitizeSongTitle(file.name);
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    const newTrack: LoadedTrack = {
      id: `upload-${Date.now()}`,
      title: cleanTitle,
      artist: "Uploaded Student Track",
      sourceType: 'uploaded',
      url: objectUrl,
      fileName: file.name,
      fileSize: sizeInMb
    };

    setCurrentTrack(newTrack);

    if (audioRef.current) {
      audioRef.current.src = objectUrl;
      audioRef.current.playbackRate = calculateRpmPlaybackRate(rpm);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy fallback
        setIsPlaying(false);
      });
    }

    return true;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    retroAudio.playGroovyChime();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.playbackRate = calculateRpmPlaybackRate(rpm);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : vol;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  const setRpm = (newRpm: VinylRpm) => {
    retroAudio.playGroovyChime();
    setRpmState(newRpm);
    if (audioRef.current) {
      audioRef.current.playbackRate = calculateRpmPlaybackRate(newRpm);
    }
  };

  const toggleCrackle = () => {
    const active = retroAudio.toggleVinylCrackle();
    setIsCrackleActive(active);
  };

  const toggleTapeWarmth = () => {
    retroAudio.playGroovyChime();
    setIsTapeWarmthActive(!isTapeWarmthActive);
  };

  const loadPresetTrack = (presetId: 'funk' | 'acoustic') => {
    retroAudio.playGroovyChime();
    const url = createProceduralFunkAudioUrl();
    const newTrack: LoadedTrack = {
      id: presetId,
      title: presetId === 'funk' ? "1976 Funk Soul Campus Anthem" : "Woodstock Acoustic Ballad",
      artist: "The Retrofest All-Stars",
      sourceType: 'preset',
      url
    };
    setCurrentTrack(newTrack);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.playbackRate = calculateRpmPlaybackRate(rpm);
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        rpm,
        isCrackleActive,
        isTapeWarmthActive,
        vuLevel,
        handleFileUpload,
        togglePlay,
        seek,
        setVolume,
        toggleMute,
        setRpm,
        toggleCrackle,
        toggleTapeWarmth,
        loadPresetTrack,
        openJukeboxModal: () => setIsJukeboxModalOpen(true),
        closeJukeboxModal: () => setIsJukeboxModalOpen(false),
        isJukeboxModalOpen
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
