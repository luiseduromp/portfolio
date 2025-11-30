import React from 'react'
import { Logo } from '../icons/Logo'
import { contactLinks, navLinks } from '@/data/navigation'
import Link from 'next/link'
import { pub } from '@/lib/config'
import { Container } from '@/components/shared/containers'

export const Footer = () => {

    return (
        <footer className="mx-4 border-t border-neutral-800">
            <Container className="md:flex items-start justify-center px-6 py-20">
                <div className="w-full mb-16 md:mb-0 md:flex-1 flex justify-between order-first md:order-last">
                    <ul className="overflow-hidden">
                        <li className="uppercase font-bold mb-2">Links</li>
                        {navLinks.map((link) => (
                            <li key={link.label} className="text-neutral-400 hover:text-teal-100 md:text-lg lg:text-xl mb-1 group">
                                <Link href={link.url}>{link.label}</Link>
                                <div className="h-[1px] w-full bg-teal-100 -translate-x-30 group-hover:translate-x-0 transition-all duration-200"></div>
                            </li>
                        ))}
                    </ul>

                    <ul className="overflow-hidden">
                        <li className="uppercase font-bold mb-2">Contact</li>
                        {contactLinks.map((link) => (
                            <li key={link.label} className="text-neutral-400 hover:text-teal-100 md:text-lg lg:text-xl mb-1 group">
                                <Link href={link.url}>{link.label}</Link>
                                <div className="h-[1px] w-full bg-teal-100 -translate-x-30 group-hover:translate-x-0 transition-all duration-200"></div>
                            </li>
                        ))}
                    </ul>

                    <ul className="overflow-hidden">
                        <li className="uppercase font-bold mb-2">Resume</li>
                        <li className="md:text-lg lg:text-xl group mb-1">
                            <a href={`${pub.BUCKET_URL}/cv/ENG_CV_Luis_Romero_2025.pdf`} className="text-neutral-400 hover:text-teal-100" target="_blank">CV English</a>
                            <div className="h-[1px] w-full bg-teal-100 -translate-x-30 group-hover:translate-x-0 transition-all duration-200"></div>
                        </li>
                        <li className="md:text-lg lg:text-xl group mb-1">
                            <a href={`${pub.BUCKET_URL}/cv/ESP_CV_Luis_Romero_2025.pdf`} className="text-neutral-400 hover:text-teal-100" target="_blank">CV Spanish</a>
                            <div className="h-[1px] w-full bg-teal-100 -translate-x-30 group-hover:translate-x-0 transition-all duration-200"></div>
                        </li>
                    </ul>

                </div>

                <div className="w-full md:w-1/2 order-last md:order-first">
                    <Logo className="h-20 mb-6" />
                    <p className="text-5xl lg:text-6xl font-bold">luiseduromp</p>
                    <p className="text-teal-300 text-xl font-mono">Full Stack and AI Engineer</p>
                </div>

            </Container>
            <div className="py-4 text-center text-sm text-neutral-500 border-t border-neutral-800">
                {new Date().getFullYear()} - luiseduromp.com
            </div>
        </footer>
    )
}