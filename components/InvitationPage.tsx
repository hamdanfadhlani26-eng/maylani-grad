"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FlowerDecor from "./FlowerDecor";
import MagneticPhoto from "./MagneticPhoto";
import MessageForm from "./MessageForm";
import RevealOnScroll from "./RevealOnScroll";
import Countdown from "./Countdown";
import AudioPlayer from "./AudioPlayer";
import FallingPetals from "./FallingPetals";

export default function InvitationPage() {
  const details = [
    {
      label: "Wisudawan",
      value: "Maylani Syafvitri, S.T.",
      sub: "Teknik Industri — Universitas Andalas",
    },
    {
      label: "Periode",
      value: "Periode VI",
      sub: "Tahun 2026",
    },
    {
      label: "Hari & Tanggal",
      value: "Sabtu, 26 Desember 2026",
      sub: null,
    },
    {
      label: "Waktu",
      value: "13.30 WIB",
      sub: "Harap hadir 30 menit lebih awal",
    },
    {
      label: "Tempat",
      value: "Gedung Departemen Teknik Industri",
      sub: "Universitas Andalas, Padang",
    },
  ];

  return (
    <>
      {/* Falling petals — fixed canvas layer above bg, below content */}
      <FallingPetals />

      {/* Floating audio player */}
      <AudioPlayer src="/music.mp3" autoPlay={true} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="min-h-screen relative overflow-hidden"
        style={{ background: "#020917" }}
      >
        {/* ─── HERO SECTION — full-width background photo layout ─── */}
        <section
          className="relative z-10 min-h-screen flex flex-col justify-center overflow-hidden"
        >
          {/* ── Full-bleed background photo (photo-1.jpg) ── */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/photos/photo-1.png"
              alt="Background wisuda Maylani"
              fill
              priority
              quality={85}
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            {/* Dark navy overlay — gives the semi-transparent photo effect */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(2,9,23,0.82) 0%, rgba(10,22,40,0.72) 40%, rgba(2,9,23,0.55) 70%, rgba(2,9,23,0.4) 100%)",
              }}
            />
            {/* Bottom fade into page */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48"
              style={{
                background:
                  "linear-gradient(to top, #020917 0%, transparent 100%)",
              }}
            />
          </div>

          {/* ── Corner floral accents ── */}
          <div className="absolute top-0 left-0 z-10 pointer-events-none opacity-30">
            <FlowerDecor variant="clematis" size={160} opacity={1} spin />
          </div>
          <div className="absolute top-0 right-0 z-10 pointer-events-none opacity-20">
            <FlowerDecor variant="anemone" size={120} opacity={1} spin />
          </div>
          <div className="absolute bottom-0 left-1/3 z-10 pointer-events-none opacity-15">
            <FlowerDecor variant="daisy" size={100} opacity={1} spin />
          </div>

          {/* ── Main hero content: two columns ── */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 flex flex-col md:flex-row items-center justify-between gap-12 min-h-screen">

            {/* ═══ LEFT: Text content ═══ */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="mb-8"
              >
                <span
                  className="font-sans text-xs uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border inline-block"
                  style={{
                    borderColor: "rgba(37,99,235,0.4)",
                    color: "#93c5fd",
                    background: "rgba(37,99,235,0.08)",
                  }}
                >
                  Wisuda Periode VI · 2026
                </span>
              </motion.div>

              {/* "Graduation of" — script style */}
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)",
                  color: "#93c5fd",
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                  marginBottom: "0.2em",
                  opacity: 0.85,
                }}
              >
                Graduation of
              </motion.p>

              {/* Name + title — large serif, same line */}
              <motion.h1
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                className="shimmer-text"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  fontStyle: "italic",
                  marginBottom: "0.5em",
                }}
              >
                Maylani Syafvitri,{" "}
                <span style={{ fontSize: "0.72em" }}>S.T.</span>
              </motion.h1>

              {/* Divider line */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  height: 1,
                  width: "min(220px, 60%)",
                  background:
                    "linear-gradient(90deg, #2563eb 0%, rgba(37,99,235,0.2) 100%)",
                  marginBottom: "1.2em",
                }}
              />

              {/* Department info */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              >
                <p
                  className="font-sans"
                  style={{ color: "#7bafd4", fontSize: "0.9rem", letterSpacing: "0.04em", marginBottom: "0.3em" }}
                >
                  Teknik Industri — S1
                </p>
                <p
                  className="font-sans"
                  style={{ color: "#4e7aaa", fontSize: "0.85rem", letterSpacing: "0.04em" }}
                >
                  Universitas Andalas
                </p>
              </motion.div>

              {/* Scroll hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="mt-14 flex items-center gap-3"
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
                <span
                  className="font-sans"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#2d567a" }}
                >
                  Scroll untuk melihat undangan
                </span>
              </motion.div>
            </div>

            {/* ═══ RIGHT: Oval framed portrait photo ═══ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
              className="relative flex-shrink-0 flex items-center justify-center"
              style={{ width: "min(340px, 85vw)" }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute"
                style={{
                  inset: -20,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse at center, rgba(37,99,235,0.2) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
                animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Corner flower decorations */}
              <div className="absolute -top-8 -right-6 pointer-events-none z-20">
                <FlowerDecor variant="peony" size={90} opacity={0.7} spin />
              </div>
              <div className="absolute -bottom-6 -left-8 pointer-events-none z-20">
                <FlowerDecor variant="clematis" size={75} opacity={0.5} spin />
              </div>
              <div className="absolute top-1/3 -left-10 pointer-events-none z-20">
                <FlowerDecor variant="daisy" size={55} opacity={0.4} />
              </div>

              {/* ── Ornamental oval SVG frame ── */}
              <div className="relative" style={{ width: "100%", aspectRatio: "3/4" }}>
                {/* Photo inside oval clip */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    borderRadius: "50% / 44%",
                    border: "2px solid rgba(37,99,235,0.5)",
                    boxShadow:
                      "0 0 0 6px rgba(10,22,40,0.8), 0 0 0 8px rgba(37,99,235,0.25), 0 20px 60px rgba(37,99,235,0.3)",
                  }}
                >
                  <Image
                    src="/photos/photo-2.jpeg"
                    alt="Foto portrait Maylani Syafvitri"
                    fill
                    quality={90}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                  {/* Subtle inner vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 50%, rgba(2,9,23,0.5) 100%)",
                    }}
                  />
                </div>

                {/* Decorative SVG frame overlay */}
                <svg
                  viewBox="0 0 300 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 2 }}
                >
                  {/* Main oval border */}
                  <ellipse
                    cx="150"
                    cy="200"
                    rx="140"
                    ry="188"
                    stroke="rgba(37,99,235,0.5)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {/* Inner decorative oval */}
                  <ellipse
                    cx="150"
                    cy="200"
                    rx="134"
                    ry="182"
                    stroke="rgba(96,165,250,0.2)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="6 4"
                  />
                  {/* Top ornament */}
                  <path
                    d="M130 14 Q150 4 170 14 Q160 22 150 18 Q140 22 130 14Z"
                    fill="rgba(37,99,235,0.5)"
                  />
                  {/* Bottom ornament */}
                  <path
                    d="M130 386 Q150 396 170 386 Q160 378 150 382 Q140 378 130 386Z"
                    fill="rgba(37,99,235,0.4)"
                  />
                  {/* Side ornaments */}
                  <circle cx="10" cy="200" r="4" fill="rgba(37,99,235,0.35)" />
                  <circle cx="290" cy="200" r="4" fill="rgba(37,99,235,0.35)" />
                  <circle cx="10" cy="200" r="7" stroke="rgba(37,99,235,0.2)" strokeWidth="1" fill="none" />
                  <circle cx="290" cy="200" r="7" stroke="rgba(37,99,235,0.2)" strokeWidth="1" fill="none" />
                  {/* Corner decorative lines */}
                  <path d="M50 50 Q80 30 110 18" stroke="rgba(37,99,235,0.25)" strokeWidth="1" fill="none" strokeLinecap="round" />
                  <path d="M250 50 Q220 30 190 18" stroke="rgba(37,99,235,0.25)" strokeWidth="1" fill="none" strokeLinecap="round" />
                  <path d="M50 350 Q80 370 110 382" stroke="rgba(37,99,235,0.25)" strokeWidth="1" fill="none" strokeLinecap="round" />
                  <path d="M250 350 Q220 370 190 382" stroke="rgba(37,99,235,0.25)" strokeWidth="1" fill="none" strokeLinecap="round" />
                </svg>

                {/* Floating name tag below frame */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-10"
                >
                  <div
                    className="px-5 py-2 rounded-full font-sans text-center"
                    style={{
                      background: "rgba(10,22,40,0.85)",
                      border: "1px solid rgba(37,99,235,0.35)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 4px 20px rgba(37,99,235,0.2)",
                    }}
                  >
                    <span style={{ fontSize: "0.68rem", color: "#93c5fd", letterSpacing: "0.12em" }}>
                      Maylani Syafvitri, S.T.
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── BACKGROUND AMBIENCE for rest of page ─── */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(37,99,235,0.06) 0%, transparent 60%)",
          }}
        />

        {/* ─── DIVIDER ─── */}
        <div className="navy-divider w-full relative z-10" />

        {/* ─── COUNTDOWN SECTION ─── */}
        <section className="relative z-10 py-20 px-6 flex items-center justify-center">
          <RevealOnScroll>
            <Countdown />
          </RevealOnScroll>
        </section>

        {/* ─── DIVIDER ─── */}
        <div className="navy-divider w-full relative z-10" />

        {/* ─── PHOTO GALLERY (3 magnetic photos) ─── */}
        <section className="relative z-10 py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-center mb-12"
                style={{ color: "#4e7aaa" }}>
                Momen Spesial
              </p>
            </RevealOnScroll>

            <div className="relative">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.13) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <div className="relative flex items-end justify-center gap-4 md:gap-8">
                <MagneticPhoto
                  src="/photos/photo-1.png"
                  alt="Foto wisuda Maylani 1"
                  width={160}
                  height={220}
                  className="self-end"
                  delay={0}
                  floatVariant="down"
                />
                <MagneticPhoto
                  src="/photos/photo-2.jpeg"
                  alt="Foto wisuda Maylani 2"
                  width={200}
                  height={280}
                  className="-mt-8"
                  delay={0.15}
                  floatVariant="up"
                />
                <MagneticPhoto
                  src="/photos/photo-3.jpeg"
                  alt="Foto wisuda Maylani 3"
                  width={160}
                  height={220}
                  className="self-end"
                  delay={0.3}
                  floatVariant="left"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div className="navy-divider w-full relative z-10" />

        {/* ─── DETAILS SECTION ─── */}
        <section className="relative z-10 py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-navy-400 text-center mb-3">
                Informasi Acara
              </p>
              <h2
                className="font-serif text-center text-navy-100 mb-16"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.02em" }}
              >
                Detail Wisuda
              </h2>
            </RevealOnScroll>

            <div className="space-y-0">
              {details.map((item, index) => (
                <RevealOnScroll key={item.label} delay={index * 0.08}>
                  <div
                    className="flex items-start justify-between py-5"
                    style={{ borderBottom: "1px solid rgba(37,99,235,0.12)" }}
                  >
                    <span
                      className="font-serif italic flex-shrink-0 pt-0.5"
                      style={{
                        width: "120px",
                        fontSize: "1.15rem",
                        color: "#93c5fd",
                        textShadow: "0 2px 15px rgba(147,197,253,0.4)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.label}
                    </span>
                    <div className="text-right flex-1">
                      <p className="font-sans text-navy-100 text-sm font-medium leading-snug">
                        {item.value}
                      </p>
                      {item.sub && (
                        <p className="font-sans text-navy-500 text-xs mt-0.5">{item.sub}</p>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div className="navy-divider w-full relative z-10" />

        {/* ─── GOOGLE MAPS SECTION ─── */}
        <section className="relative z-10 py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-navy-400 text-center mb-3">
                Lokasi Acara
              </p>
              <h2
                className="font-serif text-center text-navy-100 mb-10"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.02em" }}
              >
                Lokasi Wisuda
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(37,99,235,0.25)",
                  boxShadow: "0 0 50px rgba(37,99,235,0.12)",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2937488120583!2d100.35700817500244!3d-0.9170023912378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b9d9f78c0001%3A0xf7c6ae9e8bf90da2!2sDepartemen%20Teknik%20Industri%20Universitas%20Andalas!5e0!3m2!1sid!2sid!4v1690000000000!5m2!1sid!2sid"
                  width="100%"
                  height="300"
                  style={{ border: 0, display: "block", filter: "invert(92%) hue-rotate(180deg) saturate(0.4) brightness(0.85)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Teknik Industri Universitas Andalas"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(2,9,23,0.8) 0%, transparent 100%)" }}
                />
              </div>

              <div className="flex justify-center mt-5">
                <motion.a
                  href="https://maps.app.goo.gl/QsDpSHFZmpyN8MXa8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-sm px-6 py-3 rounded-full"
                  style={{
                    background: "rgba(37,99,235,0.1)",
                    border: "1px solid rgba(37,99,235,0.3)",
                    color: "#93c5fd",
                    letterSpacing: "0.05em",
                  }}
                  whileHover={{ background: "rgba(37,99,235,0.2)", scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Buka di Google Maps
                </motion.a>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div className="navy-divider w-full relative z-10" />

        {/* ─── QUOTE SECTION ─── */}
        <section className="relative z-10 py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <FlowerDecor variant="peony" size={500} opacity={1} spin />
          </div>
          <div className="max-w-xl mx-auto text-center">
            <RevealOnScroll>
              <div className="font-serif text-navy-600 mb-6" style={{ fontSize: "4rem", lineHeight: 1, fontStyle: "italic" }}>
                &ldquo;
              </div>
              <p
                className="font-serif text-navy-200 leading-relaxed mb-6"
                style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", letterSpacing: "-0.01em", fontStyle: "italic" }}
              >
                Pendidikan adalah senjata paling kuat yang bisa kamu gunakan untuk mengubah dunia.
              </p>
              <p className="font-sans text-xs uppercase tracking-widest text-navy-500">— Nelson Mandela</p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div className="navy-divider w-full relative z-10" />

        {/* ─── MESSAGE SECTION ─── */}
        <section className="relative z-10 py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-navy-400 text-center mb-3">
                Sampaikan Ucapan
              </p>
              <h2
                className="font-serif text-center text-navy-100 mb-4"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.02em" }}
              >
                Doa &amp; Pesan
              </h2>
              <p className="font-sans text-center text-navy-400 text-sm mb-12 max-w-md mx-auto leading-relaxed">
                Setiap doa dan ucapan yang Anda kirimkan akan berarti sangat besar bagi Maylani dalam memulai perjalanan barunya.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <MessageForm />
            </RevealOnScroll>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <div className="navy-divider w-full relative z-10" />
        <footer className="relative z-10 py-16 px-6 text-center">
          <FlowerDecor variant="clematis" size={40} opacity={0.4} className="mx-auto mb-6" />
          <p className="font-sans text-xs text-navy-600 tracking-wide">Dibuat dengan penuh kasih untuk</p>
          <p className="font-serif text-navy-400 mt-1" style={{ fontSize: "1rem" }}>
            Maylani Syafvitri, S.T.
          </p>

          {/* Instagram link */}
          <div className="flex items-center justify-center mt-6 mb-2">
            <motion.a
              href="https://www.instagram.com/maylani.sy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: 34,
                  height: 34,
                  background: "linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)",
                  padding: 7,
                  boxShadow: "0 0 18px rgba(238,42,123,0.35)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </span>
              <span className="font-sans" style={{ fontSize: "0.85rem", color: "#93c5fd", letterSpacing: "0.04em" }}>
                @maylani.sy
              </span>
            </motion.a>
          </div>

          <p className="font-sans text-xs text-navy-700 mt-6">
            Teknik Industri · Universitas Andalas · Periode VI 2026
          </p>
        </footer>
      </motion.main>
    </>
  );
}
