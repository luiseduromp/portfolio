import { cn } from "@/lib/utils";
import Link from "next/link";


interface GradientButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export const GlowButton = ({ href, className, children, ...props }: GradientButtonProps) => {
    return (
        <Link href={href} className={cn("px-5 py-3 dark:bg-black rounded-xl relative transition-all duration-100 ",
            "before:absolute before:inset-0 before:bg-linear-to-bl before:from-sky-400 before:to-emerald-400 before:blur-lg ",
            "before:-z-10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300", 
            className)} 
            {...props}
        >
            {children}
        </Link>
    )
}