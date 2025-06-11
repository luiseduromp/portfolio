import { cn } from '@/lib/utils'
import { LoaderCircle, Send } from 'lucide-react'
import React from 'react'


interface LoadingButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading: boolean
}

export const LoadingButton: React.FC<LoadingButtonInterface> = ({isLoading, children, className, ...props}) => {
    return (
        <button className={cn("border border-teal-200 rounded-full px-4 py-2 flex items-center group text-teal-200 hover:bg-teal-300",
            "hover:border-teal-300 hover:text-black transition-colors duration-200 cursor-pointer ",
            "disabled:opacity-50 disabled disabled:bg-teal-300 disabled:text-black disabled:border-teal-300", className
        )} {...props} disabled={isLoading}>
            { isLoading ? <><LoaderCircle className="animate-spin me-2 h-5" /> Sending...</> 
                : <><Send strokeWidth={1.5} className="me-2 h-5" /> {children}</> 
            }
        </button>
    )
}