"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReCaptcha } from "next-recaptcha-v3";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CustomFormField } from "@/components/contact/CustomFormField";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { LoadingButton } from "../buttons/LoadingButton";

export const ContactForm = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<"sent" | "error" | null>(null);
  const { executeRecaptcha } = useReCaptcha();
  const t = useTranslations("contactForm");

  const formSchema = z.object({
    name: z.string().min(2, { message: t("nameValidation") }),
    email: z.string().email({ message: t("emailValidation") }),
    message: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const token = await executeRecaptcha("contact_form");
      if (!token) return;

      setIsLoading(true);
      try {
        await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, token }),
        });
        setFormStatus("sent");
        form.reset();
      } catch {
        console.log("Error");
        setFormStatus("error");
      } finally {
        setIsLoading(false);
      }
    },
    [executeRecaptcha, form],
  );

  return (
    <div
      className={cn(
        "px-8 py-8 bg-neutral-900 rounded-xl border border-neutral-800",
        className,
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h3 className="text-center mb-4 text-xl md:text-2xl lg:text-4xl font-bold">
            {t("title")}
          </h3>
          <p className="text-neutral-300 text-lg lg:text-xl mb-6 text-center">
            {t("subtitle")}
          </p>

          <CustomFormField
            control={form.control}
            fieldtype="input"
            name="name"
            label={t("nameLabel")}
            placeholder={t("namePlaceholder")}
          />

          <CustomFormField
            control={form.control}
            fieldtype="input"
            name="email"
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
          />

          <CustomFormField
            control={form.control}
            fieldtype="textarea"
            name="message"
            label={t("messageLabel")}
            placeholder={t("messagePlaceholder")}
          />

          {formStatus && (
            <div
              className={cn(
                "px-4 py-2 transition-all duration-300 justify-center items-center rounded-full invisible mb-4 text-black flex",
                formStatus === "sent"
                  ? "bg-teal-200 visible"
                  : "bg-red-600 text-white visible",
              )}
            >
              {formStatus === "sent" ? (
                <>
                  <Check className="h-6 me-1" /> {t("success")}
                </>
              ) : (
                <>
                  <CircleX className="h-6 me-1" /> {t("error")}
                </>
              )}
            </div>
          )}

          <LoadingButton
            isLoading={isLoading}
            type="submit"
            className="w-full justify-center mt-8 mb-6"
          >
            {t("send")}
          </LoadingButton>

          <div className="text-neutral-400 text-xs">
            {t("recaptchaPrefix")}&nbsp;
            <a
              href="https://policies.google.com/privacy"
              className="underline underline-offset-2"
            >
              {t("privacyPolicy")}
            </a>{" "}
            and&nbsp;
            <a
              href="https://policies.google.com/terms"
              className="underline underline-offset-2"
            >
              {t("termsOfService")}
            </a>{" "}
            {t("recaptchaSuffix")}
          </div>
        </form>
      </Form>
    </div>
  );
};
