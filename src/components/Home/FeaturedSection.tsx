'use client'

import type { Project } from '@/lib/definitions'
import React, { useRef } from 'react'
import { Container } from '@/components/shared/containers'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { featuredCovers } from '@/lib/media';
import { Info, LinkIcon } from 'lucide-react';
import { useTapHover } from '@/hooks/useTapHover';
import { GitHubLogo } from '../icons/brandIcons';
import { NavButton } from '../buttons/NavButton';
import { SectionTitle } from '../shared/titles';


gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const RenderCover = ({slug}: {slug: string}) => {
    const cover = featuredCovers[slug]
    switch(cover.type){
        case 'logo':
            return (
                <div className="bg-linear-to-br from-white to-neutral-300 flex items-center justify-center w-full py-8 aspect-12/7">
                    <Image src={cover.src} alt={slug} width={300} height={300} className="size-30" />
                </div>
            )
        case 'image':
            return (
                <div className="flex items-center justify-center w-full apect-12/7">
                    <Image src={cover.src} alt={slug} width={300} height={300} className="object-cover" />
                </div>
            )
        case 'video':
            const ext = cover.src.split('.').at(-1)
            return (
                <video muted loop autoPlay preload='auto' className="w-full h-auto rounded-lg">
                    <source src={cover.src} type={`${cover.type}/${ext}`} />
                </video>
            )
    }
}

const ProjectItem = ({ project }: { project: Project } & React.HTMLAttributes<HTMLElement>) => {
    const containerRef = useRef<HTMLElement>(null)
    const coverRef = useRef<HTMLDivElement>(null)

    useTapHover(coverRef)

    useGSAP(() => {
        const container = containerRef.current
        if(!container) return

        const lines = SplitText.create(container.querySelectorAll('.project-info'), { type: 'lines' })

        gsap.set(lines.lines, {
            yPercent: -100,
            autoAlpha: 0,
        })
        gsap.to(lines.lines, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.2,
            stagger: 0.1,
            
            scrollTrigger: {
                trigger: container,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
                end: () => `+=${container.scrollHeight*0.4}`
            }
        })
    })


    return (
        <article ref={containerRef} className="project lg:flex gap-4 py-12 lg:py-20 items-center">
            <div className="mb-6 lg:mb-0 lg:w-1/3">
                <p className="project-info font-mono text-teal-400 mb-1 text-xl">{project.type}</p>
                <h5 className="project-info text-4xl sm:text-5xl font-bold mb-2">{project.name}</h5>
                <p className="project-info text-neutral-400 text-lg mb-3">{project.summary}</p>
                <p className="project-info font-mono text-teal-400 mb-1 text-xl">{project.year}, {project.company}</p>
            </div>

            <div ref={coverRef} key={`img-${project.slug}`} className="lg:flex-1 project-img flex items-center justify-center w-full rounded-xl relative group overflow-hidden">
                <RenderCover slug={project.slug} />

                {(project.url || project.infoUrl || project.repoUrl) && 
                    <div className="absolute inset-0 p-4 opacity-0 bg-black/70 group-hover:opacity-100 group-data-hover:opacity-100 transition-opacity duration-200 flex gap-4 justify-center items-center">
                        {project.infoUrl && 
                            <Link href={project.infoUrl} className={cn("px-1 py-1 size-16 rounded-full text-teal-200 flex gap-2 justify-center items-center text-lg",
                                "hover:border-teal-300 hover:bg-teal-300 hover:text-black translate-y-20 group-hover:translate-y-0 group-data-hover:translate-y-0 transition-all duration-200")}
                            >
                                <Info size={32} />
                            </Link>
                        }
                        {project.url && 
                            <a href={project.url} target='_blank' className={cn("px-1 py-1 size-16 rounded-full text-teal-200 flex gap-2 justify-center items-center text-lg",
                                "hover:border-teal-300 hover:bg-teal-300 hover:text-black translate-y-20 group-hover:translate-y-0 group-data-hover:translate-y-0 transition-all duration-200")}
                            >
                                <LinkIcon size={32} />
                            </a>
                        }
                        {project.repoUrl && 
                            <a href={project.repoUrl} target="_blank" className={cn("px-1 py-1 size-16 rounded-full text-teal-200 flex gap-2 justify-center items-center text-lg",
                                "hover:border-teal-300 hover:bg-teal-300 hover:text-black translate-y-20 group-hover:translate-y-0 group-data-hover:translate-y-0 transition-all duration-200")}
                            >
                                <GitHubLogo className="h-16" />
                            </a>
                        }
 
                    </div>
                }
            </div>                 
        </article>
    )
}

export const FeaturedSection = ({projects}: {projects:Project[]}) => {

    return (
        <section className="py-20">
            <Container>
                <SectionTitle>Featured Projects</SectionTitle>
            </Container>

            <Container>
                {projects.map((project) => (
                    <ProjectItem key={project.slug} project={project} />
                ))}
            </Container>

            <Container className="flex justify-center">
                <NavButton href="/projects" >All Projects</NavButton>
            </Container>
        </section>
    )
}


