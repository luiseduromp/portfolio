import { cn } from "@/lib/utils";

interface ToggleButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  isLight?: boolean;
}

export const MenuToggle = ({
  isOpen,
  isLight,
  className,
  ...props
}: ToggleButtonInterface) => {
  return (
    <button
      className={cn(
        "text-neutral-800 size-14 absolute right-5 z-50 ml-auto transition-all duration-200 opacity-100 top-5 rounded-sm",
        isOpen ? "bg-transparent" : "bg-black/50 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      <div className="w-8 h-[24px] relative mx-auto cursor-pointer">
        <span
          className={cn(
            "block absolute h-[3px] w-full bg-neutral-700 rounded-full transition-all duration-250 top-0",
            isLight ? "bg-neutral-700" : "bg-neutral-200",
            isOpen ? "opacity-0" : "opacity-100",
          )}
        ></span>
        <span
          className={cn(
            "block absolute h-[3px] w-full bg-neutral-700 rounded-full transition-all duration-250 top-[10px]",
            isLight ? "bg-neutral-700" : "bg-neutral-200",
            isOpen ? "rotate-45 bg-white" : "rotate-0",
          )}
        ></span>
        <span
          className={cn(
            "block absolute h-[3px] w-full bg-neutral-700 rounded-full transition-all duration-250 top-[10px]",
            isLight ? "bg-neutral-700" : "bg-neutral-200",
            isOpen ? "-rotate-45 bg-white" : "rotate-0",
          )}
        ></span>
        <span
          className={cn(
            "block absolute h-[3px] w-full bg-neutral-700 rounded-full transition-all duration-250 top-[20px]",
            isLight ? "bg-neutral-700" : "bg-neutral-200",
            isOpen ? "opacity-0" : "opacity-100",
          )}
        ></span>
      </div>
    </button>
  );
};
