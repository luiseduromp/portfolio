import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ContactCard } from "@/components/contact/ContactCard";
import { AboutIntro } from "@/components/home/AboutIntro";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { Hero } from "@/components/home/Hero";
import TextScroll from "@/components/home/TextScroll";
import { WorkSection } from "@/components/home/WorkSection";
import { ContactIcons } from "@/components/icons/brandIcons";
import { Container } from "@/components/shared/containers";
import { SectionTitle } from "@/components/shared/titles";
import { getCurriculumData } from "@/data/curriculum";
import { getPageAlternates } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: getPageAlternates("", locale) };
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homeContact" });

  const profile = await getCurriculumData();
  const featured = [
    "bayas-freire-website",
    "midokura-rag",
    "ingelin-website",
    "ingelin-management",
  ];
  const featuredProjects = profile.projects.filter((project) =>
    featured.includes(project.id),
  );

  return (
    <main>
      <Hero variant="dark" />

      <WorkSection />

      <TextScroll className="py-20" />

      <FeaturedSection projects={featuredProjects} />

      <AboutIntro />

      <section className="py-20">
        <Container>
          <SectionTitle>{t("sectionTitle")}</SectionTitle>
          <p className="text-xl lg:text-2xl text-center text-neutral-300 mb-1">
            {t("helpText")}
          </p>
          <p className="text-xl lg:text-2xl text-center text-neutral-300 mb-8">
            {t("socialText")}
          </p>

          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            {profile.contact.map((link) => {
              const Icon = ContactIcons[link.network];

              return (
                <a
                  key={link.network}
                  href={link.url}
                  target="_blank"
                  className={cn(
                    "relative text-neutral-100 flex gap-2 px-2 items-center rounded-lg size-20 justify-center group",
                    "bg-transparent hover:bg-linear-to-br from-teal-300 to-teal-500 hover:text-neutral-800 transition-all duration-200",
                  )}
                >
                  <Icon className="h-10" />
                </a>
              );
            })}
          </div>
        </Container>

        <ContactCard />
      </section>
    </main>
  );
}
