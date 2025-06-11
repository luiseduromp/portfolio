'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from '@/lib/definitions';
import { ProjectCard, RenderCover } from '@/components/projects/ProjectCard';
import { cn } from '@/lib/utils';
import { icons } from '@/lib/logos';
import Link from 'next/link';
import { Box, SquareArrowOutUpRight } from 'lucide-react';
import { Container } from '@/components/shared/containers';


gsap.registerPlugin(useGSAP, ScrollTrigger);

export const ProjectsSection = ({ projects }: { projects: Project[] }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [openProject, setOpenProject] = useState<Project | null>(null);

    const { contextSafe } = useGSAP({ scope: containerRef })

    const openDialog = contextSafe((project: Project) => {
        const dialog = dialogRef.current
        if(!dialog) return
        setOpenProject(project)

        gsap.to(dialog, {opacity:1, filter:'blur(0)', scale:1, yPercent:0, delay:0.1, duration:0.3, ease:'power1.inOut'})
    })

    const closeDialog = contextSafe(() => {
        const dialog = dialogRef.current
        if(!dialog) return
        gsap.to(dialog, {opacity:0, filter:'blur(10px)', scale:0.8, yPercent:100, duration:0.5, ease:'power1.inOut'})
        setOpenProject(null)       
    })

    useGSAP(() => {
        const dialog = dialogRef.current
        if(!dialog) return
        gsap.set(dialog, {opacity:0, filter:'blur(10px)', scale:0.8, yPercent:100})
    })

    useEffect(() => {
        const dialog = dialogRef.current
        if(!dialog) return

        const onOutEvent = (e: PointerEvent) => {
            if(!dialog.contains(e.target as Node) && openProject){ 
                closeDialog()                
            }
        }

        document.addEventListener('pointerdown', onOutEvent)

        return () => {
            document.removeEventListener('pointerdown', onOutEvent)
        }
    }, [openProject])

    useGSAP(() => {
        const container = containerRef.current
        const cards = container?.querySelectorAll('.projectCard')
        if (!container || !cards) return

        gsap.from(cards, {
            yPercent: 50,
            scale: 0.9,
            opacity: 0,
            stagger: 0.05,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: container,
                start: 'top center',
            }
        })
    })

    return (
        <section ref={containerRef}>
            <Container className="flex justify-center gap-6 flex-wrap py-16">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} className="projectCard" onClick={() => {openDialog(project)}} />
                ))}
            </Container>

            <div className={cn("fixed inset-0 bg-black/90 transition-all duration-300 flex justify-center items-center", (openProject !== null) ? "visible opacity-100": "invisible opacity-0")}>
                <dialog ref={dialogRef} className={cn("relative bg-neutral-900 border border-neutral-800 text-white overflow-hidden rounded-xl w-9/10 mx-auto md:w-lg lg:w-xl")} open>
                    <div className="h-50 mb-2">
                        {openProject && <RenderCover slug={openProject.slug}/>}
                    </div>
                    <div className="px-5 py-5">
                        <p className="font-mono text-teal-300 mb-1">{openProject?.type} Project</p>
                        <h3 className="text-3xl font-bold mb-1">{openProject?.name}</h3>
                        <p className="font-mono text-teal-300 mb-3">{openProject?.year}, {openProject?.company}</p>
                        <p className="text-neutral-300 mb-4">{openProject?.description}</p>

                    </div>

                    <div className="px-5 py-5 border-t border-dashed border-teal-300">
                        <ul className="flex flex-wrap gap-2 items-center justify-center">
                            {openProject?.technologies?.map((tec) => {
                                const technology = icons[tec]
                                const Icon = technology.logo ? technology.logo : Box
                                return (
                                    <div key={`${tec}`} className="text-neutral-700 dark:text-neutral-400 px-1 py-1 relative group dark:hover:text-white">
                                        <Icon className="h-7" />
                                        <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 text-white top-0 bg-black z-10 px-3 py-1 rounded-lg group-hover:-translate-y-8 transition-all duration-200 pointer-events-none">{technology.name}</div>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="flex justify-center px-5 py-5 border-t border-dashed border-teal-300 gap-2">
                        {openProject?.infoUrl && 
                            <Link href={openProject.infoUrl} 
                                className="px-3 py-1 border border-teal-200 text-teal-200 rounded-full flex items-center justify-center flex-1 gap-1 hover:bg-teal-300 hover:text-black hover:border-teal-300"
                            >
                                More Info
                            </Link>
                        }
                        {openProject?.repoUrl && 
                            <a href={openProject.repoUrl} target="_blank"
                                className="px-3 py-1 border border-teal-200 text-teal-200 rounded-full flex items-center justify-center flex-1 gap-1 hover:bg-teal-300 hover:text-black hover:border-teal-300"
                            >
                                Repository <SquareArrowOutUpRight size={12} />
                            </a>
                        }
                        {openProject?.url && 
                            <a href={openProject.url} target="_blank"
                                className="px-3 py-1 border border-teal-200 text-teal-200 rounded-full flex items-center justify-center flex-1 gap-1 hover:bg-teal-300 hover:text-black hover:border-teal-300"
                            >
                                Visit Project <SquareArrowOutUpRight size={12} />
                            </a>
                        }
                        
                    </div>
                </dialog>
                
            </div>



        </section>
    )
}
