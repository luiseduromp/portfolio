import { ExperienceSection } from "@/components/about/ExperienceSection";
import { SkillsSection } from "@/components/about/SkillsSection";
import { Container } from "@/components/shared/containers";
import { PageTitle, SectionTitle } from "@/components/shared/titles";
import { getCurriculumData } from "@/data/curriculum";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `About - luiseduromp.com`,
    description: "About Me, Experience, Education and Skills",
};

const about = `Creative Full Stack Developer, with over 5 years of experience delivering robust, reliable and elegant web applications.
                Currently focused on Web Applications and AI-integrated systems using mainly Python, TypeScript and AWS infrastructure.
                I like to take care of all the details in a project to make it totally functional, and beautiful.`

export default async function About() {
  const profile = await getCurriculumData()

  return (
    <main>
      <PageTitle>About Me</PageTitle>

      <section id="container">
        <Container>
          <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center mb-8 lg:mb-12 font-bold text-teal-200">Developer/ Engineer/ Designer/</h3>
          {about.split('\n').map((paragraph, index) => (
            <p key={`p-${index}`} className="mb-3 font-light text-lg lg:text-xl text-neutral-300">{paragraph}</p>
          ))}
          
        </Container>
      </section>

      <section id="work" className="py-20">
        <Container>
          <SectionTitle>Experience</SectionTitle>
        </Container>

        <ExperienceSection type="work" work={profile.work} />
      </section>

      <section id="education" className="py-20">
        <Container>
          <SectionTitle>Education</SectionTitle>
        </Container>

        <ExperienceSection type="education" education={profile.education} />      
      </section>

      <section id="skills" className="py-20">
        <Container>
          <SectionTitle>Skills</SectionTitle>
        </Container>

        <SkillsSection skillset={profile.skills} />


      </section>
  
    </main>
  );
}