import React from 'react';
import { X } from 'lucide-react';
import { RetroJukebox } from './RetroJukebox';
import { retroAudio } from '../utils/audioPlayer';

interface JukeboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JukeboxModal: React.FC<JukeboxModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="jukebox-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF0DF] border-4 border-[#713D29] rounded-3xl w-full max-w-5xl my-auto p-4 sm:p-6 shadow-retro-lg max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b-2 border-[#713D29]/30">
          <div id="jukebox-modal-title" className="font-groovy text-2xl text-[#713D29]">
            1976 HI-FI STEREO JUKEBOX & SONG UPLOADER
          </div>
          <button
            type="button"
            onClick={() => {
              retroAudio.playTapeClick();
              onClose();
            }}
            className="p-1.5 rounded-xl border-2 border-[#713D29] bg-[#F3E4C8] hover:bg-[#D8753E] hover:text-[#FAF0DF] text-[#713D29] transition-colors cursor-pointer"
            aria-label="Close Jukebox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Turntable & Song Uploader */}
        <RetroJukebox />
      </div>
    </div>
  );
};
