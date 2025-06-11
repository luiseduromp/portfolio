'use client'

import React, { useRef } from 'react'
import { Container } from '@/components/shared/containers'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';
import { cn } from '@/lib/utils';
import { SectionTitle } from '../shared/titles';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);


const workContent = [
    {
        title: "Full Stack",
        desc: "I build web apps from scratch, from Websites and User Interfaces with complete service integrations, to APIs and backend services.",
        stack: ["TypeScript", "JavaScript", "Python", "PHP", "Next.js", "React", "FastAPI", "Node.js", "MySQL", "PostgreSQL", "Git", "GitHub", "Docker", "Kubernetes", "AWS"]
    },
    {
        title: "UX/UI Design",
        desc: "Great applications come with a pleasant design and a seamless user experience. I take care of every detail to deliver the best outcome possible.",
        stack: ["HTML", "CSS", "GSAP", "Motion", "TailwindCSS", "Bootstrap", "Shadcn/ui", "Adobe Photoshop", "Adobe Illustrator"]
    },
    {
        title: "AI & Data",
        desc: "I have worked with AI and integrated LLMs and advanced processing in applications to enhance experience and productivity.",
        stack: ["LangChain", "Vercel AI SDK", "NumPy", "Pandas", "TesorFlow", "Scikit-learn", "Ollama", "Open WebUI"]
    },

]

