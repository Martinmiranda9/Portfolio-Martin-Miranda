import ProjectClient from "./ProjectClient";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  const locales = ["es", "en"];
  return locales.flatMap((locale) =>
    projects.map((p) => ({
      locale,
      slug: p.slug,
    }))
  );
}

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  return <ProjectClient slug={params.slug} />;
}
