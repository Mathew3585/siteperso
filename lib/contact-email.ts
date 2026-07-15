import { SITE } from "./site";

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Email HTML compatible boîtes mail (tables + styles inline), aux couleurs du portfolio.
 */
export function contactEmailHtml({ name, email, subject, message }: ContactEmailData): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || "(aucun sujet)");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const accent = "#c26b3d";
  const accentStrong = "#a9572e";
  const cream = "#faf6f0";
  const surface = "#ffffff";
  const border = "#e4d8c7";
  const ink = "#2a2320";
  const muted = "#6f6154";

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 0;color:${muted};font-size:13px;width:70px;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;color:${ink};font-size:14px;font-weight:600;">${value}</td>
    </tr>`;

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background:${cream};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${cream};padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${surface};border:1px solid ${border};border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:${accent};padding:22px 28px;">
              <div style="color:#ffffff;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:700;opacity:.9;">${escapeHtml(SITE.name)}</div>
              <div style="color:#ffffff;font-size:20px;font-weight:800;margin-top:2px;">Nouveau message</div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 16px;color:${ink};font-size:15px;line-height:1.5;">
                Tu as reçu un nouveau message depuis le formulaire de contact de ton portfolio.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;">
                ${row("Nom", safeName)}
                ${row("Email", `<a href="mailto:${safeEmail}" style="color:${accentStrong};text-decoration:none;">${safeEmail}</a>`)}
                ${row("Sujet", safeSubject)}
              </table>

              <div style="border:1px solid ${border};border-left:3px solid ${accent};border-radius:10px;padding:16px 18px;background:${cream};">
                <div style="color:${muted};font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Message</div>
                <div style="color:${ink};font-size:15px;line-height:1.6;">${safeMessage}</div>
              </div>

              <div style="margin-top:24px;">
                <a href="mailto:${safeEmail}?subject=RE:%20${encodeURIComponent(subject || "votre message")}"
                   style="display:inline-block;background:${accent};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 22px;border-radius:999px;">
                  Répondre à ${safeName}
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:18px 28px;border-top:1px solid ${border};">
              <p style="margin:0;color:${muted};font-size:12px;line-height:1.5;">
                Envoyé depuis le formulaire de contact de ${escapeHtml(SITE.name)}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
