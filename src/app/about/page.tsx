import { ExperienceSection } from "@/components/about/ExperienceSection";
import { SkillsSection } from "@/components/about/SkillsSection";
import { Container } from "@/components/shared/containers";
import { PageTitle, SectionTitle } from "@/components/shared/titles";
import { getCurriculumData } from "@/data/curriculum";


export default async function About() {
  const profile = await getCurriculumData()

  return (
    <main>
      
      <PageTitle>About Me</PageTitle>

      <section id="container">
        <Container>
          <p className="mb-4 font-light text-lg lg:text-xl text-neutral-300">I consider myself a creative builder by nature and I have found my passion in software development.</p>
          <p className="mb-4 font-light text-lg lg:text-xl text-neutral-300">I like to take care of all the details in a project to make it totally functional, and beautiful.</p>
          <p className="mb-4 font-light text-lg lg:text-xl text-neutral-300">Having worked as a full stack developer for over 5 years has helped me develop strong skills for optimal 
            developments and a good taste for beautiful designs 
          </p>
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