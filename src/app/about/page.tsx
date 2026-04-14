import type { Metadata } from "next";

import { ExperienceSection } from "@/components/about/ExperienceSection";
import { SkillsSection } from "@/components/about/SkillsSection";
import { Container } from "@/components/shared/containers";
import { PageTitle, SectionTitle } from "@/components/shared/titles";
import { getAboutContent } from "@/content/about";
import { getCurriculumData } from "@/data/curriculum";

export const metadata: Metadata = {
  title: `About - luiseduromp.com`,
  description: "About Me, Experience, Education and Skills",
};

type AboutPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function About({ searchParams }: AboutPageProps) {
  const profile = await getCurriculumData();
  const resolvedSearchParams = await searchParams;
  const content = getAboutContent(resolvedSearchParams?.lang);

  return (
    <main>
      <PageTitle>{content.pageTitle}</PageTitle>

      <section id="container">
        <Container>
          <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center mb-8 lg:mb-12 font-bold text-teal-200">
            {content.headline}
          </h3>
          {content.bio.map((paragraph, index) => (
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
          <SectionTitle>{content.sections.experience}</SectionTitle>
        </Container>

        <ExperienceSection type="work" work={profile.work} />
      </section>

      <section id="education" className="py-20">
        <Container>
          <SectionTitle>{content.sections.education}</SectionTitle>
        </Container>

        <ExperienceSection type="education" education={profile.education} />
      </section>

      <section id="skills" className="py-20">
        <Container>
          <SectionTitle>{content.sections.skills}</SectionTitle>
        </Container>

        <SkillsSection skillset={profile.skills} />
      </section>
    </main>
  );
}
