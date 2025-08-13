'use client'
import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { cn } from '@/lib/utils';
import { Container } from '@/components/shared/containers';
import { NavButton } from '@/components/buttons/NavButton';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin );


export const Hero = ({ variant, ...props }: { variant: 'light' | 'dark' } & React.HTMLAttributes<HTMLDivElement>) => {
    const col = {
        light: {l: "#444", r: "#000", f: "#ddd", g: "#666", border: "#000", line: "#666"},
        dark: {l: "#999", r: "#fff", f: "#222", g: "#333", border: "#fff", line: "#666"},
    }

    const containerRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        const container = containerRef.current
        if (!container) return

        const svg = container.querySelector('svg') as SVGElement
        const intro = container.querySelector('#intro') as HTMLHeadElement
        const hero = container.querySelector('#hero') as HTMLDivElement

        const split = SplitText.create(intro.children, {type:'lines', mask:'lines'})

        const gridLines = svg.querySelectorAll('.grid') as NodeListOf<SVGLineElement>
        const borders = svg.querySelectorAll('.bor') as NodeListOf<SVGPathElement>
        const frame = svg.querySelectorAll('.rect') as NodeListOf<SVGRectElement>
        const chars = svg.querySelectorAll('.char') as NodeListOf<SVGPathElement>

        gsap.to(intro, {opacity:1, duration:0.5, filter: 'blur(0)', ease:'power1.out', scale:1})

        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                pin: true,
                scrub: true,
                end: () => `+=400%`,
            }
        })
            .set(svg, {
                opacity: 1
            })
            .to(split.lines, {
                yPercent: -100,
                autoAlpha: 0,
                mask: 'lines'
            })
            .from(gridLines, {
                drawSVG: 0, 
                stagger: 0.05, 
                duration: 1,  
            }, "<")
            .from(borders, {
                drawSVG: 0,
                stagger: 0.05,
                duration: 2,
            })
            .from(frame, {
                drawSVG: 0,
                duration: 1
            })
            .from(chars, {
                opacity: 0,
                ease: "power1.out",
                duration: 1,
            })            
            .to(svg, {
                scale: 16,
                yPercent: 180,
                xPercent: 40,
                opacity: 0,
                ease: "sine.out",
                duration: 6,
            })
            .to([gridLines, borders, frame], {
                opacity: 0,
                duration: 1,
            }, "<")
            .to(hero, {
                opacity: 1,
                scale: 1,
                delay: 0.1,
                ease: "power1.out",
                duration: 5,
            }, "<")          
    })

    return (
        <section ref={containerRef} className={cn("w-full bg-black h-screen relative overflow-hidden")} {...props}>
            <div id="intro" className="absolute left-0 top-0 right-0 h-screen flex flex-col justify-center items-center pointer-events-none perspective-normal opacity-0 blur-sm scale-80">
                <h3 className="text-center lg:text-2xl">Welcome to <span className="font-bold">Luis Romero&apos;s</span> Portfolio</h3>
                <p className="text-teal-300 font-mono">[ Scroll Down ]</p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1001 999.31" className="w-full md:w-150 mx-auto opacity-0">
                    <g>
                        <path className="f char" fill={col[variant].f} d="M193.96,84.21l52.84,72.6h597.13v685.69h-59.97l52.84,72.6h60.39c10.64,0,19.26-8.61,19.26-19.23V103.44c0-10.62-8.62-19.23-19.26-19.23H193.96Z"/>
                        <path className="l char" fill={col[variant].l} d="M84.35,103.44v792.43c0,10.62,8.62,19.23,19.26,19.23h566.07s-52.84-72.6-52.84-72.6H157.07V157.04l-53-72.83h-.46c-10.64,0-19.26,8.61-19.26,19.23Z"/>
                        <path className="r char" fill={col[variant].r} d="M532.19,548.95c65.71-20.06,114.04-81.43,114.04-153.19,0-87.84-72.41-160.13-160.4-160.13h-194.12v517.45h72.72v-444.85h121.06c.23,0,.46,0,.69,0,47.45,0,86.5,38.98,86.5,86.35s-38.71,86.05-85.95,86.35h-93.94l315.98,434.17h89.89l-266.47-366.15Z"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="1000.5" y1="308.24" x2=".5" y2="308.24"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1=".5" y1="753.09" x2="1000.5" y2="753.09"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1=".5" y1="235.64" x2="1000.5" y2="235.64"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="84.35" y1="998.81" x2="84.35" y2=".5"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="1000.5" y1="915.1" x2=".5" y2="915.1"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="157.07" y1=".5" x2="157.07" y2="998.81"/>                    
                        <line className="grid  " fill="none" stroke={col[variant].line} x1=".5" y1="842.5" x2="1000.5" y2="842.5"/>                   
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="843.93" y1="998.81" x2="843.93" y2=".5"/>       
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="1000.5" y1="156.81" x2=".5" y2="156.81"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="769.69" y1="998.81" x2="43.15" y2=".5"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="916.45" y1=".5" x2="916.45" y2="998.81"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="133.04" y1=".5" x2="859.58" y2="998.81"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1=".5" y1="84.21" x2="1000.5" y2="84.21"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="730.6" y1="998.81" x2="4.06" y2=".5"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="291.72" y1="998.81" x2="291.72" y2=".5"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="171.17" y1=".5" x2="897.71" y2="998.81"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="1000.5" y1="555.89" x2=".5" y2="555.89"/>
                        <path className="grid  " fill="none" stroke={col[variant].line} d="M486.34,555.32c-88.22,0-160-71.78-160-160s71.78-160,160-160,160,71.78,160,160-71.78,160-160,160Z"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1="364.44" y1=".5" x2="364.44" y2="998.81"/> 
                        <circle className="grid" fill="none" stroke={col[variant].line} cx="486.34" cy="395.32" r="86.35"/>
                        <line className="grid  " fill="none" stroke={col[variant].line} x1=".5" y1="480.94" x2="1000.5" y2="480.94"/>
                        <path className="bor   " fill="none" stroke={col[variant].border} strokeWidth={2} d="M84.35,103.44v792.43c0,10.62,8.62,19.23,19.26,19.23h566.07s-52.84-72.6-52.84-72.6H157.07V157.04l-53-72.83h-.46c-10.64,0-19.26,8.61-19.26,19.23Z"/>
                        <path className="bor   " fill="none" stroke={col[variant].border} strokeWidth={2} d="M193.96,84.21l52.84,72.6h597.13v685.69h-59.97l52.84,72.6h60.39c10.64,0,19.26-8.61,19.26-19.23V103.44c0-10.62-8.62-19.23-19.26-19.23H193.96Z"/>
                        <path className="bor   " fill="none" stroke={col[variant].border} strokeWidth={2} d="M532.19,548.95c65.71-20.06,114.04-81.43,114.04-153.19,0-87.84-72.41-160.13-160.4-160.13h-194.12v517.45h72.72v-444.85h121.06c.23,0,.46,0,.69,0,47.45,0,86.5,38.98,86.5,86.35s-38.71,86.05-85.95,86.35h-93.94l315.98,434.17h89.89l-266.47-366.15Z"/>
                        <rect className="rect  " fill="none" stroke={col[variant].line} x="1.34" y="-.34" width="998.31" height="1000" transform="translate(1000.15 -.84) rotate(90)"/>
                    </g>
                </svg>
            </div>

            <header id="hero" className="absolute left-0 top-0 right-0 h-screen perspective-normal opacity-0 scale-20">
                <Container id="intro" className="relative flex flex-col h-full gap-12 my-auto justify-center">
                    <div className="text-center">
                        <h2 className="text-6xl/18 md:text-7xl/22 lg:text-8xl/30 2xl:text-9xl/38 font-bold">
                            <span className="bg-gradient-to-br from-sky-300 via-teal-300 to-violet-300 inline-block mx-auto text-transparent bg-clip-text">Quality and Design</span> 
                            <br /><span>In Web Apps</span>                          
                        </h2>
                    </div>

                    <div className="text-center lg:flex lg:justify-center lg:items-center text-3xl md:text-4xl xl:text-5xl">
                        <h1 className="font-semibold mt-1 mb-1">
                            Luis Romero                  
                        </h1>
                        <div className="hidden lg:block bg-neutral-500 w-[1px] h-full ms-4 me-4" />
                        <h2 className="text-teal-300 mt-1 mb-1">Full Stack Developer</h2>
                    </div>

                    <div className="flex justify-center gap-4 mt-3">
                        <NavButton href="/projects" >Projects</NavButton>
                        <NavButton href="/contact" >Contact</NavButton>
                    </div>                    
                </Container>
            </header>
        </section>
    )

}