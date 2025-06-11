
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { PageTitle } from "@/components/shared/titles";
import { getCurriculumData } from "@/data/curriculum";

export default async function Projects() {
    const profile = await getCurriculumData()

    return (
        <main>
            <PageTitle>Projects</PageTitle>

            {/* <DotGrid /> */}

            <ProjectsSection projects={profile.projects} />

        </main>
    );
}