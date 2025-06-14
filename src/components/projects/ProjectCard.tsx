'use client'

import Image from 'next/image'
import React from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from '@/lib/definitions'
import { projectCovers } from '@/lib/media'
import { cn } from '@/lib/utils'


gsap.registerPlugin(useGSAP, ScrollTrigger);

export const RenderCover = ({id}: {id: string}) => {
    const cover = projectCovers[id]
    switch(cover.type){
        case 'logo':
            return (
                <div className={cn("h-50 bg-linear-to-br from-white to-neutral-300 flex items-center justify-center w-full py-8 ", cover.background)}>
                    <Image src={cover.src} alt={id} width={300} height={300} className="size-2/3" />
                </div>
            )
        case 'image':
            return (
                <div className="h-50 flex items-center justify-center w-full">
                    <Image src={cover.src} alt={id} width={500} height={300} className="object-cover w-full h-full" />
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
        <div className={cn(className)} {...props}>
            <a className={cn("inline-block dark:bg-neutral-900 rounded-xl mb-4 overflow-hidden w-[360px] cursor-pointer border border-neutral-800 relative group hover:scale-105 transition-all duration-200")}  >
                <div className="h-50 relative bg-linear-to-bl from-neutral-800 to-black overflow-hidden">
                    <RenderCover id={project.id}/>
                </div>

                <div className="px-6 py-3 flex flex-col justify-center h-36">
                    <p className="font-monospace text-teal-300">{project.type} Project</p>
                    <p className="text-3xl font-bold text-neutral-950 dark:text-neutral-50 mb-1">{project.name}</p>
                                
                </div>

                <div className="px-6 py-4 border-t border-teal-500 border-dashed flex justify-between gap-2 items-center">
                    <p className="text-neutral-300 dark:text-neutral-300">{project.company}</p> 
                    <p className="text-neutral-300 dark:text-neutral-300 font-bold">{project.year}</p> 
                </div>
            </a>
        </div>
    )
}