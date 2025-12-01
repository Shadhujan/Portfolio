// lib/portfolioData.ts
export const aboutData = {
  name: "Your Name",
  role: "Full-Stack Developer",
  location: "Somewhere on Earth",
  summary:
    "I build thoughtful web experiences with Next.js, TypeScript, and great UX in mind.",
  github: "https://github.com/yourname",
  linkedin: "https://www.linkedin.com/in/your-linkedin/",
  email: "you@example.com",
};

export const projectsData = [
  {
    id: "weather-cli",
    name: "Weather CLI",
    description:
      "A command-line weather dashboard with caching and colorful output.",
    tech: ["Node.js", "TypeScript", "OpenWeather API"],
    url: "https://github.com/yourname/weather-cli",
  },
  {
    id: "next-analytics",
    name: "Next Analytics",
    description:
      "A Next.js analytics dashboard with real-time charts and role-based access.",
    tech: ["Next.js", "React", "PostgreSQL"],
    url: "https://github.com/yourname/next-analytics",
  },
  {
    id: "ui-kit",
    name: "UI Kit",
    description:
      "A small, accessible React component library built with Radix and Tailwind.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    url: "https://github.com/yourname/ui-kit",
  },
];

export const skillsData = {
  languages: ["TypeScript", "JavaScript", "Python"],
  frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "REST", "PostgreSQL", "Prisma"],
  tools: ["Git", "Docker", "Figma", "Vercel"],
};
