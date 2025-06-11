'use client'

import Image from 'next/image'
import React from 'react'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Box } from 'lucide-react'
import { Project } from '@/data/curriculum'
import { icons } from '@/lib/logos'
import { projectCovers } from '@/lib/media'
import { cn } from '@/lib/utils'


gsap.registerPlugin(useGSAP, ScrollTrigger);

export const RenderCover = ({slug}: {slug: string}) => {
    const cover = projectCovers[slug]
    switch(cover.type){
        case 'logo':
            return (
                <div className={cn("h-50 bg-linear-to-br from-white to-neutral-300 flex items-center justify-center w-full py-8 ", cover.background)}>
                    <Image src={cover.src} alt={slug} width={300} height={300} className="size-2/3" />
                </div>
            )
        case 'image':
            return (
                <div className="h-50 flex items-center justify-center w-full">
                    <Image src={cover.src} alt={slug} width={500} height={300} className="object-cover w-full h-full" />
                </div>
            )
        case 'video':
            const ext = cover.src.split('.').at(-1)
            return (
                <div className="h-50 flex items-center justify-center w-full rounded-lg">
                    <video muted loop autoPlay preload='auto' className="object-cover rounded-lg">
                        <source src={cover.src} type={`${cover.type}/${ext}`} />
                    </video>
                </div>
            )
    }
}

export const ProjectCard = ({project, className, ...props}: {project: Project} & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn("dark:bg-neutral-900 rounded-xl mb-4 overflow-hidden w-[360px] cursor-pointer", className)} {...props} >
            <div className="h-50 relative bg-linear-to-bl from-neutral-800 to-black overflow-hidden">
                <RenderCover slug={project.slug}/>
            </div>

            <div className="px-6 py-3 flex flex-col justify-center h-40">
                <p className="font-monospace text-teal-300">{project.type}</p>
                <p className="text-3xl font-bold text-neutral-950 dark:text-neutral-50 mb-1">{project.name}</p>
                <p className="text-neutral-300 dark:text-neutral-300">{project.year}, {project.company}</p>              
            </div>

            <div className="px-6 py-4 border-t border-teal-500 border-dashed flex gap-4 justify-center items-center">
                {project.technologies?.length && Array.from({ length: 5 }).map((_, index) => {
                    if(!project.technologies?.[index]) return
                    const tec = project.technologies?.[index]
                    const Icon = icons[tec].logo ? icons[tec].logo : Box;
                    const technology = icons[tec].name
                    return (
                        <div key={`${project.slug}-${tec || index}`} className="text-neutral-700 dark:text-neutral-400 px-1 py-1 relative group dark:hover:text-white">
                            <Icon className="h-6" />
                            <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 text-white top-0 bg-black z-10 px-3 py-1 rounded-lg group-hover:-translate-y-8 transition-all duration-200 pointer-events-none">{technology}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}