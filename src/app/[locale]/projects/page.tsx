import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { Container } from "@/components/shared/containers";
import { PageTitle } from "@/components/shared/titles";
import { getCurriculumData } from "@/data/curriculum";
import { getPageAlternates } from "@/lib/metadata";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getPageAlternates("/projects", locale),
  };
}

export default async function Projects({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const profile = await getCurriculumData();

  return (
    <main>
      <PageTitle>{t("pageTitle")}</PageTitle>

      <Container className="mb-12">
        <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 w-full md:w-3/4 lg:w-1/2 mx-auto text-center">
          {t("description")}
        </p>
      </Container>

      <ProjectsSection projects={profile.projects} />
    </main>
  );
}
