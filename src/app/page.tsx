

import TextScroll from "@/components/Home/TextScroll"
import { getCurriculumData } from "@/data/curriculum"
import { Hero } from "@/components/Home/Hero"
import { WorkSection } from "@/components/Home/WorkSection"
import { FeaturedSection } from "@/components/Home/FeaturedSection"
import { AboutIntro } from "@/components/Home/AboutIntro"
import { SectionTitle } from "@/components/shared/titles"
import { ContactCard } from "@/components/contact/ContactCard"
import { ContactIcons } from "@/components/icons/brandIcons"
import { Container } from "@/components/shared/containers"
import { cn } from "@/lib/utils"

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

      <section className="py-20">
        <Container>
          <SectionTitle>Contact</SectionTitle>
          <p className="text-xl lg:text-2xl text-center text-neutral-300 mb-1">
              I am open to work and freelance projects.
          </p>
          <p className="text-xl lg:text-2xl text-center text-neutral-300 mb-8">
              Write me an Email, or Contact me on Social Media
          </p>

          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            {profile.contact.map((link) => {
                const Icon = ContactIcons[link.network]
                
                return (
                    <a key={link.network} href={link.url} target="_blank" className={cn("relative text-neutral-100 flex gap-2 px-2 items-center rounded-lg size-20 justify-center group",
                    "bg-transparent hover:bg-linear-to-br from-teal-300 to-teal-500 hover:text-neutral-800 transition-all duration-200"
                    )}>
                        <Icon className="h-10" />
                    </a>
                )
            })}
          </div>
        </Container>

        <ContactCard />
      </section>

    </main>
  );
}
