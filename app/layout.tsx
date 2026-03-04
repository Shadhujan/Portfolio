import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedFavicon from "./components/AnimatedFavicon";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shadhujan.dev"),
  title: {
    default: "Shadhujan Jeyachandran | Software Engineer Portfolio",
    template: "%s | Shadhujan Jeyachandran",
  },
  description:
    "Portfolio of Shadhujan Jeyachandran, Software Engineer and Full Stack Developer. Projects, experience, and skills.",
  authors: [{ name: "Shadhujan Jeyachandran", url: "https://shadhujan.dev" }],
  creator: "Shadhujan Jeyachandran",
  publisher: "Shadhujan",
  applicationName: "Shadhujan Portfolio",
  generator: "Next.js",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "2sROd9WAH4Hf5VX08iAYctCKIow9ZGh5RAaUPi4YdGg",
  },
  openGraph: {
    title: "Shadhujan | Software Engineer Portfolio",
    description:
      "Software Engineer and Full Stack Developer. Projects, experience, and skills.",
    url: "https://shadhujan.dev",
    siteName: "Shadhujan Portfolio",
    type: "profile",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Shadhujan Portfolio",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadhujan | Software Engineer Portfolio",
    description:
      "Software Engineer and Full Stack Developer. Projects, experience, and skills.",
    images: ["/og.png"],
    creator: "@sivakarthisadhu",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimatedFavicon />
        {children}

        {/* Structured Data for SEO */}
        <Script
          id="schema-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shadhujan Jeyachandran",
              alternateName: "Shadhujan",
              url: "https://shadhujan.dev",
              jobTitle: [
                "Software Engineer", 
                "Full Stack Developer",
                ".NET Developer",
                "React Developer",
              ],
              alumniOf: [
                "University of Bedfordshire",
                "SLIIT",
                "SLIIT City Uni"
              ],
              sameAs: [
                "https://lk.linkedin.com/in/shadhujan",
                "https://github.com/Shadhujan",
                "https://shadhujan.medium.com/",
                "https://x.com/sivakarthisadhu",
                "https://www.youtube.com/@JeyaShad"
              ]
            })
          }}
        />

        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "WebSite",
               name: "Shadhujan Portfolio",
               url: "https://shadhujan.dev",
               inLanguage: "en",
             }),
          }}
        />

        {/* Google tag (gtag.js) */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-F4JRH7V8EQ" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-F4JRH7V8EQ');
          `}
        </Script>
      </body>
    </html>
  );
}
