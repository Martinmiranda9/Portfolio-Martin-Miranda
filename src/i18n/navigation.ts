import { createNavigation } from "next-intl/navigation";
import { locales } from "../i18n";

export const { Link, useRouter } =
  createNavigation({
    locales,
    defaultLocale: "es",
    localePrefix: "as-needed",
  });
