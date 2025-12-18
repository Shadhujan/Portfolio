"use client";

import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { projectsData } from "@/lib/portfolioData";
import { useState } from "react";

export default function ProjectsPage() {
  // Optional: Filter state if we want to add categories later
  // const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-emerald-500/30">
      <Header />

      <main className="flex-1 w-full">
        {/* Immersive Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex flex-col justify-center items-center overflow-hidden border-b border-slate-900">
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#10b981_0,_transparent_30%)] opacity-10 blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#3b82f6_0,_transparent_30%)] opacity-10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_0%,_#020617_100%)]" />

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="text-emerald-400 font-mono text-sm mb-4 tracking-[0.2em] uppercase"
             >
               Portfolio
             </motion.p>
             <motion.h1 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-600 mb-6"
             >
               SELECTED WORKS
             </motion.h1>
             <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4, duration: 0.8 }}
               className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
             >
               From minimal scripts to complex full-stack applications. A collection of my journey through code.
             </motion.p>
          </div>
        </section>

        {/* Project Grid */}
        <section className="py-20 px-4 sm:px-6">
           <div className="max-w-7xl mx-auto">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projectsData.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-emerald-500/30 transition-all duration-300 hover:bg-slate-900/80 hover:-translate-y-1 relative overflow-hidden flex flex-col h-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,_#10b981_0,_transparent_40%)] opacity-5" />
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 relative z-10">
                       <div className="p-2 rounded-lg bg-slate-800/50 text-emerald-400 mb-2 border border-slate-700/50 group-hover:border-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                       </div>
                       {project.liveUrl && (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                       )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-300 transition-colors relative z-10">
                      {project.name}
                    </h3>
                    
                    <p className="text-sm text-slate-400 mb-6 flex-1 leading-relaxed relative z-10">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-slate-800/50 px-2.5 py-1 text-[11px] font-medium text-slate-300 border border-slate-700/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-auto relative z-10">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors ml-auto"
                        >
                          Live Demo
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                      )}
                    </div>

                  </motion.div>
                ))}
              </div>
           </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
