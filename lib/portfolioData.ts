// lib/portfolioData.ts

export const aboutData = {
  name: "Shadhujan Jeyachandran",
  role: "Full Stack Developer (.NET • React • Next.js)",
  location: "Colombo, Sri Lanka",
  summary:
    "Hi, I’m Shadhujan Jeyachandran, a Full Stack Developer based in Colombo, Sri Lanka. I currently work as an Intern Software Engineer at M Data Zone (since April 2025).\n\n" +
    "\n Over the past year, I transitioned from automation engineer to full-stack .NET developer; building APIs, microservices, event-driven systems, and real marketing platforms running in production. I work across .NET, C#, React, Next.js, Node.js, TypeScript, and Python (FastAPI), with strong experience in relational and NoSQL databases such as PostgreSQL, T-SQL, MongoDB, and MySQL. I’ve also worked with Selenium, OpenAI API, Blazor, Java, PHP, and Flask.\n\n" +
    "\n My engineering journey: I began with Selenium automation then learned C# to build internal tools then became the sole backend .NET developer for a production system (implemented Clean Architecture + real APIs) then moved into microservices, building event services, RabbitMQ publishers/consumers, worker services, custom Serilog sinks, API gateways, Dockerized deployments, and metadata-driven marketing applications using Next.js + ASP.NET Core.\n\n" +
    "\n I am fluent in English, passionate about scalable software design, and continuously improving my technical depth. Let’s connect, I’m excited to contribute to your team.",
  education: [
    {
      degree: "BSc. (Hons) in Computer Science",
      institution: "University of Bedfordshire, UK (SLIIT)",
      result: "First Class Hons",
      year: "2025 Jan – Oct", 
      logo: "/acedemic/UoB-min.jpg"
    },
    {
      degree: "Higher Diploma in IT",
      institution: "SLIIT CITY UNI",
      result: "3.30 GPA",
      year: "2023 Feb – 2024 Dec",
      logo: "/acedemic/SCU-min.jpg"
    },
    {
      degree: "Secondary Education",
      institution: "BT/ St. Michael's College",
      result: "",
      year: "2015 – 2019",
      logo: "/acedemic/SMC-min.jpg"
    },
    {
      degree: "Primary & Secondary Education",
      institution: "BT/Chenkalady Central College",
      result: "",
      year: "2006 – 2014",
      logo: "/acedemic/CCC-min.jpg"
    }
  ],
  github: "https://github.com/Shadhujan",
  linkedin: "https://lk.linkedin.com/in/shadhujan",
  medium: "https://shadhujan.medium.com/",
  instagram: "https://www.instagram.com/jeya.shad38",
  featuredProject: "https://cis-bunona-game.netlify.app/",
  email: "jeya38shadhujan@gmail.com",
  version: "v1.25.1218",
  hobbies: [
    {
      icon: "gaming", 
      title: "Gaming",
      description: "Strategizing in competitive games and exploring immersive open worlds."
    },
    {
      icon: "reading",
      title: "Reading", 
      description: "Tech blogs, sci-fi novels, and keeping up with the latest in AI."
    },
    {
      icon: "music",
      title: "Music",
      description: "Lo-fi beats for coding and high-energy tracks for workouts."
    },
     {
      icon: "travel",
      title: "Travel",
      description: "Exploring new places and experiencing different cultures provided new perspectives."
    }
  ],
  interests: [
    {
       title: "AI Agents",
       description: "Building autonomous systems that can reason and act."
    },
    {
       title: "Cloud Native",
       description: "Designing scalable, resilient microservices on Kubernetes."
    },
    {
       title: "UI/UX Design",
       description: "Crafting intuitive and accessible user experiences."
    }
  ]
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
    longDescription: "A Number Puzzle game built as a university assignment to explore software design principles like low coupling, high cohesion, event-driven programming, and interoperability. It uses the 'Banana' API for core game logic and leaderboards.The project demonstrates how independent modules (timer, game logic, UI) can work together in a scalable architecture.",
    features: [
      "Modular Architecture: High cohesion and low coupling with independent modules for Timer, UI, and Logic.",
      "Event-Driven Daily Streaks: Rewards based on daily completion events.",
      "Interoperability: Integration with the external Banana API and leaderboards.",
      "Virtual Identity: Player lives, achievements, and performance tracking.",
      "Difficulty System: Timer-based difficulty adjustment without affecting scoring logic."
    ]
  },
  {
    id: "focus-boost",
    name: "FocusBoost: AI Study Companion",
    description: "AI-powered study assistant that monitors attention via webcam and triggers adaptibe interventions (quizzes/hints) using Gemini AI when focus wanes. Privacy-first design.",
    tech: ["React", "TypeScript", "Python", "FastAPI", "OpenCV", "Gemini API", "Firebase"],
    url: "https://github.com/Shadhujan/FocusBoost",
    longDescription: "FocusBoost is an intelligent study assistant developed as a Final Year Computer Science project. It is designed to address the challenge of maintaining student engagement during remote or digital learning. By leveraging computer vision and Generative AI, the system monitors a student's attention and emotional state in real-time via a webcam. When the system detects waning attention, boredom, or frustration, FocusBoost dynamically intervenes—generating personalized quizzes using Google's Gemini AI to re-engage the learner, or offering helpful hints and encouragement. This project demonstrates the practical application of affective computing and large language models in an educational context.",
    features: [
      "Real-time Attention Tracking: Implemented a non-intrusive computer vision pipeline using OpenCV and MediaPipe to analyze gaze and emotion metrics without storing video data, **ensuring privacy**.",
      "Custom Trained Models: Developed and trained specialized models using Jupyter Notebooks on Google Colab and Kaggle for robust gaze and emotion detection, ensuring high accuracy in real-time environments.",
      "Adaptive Learning Loop: Built an 'Intervention Engine' that uses attention data to trigger specific learning aids. It tracks states like 'Focus', 'Distracted', or 'Fatigued' and responds accordingly.",
      "Generative AI Integration: Utilized Google Gemini Pro to create context-aware quizzes on-the-fly. The system prompts the AI with the child's age, subject, and current attention state to generate questions that are neither too easy nor too hard.",
      "Full-Stack Architecture: Developed a responsive Single Page Application (SPA) with React (Vite) and TypeScript, backed by a high-performance FastAPI (Python) server.",
      "Real-time Data Sync: Integrated Firebase Firestore for real-time synchronization of session data, quiz results, and child profiles between the parent dashboard and the child's learning interface."
    ]
  },
  {
    id: "3d-dojo",
    name: "3D Interactive Dojo",
    description: "Immersive 3D web experience template built with React Three Fiber. Features first-person navigation, interactive elements, and optimized GLB model loading.",
    tech: ["React", "Three.js", "Tailwind CSS", "R3F"],
    url: "https://github.com/Shadhujan/3D_Interactive_Dojo",
    liveUrl: "https://3d-dojo-shad.vercel.app",
    longDescription: "A 3D interactive web experience template built with React, TypeScript, and React Three Fiber. Originally designed as an immersive personal portfolio, exploring virtual space navigation. Currently serves as a robust base template for 3D web applications, focusing on movement, camera control, scene structure, and dynamic lighting.",
    features: [
      "First-Person Navigation: WASD movement controls and mouse-look via pointer lock.",
      "Modular Scene Structure: Organized architecture for interior and exterior 3D environments.",
      "Dynamic Lighting: Immersive environment with carefully tuned lighting setups.",
      "React Ecosystem Integration: Seamless blend of 3D canvas and 2D UI overlays using Tailwind CSS.",
      "Optimized Assets: efficient handling of GLB models and resources."
    ]
  },
  {
    id: "glb-viewer",
    name: "GLB Model Viewer",
    description: "Web-based utility for previewing and inspecting GLB 3D models directly in the browser. Useful for rapid asset verification.",
    tech: ["React", "Three.js", "TypeScript"],
    url: "https://github.com/Shadhujan/GLB-Viewer",
    liveUrl: "https://glb-viewer-shad.vercel.app/",
    longDescription: "A professional-grade web utility for inspecting and debugging GLB (glTF 2.0 binary) 3D models. Created to assist in the development of the 3D Dojo, this tool allows developers to validate assets before integration. It features studio-quality lighting, detailed model statistics, and an interactive hierarchy inspector similar to industry-standard 3D tools.",
    features: [
      "Drag & Drop Upload: Instant preview for local .glb files.",
      "Inspector Panel: detailed stats (vertices, triangles, materials) and scene hierarchy tree.",
      "Animation Viewer: List and playback controls for embedded animation clips.",
      "Hover Inspection: Interactive mode to identify specific mesh names by hovering in 3D space.",
      "Validation: Warnings for common issues like high poly counts or missing textures."
    ]
  },
  {
    id: "oop-masterguide",
    name: "The OOP MasterGuide",
    description: "Interactive educational website explaining OOP principles and Design Patterns with visual diagrams and code snippets. Focus on clear, accessible explanations.",
    tech: ["HTML", "CSS", "JavaScript", "HCI"],
    url: "https://github.com/Shadhujan/OOP-MasterGuide",
    liveUrl: "https://shadhujan.github.io/OOP-MasterGuide/",
  },
  {
    id: "win95-sim",
    name: "Windows 95 Simulation",
    description: "Interactive Windows 95 desktop environment running entirely in the browser. Features functioning Minesweeper, Notepad, and classic UI elements.",
    tech: ["Gist", "HTML", "CSS", "JavaScript"],
    url: "https://gist.github.com/Shadhujan/91fed5757e310bda0ac3fc83dc34b7b2",
    liveUrl: "https://gisthost.github.io/?91fed5757e310bda0ac3fc83dc34b7b2",
    longDescription: "A nostalgic simulation of the Windows 95 operating system, complete with accurate UI components, window management, and classic applications. This project demonstrates the power of modern web technologies to recreate legacy software environments. It includes playable Minesweeper, a working text editor, and the iconic Start menu.",
    features: [
        "**The Desktop**: Authentic 'Windows Teal' background with draggable desktop icons.",
        "**The Start Menu**: Fully functional classic Start Menu with sub-menus.",
        "**Window System**: Drag, minimize, maximize, and close functionalities. Active window z-index handling with dynamic taskbar updates.",
        "**Functional Apps**: Includes playable Minesweeper (with full logic), Notepad (text editor), Internet Explorer (mock browser), and My Computer.",
        "**The Taskbar**: Authentic system tray time display and active window management."
    ],
    gistId: "91fed5757e310bda0ac3fc83dc34b7b2"
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
  {
    id: "hinata-toyshop",
    name: "Hinata Toyshop",
    description: "E-commerce website for an anime store. Features product browsing, cart functionality, and user accounts. Built as a first university project.",
    tech: ["PHP", "HTML", "CSS", "JavaScript", "SQL"],
    url: "https://github.com/Shadhujan/Hinata_Toyshop",
  },
  {
    id: "lr-platinum",
    name: "LR Platinum Tire Web",
    description: "Web application for a tire service center. Handles service listings and basic business information.",
    tech: ["PHP", "CSS", "HTML"],
    url: "https://github.com/Shadhujan/LR-Platinum-Tire-Web",
  },
  {
    id: "file-storage",
    name: "File Storage System",
    description: "Backend exploration of file storage mechanisms using Python and C++ components for performance.",
    tech: ["Python", "C++"],
    url: "https://github.com/Shadhujan/file-storage",
  },

];

