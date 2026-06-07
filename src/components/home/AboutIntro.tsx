"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

import { NavButton } from "@/components/buttons/NavButton";
import { Container } from "@/components/shared/containers";
import { SectionTitle } from "@/components/shared/titles";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const AboutIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("aboutIntro");
  const titles = t.raw("titles") as string[];
  const bio = t.raw("bio") as string[];

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const titleEls = container.querySelectorAll(".about-title");
    const descriptions = container.querySelectorAll(".about-description");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })
      .from(titleEls, {
        xPercent: -100,
        stagger: 0.2,
        mask: "lines",
        autoAlpha: 0,
        ease: "power1.out",
      })
      .from(
        descriptions,
        {
          yPercent: 100,
          autoAlpha: 0,
          stagger: 0.1,
        },
        "<",
      );
  });

  return (
    <section id="projects" className="py-20">
      <Container>
        <SectionTitle>{t("sectionTitle")}</SectionTitle>

        <div
          ref={containerRef}
          className="md:flex gap-8 py-6 md:py-12 items-center"
        >
          <div className="w-full mb-8 md:mb-0 md:w-1/2 ">
            {titles.map((title, index) => (
              <p
                key={`title-${index}`}
                className="about-title text-6xl/18 lg:text-7xl/21 xl:text-8xl/28 font-bold bg-linear-to-br from-teal-300 to-purple-400 text-transparent bg-clip-text"
              >
                {title}
              </p>
            ))}
          </div>

          <div className="w-full md:flex-1">
            {bio.map((paragraph, index) => (
              <p
                key={`par-${index}`}
                className="about-description mb-4 text-lg lg:text-xl xl:text-2xl text-neutral-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mt-16">
          <NavButton href="/about">{t("moreInfo")}</NavButton>
        </div>
      </Container>
    </section>
  );
};
