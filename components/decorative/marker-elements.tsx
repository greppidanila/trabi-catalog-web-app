"use client";

import { cn } from "@/lib/utils";

// Realistic marker/pencil SVG illustrations
export function MarkerIllustration({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 120 400"
      fill="none"
      className={cn("w-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cap */}
      <rect x="20" y="0" width="80" height="60" rx="8" fill={color} />
      <rect x="25" y="5" width="70" height="50" rx="6" fill={color} opacity="0.8" />
      <ellipse cx="60" cy="30" rx="25" ry="15" fill="white" opacity="0.2" />
      
      {/* Cap ring */}
      <rect x="15" y="55" width="90" height="15" rx="3" fill="#333" />
      
      {/* Body */}
      <rect x="20" y="70" width="80" height="250" rx="4" fill={color} />
      <rect x="30" y="70" width="15" height="250" fill="white" opacity="0.15" />
      
      {/* Grip texture */}
      <rect x="20" y="200" width="80" height="80" rx="2" fill="#333" opacity="0.3" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x="20" y={205 + i * 9} width="80" height="2" fill="white" opacity="0.1" />
      ))}
      
      {/* Tip section */}
      <path
        d="M20 320 L100 320 L80 380 L40 380 Z"
        fill="#333"
      />
      <path
        d="M40 380 L80 380 L65 400 L55 400 Z"
        fill="#666"
      />
      
      {/* Trabi logo area */}
      <rect x="30" y="100" width="60" height="30" rx="4" fill="white" />
      <text x="60" y="122" textAnchor="middle" fill={color} fontSize="14" fontWeight="bold">
        Trabi
      </text>
    </svg>
  );
}

export function PencilIllustration({ className, color = "#f59e0b" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 80 400"
      fill="none"
      className={cn("w-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Eraser */}
      <rect x="15" y="0" width="50" height="30" rx="4" fill="#ec4899" />
      <rect x="20" y="5" width="40" height="20" rx="2" fill="#f472b6" />
      
      {/* Metal band */}
      <rect x="10" y="30" width="60" height="20" fill="#c0c0c0" />
      <rect x="10" y="35" width="60" height="3" fill="#888" />
      <rect x="10" y="42" width="60" height="3" fill="#888" />
      
      {/* Body */}
      <path
        d="M10 50 L15 50 L15 340 L10 340 Z"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M15 50 L25 50 L25 340 L15 340 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M25 50 L40 50 L40 340 L25 340 Z"
        fill={color}
      />
      <path
        d="M40 50 L55 50 L55 340 L40 340 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M55 50 L65 50 L65 340 L55 340 Z"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M65 50 L70 50 L70 340 L65 340 Z"
        fill={color}
        opacity="0.5"
      />
      
      {/* Wood tip */}
      <path
        d="M10 340 L70 340 L60 370 L20 370 Z"
        fill="#deb887"
      />
      <path
        d="M15 340 L30 340 L25 370 L20 370 Z"
        fill="#d2b48c"
      />
      
      {/* Graphite tip */}
      <path
        d="M20 370 L60 370 L40 400 Z"
        fill="#333"
      />
    </svg>
  );
}

export function BrushMarkerIllustration({ className, color = "#8b5cf6" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 100 420"
      fill="none"
      className={cn("w-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cap */}
      <rect x="15" y="0" width="70" height="80" rx="6" fill={color} />
      <rect x="20" y="5" width="60" height="70" rx="4" fill={color} opacity="0.8" />
      <ellipse cx="50" cy="40" rx="20" ry="20" fill="white" opacity="0.15" />
      
      {/* Cap bottom ring */}
      <rect x="10" y="75" width="80" height="12" rx="2" fill="#222" />
      
      {/* Body top section */}
      <rect x="15" y="87" width="70" height="120" rx="2" fill="#f5f5f5" />
      <rect x="20" y="92" width="15" height="110" fill="white" />
      
      {/* Label */}
      <rect x="20" y="100" width="60" height="50" rx="3" fill={color} opacity="0.2" />
      <text x="50" y="128" textAnchor="middle" fill={color} fontSize="12" fontWeight="bold">
        Art Brush
      </text>
      <text x="50" y="142" textAnchor="middle" fill={color} fontSize="8">
        Trabi
      </text>
      
      {/* Body middle - transparent section */}
      <rect x="15" y="207" width="70" height="140" rx="2" fill="#f0f0f0" opacity="0.6" />
      <rect x="20" y="212" width="60" height="130" rx="2" fill={color} opacity="0.3" />
      
      {/* Grip ring */}
      <rect x="10" y="347" width="80" height="15" rx="2" fill="#333" />
      
      {/* Brush tip holder */}
      <rect x="20" y="362" width="60" height="25" fill="#666" />
      
      {/* Brush tip */}
      <path
        d="M30 387 L70 387 Q55 420 50 420 Q45 420 30 387 Z"
        fill={color}
      />
      <path
        d="M40 387 L45 387 Q48 410 50 415 Q47 412 40 387 Z"
        fill="white"
        opacity="0.3"
      />
    </svg>
  );
}

export function CrayonIllustration({ className, color = "#22c55e" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 60 200"
      fill="none"
      className={cn("w-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <rect x="5" y="0" width="50" height="150" rx="3" fill={color} />
      <rect x="10" y="5" width="10" height="140" fill="white" opacity="0.2" />
      
      {/* Paper wrapper */}
      <rect x="3" y="40" width="54" height="80" fill="white" />
      <rect x="3" y="40" width="54" height="80" fill={color} opacity="0.1" />
      
      {/* Label text */}
      <text x="30" y="75" textAnchor="middle" fill={color} fontSize="8" fontWeight="bold" transform="rotate(-90, 30, 80)">
        TRABI
      </text>
      
      {/* Tip */}
      <path
        d="M5 150 L55 150 L40 200 L20 200 Z"
        fill={color}
      />
      <path
        d="M10 150 L20 150 L22 195 L20 200 Z"
        fill="white"
        opacity="0.2"
      />
    </svg>
  );
}

// Decorative strokes that look like marker/pencil lines
export function DecorativeStroke({ className, color = "#f20036" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      fill="none"
      className={cn("w-full h-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10 Q50 5, 100 10 T200 10"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

export function ScribbleDecoration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={cn("w-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 50 Q30 20, 50 50 T90 50"
        stroke="#f20036"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15 60 Q35 30, 55 60 T95 60"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M5 70 Q25 40, 45 70 T85 70"
        stroke="#22c55e"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
