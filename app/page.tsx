import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

// Le middleware redirige normalement déjà. Filet de sécurité.
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
