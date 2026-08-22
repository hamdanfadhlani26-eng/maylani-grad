"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioPlayerProps {
  src?: string;
  autoPlay?: boolean;
}

export default function AudioPlayer({ src = "/music.mp3", autoPlay = true }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [songTitle, setSongTitle] = useState("Lagu Wisuda");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.55;

    // Try to get song title from filename
    const parts = src.split("/");
    const name = parts[parts.length - 1].replace(".mp3", "").replace(/-|_/g, " ");
    if (name) setSongTitle(name);

    // Auto-play: browsers require user interaction first. Since SplashScreen requires
    // a tap/click before InvitationPage renders (and this component mounts), 
    // that tap counts as user interaction — so autoPlay should work here.
    if (autoPlay) {
      const tryPlay = async () => {
        try {
          await audio.play();
          setPlaying(true);
        } catch {
          // Silently fail — user can tap play button
          setPlaying(false);
        }
      };
      const t = setTimeout(tryPlay, 400);
      return () => clearTimeout(t);
    }
  }, [src, autoPlay]);

  // Show player after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
            style={{
              background: "rgba(10, 22, 40, 0.85)",
              backdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(37,99,235,0.25)",
              borderRadius: 40,
              padding: "10px 16px 10px 12px",
              boxShadow: "0 8px 32px rgba(37,99,235,0.2), 0 2px 8px rgba(0,0,0,0.4)",
              cursor: "pointer",
            }}
            onClick={togglePlay}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(37,99,235,0.35)" }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Play/Pause button */}
            <motion.div
              className="flex-shrink-0 flex items-center justify-center rounded-full"
              style={{
                width: 34,
                height: 34,
                background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                boxShadow: playing ? "0 0 14px rgba(37,99,235,0.6)" : "none",
              }}
              animate={playing ? { boxShadow: ["0 0 10px rgba(37,99,235,0.4)", "0 0 20px rgba(37,99,235,0.7)", "0 0 10px rgba(37,99,235,0.4)"] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {playing ? (
                // Pause icon
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" rx="1.5" />
                  <rect x="14" y="4" width="4" height="16" rx="1.5" />
                </svg>
              ) : (
                // Play icon
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              )}
            </motion.div>

            {/* Visualizer bars */}
            <div className="flex items-end gap-0.5" style={{ height: 18 }}>
              {[0.6, 1, 0.7, 0.9, 0.5].map((h, i) => (
                <motion.div
                  key={i}
                  style={{
                    width: 3,
                    background: "linear-gradient(to top, #1d4ed8, #60a5fa)",
                    borderRadius: 2,
                    originY: 1,
                  }}
                  animate={
                    playing
                      ? {
                          scaleY: [h, h * 0.3 + 0.1, h * 0.7, h * 0.2 + 0.05, h],
                          height: [18 * h, 6, 14 * h, 4, 18 * h],
                        }
                      : { height: 4, scaleY: 1 }
                  }
                  transition={
                    playing
                      ? {
                          duration: 0.8 + i * 0.12,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.1,
                        }
                      : { duration: 0.3 }
                  }
                />
              ))}
            </div>

            {/* Song title */}
            <span
              className="font-sans capitalize"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "#93c5fd",
                maxWidth: 90,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {songTitle}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
