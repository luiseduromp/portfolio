'use client'

import React, { useRef } from 'react'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from '@/lib/utils';
import { SplitText } from 'gsap/SplitText';
import { Container } from '@/components/shared/containers';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const TextScroll = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const container = containerRef.current
        const text = container?.querySelectorAll('p')

        if (!container || !text) return

        const split = SplitText.create(text, {
            type: 'words',
            wordsClass: 'word'
        })

        gsap.from(split.words, {
            //y: 50,
            //autoAlpha: 0.3,
            opacity: 0.2,
            stagger: 1,
            scrollTrigger: {
                trigger: container,
                start: "center center",
                pin: true,
                scrub: true,                
                end: () => `+=${container.scrollHeight}`,
            }
        })
    })

    return (
        <Container ref={containerRef} className={cn(" h-screen flex flex-col justify-center gap-4", className)} {...props}>
            <h4 className="text-teal-400 font-mono uppercase text-xl lg:text-3xl">My Work</h4>
            <p className="pe-20 text-4xl md:text-5xl lg:text-7xl font-semibold">{children}</p>
        </Container>
    )
}

export default TextScroll