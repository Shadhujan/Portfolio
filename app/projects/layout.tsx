import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software engineering projects by Shadhujan.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
