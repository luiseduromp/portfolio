import { ContactForm } from "@/components/contact/ContactForm";
import { GlobeSection } from "@/components/contact/GlobeSection";
import { SocialLogos } from "@/components/icons/logos";
import { Container } from "@/components/shared/containers";
import { PageTitle } from "@/components/shared/titles";
import { getCurriculumData } from "@/data/curriculum";
import { pub } from "@/lib/config";
import { cn } from "@/lib/utils";
import { ReCaptchaProvider } from "next-recaptcha-v3"


export default async function Contact() {
  const profile = await getCurriculumData()

  return (
    <ReCaptchaProvider reCaptchaKey={pub.RECAPTCHA_SITE_KEY} >
      <main id="smooth-content">
        <PageTitle>Contact</PageTitle>

        <section>
          <Container className="lg:flex gap-6 items-center py-12">
            <div className="mb-12 text-center lg:text-start lg:mb-0 w-full sm:w-sm lg:w-1/2 mx-auto lg:pe-12">
              <p className="text-neutral-300 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Have an idea in Mind?
              </p>
              <p className="text-neutral-300 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6">
                Let&apos;s build it together
              </p>
              <p className="text-xl text-neutral-300">
                Do you have an idea or project that you need help with? 
                I am open to work and freelance projects.
                Contact me and let&apos;s make it real.</p>

            </div>
            <div className="flex-1">
              <ContactForm className="w-sm mx-auto w-full sm:w-sm lg:w-md"/>
              
            </div>

          </Container>

        </section>

        <section className="mt-20">
          <Container>
            <p className="text-xl lg:text-3xl text-center text-neutral-300 mb-12">Write me an Email, or Contact me on Social Media</p>

            <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
                {profile.contact.map((link) => {
                    const Icon = SocialLogos[link.slug].logo!
                    
                    return (
                        <a key={link.slug} href={link.url} target="_blank" className={cn("relative text-neutral-100 flex gap-2 px-2 items-center rounded-lg size-25 justify-center group",
                          "bg-transparent hover:bg-linear-to-br from-teal-200 to-teal-500 hover:text-neutral-800 transition-all duration-200"
                        )}>
                            <Icon className="h-12" />
                        </a>
                    )
                })}
            </div>

          </Container>
        </section>

        <GlobeSection />

      </main>

    </ReCaptchaProvider>
  );
}