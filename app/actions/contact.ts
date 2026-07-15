"use server";

import { Resend } from "resend";
import { SITE } from "@/lib/site";
import { contactEmailHtml } from "@/lib/contact-email";

export type ContactState = {
  status: "idle" | "success" | "error" | "invalid";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot anti-spam : si ce champ caché est rempli, c'est un bot.
  if (String(formData.get("company") || "").trim() !== "") {
    return { status: "success" };
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return { status: "invalid" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY manquant : configure-le dans .env.local et sur Vercel.");
    return { status: "error" };
  }

  try {
    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO || SITE.email;

    const { error } = await resend.emails.send({
      // Sur le plan gratuit sans domaine vérifié, garde cet expéditeur.
      // Une fois ton domaine vérifié sur Resend, remplace par une adresse @ton-domaine.
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `[Portfolio] ${subject || "Nouveau message"} (${name})`,
      text: `Nom : ${name}\nEmail : ${email}\nSujet : ${subject || "(aucun)"}\n\n${message}`,
      html: contactEmailHtml({ name, email, subject, message }),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return { status: "error" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("[contact] exception:", err);
    return { status: "error" };
  }
}
