'use client'

import React, { useRef } from 'react'
import { Container } from '@/components/shared/containers'
import Image from 'next/image'
import { companyLogos, universityLogos } from '@/lib/logos'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';

import type { Education, Work } from '@/lib/definitions'


gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const WorkItem = ({ item, ...props }: { item: Work } & React.HTMLAttributes<HTMLDivElement>) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const container = containerRef.current
        if(!container) return

        const dot = container.querySelector('.timeline-dot')
        const date = container.querySelector('.timeline-date')
        const info = container.querySelectorAll('.timeline-info')

        const split = SplitText.create(info, { type: 'lines', mask: 'lines' })

        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 70%',
                end: () => `+=${container.scrollHeight}`,
                toggleActions: 'play none none reverse'
            }
        })
            .from(dot, {
                scale: 0, 
                opacity: 0,
                stagger: 1
            })
            .from(date, {
                scale: 0.7,
                filter: 'blur(20px)',
                opacity: 0,
                yPercent: 10,
                duration: 0.3,
                stagger: 1
            }, '<')
            .from(split.lines, {
                yPercent: 100,
                stagger: 0.05,
                duration: 0.3,
                mask: 'lines',
                ease: 'power1.out',
                opacity: 0.1
            }, '<')

    }) 

    return (
        <div ref={containerRef} className="md:flex items-center gap-6 relative mb-12 md:mb-0" {...props}>
            <div className="timeline-dot absolute left-2 md:left-60 lg:left-80 top-16 -translate-x-1/2 size-6 bg-neutral-300 rounded-full"></div>

            <div className="timeline-date flex items-center py-6 px-8 md:block md:w-60 lg:w-80 md:text-center">
                <Image src={companyLogos[item.slug]} height={100} width={100} alt={item.company} className="h-16 mx-auto mb-1" />
                <div className="flex-1 px-4 lg:px-0">
                    <h4 className="text-6xl lg:text-8xl text-neutral-500 font-light">{item.endDate.split('-')[0]}</h4>
                    <p className="text-xl">{item.startDate.split('-')[0]} - {item.endDate.split('-')[0]}</p>                 
                </div>
            </div>

            <div className="flex-1 md:py-16 px-8 ">
                <h4 className="timeline-info text-3xl font-bold mb-1">{item.company}</h4>
                <p className="timeline-info text-xl mb-1">{item.location.city}, {item.location.country}</p>
                <p className="timeline-info mb-4 text-xl text-teal-300">{item.position}</p>

                <h5 className="timeline-info text-neutral-500 uppercase font-bold mb-1">Description</h5>
                <ul>
                    {item.tasks && item.tasks.map((task, index) => (
                        <li key={`t-${index}`} className="timeline-info text-neutral-300 text-lg">{task}</li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

const EducationItem = ({ item, ...props }: { item: Education } & React.HTMLAttributes<HTMLDivElement>) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const container = containerRef.current
        if(!container) return

        const dot = container.querySelector('.timeline-dot')
        const date = container.querySelector('.timeline-date')
        const info = container.querySelectorAll('.timeline-info')

        const split = SplitText.create(info, { type: 'lines', mask: 'lines' })

        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 70%',
                end: () => `+=${container.scrollHeight}`,
                toggleActions: 'play none none reverse'
            }
        })
            .from(dot, {
                scale: 0, 
                opacity: 0,
                stagger: 1
            })
            .from(date, {
                scale: 0.7,
                filter: 'blur(20px)',
                opacity: 0,
                yPercent: 10,
                duration: 0.3,
                stagger: 1
            }, '<')
            .from(split.lines, {
                yPercent: 100,
                stagger: 0.05,
                duration: 0.3,
                mask: 'lines',
                ease: 'power1.out',
                opacity: 0.1
            }, '<')

    })

    return (
        <div ref={containerRef} className="md:flex items-center gap-6 relative mb-12 md:mb-0" {...props}>
            <div className="timeline-dot absolute left-2 md:left-60 lg:left-80 top-16 -translate-x-1/2 size-6 bg-neutral-300 rounded-full"></div>

            <div className="timeline-date flex items-center py-6 px-8 md:block md:w-60 lg:w-80 md:text-center">
                <Image src={universityLogos[item.slug]} height={100} width={100} alt={item.institution} className="h-16 md:mx-auto mb-1" />
                <div className="flex-1 px-4 lg:px-0">
                    <h4 className="text-6xl lg:text-8xl text-neutral-500 font-light">{item.endDate.split('-')[0]}</h4>
                    <p className="text-xl">{item.startDate.split('-')[0]} - {item.endDate.split('-')[0]}</p>                 
                </div>
            </div>

            <div className="flex-1 md:py-16 ps-8">
                <h4 className="timeline-info text-3xl font-bold mb-1">{item.institution}</h4>
                <p className="timeline-info text-xl mb-1">{item.location.city}, {item.location.country}</p>
                <p className="timeline-info mb-1 text-xl text-teal-300">{item.degree}, {item.major}</p>
                <p className="timeline-info mb-3 text-neutral-300">Specialized in {item.minor}</p>
            </div>
        </div>
    )

}

export const ExperienceSection = ({ type, work, education }: { type: 'work' | 'education', work?: Work[], education?: Education[] }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const container = containerRef.current
        if(!container) return

        const line = container.querySelector('.timeline-line')

        gsap.from(line, {
            height: 0,
            scrollTrigger: {
                trigger: container,
                start: 'top center',
                end: () => `+=${container.scrollHeight}`,
                scrub: true
            }
        })
    })

    return (
        <Container ref={containerRef} className="relative">
            <div className="timeline-line absolute w-11 h-full border-l-2 border-dotted border-neutral-500 left-6 md:left-60 lg:left-80"></div>

            {type === 'work' && work && work.map((exp) => (
                <WorkItem key={exp.slug} item={exp} />
            ))}

            {type === 'education' && education && education.map((exp) => (
                <EducationItem key={exp.slug} item={exp} />
            ))}

        </Container>
    )
}