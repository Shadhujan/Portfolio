import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "A glimpse into my journey of Shadhujan Jeyachandran, a Full Stack Developer specializing in .NET and React who has a passion for AI and the passions that drive me.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
