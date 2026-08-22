"use client";

import { motion } from "framer-motion";

interface FlowerDecorProps {
  size?: number;
  opacity?: number;
  className?: string;
  variant?: "anemone" | "clematis" | "peony" | "daisy";
  spin?: boolean;
  color?: string;
}

export default function FlowerDecor({
  size = 120,
  opacity = 0.12,
  className = "",
  variant = "anemone",
  spin = false,
  color = "#2563eb",
}: FlowerDecorProps) {
  const flowers = {
    anemone: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 5 rounded petals */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.ellipse
            key={i}
            cx="100"
            cy="55"
            rx="22"
            ry="42"
            fill={color}
            style={{
              transformOrigin: "100px 100px",
              rotate: angle,
              opacity: 0.85,
            }}
          />
        ))}
        {/* Center */}
        <circle cx="100" cy="100" r="18" fill="#020917" />
        <circle cx="100" cy="100" r="12" fill={color} opacity="0.6" />
        {/* Stamens */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <circle
            key={i}
            cx={100 + Math.cos((angle * Math.PI) / 180) * 8}
            cy={100 + Math.sin((angle * Math.PI) / 180) * 8}
            r="1.5"
            fill="#bfdbfe"
          />
        ))}
      </svg>
    ),

    clematis: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 6 narrow pointed petals */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.path
            key={i}
            d="M100 100 C90 75, 95 45, 100 30 C105 45, 110 75, 100 100"
            fill={color}
            style={{
              transformOrigin: "100px 100px",
              rotate: angle,
              opacity: 0.9,
            }}
          />
        ))}
        {/* Center stamens — fine lines radiating out */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={100 + Math.cos((angle * Math.PI) / 180) * 14}
            y2={100 + Math.sin((angle * Math.PI) / 180) * 14}
            stroke="#bfdbfe"
            strokeWidth="0.8"
            opacity="0.7"
          />
        ))}
        <circle cx="100" cy="100" r="5" fill="#bfdbfe" opacity="0.5" />
      </svg>
    ),

    peony: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer layer petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="58"
            rx="16"
            ry="34"
            fill={color}
            style={{
              transformOrigin: "100px 100px",
              transform: `rotate(${angle}deg)`,
              opacity: 0.7,
            }}
          />
        ))}
        {/* Inner layer petals — slightly rotated */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="68"
            rx="13"
            ry="26"
            fill={color}
            style={{
              transformOrigin: "100px 100px",
              transform: `rotate(${angle}deg)`,
              opacity: 0.9,
            }}
          />
        ))}
        <circle cx="100" cy="100" r="14" fill="#0a1628" />
        <circle cx="100" cy="100" r="8" fill={color} opacity="0.5" />
      </svg>
    ),

    daisy: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 16 narrow petals */}
        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="58"
            rx="7"
            ry="34"
            fill={color}
            style={{
              transformOrigin: "100px 100px",
              transform: `rotate(${i * 22.5}deg)`,
              opacity: 0.75,
            }}
          />
        ))}
        {/* Dark disc center */}
        <circle cx="100" cy="100" r="20" fill="#020917" />
        <circle cx="100" cy="100" r="16" fill="#0f2040" />
        {/* Tiny dots in disc */}
        {Array.from({ length: 24 }).map((_, i) => (
          <circle
            key={i}
            cx={100 + Math.cos((i * 15 * Math.PI) / 180) * 10}
            cy={100 + Math.sin((i * 15 * Math.PI) / 180) * 10}
            r="1"
            fill={color}
            opacity="0.5"
          />
        ))}
      </svg>
    ),
  };

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, opacity }}
    >
      {spin ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ width: "100%", height: "100%" }}
        >
          {flowers[variant]}
        </motion.div>
      ) : (
        flowers[variant]
      )}
    </div>
  );
}
