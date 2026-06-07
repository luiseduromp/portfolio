import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/shared/containers";
import { PageTitle } from "@/components/shared/titles";
import { getPageAlternates } from "@/lib/metadata";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getPageAlternates("/privacy", locale),
  };
}

export default async function Privacy({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <main className="pb-24">
      <PageTitle>{t("pageTitle")}</PageTitle>

      <Container className="max-w-2xl mx-auto">
        <p className="text-neutral-500 text-sm font-mono mb-10">
          {t("lastUpdated")}
        </p>

        <p className="text-neutral-300 text-lg mb-12">{t("intro")}</p>

        <Section title={t("collectedTitle")}>
          <ul className="space-y-3">
            {(t.raw("collectedItems") as string[]).map((item, i) => (
              <li key={i} className="text-neutral-400 flex gap-3">
                <span className="text-teal-500 mt-1 shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("cookiesTitle")}>
          <ul className="space-y-3">
            {(t.raw("cookiesItems") as string[]).map((item, i) => (
              <li key={i} className="text-neutral-400 flex gap-3">
                <span className="text-teal-500 mt-1 shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("thirdPartyTitle")}>
          <ul className="space-y-3">
            <li className="text-neutral-400 flex gap-3">
              <span className="text-teal-500 mt-1 shrink-0">—</span>
              <span>
                {t("thirdPartyRecaptcha")}{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-400 hover:text-teal-200 underline underline-offset-2"
                >
                  {t("thirdPartyPrivacy")}
                </a>{" "}
                {t("thirdPartyAnd")}{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-400 hover:text-teal-200 underline underline-offset-2"
                >
                  {t("thirdPartyTerms")}
                </a>
                .
              </span>
            </li>
            {(t.raw("thirdPartyItems") as string[]).map((item, i) => (
              <li key={i} className="text-neutral-400 flex gap-3">
                <span className="text-teal-500 mt-1 shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("rightsTitle")}>
          <p className="text-neutral-400">
            {t("rightsBody")}{" "}
            <a
              href="mailto:luiseduromp@gmail.com"
              className="text-teal-400 hover:text-teal-200 underline underline-offset-2"
            >
              luiseduromp@gmail.com
            </a>
          </p>
        </Section>

        <Section title={t("contactTitle")}>
          <p className="text-neutral-400">
            {t("contactBody")}{" "}
            <a
              href="mailto:luiseduromp@gmail.com"
              className="text-teal-400 hover:text-teal-200 underline underline-offset-2"
            >
              luiseduromp@gmail.com
            </a>
          </p>
        </Section>
      </Container>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-neutral-100 mb-4">{title}</h2>
      {children}
    </section>
  );
}