export const skillsData = {
  languages: [
    "C#",
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "PHP",
    "Bash",
    "Markdown"
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
    "Three.js",
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
    "Redis",
    "SQL",
    "Firebase",
    "Oracle",
    "SQLite"
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
    "Obsidian",
    "Playwright",
    "Selenium",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Figma",
    "GitHub",
    "Vercel",
    "Render",
    "Netlify",
    "JIRA",
    "Trello",
    "OpenProject"
  ],
  machineLearning: [
    "OpenAI",
    "HuggingFace",
    "PyTorch",
    "Pandas",
    "NumPy"
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
  "Next.js": "devicon-nextjs-plain text-white",
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
  // "Selenium": "devicon-selenium-original", // Removed old duplicate
  "Flask": "devicon-flask-plain text-white",
  "FastAPI": "devicon-fastapi-plain",
  "OpenCV": "devicon-opencv-plain",
  "Jenkins": "devicon-jenkins-plain",
  "RabbitMQ": "/icons/rabbitmq.png",
  "Ocelot API Gateway": "/icons/ocelot.png",
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
  "Bash": "devicon-bash-plain",
  "Markdown": "devicon-markdown-original text-blue-500",
  "Obsidian": "/icons/obsidian.png", 
  "Three.js": "/icons/threejs.png",
  "Playwright": "/icons/playwright.png",
  "Selenium": "devicon-selenium-original",
  
  // New Skills
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  "Firebase": "devicon-firebase-plain",
  "Oracle": "devicon-oracle-original",
  "SQLite": "devicon-sqlite-plain",
  "Figma": "devicon-figma-plain",
  "GitHub": "devicon-github-plain text-white",
  "Vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  "Render": "/icons/render.png", 
  "Netlify": "/icons/netlify.png",
  "JIRA": "devicon-jira-plain",
  "Trello": "devicon-trello-plain",
  "OpenProject": "/icons/openproject.png",
  "OpenAI": "/icons/openai.png",
  "HuggingFace": "/icons/huggingface.png",
  "PyTorch": "devicon-pytorch-original",
  "Pandas": "devicon-pandas-original",
  "NumPy": "devicon-numpy-original",
};
