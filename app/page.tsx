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
import PlanetBackground from "./components/hero-effects/PlanetBackground";
import FloatingCards from "./components/hero-effects/FloatingCards";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogCarousel from "./components/BlogCarousel";
import ContactSection from "./components/ContactSection";

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
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1">
        {/* Hero */}
        <section className="relative border-b border-slate-900 bg-slate-950 overflow-hidden min-h-[600px] flex items-center">
          {/* Interactive Planet Background */}
          <PlanetBackground />

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
                Shadhujan <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Jeyachandran
                </span>
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
                <a
                  href="/cv/Shadhujan Jeyachandran CV 2025_Feb2.pdf"
                  download
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-emerald-500 px-8 font-medium text-slate-950 transition-all duration-300 hover:bg-emerald-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  <span className="mr-2">Download Resume</span>
                  <span className="group-hover:translate-y-1 transition-transform text-lg">↓</span>
                </a>
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
        {/* About: Magazine Style */}
        <section id="about" className="border-b border-slate-900 bg-slate-950 py-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
             <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 sm:gap-16 items-center">
                
                {/* Image Column */}
                <motion.div 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="relative group"
                >
                   {/* Decorative Frame */}
                   <div className="absolute -inset-4 border-2 border-slate-800 rounded-lg translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                   <div className="absolute -inset-4 border border-emerald-500/20 rounded-lg -translate-x-2 -translate-y-2 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                   
                   {/* Image Container */}
                   <div className="relative aspect-[3/4] overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all duration-700 ease-in-out shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 opactiy-60" />
                      {/* Using standard img tag for simplicity with external/local assets, can specificy Next/Image if needed but path is raw */}
                      <img 
                        src="/profile/profile 4 to 3.jpg" 
                        alt="Shadhujan Jeyachandran" 
                        className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
                      />
                      
                      {/* Floating Badge */}
                      <div className="absolute bottom-6 left-6 z-20">
                         <span className="bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 uppercase tracking-widest mb-1 inline-block">
                           Dev's Pick
                         </span>
                         <p className="text-white font-serif text-lg italic opacity-90">
                           "Engineering with soul."
                         </p>
                      </div>
                   </div>
                </motion.div>

                {/* Text Column */}
                <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="relative"
                >
                   <h2 className="text-5xl sm:text-7xl font-serif text-slate-100 font-bold leading-[0.9] mb-8 tracking-tighter">
                      THE <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                        CREATIVE
                      </span> <br />
                      MINDSET.
                   </h2>

                   <div className="prose prose-invert prose-lg text-slate-400 relative">
                      <p className="lead border-l-4 border-emerald-500 pl-6 italic text-xl text-slate-300 mb-6">
                        "I believe that the best code isn't just written, it's crafted. It tells a story of logic, creativity, and the relentless pursuit of efficiency."
                      </p>
                      <p className="mb-6 first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-serif first-letter:text-slate-100">
                        Hi, I’m <span className="text-slate-200 font-semibold">Shadhujan Jeyachandran</span>, a Full Stack Developer based in Colombo, Sri Lanka. I currently work as an <span className="text-emerald-400">Intern Software Engineer at M Data Zone</span> (since April 2025).
                      </p>
                      <p className="mb-6">
                        I graduated with a <strong className="text-slate-200">BSc. (Hons) in Computer Science</strong> from the University of Bedfordshire, UK (SLIIT) with <span className="text-emerald-400 font-medium">First Class Honours</span>. Prior to that, I completed my <strong className="text-slate-200">Higher Diploma in IT</strong> at SLIIT CITY UNI with a 3.30 GPA.
                      </p>
                      <p>
                        My journey from automation to full-stack development has been driven by a singular purpose: to build systems that matter.
                      </p>
                   </div>
                </motion.div>

             </div>
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

        {/* Blog Carousel */}
        <section id="blog" className="border-b border-slate-900">
           <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
             <BlogCarousel />
           </div>
        </section>

        {/* Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
}
