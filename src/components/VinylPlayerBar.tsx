import React, { useState, useRef } from 'react';
import { Disc3, Volume2, VolumeX, Sparkles, ChevronUp, UploadCloud, Radio } from 'lucide-react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { RetroVinyl } from './RetroGraphics';

export const VinylPlayerBar: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    handleFileUpload,
    isCrackleActive,
    toggleCrackle
  } = useAudioPlayer();

  const [minimized, setMinimized] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const scrollToJukebox = () => {
    const el = document.getElementById('jukebox');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => setMinimized(false)}
        className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 bg-[#FAF0DF] border-3 border-[#713D29] rounded-full p-2.5 sm:p-3 shadow-retro flex items-center gap-2 hover:scale-105 transition-all text-[#713D29]"
        title="Open Vinyl Player"
        aria-label="Open Vinyl Player"
      >
        <Disc3 className={`w-5 h-5 text-[#D8753E] ${isPlaying ? 'animate-spin' : ''}`} />
        <span className="font-retro-mono text-xs font-bold hidden sm:inline truncate max-w-[140px]">
          {isPlaying ? currentTrack.title : 'VINYL PLAYER'}
        </span>
      </button>
    );
  }

  return (
    <aside
      aria-label="Retro Vinyl Audio Player"
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-2.5 sm:p-3.5 shadow-retro-lg max-w-[310px] sm:max-w-sm w-full animate-in slide-in-from-bottom-4 duration-200"
    >
      <div className="flex items-center justify-between pb-1.5 sm:pb-2 border-b border-[#713D29]/20 mb-2">
        <div className="flex items-center gap-1.5">
          <RetroVinyl size={20} spinning={isPlaying} />
          <span className="font-retro-mono text-[10px] sm:text-[11px] font-bold text-[#D8753E] uppercase tracking-wider truncate max-w-[130px]">
            70s Hi-Fi Turntable
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Direct Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Upload Audio File (.mp3, .wav)"
            className="p-1 px-1.5 rounded bg-[#F3E4C8] border border-[#713D29] text-[#713D29] hover:bg-[#D8753E] hover:text-[#FAF0DF] transition-colors flex items-center gap-1 text-[10px] font-retro-mono font-bold"
          >
            <UploadCloud className="w-3 h-3" />
            <span>Upload</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,.mp3,.wav,.ogg,.m4a,.flac"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload Song"
          />

          <button
            type="button"
            onClick={scrollToJukebox}
            title="Jump to Full Jukebox Deck"
            className="p-1 text-[#713D29] hover:text-[#D8753E] transition-colors"
          >
            <Radio className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setMinimized(true)}
            title="Minimize Player"
            className="p-1 text-[#713D29] hover:text-[#D8753E] transition-colors"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <div className="text-left overflow-hidden">
          <div className="font-retro-slab text-[11px] sm:text-xs text-[#713D29] truncate" title={currentTrack.title}>
            {currentTrack.title}
          </div>
          <div className="text-[9px] sm:text-[10px] font-retro-mono text-[#6D7851] font-bold truncate">
            {isPlaying ? '• Spinning on 33 RPM' : 'Click Play or Upload Track'}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={togglePlay}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-retro-mono font-bold border-2 border-[#713D29] transition-all flex items-center gap-1 cursor-pointer ${
              isPlaying
                ? 'bg-[#D8753E] text-[#F3E4C8] shadow-retro-sm'
                : 'bg-[#E7B84B] text-[#713D29] hover:bg-[#d8a83a]'
            }`}
          >
            {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
