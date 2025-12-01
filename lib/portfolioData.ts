// lib/portfolioData.ts

export const aboutData = {
  name: "Shadhujan",
  role: "Software Engineer · .NET & Web",
  location: "Colombo, Sri Lanka",
  summary:
    "Software engineer focused on .NET backends and modern web apps. I enjoy clean architecture, real-time features, and small AI/ML experiments. Studied at the University of Bedfordshire.",
  github: "https://github.com/Shadhujan",
  linkedin: "https://lk.linkedin.com/in/shadhujan",
  medium: "https://shadhujan.medium.com/",
  website: "https://mdatazone.com/",
  featuredProject: "https://cis-bunona-game.netlify.app/",
  email: "you@example.com", // Keeping email as placeholder or user can update if they have one
};

export const projectsData = [
  {
    id: "bunona",
    name: "Bunona – Number Puzzle Game",
    description:
      "A number puzzle game using the Banana API, built as a university assignment to explore software design principles like low coupling, high cohesion, event-driven programming and interoperability.",
    tech: [
      "React",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "Banana API",
    ],
    url: "https://github.com/Shadhujan/Bunona",
    liveUrl: "https://cis-bunona-game.netlify.app/",
  },
  {
    id: "snake-game",
    name: "Multiplayer Snake Game",
    description:
      "A real-time multiplayer Snake game with rooms, Realtime sync and Supabase channels. Built with the Next.js App Router and modern TypeScript stack.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    url: "https://github.com/Shadhujan/snake-game",
  },
  {
    id: "github-scraper",
    name: "GitHub Profile Scraper",
    description:
      "Python + Selenium automation that logs into GitHub, visits a target profile, extracts profile info and repositories, and exports everything into CSV. Uses OOP structure and environment-based secrets.",
    tech: ["Python", "Selenium", "OOP"],
    url: "https://github.com/Shadhujan/github_scraper",
  },
  {
    id: "dictionary-app",
    name: "Dictionary App (HCI Project)",
    description:
      "Dictionary app built with Groovy and Java as a Human Computer Interaction project. Focus on user-friendly UI, HCI principles and integration with a dictionary API for definitions, synonyms and examples.",
    tech: ["Groovy", "Java", "REST API"],
    url: "https://github.com/Shadhujan/DictionaryApp_HCI_WD_25",
  },
  {
    id: "sms-system",
    name: "Student Management System",
    description:
      "Student Management System using Node.js, MongoDB and REST APIs. Handles basic student data management with a simple web interface.",
    tech: ["Node.js", "MongoDB", "REST API", "HTML", "JavaScript"],
    url: "https://github.com/Shadhujan/SMS",
  },
  {
    id: "facial-emotion",
    name: "Facial Emotion Detection (CV)",
    description:
      "Facial emotion detection experiments using Flask, OpenCV and FER-2013 style datasets. Mix of baseline models and emergent approaches for affective computing.",
    tech: ["Python", "Flask", "OpenCV", "Machine Learning"],
    url: "https://github.com/Shadhujan/FacialEmotionDetaction",
  },
];

export const skillsData = {
  languages: ["C#", "TypeScript", "JavaScript", "Python", "Java"],
  frontend: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  backend: [
    ".NET",
    "ASP.NET Core",
    "Entity Framework Core",
    "REST APIs",
    "Node.js",
    "MongoDB",
    "SQL Server",
    "PostgreSQL",
  ],
  tools: ["Azure", "Supabase", "Git", "Docker", "Postman"],
  // Keeping 'cloud' separate for UI consistency if needed, or mapping tools to cloud section
  cloud: ["Azure", "Supabase"], 
};

// Optional: for icons (devicon classes)
export const skillIconMap: Record<string, string> = {
  "C#": "devicon-csharp-plain",
  ".NET": "devicon-dotnetcore-plain",
  "ASP.NET Core": "devicon-dotnetcore-plain",
  "Entity Framework Core": "devicon-dotnetcore-plain",
  "React": "devicon-react-original",
  "Next.js": "devicon-nextjs-original",
  "JavaScript": "devicon-javascript-plain",
  "TypeScript": "devicon-typescript-plain",
  "Azure": "devicon-azure-plain",
  Docker: "devicon-docker-plain",
  "SQL Server": "devicon-microsoftsqlserver-plain",
  Git: "devicon-git-plain",
  "Python": "devicon-python-plain",
  "Java": "devicon-java-plain",
  "Node.js": "devicon-nodejs-plain",
  "MongoDB": "devicon-mongodb-plain",
  "PostgreSQL": "devicon-postgresql-plain",
  "Supabase": "devicon-postgresql-plain", // Supabase often uses Postgres icon or its own if available, falling back to postgres for now or custom
  "Tailwind CSS": "devicon-tailwindcss-plain",
  "HTML": "devicon-html5-plain",
  "CSS": "devicon-css3-plain",
  "Postman": "devicon-postman-plain", // Check if available in v2.15.1, otherwise might need fallback
  "Selenium": "devicon-selenium-original",
  "Flask": "devicon-flask-original",
  "OpenCV": "devicon-opencv-plain",
};
