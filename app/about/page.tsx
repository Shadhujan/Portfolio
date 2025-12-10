"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { aboutData, skillsData } from "@/lib/portfolioData";
import SkillOrbit from "../components/SkillOrbit";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-emerald-500/30">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-24 sm:py-32">
        {/* Breadcrumb / Back Navigation */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5 }}
           className="mb-12"
        >
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-slate-400 hover:text-emerald-400 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-x-1 transition-transform">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24"
        >
          {/* Hero / Intro Section */}
          <motion.section variants={itemVariants} className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6 pb-2">
                Behind the Code
              </h1>
              <div className="prose prose-invert prose-lg text-slate-300 leading-relaxed">
                 {aboutData.summary.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph.trim()}</p>
                 ))}
              </div>
            </div>
            
            {/* Quick Stats / Highlights Card */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
               </div>
               <h3 className="text-lg font-semibold text-emerald-400 mb-4">Quick Facts</h3>
               <ul className="space-y-4 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                     <span className="p-2 rounded-full bg-slate-800 text-emerald-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                     </span>
                     {aboutData.location}
                  </li>
                  <li className="flex items-center gap-3">
                     <span className="p-2 rounded-full bg-slate-800 text-emerald-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
                     </span>
                     {aboutData.role}
                  </li>
                  <li className="flex items-center gap-3">
                     <span className="p-2 rounded-full bg-slate-800 text-emerald-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10v6"/><path d="M20 2c0 5-2 12-6 17"/><path d="M4 2c0 5 2 12 6 17"/><path d="M15 2H9"/></svg>
                     </span>
                     Full Stack Enthusiast
                  </li>
               </ul>
            </div>
          </motion.section>

          {/* Hobbies & Interests Grid */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-slate-100 mb-8 border-l-4 border-emerald-500 pl-4">
              Life Beyond Code
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
               {/* Hobbies */}
               <div className="space-y-6">
                  <h3 className="text-lg font-medium text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2">
                     <span className="h-px bg-slate-800 flex-1"></span>
                     Hobbies
                     <span className="h-px bg-slate-800 flex-1"></span>
                  </h3>
                  <div className="grid gap-4">
                     {/* @ts-ignore - hobbies exists in our updated data but type might not be inferred yet if not updated globally */}
                     {aboutData.hobbies?.map((hobby: any, idx: number) => (
                        <div key={idx} className="group flex items-start p-4 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all">
                           <div className="mr-4 p-3 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                              {/* Simple mapping for icons based on title for now */}
                              {hobby.title === 'Gaming' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>}
                              {hobby.title === 'Reading' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>}
                              {hobby.title === 'Music' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>}
                              {hobby.title === 'Travel' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 4 6 3.2-2 2-4-1.5L1 16l7.4 1.6c.7.1 1.4-.1 1.9-.6l4.1-4.1 3.4 4.5c.5.5.8.9.9 1.4.1.5.1.7.3.4Z"/></svg>}
                              {!['Gaming', 'Reading', 'Music', 'Travel'].includes(hobby.title) && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/></svg>}
                           </div>
                           <div>
                              <h4 className="font-semibold text-slate-200 mb-1">{hobby.title}</h4>
                              <p className="text-xs text-slate-400 leading-relaxed">{hobby.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Interests */}
               <div className="space-y-6">
                  <h3 className="text-lg font-medium text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2">
                     <span className="h-px bg-slate-800 flex-1"></span>
                     Key Interests
                     <span className="h-px bg-slate-800 flex-1"></span>
                  </h3>
                  <div className="grid gap-3">
                     {/* @ts-ignore */}
                     {aboutData.interests?.map((interest: any, idx: number) => (
                        <div key={idx} className="p-4 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
                           <h4 className="font-semibold text-emerald-300 mb-1">{interest.title}</h4>
                           <p className="text-sm text-slate-400">{interest.description}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </motion.section>



        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
