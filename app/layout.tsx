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
  title: "Shadhujan | Software Engineer Portfolio",
  description:
    "Shadhujan – Software Engineer and Full Stack Developer. View projects, experience, and technical skills.",
  verification: {
    google: "2sROd9WAH4Hf5VX08iAYctCKIow9ZGh5RAaUPi4YdGg",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shadhujan",
              url: "https://shadhujan.dev",
              jobTitle: "Software Engineer",
              sameAs: [
                "https://github.com/shadhujan",
                "https://linkedin.com/in/shadhujan"
              ]
            })
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
