// lib/portfolioData.ts

export const aboutData = {
  name: "Shadhujan Jeyachandran",
  role: "Full Stack Developer (.NET • React • Next.js)",
  location: "Colombo, Sri Lanka",
  summary:
    "Hi, I’m Shadhujan Jeyachandran, a Full Stack Developer based in Colombo, Sri Lanka. I currently work as an Intern Software Engineer at M Data Zone (since April 2025). I hold a First-Class BSc(Hons) in Computer Science from SLIIT City Campus (University of Bedfordshire, UK), along with a Higher Diploma in IT.\n\n" +
    "\n Over the past year, I transitioned from automation engineer to full-stack .NET developer; building APIs, microservices, event-driven systems, and real marketing platforms running in production. I work across .NET, C#, React, Next.js, Node.js, TypeScript, and Python (FastAPI), with strong experience in relational and NoSQL databases such as PostgreSQL, T-SQL, MongoDB, and MySQL. I’ve also worked with Selenium, OpenAI API, Blazor, Java, PHP, and Flask.\n\n" +
    "\n My engineering journey: I began with Selenium automation then learned C# to build internal tools then became the sole backend .NET developer for a production system (implemented Clean Architecture + real APIs) then moved into microservices, building event services, RabbitMQ publishers/consumers, worker services, custom Serilog sinks, API gateways, Dockerized deployments, and metadata-driven marketing applications using Next.js + ASP.NET Core.\n\n" +
    "\n I am fluent in English, passionate about scalable software design, and continuously improving my technical depth. Let’s connect, I’m excited to contribute to your team.",
  github: "https://github.com/Shadhujan",
  linkedin: "https://lk.linkedin.com/in/shadhujan",
  medium: "https://shadhujan.medium.com/",
  website: "https://mdatazone.com/", // Keeping website if user wants it, though not explicitly in new snippet, previous context had it.
  featuredProject: "https://cis-bunona-game.netlify.app/",
  email: "you@example.com",
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
  languages: [
    "C#",
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "PHP"
  ],
  backend: [
    ".NET",
    "ASP.NET Core",
    "Entity Framework Core",
    "REST APIs",
    "Microservices",
    "RabbitMQ",
    "Ocelot API Gateway",
    "Clean Architecture",
    "FastAPI",
    "Flask",
    "Node.js",
    "Express.js"
  ],
  frontend: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Bootstrap",
    "Blazor",
    "HTML",
    "CSS"
  ],
  databases: [
    "PostgreSQL",
    "SQL Server (T-SQL)",
    "MongoDB",
    "MySQL",
    "Supabase",
    "Redis"
  ],
  devops: [
    "Docker",
    "CI/CD (Azure DevOps)",
    "Version Control (Git)",
    "Jenkins",
  ],
  tools: [
    "Visual Studio",
    "VS Code",
    "Android Studio",
    "Postman",
    "Adobe Illustrator",
    "Adobe Photoshop"
  ],
  architecture: [
    "Clean Architecture",
    "Layered Architecture",
    "Microservices Architecture",
    "Meta Data Driven Architecture"
  ]
};

// Optional: for icons (devicon classes)
export const skillIconMap: Record<string, string> = {
  "C#": "devicon-csharp-plain",
  ".NET": "devicon-dotnetcore-plain",
  "ASP.NET Core": "/icons/aspnetcore.png",
  "Entity Framework Core": "/icons/efcore.png",
  "React": "devicon-react-original",
  "Next.js": "devicon-nextjs-original",
  "JavaScript": "devicon-javascript-plain",
  "TypeScript": "devicon-typescript-plain",
  "Azure": "devicon-azure-plain",
  Docker: "devicon-docker-plain",
  "SQL Server": "devicon-microsoftsqlserver-plain",
  "SQL Server (T-SQL)": "devicon-microsoftsqlserver-plain",
  Git: "devicon-git-plain",
  "Version Control (Git)": "devicon-git-plain",
  "Python": "devicon-python-plain",
  "Java": "devicon-java-plain",
  "PHP": "devicon-php-plain",
  "Node.js": "devicon-nodejs-plain",
  "MongoDB": "devicon-mongodb-plain",
  "PostgreSQL": "devicon-postgresql-plain",
  "MySQL": "devicon-mysql-plain",
  "Supabase": "/icons/supabase.png",
  "Tailwind CSS": "devicon-tailwindcss-plain",
  "Bootstrap": "devicon-bootstrap-plain",
  "HTML": "devicon-html5-plain",
  "CSS": "devicon-css3-plain",
  "Postman": "/icons/postman.png",
  "Selenium": "devicon-selenium-original",
  "Flask": "devicon-flask-original",
  "FastAPI": "devicon-fastapi-plain",
  "OpenCV": "devicon-opencv-plain",
  "Jenkins": "devicon-jenkins-plain",
  "RabbitMQ": "/icons/rabbitmq.png",
  "Redis": "devicon-redis-plain",
  "Blazor": "/icons/blazor.png",
  "CI/CD (Azure DevOps)": "/icons/cicd.png",
  "REST APIs": "/icons/restapi.png",
  "Serilog (Custom Sinks)": "/icons/serilog.png",
  "Microservices": "/icons/microservices.png",
  "Microservices Architecture": "/icons/microservices.png", // Reusing icon
  "Visual Studio": "devicon-visualstudio-plain",
  "VS Code": "devicon-vscode-plain",
  "Android Studio": "devicon-androidstudio-plain",
  "Adobe Illustrator": "devicon-illustrator-plain",
  "Adobe Photoshop": "devicon-photoshop-plain",
};
