"use client";

import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LOCALES = ["en", "es"] as const;

export const LocaleSwitcher = ({
  className,
}: React.HTMLAttributes<HTMLElement>) => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="navigation"
      aria-label="Language"
      className={cn("flex items-center gap-2 flex-wrap", className)}
    >
      {LOCALES.map((loc) => {
        const label = loc.toUpperCase();
        const isActive = locale === loc;

        if (isActive) {
          return (
            <span
              key={loc}
              aria-current="true"
              className="px-1 text-teal-100 font-semibold"
            >
              {label}
            </span>
          );
        }

        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            className={cn(
              "text-neutral-400 hover:text-teal-100 hover:font-semibold hover:underline underline-offset-4 decoration-1 transition-all duration-200 px-1",
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};
