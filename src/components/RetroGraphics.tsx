import React from 'react';

/**
 * Authentic 1970s Retro Vector Graphics & Motifs
 * Rendered as pure inline SVG so they are crisp, color-matched, and 100% resilient.
 */

export const RetroDaisy: React.FC<{ className?: string; size?: number; petalColor?: string; centerColor?: string }> = ({
  className = '',
  size = 48,
  petalColor = '#FAF0DF',
  centerColor = '#E7B84B'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* 8 Groovy Rounded Petals */}
    <g fill={petalColor} stroke="#713D29" strokeWidth="3">
      <ellipse cx="50" cy="20" rx="14" ry="18" />
      <ellipse cx="50" cy="80" rx="14" ry="18" />
      <ellipse cx="20" cy="50" rx="18" ry="14" />
      <ellipse cx="80" cy="50" rx="18" ry="14" />
      <ellipse cx="29" cy="29" rx="14" ry="18" transform="rotate(-45 29 29)" />
      <ellipse cx="71" cy="71" rx="14" ry="18" transform="rotate(-45 71 71)" />
      <ellipse cx="71" cy="29" rx="14" ry="18" transform="rotate(45 71 29)" />
      <ellipse cx="29" cy="71" rx="14" ry="18" transform="rotate(45 29 71)" />
    </g>
    {/* Golden Center */}
    <circle cx="50" cy="50" r="16" fill={centerColor} stroke="#713D29" strokeWidth="4" />
    <circle cx="50" cy="50" r="6" fill="#D8753E" />
  </svg>
);

export const RetroVinyl: React.FC<{ className?: string; spinning?: boolean; size?: number }> = ({
  className = '',
  spinning = false,
  size = 120
}) => (
  <div className={`relative inline-block ${spinning ? 'animate-spin-slow' : ''} ${className}`}>
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vinyl Disc */}
      <circle cx="100" cy="100" r="96" fill="#24140E" stroke="#713D29" strokeWidth="4" />
      {/* Sound Grooves */}
      <circle cx="100" cy="100" r="84" stroke="#3D2218" strokeWidth="1.5" strokeDasharray="6 3" />
      <circle cx="100" cy="100" r="72" stroke="#3D2218" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="60" stroke="#3D2218" strokeWidth="1.5" strokeDasharray="8 4" />
      <circle cx="100" cy="100" r="48" stroke="#3D2218" strokeWidth="1.5" />
      {/* 70s Centre Label */}
      <circle cx="100" cy="100" r="36" fill="#D8753E" stroke="#E7B84B" strokeWidth="3" />
      <circle cx="100" cy="100" r="24" fill="#E7B84B" />
      <text x="100" y="96" textAnchor="middle" fill="#713D29" fontSize="10" fontWeight="bold" fontFamily="Space Mono">
        RETRO
      </text>
      <text x="100" y="108" textAnchor="middle" fill="#713D29" fontSize="8" fontWeight="bold" fontFamily="Space Mono">
        1976-26
      </text>
      {/* Spindle hole */}
      <circle cx="100" cy="100" r="5" fill="#FAF0DF" stroke="#713D29" strokeWidth="2" />
    </svg>
  </div>
);

export const RetroCassette: React.FC<{ className?: string; width?: number; height?: number }> = ({
  className = '',
  width = 160,
  height = 104
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    {/* Cassette Body */}
    <rect x="5" y="5" width="190" height="120" rx="10" fill="#FAF0DF" stroke="#713D29" strokeWidth="4" />
    {/* Label Area */}
    <rect x="20" y="18" width="160" height="72" rx="4" fill="#E7B84B" stroke="#713D29" strokeWidth="2" />
    {/* Rainbow Stripes on Label */}
    <rect x="25" y="24" width="150" height="6" fill="#D8753E" />
    <rect x="25" y="30" width="150" height="6" fill="#6D7851" />
    <text x="100" y="48" textAnchor="middle" fill="#713D29" fontSize="11" fontWeight="bold" fontFamily="Shrikhand">
      RETROFEST MIX '26
    </text>
    {/* Spool Window */}
    <rect x="45" y="56" width="110" height="28" rx="14" fill="#713D29" />
    <circle cx="75" cy="70" r="10" fill="#FAF0DF" stroke="#D8753E" strokeWidth="2" />
    <circle cx="125" cy="70" r="10" fill="#FAF0DF" stroke="#D8753E" strokeWidth="2" />
    <line x1="85" y1="70" x2="115" y2="70" stroke="#FAF0DF" strokeWidth="3" />
    {/* Screws */}
    <circle cx="14" cy="14" r="3" fill="#713D29" />
    <circle cx="186" cy="14" r="3" fill="#713D29" />
    <circle cx="14" cy="116" r="3" fill="#713D29" />
    <circle cx="186" cy="116" r="3" fill="#713D29" />
    {/* Trapezoid Base */}
    <path d="M 30 115 L 50 95 L 150 95 L 170 115 Z" fill="#D8753E" stroke="#713D29" strokeWidth="2" />
  </svg>
);

export const WavyDivider: React.FC<{ flip?: boolean; fill?: string; stroke?: string; className?: string }> = ({
  flip = false,
  fill = '#FAF0DF',
  stroke = '#713D29',
  className = ''
}) => (
  <div className={`w-full overflow-hidden leading-none select-none ${className}`}>
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={`w-full h-12 md:h-20 ${flip ? 'rotate-180' : ''}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"
        fill={fill}
      />
      <path
        d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60"
        stroke={stroke}
        strokeWidth="4"
        fill="none"
      />
    </svg>
  </div>
);

export const RetroSunburstHeaderArt: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-md mx-auto ${className}`}
  >
    <defs>
      <clipPath id="arch-clip">
        <path d="M 50 300 L 50 160 A 150 150 0 0 1 350 160 L 350 300 Z" />
      </clipPath>
    </defs>
    {/* Outer Frame with Retro Arch */}
    <g clipPath="url(#arch-clip)">
      {/* 70s Sunburst Rays */}
      <circle cx="200" cy="220" r="180" fill="#FAF0DF" />
      <polygon points="200,220 50,50 90,30" fill="#D8753E" />
      <polygon points="200,220 130,20 170,10" fill="#E7B84B" />
      <polygon points="200,220 230,10 270,20" fill="#6D7851" />
      <polygon points="200,220 310,30 350,50" fill="#D8753E" />
      <polygon points="200,220 370,100 390,140" fill="#E7B84B" />
      <polygon points="200,220 390,190 390,230" fill="#6D7851" />
      <polygon points="200,220 30,140 10,190" fill="#D8753E" />
      <polygon points="200,220 10,230 30,270" fill="#E7B84B" />
      {/* Concentric Rainbow Arch Rays */}
      <path d="M 80 220 A 120 120 0 0 1 320 220" stroke="#D8753E" strokeWidth="14" fill="none" />
      <path d="M 94 220 A 106 106 0 0 1 306 220" stroke="#E7B84B" strokeWidth="14" fill="none" />
      <path d="M 108 220 A 92 92 0 0 1 292 220" stroke="#6D7851" strokeWidth="14" fill="none" />
      {/* Rising Golden Sun */}
      <circle cx="200" cy="220" r="54" fill="#E7B84B" stroke="#713D29" strokeWidth="4" />
      <circle cx="200" cy="220" r="32" fill="#D8753E" />
    </g>
    {/* Arch Border */}
    <path
      d="M 50 300 L 50 160 A 150 150 0 0 1 350 160 L 350 300"
      stroke="#713D29"
      strokeWidth="6"
      fill="none"
    />
  </svg>
);
