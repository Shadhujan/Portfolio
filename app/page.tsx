"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  aboutData,
  projectsData,
  skillsData,
} from "@/lib/portfolioData";
import SkillOrbit from "./components/SkillOrbit";
import InfiniteScrollSkills from "./components/InfiniteScrollSkills";
import AuroraBackground from "./components/hero-effects/AuroraBackground";
import FloatingCards from "./components/hero-effects/FloatingCards";

// Removed SkillMorphBlob component as it is replaced by SkillBubbles

export default function HomePage() {
  const [is3DView, setIs3DView] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* ... keeping existing header and main content structure ... */}
      
      {/* Skipping to Skills section replacement, needs to match indentation context of the file */}
      {/* Note: I cannot use '...' in replacement content accurately without full file context in one go. 
         I will target the specific Skills section block instead.
      */}
      {/* Header */}
      <header className="border-b border-slate-800/80 backdrop-blur-sm bg-slate-950/60 sticky top-0 z-[9999]">
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
        <section className="relative border-b border-slate-900 bg-slate-950 overflow-hidden min-h-[600px] flex items-center">
          {/* Aurora Background */}
          <AuroraBackground />

          <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 grid gap-8 md:grid-cols-2 items-center relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for hire
              </motion.div>
              
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                Building <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  digital experiences
                </span>
                <br />
                that matter.
              </motion.h1>
              
              <motion.p
                className="text-base sm:text-lg text-slate-400 mb-6 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                I&apos;m a Full Stack Developer specializing in .NET and modern web technologies. 
                I craft clean, performant, and interactive applications.
              </motion.p>
              
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Link
                  href="/cli"
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-emerald-500 px-8 font-medium text-slate-950 transition-all duration-300 hover:bg-emerald-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  <span className="mr-2">Open CLI Terminal</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <a
                  href="#projects"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-8 font-medium text-slate-300 transition-all duration-300 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-slate-800"
                >
                  View Projects
                </a>
              </motion.div>
            </motion.div>

            <div className="relative h-[400px] hidden md:block">
               <FloatingCards />
            </div>
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

        {/* Skills with toggle */}
        <section id="skills" className="border-b border-slate-900">
          <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <h2 className="text-xl font-semibold mb-3">Skill Ecosystem</h2>
                <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                  A high-performance technical stack centered around .NET Microservices, 
                  Blazor, and Cloud Native solutions.
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                 <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setIs3DView(true)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                        is3DView 
                          ? "bg-slate-700 text-emerald-400 shadow-sm" 
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      3D Orbit
                    </button>
                    <button
                      onClick={() => setIs3DView(false)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                        !is3DView 
                          ? "bg-slate-700 text-emerald-400 shadow-sm" 
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Infinite Stream
                    </button>
                 </div>
                {is3DView && (
                  <p className="text-[10px] text-emerald-500/80">
                    Drag to rotate · Hover to explore
                  </p>
                )}
              </div>
            </div>

            <div className="min-h-[500px] flex items-center justify-center">
               {is3DView ? (
                  <SkillOrbit
                    skills={Array.from(
                      new Set([
                        ...skillsData.languages,
                        ...skillsData.backend,
                        ...skillsData.frontend,
                        ...skillsData.databases,
                        ...skillsData.devops,
                        ...skillsData.tools,
                      ])
                    )}
                  />
               ) : (
                  <InfiniteScrollSkills skillsData={skillsData} />
               )}
            </div>
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
