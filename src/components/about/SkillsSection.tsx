'use client'

import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';
import { Container } from '@/components/shared/containers'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);


interface SkillSet {
    category: string
    skills: string[]
}

const SkillItem = ({skill, ind, ...props}: {skill:SkillSet, ind:number} & React.HTMLAttributes<HTMLDivElement>) => {
    const skillRef = useRef<HTMLDivElement>(null)
    
    useGSAP(() => {
        const skill = skillRef.current
        if(!skill) return

        const divider = skill.querySelectorAll(".skill-divider")
        const category = skill.querySelectorAll(".skill-category")
        const item = skill.querySelectorAll('.skill-item')

        gsap.timeline({
            scrollTrigger: {
                trigger: skill,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
            }
        })
            .from(divider, {opacity: 0, xPercent:-100, duration:0.3})
            .from(category, {yPercent:50, opacity:0, stagger:0.1, duration:0.2}, "<")
            .from(item, {yPercent: 50, opacity: 0, duration:0.05, stagger:0.05})
    })

    return (
        <div ref={skillRef} key={skill.category} className="skill-set md:flex items-center gap-4 py-16 relative overflow-hidden" {...props}>
            <div className="w-full justify-center md:w-1/2 md:justify-start xl:w-1/3 flex items-center gap-3 mb-4 md:mb-0">
                <h3 className="skill-category font-mono text-2xl text-teal-300 md:text-4xl lg:text-6xl">0{ind}/</h3>
                <h3 className="skill-category text-2xl md:text-3xl font-bold">{skill.category}</h3>               
            </div>
            <ul className="flex-1 flex flex-wrap">
                {skill.skills.map((skill) => {
                    return(
                    <li key={skill} className="skill-item text-lg lg:text-xl px-2 py-1 border-b border-neutral-500 text-neutral-300 hover:text-teal-300 hover:border-teal-300">
                        {skill}
                    </li>
                    )
                })}
            </ul>
            <div className="skill-divider absolute bottom-0 w-full mx-auto h-[1px] bg-neutral-400"></div>
        </div>
    )
}

export const SkillsSection = ({skillset, ...props}: {skillset: SkillSet[]} & React.HTMLAttributes<HTMLDivElement>) => {

    return (
        <Container {...props}>
            {skillset.map((skill, index) => (
                <SkillItem key={skill.category} skill={skill} ind={index+1} />
            ))}
        </Container>
    )
}
