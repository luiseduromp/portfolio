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

const titles = ['Developer', 'Engineer', 'Designer']
const about = `Creative Full Stack Developer, with over 5 years of experience delivering robust, reliable and elegant web applications.
                Currently focused on Web Applications and AI-integrated systems using mainly Python, TypeScript and AWS infrastructure.
                I like to take care of all the details in a project to make it totally functional, and beautiful.`

export const AboutIntro = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const container = containerRef.current
        if(!container) return

        //const titles = SplitText.create(container.querySelectorAll('.about-title'), { type: 'lines', mask: 'lines' })
        const titles = container.querySelectorAll('.about-title')
        const descriptions = container.querySelectorAll('.about-description')

        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        })
        .from(titles, {
            xPercent: -100,
            stagger: 0.2,
            mask: 'lines',
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
                    <div className="w-full mb-8 md:mb-0 md:w-1/2 ">
                        {titles.map((title, index) => (
                            <p key={`title-${index}`} className="about-title text-6xl/18 lg:text-7xl/21 font-bold bg-linear-to-br from-teal-300 to-purple-400 text-transparent bg-clip-text">{title}</p>
                        ))}
                    </div>

                    <div className="w-full md:flex-1">
                        {about.split('\n').map((paragraph, index) => (
                            <p key={`par-${index}`} className="about-description mb-4 text-lg lg:text-xl xl:text-2xl text-neutral-300">{paragraph}</p>
                        ))}
                    </div>

                </div>

                <div className="flex items-center justify-center mt-16">
                    <NavButton href="about" >More Info</NavButton>
                </div>

            
            </Container>
            
        </section>
    )
}