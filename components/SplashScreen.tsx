"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  guestName: string;
  onOpen: () => void;
}

export default function SplashScreen({ guestName, onOpen }: SplashScreenProps) {
  const [phase, setPhase] = useState<"idle" | "opening" | "rising" | "exit">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleClick() {
    if (phase !== "idle") return;
    setPhase("opening");
    await delay(600);
    setPhase("rising");
    await delay(900);
    setPhase("exit");
    await delay(700);
    onOpen();
  }

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ background: "#020917" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.14) 0%, transparent 70%)",
            }}
          />

          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: i % 3 === 0 ? 3 : 2,
                height: i % 3 === 0 ? 3 : 2,
                background: i % 4 === 0 ? "#60a5fa" : "#1e3a5f",
                left: `${8 + (i * 47) % 84}%`,
                top: `${5 + (i * 37) % 90}%`,
                opacity: 0.4 + (i % 3) * 0.15,
              }}
              animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.3, 1] }}
              transition={{
                duration: 2.5 + (i % 5) * 0.7,
                repeat: Infinity,
                delay: (i * 0.23) % 2,
                ease: "easeInOut",
              }}
            />
          ))}

          <div
            className="relative select-none"
            style={{ width: "min(380px, 90vw)", perspective: "1200px" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              onClick={handleClick}
              className="relative cursor-pointer"
              style={{ width: "100%" }}
            >
              <svg
                viewBox="0 0 380 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(0 20px 60px rgba(37,99,235,0.3))",
                }}
              >
                <rect x="4" y="4" width="372" height="252" rx="12" fill="#0c1e3a" stroke="rgba(37,99,235,0.35)" strokeWidth="1.5" />
                <path d="M4 256 L190 148 L376 256 Z" fill="#0a1a32" />
                <path d="M4 4 L190 148 L4 256" fill="#0b1c38" stroke="rgba(37,99,235,0.2)" strokeWidth="0.8" />
                <path d="M376 4 L190 148 L376 256" fill="#0a1a32" stroke="rgba(37,99,235,0.2)" strokeWidth="0.8" />

                {/* Outer ring */}
                <circle cx="190" cy="175" r="30" fill="#0a1628" stroke="rgba(37,99,235,0.45)" strokeWidth="1.5" />
                <circle cx="190" cy="175" r="26" stroke="rgba(96,165,250,0.2)" strokeWidth="0.8" strokeDasharray="4 3" fill="none" />

                {/* 8 petals */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const px = 190 + Math.cos(rad) * 18;
                  const py = 175 + Math.sin(rad) * 18;
                  return (
                    <ellipse
                      key={i}
                      cx={px}
                      cy={py}
                      rx="5"
                      ry="8"
                      fill="#1e3a5f"
                      stroke="rgba(37,99,235,0.5)"
                      strokeWidth="0.8"
                      transform={`rotate(${angle}, ${px}, ${py})`}
                    />
                  );
                })}

                {/* Inner circle behind M */}
                <circle cx="190" cy="175" r="13" fill="#1e3a5f" />

                {/* Accent dots between petals */}
                {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const px = 190 + Math.cos(rad) * 27;
                  const py = 175 + Math.sin(rad) * 27;
                  return <circle key={i} cx={px} cy={py} r="1.5" fill="rgba(147,197,253,0.4)" />;
                })}

                {/* Letter M */}
                <text x="190" y="181" textAnchor="middle" fill="#93c5fd" fontSize="16" fontFamily="serif" fontStyle="italic" fontWeight="600">
                  M
                </text>
              </svg>

              {/* Flap */}
              <motion.div
                className="absolute top-0 left-0 w-full pointer-events-none"
                style={{ transformOrigin: "top center", transformStyle: "preserve-3d", zIndex: 20 }}
                animate={
                  phase === "opening" || phase === "rising"
                    ? { rotateX: -175, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } }
                    : { rotateX: 0 }
                }
              >
                <svg viewBox="0 0 380 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
                  <path d="M4 4 L376 4 L190 138 Z" fill="#0e2240" stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M60 10 L190 120 L320 10" stroke="rgba(147,197,253,0.08)" strokeWidth="1" />
                </svg>
              </motion.div>

              {/* Letter rising */}
              <motion.div
                className="absolute left-0 right-0 pointer-events-none"
                style={{ bottom: "14%", zIndex: phase === "rising" ? 25 : 5, paddingLeft: "8%", paddingRight: "8%" }}
                initial={{ y: 20, opacity: 0 }}
                animate={
                  phase === "rising"
                    ? { y: -145, opacity: 1, transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] } }
                    : phase === "opening"
                      ? { y: 0, opacity: 0.7, transition: { duration: 0.3 } }
                      : { y: 20, opacity: 0 }
                }
              >
                <div
                  style={{
                    background: "linear-gradient(160deg, #0f2346 0%, #0c1e3a 100%)",
                    border: "1px solid rgba(37,99,235,0.3)",
                    borderRadius: 10,
                    padding: "20px 22px 18px",
                    boxShadow: "0 8px 40px rgba(37,99,235,0.25)",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-playfair), serif", color: "#93c5fd", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8, opacity: 0.75 }}>
                    Kepada Yth.
                  </p>
                  <p style={{ fontFamily: "var(--font-playfair), serif", color: "#ffffff", fontSize: "clamp(1.1rem, 4vw, 1.4rem)", fontWeight: 600, lineHeight: 1.25, marginBottom: 10 }}>
                    {guestName}
                  </p>
                  <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)", marginBottom: 10 }} />
                  <p style={{ fontFamily: "var(--font-geist-sans, sans-serif)", color: "#64a0e0", fontSize: 10, lineHeight: 1.6 }}>
                    Dengan penuh syukur, kami mengundang<br />Anda hadir dalam wisuda Maylani.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ border: "1px solid rgba(37,99,235,0.0)" }}
                whileHover={{ borderColor: "rgba(37,99,235,0.5)", boxShadow: "0 0 50px rgba(37,99,235,0.2)", transition: { duration: 0.3 } }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="text-center mt-8"
            >
              <p className="font-serif shimmer-text" style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                Undangan Wisuda
              </p>
              <p className="font-sans mt-2" style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#4e7aaa" }}>
                Maylani Syafvitri, S.T.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col items-center mt-10 gap-2"
            >
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </motion.div>
              <p className="font-sans" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2d567a" }}>
                Ketuk amplop untuk membuka
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}