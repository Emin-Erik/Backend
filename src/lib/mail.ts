import { Resend } from "resend";
import * as fs from "fs";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

const readHtmlFile = (filePath: string): string => {
  return fs.readFileSync(filePath, "utf-8");
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const htmlContent = readHtmlFile("./src/components/mail/token-mail.html");
  await resend.emails.send({
    from: "admin@web.axiom-me.com",
    to: email,
    subject: "2FA Code",
    html: htmlContent.replace("${token}", token),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "admin@web.axiom-me.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "admin@web.axiom-me.com",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
