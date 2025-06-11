'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const DotGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<HTMLDivElement[]>([]);
    const centresRef = useRef<{el:HTMLDivElement, x:number, y:number}[]>([]);

    const { contextSafe } = useGSAP({ scope: containerRef })

    const DOT_SIZE = 4
    const GAP = 12

    const buildGrid = contextSafe(() => {
        const container = containerRef.current
        if(!container) return

        container.innerHTML = "";
        dotsRef.current = [];
        centresRef.current = [];

        const { clientWidth: w, clientHeight: h } = container
        
        const cols = Math.floor((w + GAP) / (DOT_SIZE + GAP));
        const rows = Math.floor((h + GAP) / (DOT_SIZE + GAP));
        //console.log(`w:${w}, h:${h}, cols:${cols}, rows:${rows}`)
        const total = cols * rows;

        for(let i=0; i<total; i++){
            const dot = document.createElement('div')
            dot.className = "rounded-full will-change-contents bg-neutral-500";
            dot.style.width = `${DOT_SIZE}px`;
            dot.style.height = `${DOT_SIZE}px`;
            dot.style.transformOrigin = "center";
            dot.style.willChange = "transform,background-color";
            gsap.set(dot, { x: 0, y: 0 });
            container.append(dot)
            dotsRef.current.push(dot)
        }

        requestAnimationFrame(() => {
            centresRef.current = dotsRef.current.map((el) => {
                const r = el.getBoundingClientRect();
                return {
                    el,
                    x: r.left + window.scrollX + r.width / 2,
                    y: r.top + window.scrollY + r.height / 2,
                };
            });
        })
    })

    useEffect(() => {
        buildGrid()
        const ro = new ResizeObserver(buildGrid);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [])

    useGSAP(() => {

    })


    return (
        <div className="flex justify-center items-center w-full h-50 relative">
            <div ref={containerRef} className="w-full absolute inset-0 flex flex-wrap gap-[12px]">
            
            </div>
        </div>
        
    )
}

export default DotGrid