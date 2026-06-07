"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { LocaleSwitcher } from "@/components/navbar/LocaleSwitcher";
import { Container } from "@/components/shared/containers";
import { contactLinks } from "@/data/navigation";
import { Link } from "@/i18n/navigation";
import { pub } from "@/lib/publicConfig";

import { Logo } from "../icons/Logo";

const navItems = [
  { key: "home" as const, url: "/" as const },
  { key: "about" as const, url: "/about" as const },
  { key: "projects" as const, url: "/projects" as const },
  { key: "contact" as const, url: "/contact" as const },
];

export const Footer = () => {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="mx-4 border-t border-neutral-800">
      <Container className="md:flex items-start justify-center px-6 py-20">
        <div className="w-full mb-16 md:mb-0 md:flex-1 flex justify-between order-first md:order-last">
          <ul className="overflow-hidden">
            <li className="uppercase font-bold mb-2">{t("links")}</li>
            {navItems.map((item) => (
              <li
                key={item.key}
                className="text-neutral-400 hover:text-teal-100 md:text-lg lg:text-xl mb-1 group"
              >
                <Link href={item.url}>{tNav(item.key)}</Link>
                <div className="h-[1px] w-full bg-teal-100 -translate-x-30 group-hover:translate-x-0 transition-all duration-200"></div>
              </li>
            ))}
          </ul>

          <ul className="overflow-hidden">
            <li className="uppercase font-bold mb-2">{t("contact")}</li>
            {contactLinks.map((link) => (
              <li
                key={link.label}
                className="text-neutral-400 hover:text-teal-100 md:text-lg lg:text-xl mb-1 group"
              >
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
                <div className="h-[1px] w-full bg-teal-100 -translate-x-30 group-hover:translate-x-0 transition-all duration-200"></div>
              </li>
            ))}
          </ul>

          <ul className="overflow-hidden">
            <li className="uppercase font-bold mb-2">{t("resume")}</li>
            <li className="md:text-lg lg:text-xl group mb-1">
              <a
                href={`${pub.BUCKET_URL}/cv/ENG_CV_Luis_Romero_2026.pdf`}
                className="text-neutral-400 hover:text-teal-100"
                target="_blank"
              >
                {t("cvEnglish")}
              </a>
              <div className="h-[1px] w-full bg-teal-100 -translate-x-30 group-hover:translate-x-0 transition-all duration-200"></div>
            </li>
            <li className="md:text-lg lg:text-xl group mb-1">
              <a
                href={`${pub.BUCKET_URL}/cv/ESP_CV_Luis_Romero_2026.pdf`}
                className="text-neutral-400 hover:text-teal-100"
                target="_blank"
              >
                {t("cvSpanish")}
              </a>
              <div className="h-[1px] w-full bg-teal-100 -translate-x-30 group-hover:translate-x-0 transition-all duration-200"></div>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 order-last md:order-first">
          <Logo className="h-20 mb-6" />
          <p className="text-5xl lg:text-6xl font-bold">luiseduromp</p>
          <p className="text-teal-300 text-xl font-mono">{t("tagline")}</p>
          <div className="mt-4">
            <LocaleSwitcher />
          </div>
        </div>
      </Container>
      <div className="py-4 text-center text-sm text-neutral-500 border-t border-neutral-800">
        {new Date().getFullYear()} - luiseduromp.com
      </div>
    </footer>
  );
};
