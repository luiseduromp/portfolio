"use client";

import createGlobe from "cobe";
import React, { useEffect, useRef } from "react";

function formatDate(date: Date) {
  const month = new Intl.DateTimeFormat("en", { month: "short" })
    .format(date)
    .toUpperCase();
  const year = date.getFullYear();
  return `${month} ${year}`;
}

export const GlobeCard = ({ lat, lng }: { lat: number; lng: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<HTMLCanvasElement>(null);

  const focusRef = useRef([0, 0]);
  const date = formatDate(new Date());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;

    const onResize = () => {
      width = canvas ? canvas.offsetWidth : 0;
    };
    window.addEventListener("resize", onResize);
    onResize();

    focusRef.current = [
      Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180 - Math.PI / 5,
    ];

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2 * 0.4,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.5,
      mapSamples: 24000,
      mapBrightness: 2,
      baseColor: [150 / 255, 247 / 255, 228 / 255],
      markerColor: [0, 213 / 255, 190 / 255],
      glowColor: [203 / 255, 251 / 255, 241 / 255],
      markers: [{ location: [lat, lng], size: 0.1 }],
      scale: 2.5,
      offset: [0, width * 2 * 0.4 * 0.5],
      onRender: (state) => {
        state.phi = currentPhi;
        state.theta = currentTheta;

        const [focusPhi, focusTheta] = focusRef.current;
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;

        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08;
        } else {
          currentPhi -= distNegative * 0.08;
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
        state.width = width * 2;
        state.height = width * 2 * 0.4;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const PIN_OFFSET = 60;

  useEffect(() => {
    const lines = linesRef.current;
    const container = containerRef.current;
    if (!container || !lines) return;

    const drawPin = () => {
      const ctx = lines.getContext("2d");
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(lines.width / 2, PIN_OFFSET);
      ctx.lineTo(lines.width / 2, lines.height * 0.65);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(lines.width / 2, PIN_OFFSET, 12, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    };

    const onResize = () => {
      lines.width = container.offsetWidth;
      lines.height = container.offsetHeight;
      drawPin();
    };
    window.addEventListener("resize", onResize);
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="relative">
      <div className="relative text-center pb-4 lg:pb-0 lg:text-start lg:absolute top-0 left-0 w-full lg:w-1/2 lg:left-1/2 z-20">
        <div className="flex-1 ps-8">
          <p className="mb-1">Current Location</p>
          <h5 className="text-6xl font-bold mb-1">Barcelona</h5>
          <p className="uppercase font-mono text-xl text-teal-400">
            {date} Open for work
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full aspect-5/2 mx-auto relative overflow-hidden flex items-center"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full lg:w-5/6 xl:w-3/4 mx-auto "
        />
        <canvas ref={linesRef} className="absolute inset-0" />
      </div>
    </section>
  );
};
