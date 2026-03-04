import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software engineering projects by Shadhujan Jeyachandran including .NET, React, AI and Next.js applications.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