export const WorkSection = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    

    useGSAP(() => {
        const container = containerRef.current

        if(!container) return

        let offset = 160
        let square = 64
        if (container.offsetWidth >= 768){ 
            offset = 180
            square = 88
        }
        if (container.offsetWidth >= 1024) offset = 200

        const frames = container.querySelectorAll('.frame')
        const [f1, f2, f3, f4] = frames

        gsap.set(f2, { top: offset})
        gsap.set(f3, { top: offset + square})
        gsap.set(f4, { top: offset + square*2})

        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                scrub: true,
                pin: true,
                end: () => `+=2000px`
            }
        })
            .set(frames, { position: 'absolute' })
            .from(f1, { y: 80 })
            .from(f2, { yPercent: 100 }, "<")
            .from(f3, { yPercent: 150 })
            .from(f4, { yPercent: 150 })
    })

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden bg-black">
            <div className="frame pt-20 pb-20 bg-black">
                <Container className="">                    
                    <SectionTitle>My Work</SectionTitle>               
                    <p className="text-2xl md:text-3xl text-neutral-300">
                        I design and develop full stack applications, taking care of the core functionality, the design and making sure the user experience is smooth.
                    </p>                   
                </Container>
            </div>

            {workContent.map((category, index) => {
                // const offset = `top-${initialOffset + index*22}`
                // console.log(offset);

                return (
                    <div key={category.title} className={cn("frame border-t border-neutral-600 pb-30 bg-black w-full")}>
                        <Container >
                            <div className="flex gap-4 items-center mb-6">
                                <div className="w-16 h-16 lg:w-22 lg:h-22 font-mono bg-neutral-900 text-teal-300 flex items-center justify-center text-3xl lg:text-3xl">0{index+1}</div>
                                <h4 className="font-bold text-3xl lg:text-4xl xl:text-5xl">{category.title}</h4>
                            </div>
                            {/* <h4 className="font-bold text-5xl mb-8"><span className="font-mono font-normal text-neutral-500">01</span> Full Stack</h4> */}
                            <div className="md:flex gap-8">
                                <p className="md:w-1/2 mb-4 text-xl text-neutral-300">
                                    {category.desc}
                                </p>
                                <div className="md:flex-1">
                                    <p className="font-bold mb-2 uppercase text-neutral-500">Main Technologies</p>
                                    <div className="flex flex-wrap">
                                        {category.stack.map((tec) => (
                                            <span key={tec} className="text-xl font-semibold text-neutral-300 hover:text-teal-300 lg:text-2xl border-b border-neutral-700 hover:border-teal-200 py-2 pe-2">{tec}</span>
                                        ))}
                                    </div>                        
                                </div>
                            </div>
                        </Container>
                    </div>
                )
            })}

            {/* <div className="frame border-t border-neutral-600 pb-30 bg-black top-56 w-full">
                <Container >
                    <div className="flex gap-4 items-center mb-6">
                        <div className="w-22 h-22 font-mono bg-neutral-900 text-teal-300 flex items-center justify-center text-4xl">01</div>
                        <h4 className="font-bold text-5xl">Full Stack</h4>
                    </div>
                    <div className="flex gap-8">
                        <p className="w-1/2 mb-4 text-xl text-neutral-400">
                            I build web apps from scratch, from Websites and User Interfaces with complete service integrations, to APIs and backend services.
                        </p>
                        <div className="flex-1">
                            <p className="font-bold mb-2 uppercase text-neutral-500">Main Technologies</p>
                            <ul className="text-2xl text-neutral-200 font-semibold">                               
                                <li className="border-b border-neutral-700 py-2">Python, TypeScript, JavaScript, PHP</li>
                                <li className="border-b border-neutral-700 py-2">Next.js, React, FastAPI, Node.js</li>
                                <li className="border-b border-neutral-700 py-2">MySQL, PostgreSQL, Git, GitHub</li>
                                <li className="border-b border-neutral-700 py-2">Docker, Kubernetes, AWS</li>
                            </ul>                          
                        </div>
                    </div>
                </Container>
            </div>

            <div className="frame border-t border-neutral-600 pb-30 bg-black top-78 w-full">
                <Container>
                    <div className="flex gap-4 items-center mb-6">
                        <div className="w-22 h-22 font-mono bg-neutral-900 text-teal-300 flex items-center justify-center text-4xl">02</div>
                        <h4 className="font-bold text-5xl">UI/UX Design</h4>
                    </div>
                    <div className="flex gap-8">
                        <p className="w-1/2 mb-4 text-xl text-neutral-400">
                            Great applications come with a pleasant design and a seamless user experience. I take care of every detail to deliver the best outcome possible.
                        </p>

                        <div className="flex-1">
                            <p className="font-bold mb-2 uppercase text-neutral-500">Main Technologies</p>
                            <ul className="text-2xl text-neutral-200 font-semibold">
                                <li className="border-b border-t border-neutral-700 py-2">GSAP, Bootstrap</li>
                                <li className="border-b border-neutral-700 py-2">TailwindCSS, Bootstrap</li>
                                <li className="border-b border-neutral-700 py-2">A. Photoshop, A. Illustrator</li>
                            </ul>                        
                        </div>
                        
                    </div>
                </Container>
            </div>

            <div className="frame border-t border-neutral-600 pb-30 bg-black top-100 w-full">
                <Container>
                    <div className="flex gap-4 items-center mb-6">
                        <div className="w-22 h-22 font-mono bg-neutral-900 text-teal-300 flex items-center justify-center text-4xl">03</div>
                        <h4 className="font-bold text-5xl">AI & Data</h4>
                    </div>
                    <div className="flex gap-8">
                        <p className="w-1/2 mb-4 text-xl text-neutral-400">
                            I have worked in ML and AI projects integrating LLMs and advanced processing, to enhance productivity.                               
                        </p> 

                        <div className="flex-1">
                            <p className="font-bold mb-2 uppercase text-neutral-500">Main Technologies</p>
                            <ul className="text-2xl text-neutral-200 font-semibold">
                                <li className="border-b border-t border-neutral-700 py-2">Python, LangChain, Vercel AI SDK</li>
                                <li className="border-b border-neutral-700 py-2">NumPy, Pandas, TensorFlow</li>
                                <li className="border-b border-neutral-700 py-2">Ollama, Open WebUI</li>
                            </ul>                          
                        </div> 
                    </div>
                </Container>
            </div> */}

        </section>
    )
}