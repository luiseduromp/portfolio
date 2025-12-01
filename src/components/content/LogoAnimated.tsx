"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";
import { GlowButton } from "@/components/buttons/GlowButton";
import { Container } from "@/components/shared/containers";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, SplitText);

export const LogoAnimated = ({
  variant,
  ...props
}: { variant: "light" | "dark" } & React.HTMLAttributes<HTMLDivElement>) => {
  const col = {
    light: {
      l: "#444",
      r: "#000",
      f: "#ddd",
      g: "#666",
      border: "#000",
      line: "#666",
    },
    dark: {
      l: "#999",
      r: "#fff",
      f: "#222",
      g: "#333",
      border: "#fff",
      line: "#666",
    },
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;

    if (!container) return;

    const svg = container.querySelector("svg") as SVGElement;

    const intro = container.querySelector("h3") as HTMLHeadElement;
    const hero = container.querySelector("#hero") as HTMLDivElement;

    const gridLines = svg.querySelectorAll(
      ".grid",
    ) as NodeListOf<SVGLineElement>;
    const borders = svg.querySelectorAll(".bor") as NodeListOf<SVGPathElement>;
    const frame = svg.querySelectorAll(".rect") as NodeListOf<SVGRectElement>;
    const chars = svg.querySelectorAll(".char") as NodeListOf<SVGPathElement>;

    // gsap.to(intro, {
    //     opacity: 0,
    //     y: 50,
    //     scale: 0.8,
    //     duration: 1
    const splitIntro = SplitText.create(intro, {
      type: "words",
      wordsClass: "word",
    });

    // gsap.from(split.words, {
    //     y: 50,
    //     autoAlpha: 0,
    //     duration: 1,
    //     stagger: 0.1
    // })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          pin: true,
          scrub: true,
          markers: true,
          end: () => `+=${container.scrollHeight}`,
        },
      })
      .set(svg, {
        opacity: 1,
      })
      .to(splitIntro.words, {
        y: -50,
        rotateX: 30,
        autoAlpha: 0,
        opactity: 0,
      })

      .from(gridLines, {
        drawSVG: 0,
        stagger: 0.05,
      })
      .from(borders, {
        drawSVG: 0,
        stagger: 0.05,
      })
      .from(frame, {
        drawSVG: 0,
      })
      .to(chars, {
        opacity: 1,
      })
      .to(svg, {
        scale: 0.5,
        opacity: 0.2,
      })
      .to(hero, {
        opacity: 1,
        y: 0,
        scale: 1,
      });
  });

  return (
    <div
      ref={containerRef}
      className={cn("w-full bg-black h-[400vh] relative")}
      {...props}
    >
      <div className="intro absolute left-0 top-0 right-0 h-screen flex justify-center items-center pointer-events-none">
        <h3 className="uppercase text-3xl font-mono perspective-normal">
          [ Scroll Down ]
        </h3>
      </div>

      <svg
        id="b"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1001 999.31"
        className="w-full md:w-150 mx-auto pt-20 opacity-0"
      >
        <g id="c">
          <path
            className="f char"
            fill={col[variant].f}
            opacity={0}
            d="M193.96,84.21l52.84,72.6h597.13v685.69h-59.97l52.84,72.6h60.39c10.64,0,19.26-8.61,19.26-19.23V103.44c0-10.62-8.62-19.23-19.26-19.23H193.96Z"
          />
          <path
            className="l char"
            fill={col[variant].l}
            opacity={0}
            d="M84.35,103.44v792.43c0,10.62,8.62,19.23,19.26,19.23h566.07s-52.84-72.6-52.84-72.6H157.07V157.04l-53-72.83h-.46c-10.64,0-19.26,8.61-19.26,19.23Z"
          />
          <path
            className="r char"
            fill={col[variant].r}
            opacity={0}
            d="M532.19,548.95c65.71-20.06,114.04-81.43,114.04-153.19,0-87.84-72.41-160.13-160.4-160.13h-194.12v517.45h72.72v-444.85h121.06c.23,0,.46,0,.69,0,47.45,0,86.5,38.98,86.5,86.35s-38.71,86.05-85.95,86.35h-93.94l315.98,434.17h89.89l-266.47-366.15Z"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="1000.5"
            y1="308.24"
            x2=".5"
            y2="308.24"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1=".5"
            y1="753.09"
            x2="1000.5"
            y2="753.09"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1=".5"
            y1="235.64"
            x2="1000.5"
            y2="235.64"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="84.35"
            y1="998.81"
            x2="84.35"
            y2=".5"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="1000.5"
            y1="915.1"
            x2=".5"
            y2="915.1"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="157.07"
            y1=".5"
            x2="157.07"
            y2="998.81"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1=".5"
            y1="842.5"
            x2="1000.5"
            y2="842.5"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="843.93"
            y1="998.81"
            x2="843.93"
            y2=".5"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="1000.5"
            y1="156.81"
            x2=".5"
            y2="156.81"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="769.69"
            y1="998.81"
            x2="43.15"
            y2=".5"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="916.45"
            y1=".5"
            x2="916.45"
            y2="998.81"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="133.04"
            y1=".5"
            x2="859.58"
            y2="998.81"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1=".5"
            y1="84.21"
            x2="1000.5"
            y2="84.21"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="730.6"
            y1="998.81"
            x2="4.06"
            y2=".5"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="291.72"
            y1="998.81"
            x2="291.72"
            y2=".5"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="171.17"
            y1=".5"
            x2="897.71"
            y2="998.81"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="1000.5"
            y1="555.89"
            x2=".5"
            y2="555.89"
          />
          <path
            className="grid"
            fill="none"
            stroke={col[variant].line}
            d="M486.34,555.32c-88.22,0-160-71.78-160-160s71.78-160,160-160,160,71.78,160,160-71.78,160-160,160Z"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1="364.44"
            y1=".5"
            x2="364.44"
            y2="998.81"
          />
          <circle
            className="grid"
            fill="none"
            stroke={col[variant].line}
            cx="486.34"
            cy="395.32"
            r="86.35"
          />
          <line
            className="grid"
            fill="none"
            stroke={col[variant].line}
            x1=".5"
            y1="480.94"
            x2="1000.5"
            y2="480.94"
          />
          <path
            className="bor"
            fill="none"
            strokeWidth={2}
            stroke={col[variant].border}
            d="M84.35,103.44v792.43c0,10.62,8.62,19.23,19.26,19.23h566.07s-52.84-72.6-52.84-72.6H157.07V157.04l-53-72.83h-.46c-10.64,0-19.26,8.61-19.26,19.23Z"
          />
          <path
            className="bor"
            fill="none"
            strokeWidth={2}
            stroke={col[variant].border}
            d="M193.96,84.21l52.84,72.6h597.13v685.69h-59.97l52.84,72.6h60.39c10.64,0,19.26-8.61,19.26-19.23V103.44c0-10.62-8.62-19.23-19.26-19.23H193.96Z"
          />
          <path
            className="bor"
            fill="none"
            strokeWidth={2}
            stroke={col[variant].border}
            d="M532.19,548.95c65.71-20.06,114.04-81.43,114.04-153.19,0-87.84-72.41-160.13-160.4-160.13h-194.12v517.45h72.72v-444.85h121.06c.23,0,.46,0,.69,0,47.45,0,86.5,38.98,86.5,86.35s-38.71,86.05-85.95,86.35h-93.94l315.98,434.17h89.89l-266.47-366.15Z"
          />
          <rect
            className="rect"
            fill="none"
            stroke={col[variant].line}
            x="1.34"
            y="-.34"
            width="998.31"
            height="1000"
            transform="translate(1000.15 -.84) rotate(90)"
          />
        </g>
      </svg>

      <div
        id="hero"
        className="absolute left-0 top-0 right-0 h-screen flex justify-center items-center bg-black/50 perspective-normal opacity-0 translate-y-20 scale-90"
      >
        <Container id="intro" className="font-main relative">
          <div className="mb-12">
            <h2 className="text-8xl font-bold uppercase">
              Quality and Design <br />
            </h2>
            <h2 className="text-6xl font-bold uppercase text-neutral-400">
              in Web Applications
            </h2>
          </div>
          <h1 className="text-4xl mb-3">
            This is <span>Luis Romero</span>
          </h1>
          <p className="font-monospace text-4xl text-teal-400">
            Fullstack Developer and Engineer
          </p>
          <div className="flex py-12 gap-4">
            <GlowButton href="/projects" className="uppercase">
              Projects
            </GlowButton>
            <GlowButton href="/contact" className="uppercase">
              Contact
            </GlowButton>
          </div>
        </Container>
      </div>
    </div>
  );
};
