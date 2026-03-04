"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Define interface locally or import if we had a types file
interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  url?: string;
  liveUrl?: string;
  longDescription?: string;

  features?: string[];
  gistId?: string;
}

import GistDemo from "./GistDemo";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-3xl max-h-[82vh] rounded-2xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden text-left"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-start shrink-0 relative">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
                
                <div className="pr-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
                    {project.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 font-medium border border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                
                <div className="prose prose-invert prose-emerald max-w-none">
                  {/* Overview */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                      Overview
                    </h3>
                    


                    <p className="text-slate-300 leading-relaxed text-base">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        Key Features
                      </h3>
                      <ul className="grid sm:grid-cols-2 gap-3 pl-0 list-none">
                        {project.features.map((feature, idx) => (
                           <li key={idx} className="flex gap-3 items-start bg-slate-800/30 p-3 rounded-lg border border-slate-800/50">
                             <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                             <span className="text-slate-300 text-sm">
                               {feature.split(/(\*\*.*?\*\*)/).map((part, i) => 
                                 part.startsWith("**") && part.endsWith("**") ? (
                                   <strong key={i} className="text-emerald-400 font-semibold">{part.slice(2, -2)}</strong>
                                 ) : (
                                   part
                                 )
                               )}
                             </span>
                           </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Gist Demo Embed */}
                  {project.gistId && (
                    <div className="mb-6 mt-8">
                      <GistDemo gistId={project.gistId} title={project.name} />
                    </div>
                  )}
                </div>

              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-slate-800 bg-slate-950/30 flex gap-4 shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    Live Demo
                  </a>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-all border border-slate-700 hover:border-slate-600 ${!project.liveUrl ? 'w-full' : ''}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    View Code
                  </a>
                )}
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
