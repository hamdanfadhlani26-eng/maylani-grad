"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, type Message } from "@/lib/supabase";
import FlowerDecor from "@/components/FlowerDecor";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "maylani2026";

export default function AdminPage() {
  const [input, setInput] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("graduation_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMessages(data as Message[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchMessages();
  }, [authed, fetchMessages]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 2500);
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <main
      className="min-h-screen px-6 py-16"
      style={{ background: "#020917" }}
    >
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)",
        }}
      />

      {/* BG flower */}
      <div className="fixed bottom-0 right-0 pointer-events-none opacity-5">
        <FlowerDecor variant="peony" size={350} opacity={1} spin />
      </div>

      <AnimatePresence mode="wait">
        {!authed ? (
          /* ── LOGIN ── */
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 max-w-sm mx-auto mt-20"
          >
            <FlowerDecor
              variant="anemone"
              size={60}
              opacity={0.5}
              className="mx-auto mb-6"
            />
            <h1
              className="font-serif text-center text-navy-100 mb-2"
              style={{ fontSize: "1.8rem", letterSpacing: "-0.02em" }}
            >
              Area Admin
            </h1>
            <p className="font-sans text-center text-navy-500 text-xs mb-10 tracking-wide">
              Hanya untuk Maylani Syafvitri
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full bg-navy-900/60 border border-navy-700/60 rounded-xl px-4 py-3.5 text-navy-100 placeholder-navy-600 text-sm font-sans focus:outline-none focus:border-navy-400 transition-colors duration-200"
                  style={{
                    borderColor: error ? "rgba(239,68,68,0.5)" : undefined,
                  }}
                  autoFocus
                />
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs mt-2 text-center font-sans"
                    >
                      Kata sandi salah.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-xl font-sans text-sm font-medium text-navy-50"
                style={{
                  background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                  boxShadow: "0 0 20px rgba(37,99,235,0.25)",
                }}
              >
                Masuk
              </motion.button>
            </form>
          </motion.div>
        ) : (
          /* ── MESSAGES ── */
          <motion.div
            key="messages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-navy-500 mb-1">
                  Admin Panel
                </p>
                <h1
                  className="font-serif text-navy-100"
                  style={{ fontSize: "1.8rem", letterSpacing: "-0.02em" }}
                >
                  Doa & Pesan
                </h1>
              </div>
              <div className="text-right">
                <p className="font-sans text-xs text-navy-500">Total</p>
                <p
                  className="font-serif text-navy-200"
                  style={{ fontSize: "2rem", letterSpacing: "-0.02em" }}
                >
                  {messages.length}
                </p>
              </div>
            </div>

            <div className="navy-divider mb-10" />

            {/* Messages list */}
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 border-navy-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-20">
                <FlowerDecor
                  variant="clematis"
                  size={60}
                  opacity={0.3}
                  className="mx-auto mb-4"
                />
                <p className="font-sans text-navy-600 text-sm">
                  Belum ada pesan masuk.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.5,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="glass-card rounded-2xl p-5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar initial */}
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-sans font-medium text-sm text-navy-100"
                          style={{
                            background:
                              "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                          }}
                        >
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-sans font-medium text-navy-100 text-sm">
                            {msg.name}
                          </p>
                          <p className="font-sans text-navy-600 text-xs">
                            {formatDate(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="font-sans text-navy-300 text-sm leading-relaxed pl-12">
                      {msg.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Refresh */}
            <div className="mt-8 text-center">
              <button
                onClick={fetchMessages}
                className="font-sans text-xs text-navy-500 hover:text-navy-300 transition-colors tracking-wide"
              >
                Refresh pesan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
