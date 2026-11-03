import React, { useRef, useState } from 'react';
import { UploadCloud, Play, Pause, RotateCcw, Volume2, VolumeX, Disc, Sparkles, Sliders, Music, Radio, FileAudio, CheckCircle2 } from 'lucide-react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { formatAudioTime, VinylRpm } from '../utils/audioHelpers';
import { RetroDaisy, RetroVinyl, RetroCassette } from './RetroGraphics';

export const RetroJukebox: React.FC = () => {
  const {
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
    loadPresetTrack
  } = useAudioPlayer();

  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const leftVuAngle = -35 + vuLevel * 70;
  const rightVuAngle = -35 + (vuLevel * 0.9 + Math.random() * 0.1) * 70;

  return (
    <section id="jukebox" className="relative bg-[#FAF0DF] text-[#713D29] py-16 md:py-24 border-b-4 border-[#713D29]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-retro-mono font-bold tracking-widest text-[#D8753E] uppercase mb-2">
            <Radio className="w-4 h-4" />
            <span>Interactive Sound Deck · 1976 Analog Console</span>
          </div>
          <h2 className="font-groovy text-4xl sm:text-5xl md:text-6xl text-[#713D29] leading-tight mb-4">
            RETRO HI-FI JUKEBOX & SONG UPLOADER
          </h2>
          <div className="w-28 h-1.5 bg-[#D8753E] mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg text-[#713D29]/90 font-medium">
            Upload your college band recording, anthem, or favorite track to hear it spin on our authentic 1970s phonograph turntable with live analog VU meters and vintage crackle!
          </p>
        </div>

        {/* Master Stereo Console Chassis */}
        <div className="bg-[#F3E4C8] border-4 border-[#713D29] rounded-3xl p-6 sm:p-10 shadow-retro-lg max-w-5xl mx-auto">
          
          {/* Top Chassis Strip: Model & Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-3 border-[#713D29]/30 mb-8">
            <div className="flex items-center gap-3">
              <RetroDaisy size={36} petalColor="#FAF0DF" centerColor="#E7B84B" />
              <div>
                <h3 className="font-groovy text-2xl text-[#713D29] leading-none">
                  PHONIC MASTER-76 STEREO DECK
                </h3>
                <span className="text-[11px] font-retro-mono font-bold text-[#6D7851]">
                  SOLID STATE HIGH FIDELITY · DIRECT DRIVE TURNTABLE
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-retro px-4 py-2 bg-[#D8753E] text-[#F3E4C8] text-xs font-retro-slab tracking-wider border-2 border-[#713D29] rounded-xl shadow-retro flex items-center gap-2 cursor-pointer hover:bg-[#c96630]"
              >
                <UploadCloud className="w-4 h-4" />
                <span>UPLOAD SONG</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,.mp3,.wav,.ogg,.m4a,.flac"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload Song Audio File"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            
            {/* Left Column (5 cols): Turntable & Tonearm */}
            <div className="lg:col-span-5 bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-6 shadow-retro flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-xs font-retro-mono font-bold text-[#713D29] uppercase mb-4 tracking-wider flex items-center gap-2">
                <Disc className="w-4 h-4 text-[#D8753E]" />
                <span>Analog Turntable Platter</span>
              </div>

              {/* Realistic Turntable Platter with Tonearm */}
              <div className="relative w-64 h-64 flex items-center justify-center bg-[#E7B84B]/20 border-3 border-[#713D29] rounded-full shadow-inner">
                {/* Vinyl Record */}
                <RetroVinyl
                  size={210}
                  spinning={isPlaying}
                  className={rpm === '45' ? 'duration-700' : rpm === '78' ? 'duration-500' : 'duration-1000'}
                />

                {/* Tonearm */}
                <div
                  className="absolute -top-2 right-4 w-12 h-44 origin-top-right transition-transform duration-700 pointer-events-none"
                  style={{
                    transform: isPlaying ? 'rotate(-18deg)' : 'rotate(12deg)'
                  }}
                >
                  {/* Pivot Base */}
                  <div className="w-8 h-8 rounded-full bg-[#713D29] border-2 border-[#E7B84B] shadow-retro-sm absolute top-0 right-0" />
                  {/* Chrome Arm Tube */}
                  <div className="w-1.5 h-36 bg-gradient-to-b from-[#713D29] via-[#FAF0DF] to-[#713D29] border border-[#713D29] absolute top-6 right-3.5" />
                  {/* Cartridge Head */}
                  <div className="w-5 h-7 bg-[#D8753E] border-2 border-[#713D29] rounded-sm absolute bottom-0 right-1.5 shadow-sm flex items-center justify-center">
                    <div className="w-1 h-2 bg-[#E7B84B]" />
                  </div>
                </div>
              </div>

              {/* RPM Speed Selector Buttons */}
              <div className="mt-6 flex items-center gap-2">
                <span className="text-xs font-retro-mono font-bold text-[#713D29] mr-1">
                  SPEED:
                </span>
                {(['33', '45', '78'] as VinylRpm[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRpm(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-retro-mono font-bold border-2 border-[#713D29] transition-all cursor-pointer ${
                      rpm === r
                        ? 'bg-[#D8753E] text-[#F3E4C8] shadow-retro-sm -translate-y-0.5'
                        : 'bg-[#F3E4C8] text-[#713D29] hover:bg-[#E7B84B]/30'
                    }`}
                  >
                    {r} RPM
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column (7 cols): Song Details, Drag & Drop Upload Zone, Dual VU Meters */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Drag and Drop Upload Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-3 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer relative ${
                  isDragOver
                    ? 'border-[#D8753E] bg-[#E7B84B]/20 scale-[1.01]'
                    : 'border-[#713D29] bg-[#FAF0DF] hover:bg-[#FAF0DF]/90'
                }`}
              >
                <UploadCloud className="w-10 h-10 text-[#D8753E] mx-auto mb-2 animate-bounce" />
                <h4 className="font-retro-slab text-base sm:text-lg text-[#713D29]">
                  {currentTrack.sourceType === 'uploaded' ? 'Upload Another Song' : 'Drop Your Song Audio File Here'}
                </h4>
                <p className="text-xs sm:text-sm text-[#713D29]/80 mt-1 font-medium">
                  Supports MP3, WAV, OGG, M4A, FLAC · Click to browse or drag & drop directly
                </p>
                {currentTrack.sourceType === 'uploaded' && (
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-retro-mono font-bold text-[#6D7851] bg-[#F3E4C8] px-3 py-1 border border-[#6D7851] rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Loaded: {currentTrack.fileName} ({currentTrack.fileSize})</span>
                  </div>
                )}
              </div>

              {/* Current Track Display Plaque */}
              <div className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-5 shadow-retro">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-retro-mono font-bold text-[#D8753E] uppercase tracking-wide">
                      {currentTrack.sourceType === 'uploaded' ? '🎵 Custom Student Audio Track' : '📻 Master 1970s Vinyl Preset'}
                    </div>
                    <h3 className="font-groovy text-xl sm:text-2xl text-[#713D29] mt-0.5 truncate max-w-md">
                      {currentTrack.title}
                    </h3>
                    <p className="text-xs font-retro-mono text-[#6D7851] font-bold">
                      {currentTrack.artist} {currentTrack.fileSize ? `· ${currentTrack.fileSize}` : ''}
                    </p>
                  </div>

                  {/* Switch to preset link */}
                  {currentTrack.sourceType === 'uploaded' && (
                    <button
                      type="button"
                      onClick={() => loadPresetTrack('funk')}
                      className="text-xs font-retro-mono font-bold text-[#D8753E] hover:underline whitespace-nowrap"
                    >
                      Reset to 70s Preset
                    </button>
                  )}
                </div>

                {/* Timeline Scrubber */}
                <div className="mt-4">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => seek(Number(e.target.value))}
                    aria-label="Song progress scrubber"
                    className="w-full h-2.5 bg-[#F3E4C8] border border-[#713D29] rounded-lg appearance-none cursor-pointer accent-[#D8753E]"
                  />
                  <div className="flex items-center justify-between text-xs font-retro-mono font-bold text-[#713D29] mt-1">
                    <span>{formatAudioTime(currentTime)}</span>
                    <span className="text-[#D8753E]">{rpm} RPM</span>
                    <span>{formatAudioTime(duration || 120)}</span>
                  </div>
                </div>
              </div>

              {/* Dual 1970s Analog VU Needle Meters */}
              <div className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-4 shadow-retro">
                <div className="text-[10px] font-retro-mono font-bold text-[#713D29] uppercase tracking-wider mb-2 text-center">
                  DUAL CHANNEL STEREO VU METERS
                </div>
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Left VU Meter */}
                  <div className="bg-[#FAF0DF] border-2 border-[#713D29] rounded-xl p-3 relative h-20 overflow-hidden flex flex-col justify-between">
                    <div className="flex justify-between text-[9px] font-retro-mono text-[#713D29]/70 font-bold">
                      <span>-20dB</span>
                      <span>-7dB</span>
                      <span className="text-red-700">0dB</span>
                      <span className="text-red-700">+3dB</span>
                    </div>
                    {/* Pivot needle */}
                    <div className="relative w-full h-8 flex justify-center">
                      <div
                        className="w-0.5 h-14 bg-[#713D29] origin-bottom transition-transform duration-75 absolute bottom-0 shadow-sm"
                        style={{ transform: `rotate(${isPlaying ? leftVuAngle : -35}deg)` }}
                      />
                      <div className="w-3 h-3 rounded-full bg-[#D8753E] border border-[#713D29] absolute -bottom-1" />
                    </div>
                    <div className="text-[10px] font-retro-mono font-bold text-center text-[#713D29]">
                      CHANNEL L
                    </div>
                  </div>

                  {/* Right VU Meter */}
                  <div className="bg-[#FAF0DF] border-2 border-[#713D29] rounded-xl p-3 relative h-20 overflow-hidden flex flex-col justify-between">
                    <div className="flex justify-between text-[9px] font-retro-mono text-[#713D29]/70 font-bold">
                      <span>-20dB</span>
                      <span>-7dB</span>
                      <span className="text-red-700">0dB</span>
                      <span className="text-red-700">+3dB</span>
                    </div>
                    {/* Pivot needle */}
                    <div className="relative w-full h-8 flex justify-center">
                      <div
                        className="w-0.5 h-14 bg-[#713D29] origin-bottom transition-transform duration-75 absolute bottom-0 shadow-sm"
                        style={{ transform: `rotate(${isPlaying ? rightVuAngle : -35}deg)` }}
                      />
                      <div className="w-3 h-3 rounded-full bg-[#D8753E] border border-[#713D29] absolute -bottom-1" />
                    </div>
                    <div className="text-[10px] font-retro-mono font-bold text-center text-[#713D29]">
                      CHANNEL R
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

          {/* Master Transport & Vintage Equalizer Strip */}
          <div className="bg-[#FAF0DF] border-3 border-[#713D29] rounded-2xl p-5 shadow-retro flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Play / Pause Primary Action */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="btn-retro px-6 py-3 bg-[#D8753E] text-[#F3E4C8] text-sm sm:text-base font-retro-slab tracking-wider border-2 border-[#713D29] rounded-xl shadow-retro flex items-center gap-2 cursor-pointer hover:bg-[#c96630]"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                <span>{isPlaying ? 'PAUSE MUSIC' : 'PLAY SONG'}</span>
              </button>

              <button
                type="button"
                onClick={() => seek(0)}
                title="Rewind to Start"
                className="btn-retro p-3 bg-[#F3E4C8] text-[#713D29] border-2 border-[#713D29] rounded-xl shadow-retro-sm hover:bg-[#E7B84B]/30 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* 70s Analog Audio FX Toggles */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleCrackle}
                className={`px-3 py-2 rounded-xl text-xs font-retro-mono font-bold border-2 border-[#713D29] transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCrackleActive
                    ? 'bg-[#E7B84B] text-[#713D29] shadow-retro-sm'
                    : 'bg-[#F3E4C8] text-[#713D29] hover:bg-[#E7B84B]/30'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D8753E]" />
                <span>VINYL CRACKLE: {isCrackleActive ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={toggleTapeWarmth}
                className={`px-3 py-2 rounded-xl text-xs font-retro-mono font-bold border-2 border-[#713D29] transition-all cursor-pointer flex items-center gap-1.5 ${
                  isTapeWarmthActive
                    ? 'bg-[#6D7851] text-[#FAF0DF] shadow-retro-sm'
                    : 'bg-[#F3E4C8] text-[#713D29] hover:bg-[#E7B84B]/30'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>TAPE WARMTH: {isTapeWarmthActive ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                className="text-[#713D29] hover:text-[#D8753E]"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Volume control"
                className="w-20 sm:w-24 h-2 bg-[#F3E4C8] border border-[#713D29] rounded-lg appearance-none cursor-pointer accent-[#D8753E]"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
