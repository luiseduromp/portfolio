"use client";

import React, { useRef } from "react";
import { LogoDesign } from "@/components/icons/Logo";
import { cn } from "@/lib/utils";

export const Logo3d = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const boundingRef = useRef<DOMRect | null>(null);

  const handleMouseLeave = () => (boundingRef.current = null);
  const handleMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
    boundingRef.current = ev.currentTarget.getBoundingClientRect();
  };
  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!boundingRef.current) return;
    const x = ev.clientX - boundingRef.current.left;
    const y = ev.clientY - boundingRef.current.top;
    const xPercentage = x / boundingRef.current.width;
    const yPercentage = y / boundingRef.current.height;
    const xRotation = (xPercentage - 0.5) * 20;
    const yRotation = (0.5 - yPercentage) * 20;

    ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
    ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
    ev.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
    ev.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
  };

  return (
    <div
      className={cn("flex flex-col [perspective:800px]", className)}
      {...props}
    >
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={(ev) => handleMouseEnter(ev)}
        onMouseMove={(ev) => handleMouseMove(ev)}
        className="group relative w-[360px]  overflow-hidden text-[#01A977] transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]"
      >
        <LogoDesign variant="dark" />
        <div className="pointer-events-none absolute inset-0 group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.1)_10%,transparent_80%)]" />
      </div>
    </div>
  );
};
