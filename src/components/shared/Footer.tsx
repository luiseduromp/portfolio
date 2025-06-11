import React from 'react'
import { Logo } from '../logos/Logo'
import { contactLinks, navLinks } from '@/data/navigation'
import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className="mx-4 border-t border-neutral-800">
            <div className="flex items-center justify-between px-6 py-20">
                <ul>
                    <li className="uppercase font-bold mb-2">Links</li>
                    {navLinks.map((link) => (
                        <li key={link.label} className="lg:text-lg"><Link href={link.url}>{link.label}</Link></li>
                    ))}
                </ul>
                <Logo className="h-16" />
                <ul>
                    <li className="uppercase font-bold mb-2">Contact</li>
                    {contactLinks.map((link) => (
                        <li key={link.label} className="lg:text-lg"><Link href={link.url}>{link.label}</Link></li>
                    ))}
                </ul>
            </div>
            <div className="py-4 text-center text-xs text-neutral-500 border-t border-neutral-800">
                {new Date().getFullYear()} luiseduromp.com
            </div>
        </footer>
    )
}