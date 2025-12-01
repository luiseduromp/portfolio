import {
  EmailTemplate,
  ContactFormInterface,
} from "@/components/email/EmailTemplate";
import { Resend } from "resend";
import { env } from "@/lib/config";
import { captchaVerify } from "@/lib/captchaVerify";

interface ContactRequestInterface extends ContactFormInterface {
  token?: string;
}

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
  const formData: ContactRequestInterface = await request.json();
  const token = formData.token;

  if (!token) {
    return Response.json(
      { success: false, message: "No ReCAPTCHA Token" },
      { status: 400 },
    );
  }

  const captchaResponse = await captchaVerify(token);

  if (!captchaResponse.success) {
    console.log(captchaResponse.message);
    return Response.json(
      { success: false, message: "ReCAPTCHA Verify Error" },
      { status: 400 },
    );
  }

  delete formData.token;

  const { error } = await resend.emails.send({
    from: `Notification Service <${env.RESEND_EMAIL_FROM}>`,
    to: [env.RESEND_EMAIL_TO],
    subject: "New Message from Portfolio Website",
    react: EmailTemplate(formData),
  });

  if (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }

  return Response.json(
    { success: true, message: "Message Sent" },
    { status: 200 },
  );
}
