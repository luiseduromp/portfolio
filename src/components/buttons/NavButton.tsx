import { ChevronRight } from 'lucide-react'
import Link, { LinkProps } from 'next/link'
import React from 'react'

export const NavButton: React.FC<LinkProps & React.HTMLProps<HTMLAnchorElement>> = ({children, href}) => {
    return (
        <Link href={href} className="lg:text-lg border border-teal-100 rounded-full px-6 py-3 flex items-center group text-teal-100 hover:bg-teal-300 hover:border-teal-300 hover:text-black transition-colors duration-200">
            {children}
            <ChevronRight size={24} className="-translate-x-10 w-0 invisible group-hover:visible group-hover:translate-x-0 group-hover:w-6 transition-all duration-200" />
        </Link>
    )
}
