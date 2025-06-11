'use client'

import React, { useRef } from 'react'
import { Container } from '@/components/shared/containers'
import { NavButton } from '@/components/buttons/NavButton'
import { SectionTitle } from '@/components/shared/titles'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export const AboutIntro = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const container = containerRef.current
        if(!container) return

        const titles = container.querySelectorAll('.about-title')
        const descriptions = container.querySelectorAll('.about-description')

        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 70%',
                markers: true,
                toggleActions: 'play none none reverse'
            }
        })
        .from(titles, {
            xPercent: -100,
            stagger: 0.2,
            autoAlpha: 0,
            ease: 'power1.out',
        })
        .from(descriptions, {
            yPercent: 100,
            autoAlpha: 0,
            stagger: 0.1
        }, "<")

    })

    return (
        <section id="projects" className="py-20">
            <Container>
                <SectionTitle>About Me</SectionTitle>

                <div ref={containerRef} className="md:flex gap-8 py-6 md:py-12 items-center">
                    <div className="w-full mb-8 md:mb-0 md:w-1/2">
                        <p className="about-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">Developer</p>
                        <p className="about-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">Engineer</p>
                        <p className="about-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">Designer</p>
                    </div>

                    <div className="w-full md:flex-1">
                        <p className="about-description mb-4 font-light text-lg lg:text-xl text-neutral-300">I consider myself a creative builder by nature and I have found my passion in software development.</p>
                        <p className="about-description mb-4 font-light text-lg lg:text-xl text-neutral-300">I like to take care of all the details in a project to make it totally functional, and beautiful.</p>
                        <p className="about-description font-light text-lg lg:text-xl text-neutral-300">Having worked as a full stack developer for over 5 years has helped me develop strong skills for optimal 
                            developments and a good taste for beautiful designs 
                        </p>
                    </div>

                </div>

                <div className="flex items-center justify-center mt-16">
                    <NavButton href="about" >More Info</NavButton>
                </div>

            
            </Container>
            
        </section>
    )
}