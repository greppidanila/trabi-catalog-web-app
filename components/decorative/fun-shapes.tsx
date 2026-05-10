"use client";

import { cn } from "@/lib/utils";

// Starburst shape (like in the reference)
export function Starburst({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={cn("w-16 h-16", className)}>
      <path
        d="M50 0 L55 40 L100 50 L55 60 L50 100 L45 60 L0 50 L45 40 Z"
        fill={color}
      />
    </svg>
  );
}

// 4-point star
export function Star4Point({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={cn("w-12 h-12", className)}>
      <path
        d="M50 0 L60 35 L100 50 L60 65 L50 100 L40 65 L0 50 L40 35 Z"
        fill={color}
      />
    </svg>
  );
}

// Sparkle/twinkle star
export function Sparkle({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={cn("w-10 h-10", className)}>
      <path
        d="M50 0 L53 45 L100 50 L53 55 L50 100 L47 55 L0 50 L47 45 Z"
        fill={color}
      />
    </svg>
  );
}

// Blob shape (organic)
export function Blob({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={cn("w-32 h-32", className)}>
      <path
        d="M160 100c0 30-20 60-60 60s-60-30-60-60 20-60 60-60 60 30 60 60Z"
        fill={color}
      />
    </svg>
  );
}

// Wavy blob
export function WavyBlob({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={cn("w-40 h-32", className)}>
      <path
        d="M40 80c0-40 30-60 60-60s40 20 60 20 30-20 40-20v120H0V80c0-20 20-20 40 0Z"
        fill={color}
      />
    </svg>
  );
}

// Ring/Circle outline
export function Ring({ className, color = "#f20036", strokeWidth = 8 }: { className?: string; color?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={cn("w-20 h-20", className)}>
      <circle cx="50" cy="50" r="40" stroke={color} strokeWidth={strokeWidth} fill="none" />
    </svg>
  );
}

// Half circle / Semi-circle
export function SemiCircle({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 50" fill="none" className={cn("w-16 h-8", className)}>
      <path
        d="M0 50 A50 50 0 0 1 100 50 Z"
        fill={color}
      />
    </svg>
  );
}

// Dot grid pattern
export function DotGrid({ className, color = "#f20036", cols = 4, rows = 4 }: { className?: string; color?: string; cols?: number; rows?: number }) {
  const dots = [];
  const spacing = 20;
  const dotSize = 6;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={10 + col * spacing}
          cy={10 + row * spacing}
          r={dotSize}
          fill={color}
        />
      );
    }
  }
  
  return (
    <svg 
      viewBox={`0 0 ${10 + (cols - 1) * spacing + 10} ${10 + (rows - 1) * spacing + 10}`} 
      fill="none" 
      className={cn("w-20 h-20", className)}
    >
      {dots}
    </svg>
  );
}

// Squiggle/Wave line
export function Squiggle({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" className={cn("w-24 h-8", className)}>
      <path
        d="M5 20 Q20 5 35 20 T65 20 T95 20 T115 20"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Cross/X shape
export function Cross({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={cn("w-12 h-12", className)}>
      <rect x="35" y="0" width="30" height="100" rx="4" fill={color} />
      <rect x="0" y="35" width="100" height="30" rx="4" fill={color} />
    </svg>
  );
}

// Flower/Sun burst with more rays
export function Sunburst({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={cn("w-16 h-16", className)}>
      <circle cx="50" cy="50" r="20" fill={color} />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="50"
          x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

// Pill shape
export function Pill({ className, color = "#f20036", horizontal = true }: { className?: string; color?: string; horizontal?: boolean }) {
  return (
    <svg 
      viewBox={horizontal ? "0 0 80 30" : "0 0 30 80"} 
      fill="none" 
      className={cn(horizontal ? "w-16 h-6" : "w-6 h-16", className)}
    >
      {horizontal ? (
        <rect x="0" y="0" width="80" height="30" rx="15" fill={color} />
      ) : (
        <rect x="0" y="0" width="30" height="80" rx="15" fill={color} />
      )}
    </svg>
  );
}

// Curved arrow/swoosh
export function Swoosh({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 60" fill="none" className={cn("w-20 h-12", className)}>
      <path
        d="M5 55 Q30 10 60 30 T95 15"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Triple dots
export function TripleDots({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 20" fill="none" className={cn("w-16 h-4", className)}>
      <circle cx="10" cy="10" r="8" fill={color} />
      <circle cx="40" cy="10" r="8" fill={color} />
      <circle cx="70" cy="10" r="8" fill={color} />
    </svg>
  );
}

// Curved connector shape (like in the reference)
export function CurvedConnector({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={cn("w-12 h-12", className)}>
      <path
        d="M10 50 Q10 10 50 10"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Quarter circle
export function QuarterCircle({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={cn("w-16 h-16", className)}>
      <path
        d="M0 0 L100 0 A100 100 0 0 1 0 100 Z"
        fill={color}
      />
    </svg>
  );
}

// Speech bubble shape
export function SpeechBubble({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" className={cn("w-24 h-20", className)}>
      <path
        d="M10 10 H110 Q120 10 120 20 V60 Q120 70 110 70 H40 L20 90 V70 H10 Q0 70 0 60 V20 Q0 10 10 10 Z"
        fill={color}
      />
    </svg>
  );
}
