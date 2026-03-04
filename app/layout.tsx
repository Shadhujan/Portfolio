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
              name: "Shadhujan Jeyachandran",
              alternateName: "Shadhujan",
              url: "https://shadhujan.dev",
              jobTitle: [
                "Full Stack Software Engineer",
                "Full Stack Developer",
                "Software Engineer",
                ".NET Developer",
                "React Developer",
                "Next.js Developer"
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
                "https://www.instagram.com/jeya.shad38",
                "https://shadhujan.dev",
                "https://x.com/sivakarthisadhu",
                "https://www.youtube.com/@JeyaShad",
                "https://www.youtube.com/channel/UC0-SozCLObKvTzjQDza3yJA",
                "https://ratings.fide.com/profile/80809693",
                "https://www.reddit.com/user/Katakuri_Rat/",
                "https://www.pinterest.com/shadhujuanshadhu/",
                "https://www.quora.com/profile/Jeyachandran-Shadhujan",
                "https://gist.github.com/Shadhujan",
                "https://gist.github.com/Shadhujan/6f73e54751a3eccadfbf9ead160e9cbc",
                "https://cis-bunona-game.netlify.app/",
                "https://github.com/Shadhujan/Bunona",
                "https://github.com/Shadhujan/FocusBoost",
                "https://3d-dojo-shad.vercel.app",
                "https://github.com/Shadhujan/3D_Interactive_Dojo",
                "https://glb-viewer-shad.vercel.app/",
                "https://github.com/Shadhujan/GLB-Viewer",
                "https://shadhujan.github.io/OOP-MasterGuide/",
                "https://github.com/Shadhujan/OOP-MasterGuide",
                "https://gisthost.github.io/?91fed5757e310bda0ac3fc83dc34b7b2",
                "https://gist.github.com/Shadhujan/91fed5757e310bda0ac3fc83dc34b7b2",
                "https://github.com/Shadhujan/snake-game",
                "https://github.com/Shadhujan/github_scraper",
                "https://github.com/Shadhujan/DictionaryApp_HCI_WD_25",
                "https://github.com/Shadhujan/SMS",
                "https://github.com/Shadhujan/FacialEmotionDetaction",
                "https://github.com/Shadhujan/Hinata_Toyshop",
                "https://lr-platinum-tire-web.vercel.app",
                "https://github.com/Shadhujan/LR-Platinum-Tire-Web",
                "https://github.com/Shadhujan/file-storage",
                "https://github.com/Shadhujan/2026_Valantines",
                "https://github.com/Shadhujan/Baseline_FER",
                "https://github.com/Shadhujan/CarCareUI_OOP",
                "https://github.com/Shadhujan/Crush_ask_out",
                "https://github.com/Shadhujan/DOJO_v1",
                "https://github.com/Shadhujan/EmergentTry",
                "https://github.com/Shadhujan/JS_practice",
                "https://github.com/Shadhujan/ML_Learning",
                "https://shadhujan-portfolio.vercel.app/",
                "https://github.com/Shadhujan/Portfolio",
                "https://github.com/Shadhujan/raining-hearts",
                "https://github.com/Shadhujan/SAAS_SAMPLE"
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
