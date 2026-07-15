import { TbHome, TbFolder, TbUser, TbMail } from "react-icons/tb";
import type { IconType } from "react-icons";

/** Icône associée à un lien de navigation, selon son URL. */
export function navIcon(href: string): IconType {
  if (href.endsWith("/projects")) return TbFolder;
  if (href.endsWith("/about")) return TbUser;
  if (href.endsWith("/contact")) return TbMail;
  return TbHome;
}
