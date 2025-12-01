"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Logo } from "@/components/icons/Logo";
import { NavMenu } from "@/components/navbar/NavMenu";

export const Navbar = () => {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 items-start flex items-start p-5 justify-between z-50 gap-1 w-full",
      )}
    >
      <Link href="/" className="p-1 bg-black/50 rounded-sm backdrop-blur-lg">
        <Logo className={cn("transition-all duration-300 h-12")} />
      </Link>

      <NavMenu className="z-50 rounded-sm" />
    </nav>
  );
};
