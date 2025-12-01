import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { Container } from "@/components/shared/containers";
import { PageTitle } from "@/components/shared/titles";
import { getCurriculumData } from "@/data/curriculum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Projects - luiseduromp.com`,
  description: "A selection of my most recent and relevant projects",
};

export default async function Projects() {
  const profile = await getCurriculumData();

  return (
    <main>
      <PageTitle>Projects</PageTitle>

      <Container className="mb-12">
        <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 w-full md:w-3/4 lg:w-1/2 mx-auto text-center">
          A selection of my most recent and relevant projects
        </p>
      </Container>

      <ProjectsSection projects={profile.projects} />
    </main>
  );
}
