'use client'

import Image from 'next/image'
import React from 'react'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Project } from '@/data/curriculum'
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
        <div className={cn("dark:bg-neutral-900 rounded-xl mb-4 overflow-hidden w-[360px] cursor-pointer relative group", className)} {...props} >
            <div className="h-50 relative bg-linear-to-bl from-neutral-800 to-black overflow-hidden">
                <RenderCover slug={project.slug}/>
            </div>

            <div className="px-6 py-3 flex flex-col justify-center h-36">
                <p className="font-monospace text-teal-300">{project.type} Project</p>
                <p className="text-3xl font-bold text-neutral-950 dark:text-neutral-50 mb-1">{project.name}</p>
                             
            </div>

            <div className="px-6 py-4 border-t border-teal-500 border-dashed flex justify-between gap-2 items-center">
                <p className="text-neutral-300 dark:text-neutral-300">{project.company}</p> 
                <p className="text-neutral-300 dark:text-neutral-300 font-bold">{project.year}</p> 
            </div>

            {/* <div className="absolute inset-0 bg-black/60 opacity-0 invisible group-hover:visible group-hover:opacity-100 flex justify-center items-center">
            </div> */}
        </div>
    )
}