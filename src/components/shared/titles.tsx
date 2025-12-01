"use client";

import React, { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, SplitText);

export const PageTitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const title = titleRef.current;
    if (!title) return;

    gsap.from(title, {
      scale: 0.7,
      autoAlpha: 0.2,
      yPercent: 20,
      duration: 0.3,
      stagger: 0.05,
      filter: "blur(25px)",
    });
  });

  return (
    <section className={cn("mt-26 mb-12", className)} {...props}>
      <h1 ref={titleRef} className="page-title">
        {children}
      </h1>
    </section>
  );
};

export const SectionTitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const title = sectionTitleRef.current;
    if (!title) return;

    gsap.from(title, {
      scale: 0.8,
      autoAlpha: 0,
      yPercent: 20,
      duration: 0.3,
      filter: "blur(20px)",
      scrollTrigger: {
        start: "top 90%",
        trigger: title,
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <h2
      ref={sectionTitleRef}
      className={cn("section-title", className)}
      {...props}
    >
      {children}
    </h2>
  );
};
