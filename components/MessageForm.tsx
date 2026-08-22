"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function MessageForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setStatus("loading");

    const { error } = await supabase.from("graduation_messages").insert([
      { name: name.trim(), message: message.trim() },
    ]);

    if (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("success");
      setName("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            {/* Custom checkmark — no emoji */}
            <div className="mx-auto mb-4 w-14 h-14 rounded-full border-2 border-navy-300 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-serif text-xl text-navy-100 mb-2">
              Doa & Pesan Tersampaikan
            </p>
            <p className="text-navy-300 text-sm">
              Terima kasih telah memberikan doa terbaik.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-6 space-y-4"
          >
            <div>
              <label className="block text-xs uppercase tracking-widest text-navy-300 mb-2 font-sans">
                Nama Anda
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tulis nama Anda..."
                maxLength={60}
                required
                className="w-full bg-navy-900/60 border border-navy-700/60 rounded-xl px-4 py-3 text-navy-100 placeholder-navy-600 text-sm font-sans focus:outline-none focus:border-navy-400 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-navy-300 mb-2 font-sans">
                Doa & Pesan
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan doa dan ucapan terbaik Anda..."
                maxLength={500}
                required
                rows={4}
                className="w-full bg-navy-900/60 border border-navy-700/60 rounded-xl px-4 py-3 text-navy-100 placeholder-navy-600 text-sm font-sans focus:outline-none focus:border-navy-400 transition-colors duration-200 resize-none"
              />
              <div className="text-right text-xs text-navy-600 mt-1 font-sans">
                {message.length}/500
              </div>
            </div>

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center font-sans"
              >
                Terjadi kesalahan. Coba lagi.
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={status === "loading" || !name.trim() || !message.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-full py-3.5 rounded-xl font-sans text-sm font-medium tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                color: "#eff6ff",
                boxShadow: "0 0 20px rgba(37,99,235,0.3)",
              }}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Mengirim...
                </span>
              ) : (
                "Kirim Doa & Pesan"
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
