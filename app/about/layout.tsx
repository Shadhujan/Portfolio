import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "A glimpse into my journey as a developer and the passions that drive me.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
