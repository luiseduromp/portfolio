export const env = {
    RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET!,
    RECAPTCHA_URL: process.env.RECAPTCHA_URL!,
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
    RESEND_EMAIL_FROM: process.env.RESEND_EMAIL_FROM!,
    RESEND_EMAIL_TO: process.env.RESEND_EMAIL_TO!,
    CHATBOT_URL: process.env.CHATBOT_URL!,
    CHATBOT_USERNAME: process.env.CHATBOT_USERNAME!,
    CHATBOT_PASSWORD: process.env.CHATBOT_PASSWORD!
}

export const pub = {
    BUCKET_URL: process.env.NEXT_PUBLIC_BUCKET_URL!,
    RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
}