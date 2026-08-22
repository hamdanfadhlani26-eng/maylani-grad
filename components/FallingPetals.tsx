"use client";

import { useEffect, useRef, useState } from "react";

interface Petal {
  id: number;
  x: number;
  startY: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  swayAmp: number;
  swayFreq: number;
  speed: number;
  opacity: number;
  type: number; // 0-3 petal shape variant
  color: string;
}

const PETAL_COLORS = [
  "rgba(37,99,235,0.55)",
  "rgba(96,165,250,0.45)",
  "rgba(147,197,253,0.4)",
  "rgba(30,58,95,0.6)",
  "rgba(191,219,254,0.35)",
];

function randomPetal(id: number, canvasWidth: number): Petal {
  return {
    id,
    x: Math.random() * canvasWidth,
    startY: -30 - Math.random() * 120,
    size: 6 + Math.random() * 12,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 3,
    swayAmp: 30 + Math.random() * 60,
    swayFreq: 0.3 + Math.random() * 0.6,
    speed: 0.6 + Math.random() * 1.4,
    opacity: 0.3 + Math.random() * 0.5,
    type: Math.floor(Math.random() * 4),
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal, y: number) {
  ctx.save();
  ctx.globalAlpha = petal.opacity;
  ctx.translate(petal.x, y);
  ctx.rotate((petal.rotation * Math.PI) / 180);
  ctx.fillStyle = petal.color;

  const s = petal.size;
  ctx.beginPath();

  if (petal.type === 0) {
    // teardrop / simple petal
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.6, -s * 0.4, s * 0.6, s * 0.4, 0, s * 0.2);
    ctx.bezierCurveTo(-s * 0.6, s * 0.4, -s * 0.6, -s * 0.4, 0, -s);
  } else if (petal.type === 1) {
    // rounded diamond
    ctx.ellipse(0, 0, s * 0.45, s * 0.9, 0, 0, Math.PI * 2);
  } else if (petal.type === 2) {
    // small 5-point flower
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const ix = Math.cos(angle) * s * 0.4;
      const iy = Math.sin(angle) * s * 0.4;
      const ox = Math.cos(angle) * s;
      const oy = Math.sin(angle) * s;
      if (i === 0) ctx.moveTo(ox, oy);
      else ctx.lineTo(ox, oy);
      ctx.quadraticCurveTo(ix, iy, Math.cos(angle + (Math.PI * 2) / 5) * s, Math.sin(angle + (Math.PI * 2) / 5) * s);
    }
  } else {
    // leaf shape
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.8, -s * 0.3, s * 0.5, s * 0.6, 0, s);
    ctx.bezierCurveTo(-s * 0.5, s * 0.6, -s * 0.8, -s * 0.3, 0, -s);
  }

  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const petalsRef = useRef<Petal[]>([]);
  const timeRef = useRef(0);
  const scrollRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Spawn initial petals
    const PETAL_COUNT = 28;
    petalsRef.current = Array.from({ length: PETAL_COUNT }, (_, i) => {
      const p = randomPetal(i, canvas.width);
      // Stagger initial Y so they don't all start at top
      p.startY = -Math.random() * canvas.height;
      return p;
    });

    function onScroll() {
      scrollRef.current = window.scrollY;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scroll speed boost — faster when scrolling
      const scrollBoost = 1 + scrollRef.current * 0.0006;
      timeRef.current += 0.012;

      petalsRef.current = petalsRef.current.map((petal) => {
        const elapsed = timeRef.current;
        const y =
          petal.startY +
          elapsed * petal.speed * 60 * scrollBoost;
        const xSway =
          petal.x +
          Math.sin(elapsed * petal.swayFreq + petal.id) * petal.swayAmp;

        const rotated = {
          ...petal,
          rotation: petal.rotation + petal.rotationSpeed,
        };

        drawPetal(ctx, { ...rotated, x: xSway }, y);

        // Reset petal when it goes off screen bottom
        if (y > canvas.height + 40) {
          return {
            ...randomPetal(petal.id, canvas.width),
            startY: -30,
          };
        }
        return rotated;
      });

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
