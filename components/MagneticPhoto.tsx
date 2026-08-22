"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface MagneticPhotoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  delay?: number;
  floatVariant?: "up" | "down" | "left";
}

export default function MagneticPhoto({
  src,
  alt,
  width,
  height,
  className = "",
  delay = 0,
  floatVariant = "up",
}: MagneticPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring physics — Apple-style, no overshoot for tilt
  const mouseX = useSpring(0, { stiffness: 120, damping: 20, mass: 0.5 });
  const mouseY = useSpring(0, { stiffness: 120, damping: 20, mass: 0.5 });

  // Slight bounce on float-in for momentum feel
  const scale = useSpring(1, { stiffness: 200, damping: 15, mass: 0.8 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Normalize to -0.5 … 0.5
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseEnter() {
    setIsHovered(true);
    scale.set(1.04);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  }

  // Touch support
  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const touch = e.touches[0];
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((touch.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((touch.clientY - rect.top) / rect.height - 0.5);
  }

  function handleTouchEnd() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const floatAnimations = {
    up: {
      y: [0, -14, 0],
      transition: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay },
    },
    down: {
      y: [0, 14, 0],
      transition: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay },
    },
    left: {
      x: [0, -8, 0],
      y: [0, -8, 0],
      transition: { duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay },
    },
  };

  return (
    <motion.div
      // Entrance animation — slide up with spring bounce
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 14,
        delay: delay * 0.3 + 0.4,
      }}
      className={className}
    >
      {/* Ambient float motion */}
      <motion.div animate={floatAnimations[floatVariant]}>
        {/* 3D tilt container */}
        <motion.div
          ref={ref}
          style={{
            rotateX,
            rotateY,
            scale,
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative cursor-pointer"
        >
          {/* Photo */}
          <div
            className="relative overflow-hidden rounded-2xl photo-glow"
            style={{ width, height }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes={`${width}px`}
            />

            {/* Blue tint overlay */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, transparent 60%)",
                mixBlendMode: "overlay",
              }}
            />

            {/* Moving glare on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: isHovered
                  ? `radial-gradient(circle at ${glareX} ${glareY}, rgba(191,219,254,0.15) 0%, transparent 60%)`
                  : "none",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />

            {/* Bottom gradient fade */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,9,23,0.5) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Depth shadow — floats behind the card in 3D */}
          <div
            className="absolute inset-0 rounded-2xl -z-10"
            style={{
              transform: "translateZ(-20px) scale(0.95)",
              background: "rgba(37,99,235,0.2)",
              filter: "blur(20px)",
              opacity: isHovered ? 0.8 : 0.4,
              transition: "opacity 0.3s ease",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
