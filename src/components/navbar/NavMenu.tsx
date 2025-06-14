'use client'

import React, { useState, useEffect, useRef } from "react"
import { MenuToggle } from "@/components/navbar/MenuToggle"
import { navLinks, contactLinks } from "@/data/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)


export const NavMenu = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if(isOpen) {
            setIsOpen(false)
        }       
    }, [pathname])

    useGSAP(() => {
        const nav = navRef.current
        if(!nav) return

        if(isOpen){
            console.log('Trigger Animation')
            gsap.from(nav.querySelectorAll('.nav-link'), {
                opacity: 0,
                xPercent: 50,
                stagger: 0.1,
                duration: 0.2,
                delay: 0.1
            })
        }

    }, [isOpen])

    useEffect(() => {
        const nav = navRef.current
        if(!nav) return

        const onOutsideEvent = (e: PointerEvent ) => {
            if (!nav.contains(e.target as Node)) {
                setIsOpen(false)
            }
        };

        document.addEventListener("pointerdown", onOutsideEvent)

        return () => {
            document.removeEventListener("pointerdown", onOutsideEvent)
        }
    }, [])

    return (
        <nav ref={navRef} className={cn("", className)}>
            <MenuToggle isOpen={isOpen} onClick={() => {setIsOpen(!isOpen)}} />

            <div className={cn("overflow-hidden flex flex-col transition-all duration-300", 
                isOpen ? "visible w-70 h-120 md:w-80 lg:w-100 bg-neutral-900/80 backdrop-blur-md pt-16 pb-6  rounded-lg": "invisible size-14"
            )}
            >
                <ul className="overflow-hidden px-8">
                    {navLinks.map((link, index) => (
                        <li key={`link-${index}`} className="nav-link mb-2 md:mb-3 lg:mb-4 group">
                            <Link href={link.url} className={cn("text-neutral-400 group-hover:text-white block transition-all duration-300 text-nowrap mb-1 relative", 
                                "",
                                isOpen ? "opacity-100": "opacity-0")}
                            >
                                <span className="font-mono text-lg md:text-xl lg:text-2xl text-teal-100">0{index+1}/</span> <span className="ps-2 text-2xl md:text-3xl lg:text-4xl font-bold">{link.label}</span>
                            </Link>
                            <div className="h-[1px] w-0 bg-teal-100 group-hover:w-full transition-all duration-200"></div>
                            <div className="absolute h-[1px] bg-neutral-700 w-full transition-all duration-200"></div>
                        </li>
                    ))}
                </ul>

                <ul className="mt-auto flex justify-center gap-2 flex-wrap px-8">
                    {contactLinks.map((link, index) => (
                        <li key={`cont-${index}`} className={cn(isOpen ? "opacity-100": "opacity-0")}>
                            <a href={link.url} className="text-neutral-400 hover:text-white transition-all duration-200 px-1" target="_blank">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

            </div>
        </nav>
    )
}