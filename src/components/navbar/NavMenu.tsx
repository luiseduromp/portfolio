'use client'

import React, { useState, useEffect, useRef } from "react"
import { MenuToggle } from "@/components/navbar/MenuToggle"
import { navLinks, contactLinks } from "@/data/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"


export const NavMenu = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if(isOpen) {
            setIsOpen(false)
        }       
    }, [pathname])

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

            <div className={cn("overflow-hidden bg-neutral-800 flex flex-col transition-all duration-300", 
                isOpen ? "visible w-70 h-100 md:w-80 md:h-80 lg:h-120 lg:w-100 bg-neutral-900/90 backdrop-blur-md pt-16 pb-6 px-8 rounded-sm": "invisible h-12 w-12"
            )}
            >
                <ul className="text-white ">
                    {navLinks.map((link, index) => (
                        <li key={`link-${index}`} className="mb-2 group">
                            <Link href={link.url} className={cn("text-neutral-400 group-hover:text-white block transition-all duration-300 text-nowrap", 
                                "",
                                isOpen ? "opacity-100": "opacity-0")}
                            >
                                <span className="font-mono">0{index+1}/</span> <span className="ps-2 text-2xl md:text-3xl lg:text-4xl">{link.label}</span>
                            </Link>
                            <div className="h-[1px] w-0 bg-neutral-100 group-hover:w-full transition-all duration-200"></div>
                        </li>
                    ))}
                </ul>

                <ul className="mt-auto flex gap-4 flex-wrap">
                    {contactLinks.map((link, index) => (
                        <li key={`cont-${index}`}>
                            <a href={link.url} className="text-neutral-400 hover:text-white transition-all duration-200" target="_blank">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}