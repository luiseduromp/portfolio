'use client'
import React, { useRef } from 'react'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MAX_FRAMES = 359

function updateImage(img, frame = 0){
    const src = `/images/logo_sequence/logo${String(frame).padStart(3, '0')}.png`
    console.log(src)
    img.src = src
}

export const LogoSequence = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    let currentFrame = 0

    useGSAP(() => {
        const container = containerRef.current

        if (!container) return

        const img = container.querySelector('img') as HTMLImageElement
        if (!img) return

        ScrollTrigger.create({
            trigger: container,
            start: 'center center',
            end: `+=${container.scrollWidth}`,
            pin: true,
            scrub: true,
            markers: true,
            onToggle: (self) => console.log('toggled, isActive:', self.isActive),
            onUpdate: (self) => {
                console.log(
                    'progress:',
                    self.progress.toFixed(3)                    
                );
                currentFrame = Math.floor(self.progress * MAX_FRAMES) ;
                updateImage(img, currentFrame)
            }
        });
    })

    return (
        <div ref={containerRef} className="w-screen overflow-hidden h-screen flex relative bg-black p-12 items-center justify-center">
            <img src={'/images/logo_sequence/logo000.png'} alt="sequence" className="absolute top-0 w-3/4 h-auto" />
        </div>
    )
}
