import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ExperienceSection } from "@/components/about/ExperienceSection";
import { SkillsSection } from "@/components/about/SkillsSection";
import { Container } from "@/components/shared/containers";
import { PageTitle, SectionTitle } from "@/components/shared/titles";
import { getCurriculumData } from "@/data/curriculum";
import { getPageAlternates } from "@/lib/metadata";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getPageAlternates("/about", locale),
  };
}

export default async function About({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const profile = await getCurriculumData();

  return (
    <main>
      <PageTitle>{t("pageTitle")}</PageTitle>

      <section id="container">
        <Container>
          <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center mb-8 lg:mb-12 font-bold text-teal-200">
            {t("headline")}
          </h3>
          {(t.raw("bio") as string[]).map((paragraph, index) => (
            <p
              key={`p-${index}`}
              className="mb-3 font-light text-lg lg:text-xl text-neutral-300"
            >
              {paragraph}
            </p>
          ))}
        </Container>
      </section>

      <section id="work" className="py-20">
        <Container>
          <SectionTitle>{t("experience")}</SectionTitle>
        </Container>

        <ExperienceSection type="work" work={profile.work} />
      </section>

      <section id="education" className="py-20">
        <Container>
          <SectionTitle>{t("education")}</SectionTitle>
        </Container>

        <ExperienceSection type="education" education={profile.education} />
      </section>

      <section id="skills" className="py-20">
        <Container>
          <SectionTitle>{t("skills")}</SectionTitle>
        </Container>

        <SkillsSection skillset={profile.skills} />
      </section>
    </main>
  );
}
