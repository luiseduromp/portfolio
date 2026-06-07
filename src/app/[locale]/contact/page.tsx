import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ReCaptchaProvider } from "next-recaptcha-v3";

import { ContactForm } from "@/components/contact/ContactForm";
import { GlobeSection } from "@/components/contact/GlobeSection";
import { ContactIcons } from "@/components/icons/brandIcons";
import { Container } from "@/components/shared/containers";
import { PageTitle } from "@/components/shared/titles";
import { getCurriculumData } from "@/data/curriculum";
import { getPageAlternates } from "@/lib/metadata";
import { pub } from "@/lib/publicConfig";
import { cn } from "@/lib/utils";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getPageAlternates("/contact", locale),
  };
}

export default async function Contact({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const profile = await getCurriculumData();

  return (
    <ReCaptchaProvider reCaptchaKey={pub.RECAPTCHA_SITE_KEY}>
      <main id="smooth-content">
        <PageTitle>{t("pageTitle")}</PageTitle>

        <section>
          <Container className="lg:flex gap-6 items-center py-12">
            <div className="mb-12 text-center lg:text-start lg:mb-0 w-full sm:w-sm lg:w-1/2 mx-auto lg:pe-12">
              <p className="text-neutral-300 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {t("heading1")}
              </p>
              <p className="text-neutral-300 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6">
                {t("heading2")}
              </p>
              <p className="text-xl text-neutral-300 mb-2">{t("body1")}</p>
              <p className="text-xl text-neutral-300">{t("body2")}</p>
            </div>
            <div className="flex-1">
              <ContactForm className="w-sm mx-auto w-full sm:w-sm lg:w-md" />
            </div>
          </Container>
        </section>

        <section className="mt-20">
          <Container>
            <p className="text-xl lg:text-3xl text-center text-neutral-300 mb-12">
              {t("socialText")}
            </p>

            <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
              {profile.contact.map((link) => {
                const Icon = ContactIcons[link.network];

                return (
                  <a
                    key={link.network}
                    href={link.url}
                    target="_blank"
                    className={cn(
                      "relative text-neutral-100 flex gap-2 px-2 items-center rounded-lg size-25 justify-center group",
                      "bg-transparent hover:bg-linear-to-br from-teal-200 to-teal-500 hover:text-neutral-800 transition-all duration-200",
                    )}
                  >
                    <Icon className="h-12" />
                  </a>
                );
              })}
            </div>
          </Container>
        </section>

        <GlobeSection />
      </main>
    </ReCaptchaProvider>
  );
}
