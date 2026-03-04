import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description: "An interactive lab for experimenting with code and running GitHub Gists instantly.",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
