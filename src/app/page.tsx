

import TextScroll from "@/components/Home/TextScroll"
import { getCurriculumData } from "@/data/curriculum"
import { Hero } from "@/components/Home/Hero"
import { WorkSection } from "@/components/Home/WorkSection"
import { FeaturedSection } from "@/components/Home/FeaturedSection"
import ContactCard from "@/components/contact/ContactCard"
import { AboutIntro } from "@/components/Home/AboutIntro"

export default async function Home() {
  const profile = await getCurriculumData()
  const featured = ['bayas-freire-website', 'midokura-rag', 'ingelin-website', 'ingelin-management']
  const featuredProjects = profile.projects.filter((project) => featured.includes(project.slug))

  return (
    <main>
      <Hero variant="dark" />

      <WorkSection />

      <TextScroll className="py-20">
          I take care of every detail in my projects to deliver high quality web applications with flawless designs and user experience.       
      </TextScroll>

      <FeaturedSection projects={featuredProjects} />

      <AboutIntro />

      <ContactCard contactLinks={profile.contact} />

    </main>
  );
}
