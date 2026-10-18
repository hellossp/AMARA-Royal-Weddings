"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayAngle: number;
}

export default function PetalShower() {
  const [isActive, setIsActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const petalsRef = useRef<Petal[]>([]);

  // Marigold golden hues & Crimson Rose hues
  const petalColors = [
    "#F59E0B", // Bright marigold gold
    "#D97706", // Deep marigold amber
    "#EF4444", // Fresh red rose
    "#B91C1C", // Deep crimson rose
    "#FBBF24", // Yellow marigold
    "#E11D48", // Rani gulab pink
  ];

  const createPetal = (canvasWidth: number, canvasHeight: number, startFromTop = true): Petal => {
    return {
      x: Math.random() * canvasWidth,
      y: startFromTop ? -20 - Math.random() * 50 : Math.random() * canvasHeight,
      size: 10 + Math.random() * 14,
      speedX: -1 + Math.random() * 2,
      speedY: 1.5 + Math.random() * 2.5,
      rotation: Math.random() * 360,
      rotationSpeed: -2 + Math.random() * 4,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: 0.7 + Math.random() * 0.3,
      swayAmplitude: 20 + Math.random() * 30,
      swaySpeed: 0.02 + Math.random() * 0.03,
      swayAngle: Math.random() * Math.PI * 2,
    };
  };

  const triggerShower = () => {
    setIsActive(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Populate initial petals
    petalsRef.current = Array.from({ length: 45 }, () => createPetal(width, height, false));

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      // Realistic curved rose / marigold petal shape
      ctx.beginPath();
      ctx.moveTo(0, -p.size / 2);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size / 1.5, p.size / 3, 0, p.size / 1.5);
      ctx.bezierCurveTo(-p.size / 1.5, p.size / 3, -p.size / 2, -p.size / 2, 0, -p.size / 2);
      ctx.fill();

      // Subtle gold vein accent
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -p.size / 3);
      ctx.lineTo(0, p.size / 2);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      petalsRef.current.forEach((p) => {
        p.swayAngle += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayAngle) * 1.2;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 30) {
          // Recycle petal to top
          Object.assign(p, createPetal(width, height, true));
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        drawPetal(p);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isActive]);

  return (
    <>
      {/* Canvas for Petals (Zero interaction interference) */}
      {isActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50 w-full h-full"
        />
      )}

      {/* Auspicious Toast on Shower Trigger */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border border-[#B68A35] text-[#1C1917] px-6 py-3 rounded-xs royal-shadow animate-in fade-in slide-in-from-top duration-500 flex items-center space-x-3">
          <span className="text-xl">🌸</span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#8C2222] font-semibold">
              ॥ फूलों की वर्षा • Phoolon Ki Barsaat ॥
            </p>
            <p className="font-editorial-title text-sm text-[#1C1917]">
              Bestowing Marigold & Rose Petal Blessings on the Sacred Vivah
            </p>
          </div>
        </div>
      )}

      {/* Floating Petal Shower Talisman Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center space-x-2">
        <button
          onClick={() => {
            if (isActive) {
              setIsActive(false);
            } else {
              triggerShower();
            }
          }}
          title={isActive ? "Stop Petals" : "Shower Marigold & Rose Petals"}
          className={`group flex items-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border transition-all duration-300 shadow-md sm:shadow-lg text-xs font-medium backdrop-blur-md focus-visible:ring-2 focus-visible:ring-[#B68A35] ${
            isActive
              ? "bg-[#8C2222] text-[#FAF7F2] border-[#8C2222] ring-2 ring-[#B68A35]/50"
              : "bg-[#FAF7F2]/95 hover:bg-[#FAF7F2] text-[#1C1917] border-[#B68A35]/50 hover:border-[#B68A35] hover:shadow-xl"
          }`}
        >
          <span className="text-sm sm:text-base group-hover:scale-125 transition-transform duration-300">
            🌸
          </span>
          <span className="tracking-wider hidden sm:inline text-xs">
            {isActive ? "Pause Petals" : "Shower Petals (फूलों की वर्षा)"}
          </span>
          <span className="tracking-wider sm:hidden text-[11px]">
            {isActive ? "Pause" : "Blessings"}
          </span>
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#B68A35] group-hover:rotate-45 transition-transform" />
        </button>
      </div>
    </>
  );
}
