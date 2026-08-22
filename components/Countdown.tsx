"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Target: Sabtu, 26 Desember 2026 pukul 13.30 WIB (UTC+7)
const GRADUATION_DATE = new Date("2026-12-26T13:30:00+07:00");

function getTimeLeft() {
  const now = new Date();
  const diff = GRADUATION_DATE.getTime() - now.getTime();

  if (diff <= 0) return null; // already passed

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface FlipDigitProps {
  value: string;
  label: string;
}

function FlipDigit({ value, label }: FlipDigitProps) {
  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="font-serif"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            lineHeight: 1,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            textShadow: "0 0 30px rgba(37,99,235,0.8)",
          }}
        >
          {value}
        </motion.div>
      </AnimatePresence>
      <span
        className="font-sans uppercase"
        style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#4e7aaa", marginTop: 6 }}
      >
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      className="font-serif"
      style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: "#2563eb", lineHeight: 1, marginBottom: 16, paddingBottom: 0 }}
    >
      :
    </motion.span>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <p className="font-serif shimmer-text" style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>
          🎉 Selamat Wisuda!
        </p>
        <p className="font-sans mt-2" style={{ fontSize: "0.75rem", color: "#4e7aaa", letterSpacing: "0.15em" }}>
          Maylani Syafvitri, S.T.
        </p>
      </motion.div>
    );
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="flex flex-col items-center">
      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-sans uppercase mb-6"
        style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "#4e7aaa" }}
      >
        Hitung Mundur Menuju Wisuda
      </motion.p>

      {/* Counter row */}
      <div
        className="flex items-center gap-3 md:gap-5 px-8 py-6 rounded-2xl"
        style={{
          background: "rgba(10, 22, 40, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(37,99,235,0.2)",
          boxShadow: "0 0 40px rgba(37,99,235,0.12), inset 0 0 30px rgba(37,99,235,0.04)",
        }}
      >
        {days > 0 && (
          <>
            <FlipDigit value={String(days)} label="Hari" />
            <Separator />
          </>
        )}
        <FlipDigit value={pad(hours)} label="Jam" />
        <Separator />
        <FlipDigit value={pad(minutes)} label="Menit" />
        <Separator />
        <FlipDigit value={pad(seconds)} label="Detik" />
      </div>

      {/* Date reminder */}
      <p
        className="font-sans mt-4"
        style={{ fontSize: "0.65rem", color: "#2d567a", letterSpacing: "0.12em" }}
      >
        Sabtu, 26 Desember 2026 · 13.30 WIB
      </p>
    </div>
  );
}
