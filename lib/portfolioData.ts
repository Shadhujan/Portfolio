// lib/portfolioData.ts
export const aboutData = {
  name: "Your Name",
  role: ".NET / Full-Stack Developer",
  location: "Somewhere on Earth",
  summary:
    "I build robust .NET backends and clean web UIs, focusing on performance, maintainability and good developer experience.",
  github: "https://github.com/yourname",
  linkedin: "https://www.linkedin.com/in/your-linkedin/",
  email: "you@example.com",
};

export const projectsData = [
  {
    id: "api-gateway",
    name: "API Gateway for Microservices",
    description:
      "Central gateway built with ASP.NET Core, rate limiting, JWT auth and request logging for a microservices platform.",
    tech: ["ASP.NET Core", "C#", "PostgreSQL", "Docker"],
    url: "https://github.com/yourname/api-gateway",
  },
  {
    id: "booking-portal",
    name: "Booking Portal",
    description:
      "Full-stack booking portal with .NET backend and Next.js frontend, including role-based admin panel.",
    tech: ["ASP.NET Core", "Next.js", "TypeScript", "SQL Server"],
    url: "https://github.com/yourname/booking-portal",
  },
  {
    id: "observability-kit",
    name: "Observability Kit",
    description:
      "Reusable library for structured logging, metrics and tracing in .NET apps.",
    tech: ["C#", ".NET", "Serilog", "OpenTelemetry"],
    url: "https://github.com/yourname/observability-kit",
  },
];

export const skillsData = {
  languages: ["C#", "JavaScript", "TypeScript"],
  backend: [".NET", "ASP.NET Core", "Entity Framework Core", "REST APIs"],
  frontend: ["React", "Next.js", "Razor Pages"],
  cloud: ["Azure", "Azure Functions", "Azure DevOps"],
  tools: ["Git", "Docker", "SQL Server", "Postman"],
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
};
