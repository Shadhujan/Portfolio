"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  aboutData,
  projectsData,
  skillsData,
  skillIconMap,
} from "@/lib/portfolioData";
import { useEffect, useState } from "react";

interface MorphSkill {
  label: string;
  iconClass?: string;
}

// build a flat list of important skills for morph blob
const morphSkills: MorphSkill[] = [
  { label: "C#", iconClass: skillIconMap["C#"] },
  { label: ".NET", iconClass: skillIconMap[".NET"] },
  { label: "ASP.NET Core", iconClass: skillIconMap["ASP.NET Core"] },
  { label: "SQL Server", iconClass: skillIconMap["SQL Server"] },
  { label: "Azure", iconClass: skillIconMap["Azure"] },
  { label: "React", iconClass: skillIconMap["React"] },
  { label: "Next.js", iconClass: skillIconMap["Next.js"] },
];

const blobKeyframes = [
  "40% 60% 60% 40%",
  "60% 40% 65% 35%",
  "55% 45% 35% 65%",
  "45% 55% 60% 40%",
  "40% 60% 60% 40%",
];

function SkillMorphBlob() {
  const [index, setIndex] = useState(0);
  const current = morphSkills[index];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % morphSkills.length);
    }, 2000); // change skill every 2 seconds
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className="h-40 w-40 sm:h-52 sm:w-52 bg-gradient-to-tr from-emerald-500 via-sky-400 to-violet-500 shadow-2xl flex items-center justify-center"
        animate={{ borderRadius: blobKeyframes }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          key={current.label}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center justify-center text-center px-3"
        >
          {current.iconClass ? (
            <i
              className={`${current.iconClass} text-4xl sm:text-5xl mb-2`}
            ></i>
          ) : (
            <span className="text-4xl sm:text-5xl mb-2">💻</span>
          )}
          <span className="text-sm sm:text-base font-semibold text-slate-900">
            {current.label}
          </span>
        </motion.div>
      </motion.div>
      <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">
        Focused stack
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800/80 backdrop-blur-sm bg-slate-950/60 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="h-8 w-8 rounded-full bg-emerald-500/15 border border-emerald-400/60 flex items-center justify-center text-xs font-bold text-emerald-300"
            >
              {aboutData.name[0]}
            </motion.div>
            <div>
              <p className="text-sm font-semibold">{aboutData.name}</p>
              <p className="text-[11px] text-slate-400">{aboutData.role}</p>
            </div>
          </div>
          <nav className="hidden sm:flex gap-6 text-xs text-slate-300">
            <a href="#about" className="hover:text-emerald-400">
              About
            </a>
            <a href="#projects" className="hover:text-emerald-400">
              Projects
            </a>
            <a href="#skills" className="hover:text-emerald-400">
              Skills
            </a>
            <a href="#contact" className="hover:text-emerald-400">
              Contact
            </a>
          </nav>
          <Link
            href="/cli"
            className="text-[11px] rounded-full border border-emerald-500/50 px-3 py-1 hover:bg-emerald-500 hover:text-slate-950 transition"
          >
            CLI mode
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Portfolio v1.0.0
              </motion.p>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                Explore my work in a{" "}
                <span className="text-emerald-400">clean UI</span> or in{" "}
                <span className="text-emerald-400">CLI mode</span>.
              </motion.h1>
              <motion.p
                className="text-sm sm:text-base text-slate-300 mb-6 max-w-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                I&apos;m a .NET developer who likes both structure and fun.
                Visual layout for everyone, terminal experience for devs.
                Same projects, two different ways to see them.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Link
                  href="/cli"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 transition"
                >
                  Open CLI experience
                  <span className="text-[10px] bg-slate-950/10 rounded-full px-2 py-0.5">
                    whoami, ls, cat...
                  </span>
                </Link>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-400 hover:text-emerald-300 transition"
                >
                  Continue with normal portfolio
                </a>
              </motion.div>
            </motion.div>

            {/* Summary + micro-timeline card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-xl flex flex-col gap-4"
            >
              <div>
                <p className="text-xs text-slate-400 mb-1">Summary</p>
                <p className="text-sm font-medium mb-1">
                  {aboutData.role} based in {aboutData.location}
                </p>
                <p className="text-xs text-slate-300">{aboutData.summary}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-2">Recent focus</p>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-200">
                  {["ASP.NET Core", "Next.js", "Azure"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-800 px-3 py-1 border border-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-slate-500">
                <p>2022 → Now · Building .NET APIs and full-stack apps.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-b border-slate-900">
          <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              {aboutData.summary}
            </p>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="border-b border-slate-900">
          <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Selected Projects</h2>
              <p className="text-[11px] text-slate-500">
                JSON-driven cards · same data as CLI
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {projectsData.map((project, idx) => (
                <motion.div
                  key={project.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-400/70 transition relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top,_#22c55e_0,_transparent_55%)]" />
                  <p className="text-xs text-slate-500 mb-1 uppercase tracking-[0.2em] relative">
                    {project.id}
                  </p>
                  <h3 className="text-base font-semibold mb-1 relative">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-300 mb-3 relative">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3 relative">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-800/80 px-2.5 py-0.5 text-[11px] text-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-emerald-400 hover:text-emerald-300 underline relative mr-4"
                    >
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-emerald-400 hover:text-emerald-300 underline relative"
                    >
                      Live Demo
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills with morph blob */}
        <section id="skills" className="border-b border-slate-900">
          <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,2fr)] items-center">
            <div>
              <h2 className="text-xl font-semibold mb-3">Skills</h2>
              <p className="text-sm text-slate-300 mb-5 max-w-xl">
                My main stack is C# / .NET on the backend, with modern React /
                Next.js on the frontend and Azure in the cloud.
              </p>
              <div className="grid gap-5 sm:grid-cols-2 text-sm">
                <div>
                  <h3 className="text-sm font-medium mb-2">Languages</h3>
                  <ul className="text-slate-300 text-xs space-y-1">
                    {skillsData.languages.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Backend</h3>
                  <ul className="text-slate-300 text-xs space-y-1">
                    {skillsData.backend.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Frontend</h3>
                  <ul className="text-slate-300 text-xs space-y-1">
                    {skillsData.frontend.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Cloud & Tools</h3>
                  <ul className="text-slate-300 text-xs space-y-1">
                    {skillsData.cloud.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {skillsData.tools.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Morphing blob with icon */}
            <SkillMorphBlob />
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-sm text-slate-300 mb-2">
              I&apos;m open for interesting .NET / full-stack roles and
              freelance projects.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {aboutData.email && (
                <a
                  href={`mailto:${aboutData.email}`}
                  className="rounded-full border border-slate-700 px-4 py-2 hover:border-emerald-400 hover:text-emerald-300 transition"
                >
                  Email me
                </a>
              )}
              {aboutData.github && (
                <a
                  href={aboutData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-700 px-4 py-2 hover:border-emerald-400 hover:text-emerald-300 transition"
                >
                  GitHub
                </a>
              )}
              {aboutData.linkedin && (
                <a
                  href={aboutData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-700 px-4 py-2 hover:border-emerald-400 hover:text-emerald-300 transition"
                >
                  LinkedIn
                </a>
              )}
              {aboutData.medium && (
                <a
                  href={aboutData.medium}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-700 px-4 py-2 hover:border-emerald-400 hover:text-emerald-300 transition"
                >
                  Medium
                </a>
              )}
              {aboutData.website && (
                <a
                  href={aboutData.website}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-700 px-4 py-2 hover:border-emerald-400 hover:text-emerald-300 transition"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-4 text-[11px] text-slate-500 flex items-center justify-between">
          <span>
            © {new Date().getFullYear()} {aboutData.name}. All rights reserved.
          </span>
          <Link
            href="/cli"
            className="underline hover:text-emerald-300 text-slate-400"
          >
            Open CLI version
          </Link>
        </div>
      </footer>
    </div>
  );
}
