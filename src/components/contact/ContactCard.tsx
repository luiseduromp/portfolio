'use client'
import React, { useRef } from "react"
import { Container } from "@/components/shared/containers"

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';

import type { ContactLink } from "@/lib/definitions";
import { MapPin } from "lucide-react";
import { SectionTitle } from "@/components/shared/titles";
import { NavButton } from "@/components/buttons/NavButton";
import { SocialLogos } from "../icons/logos";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { pub } from "@/lib/config";


gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const ContactCard = ({ contactLinks }: {contactLinks: ContactLink[] }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const today = new Date().toLocaleDateString("en", {year: 'numeric', month: 'short'})

    useGSAP(() => {
        const container = containerRef.current
        if(!container) return
        const globe = container.querySelectorAll('.globe')
        const pin = container.querySelector('.location-pin')
        const city = SplitText.create(container.querySelector('.location-city'), {type:'lines', mask:'lines'})
        const text = container.querySelector('.location-text')
        const status = container.querySelector('.work-status')

        gsap.set(globe, {yPercent:10, opacity:0.2})
        gsap.set(pin, {yPercent:-200, opacity:0})
        gsap.set(city.lines, {yPercent:100, autoAlpha:0})
        gsap.set(text, {yPercent:-100, autoAlpha:0})
        gsap.set(status, {yPercent:100, opacity:0})

        gsap.to(globe, {
            yPercent: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: container,
                start: "top center",
                scrub: true,                
                markers: true,
                end: () => `+=${container.offsetHeight*0.8}`,
            }
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top center",         
                markers: true,
                end: () => `+=${container.offsetHeight*0.8}`,
                toggleActions: 'play none none reverse'
            }
        })

        tl.to(pin, {yPercent:0, opacity:1, ease: 'power1.out'}, "<")
        .to(text, {yPercent: 0, autoAlpha:1}, "<")
        .to(city.lines, {yPercent:0, autoAlpha:1, mask:'lines'}, "<")
        .to(status, {yPercent: 0, opacity:1}, "<")

        if (status) {
            gsap.to(status.querySelectorAll('p'), {xPercent:-100, repeat:-1, duration:4, ease:'none'})
        }
    })

    return (
        <section id="contact" className="py-16">
            <Container>
                <SectionTitle>Contact</SectionTitle>
                <p className="text-xl lg:text-2xl text-center text-neutral-300 mb-1">
                    I am open to work and freelance projects.
                </p>
                <p className="text-xl lg:text-2xl text-center text-neutral-300 mb-8">
                    Write me an Email, or Contact me on Social Media
                </p>

                <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
                    {contactLinks.map((link) => {
                        const Icon = SocialLogos[link.slug].logo!
                        
                        return (
                            <a key={link.slug} href={link.url} target="_blank" className={cn("relative text-neutral-100 flex gap-2 px-2 items-center rounded-lg size-20 justify-center group",
                            "bg-transparent hover:bg-linear-to-br from-teal-200 to-teal-500 hover:text-neutral-800 transition-all duration-200"
                            )}>
                                <Icon className="h-10" />
                            </a>
                        )
                    })}
                </div>


                <div ref={containerRef} className="relative rounded-xl overflow-hidden bg-radial from-neutral-800 from-40% to-neutral-900 h-130 md:h-160">
                    <div className="globe absolute top-56 sm:top-54 md:top-60 size-250 sm:size-300 md:size-380 lg:size-420 xl:size-480 rounded-full left-1/2 -translate-x-1/2 bg-radial border-1 border-teal-200/50 from-black from-50% to-teal-300 z-20 overflow-hidden">
                        <Image src={`${pub.BUCKET_URL}/world-map.svg`} width={2000} height={900} className="mx-auto h-full relative w-3/4 -top-82 sm:-top-100 md:-top-124 lg:-top-140 xl:-top-164 opacity-60" alt="World Map"/>             
                    </div>

                    <div className="globe absolute top-56 sm:top-54 md:top-60 size-250 sm:size-300 md:size-380 lg:size-420 xl:size-480 rounded-full left-1/2 -translate-x-1/2 bg-radial from-black/30 from-60% to-teal-50/90 z-20" />
                    <div className="globe absolute top-56 sm:top-54 md:top-60 size-250 sm:size-300 md:size-380 lg:size-420 xl:size-480 rounded-full left-1/2 -translate-x-1/2 bg-teal-300/80 blur-2xl z-10" />

                    <div className="absolute inset-0 flex justify-center items-center gap-4 z-30">                           
                        <MapPin className="location-pin" strokeWidth={0.75} size={80} />
                        
                        <div>
                            <p className="location-text sm:text-xl lg:text-2xl xl:text-4xl text-neutral-200">Currently located in</p>                                
                            <h4 className="location-city font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2">Barcelona</h4>
                            <div className="work-status sm:text-lg md:text-xl font-mono text-teal-300 my-1 py-1 w-30 sm:w-40 md:w-56 lg:w-72 overflow-hidden text-nowrap border-t-2 border-b-2 border-dashed border-teal-300">
                                <p className="inline-flex ">/ Open for Work / {today}&nbsp;</p>
                                <p className="inline-flex ">/ Open for Work / {today}&nbsp;</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-50 py-16 px-4 flex flex-col justify-between h-full">
                        <div className="">
                            <p className="text-2xl sm:text-4xl md:text-5xl text-center text-neutral-300 font-bold">Have an idea in mind?</p>
                            <p className="text-2xl sm:text-4xl md:text-5xl text-center text-neutral-300 font-bold">Let&apos;s build it together</p>
                        </div>

                        <div className="flex items-center justify-center">
                            <NavButton href="contact">Contact Me</NavButton>
                        </div>
                    </div>
                </div>

            </Container>

        </section>
    )
}

export default ContactCard