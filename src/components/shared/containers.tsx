import React from "react"

import { cn } from "@/lib/utils"

export const Container = ({ className, children, ...props }: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div className={cn("w-full px-4 md:px-0 mx-auto md:w-11/12 lg:w-5/6", className)} {...props}>
            { children }
        </div>
    )

}