"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { aboutData } from "@/lib/portfolioData";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-emerald-500/30">
      <Header />

      <main className="flex-1 w-full">
        {/* Immersive Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex flex-col justify-center items-center overflow-hidden border-b border-slate-900">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#10b981_0,_transparent_45%)] opacity-10 blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_0%,_#020617_100%)]" />
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="text-emerald-400 font-mono text-sm mb-4 tracking-[0.2em] uppercase"
             >
               Profile
             </motion.p>
             <motion.h1 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-600 mb-8"
             >
               MY STORY
             </motion.h1>
             <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4, duration: 0.8 }}
               className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed"
             >
               A glimpse into my journey as a developer and the passions that drive me.
             </motion.p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-24 space-y-32">
          
          {/* Stylized Bio / Journey */}
          <section className="grid md:grid-cols-12 gap-12 items-start">
             <div className="md:col-span-4 sticky top-24">
                <h2 className="text-3xl font-bold mb-6 text-slate-100 flex items-center gap-3">
                   <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
                   The Journey
                </h2>
                <div className="p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl backdrop-blur-sm">
                   <p className="text-emerald-300 font-medium mb-2">Current Role</p>
                   <p className="text-xl text-slate-200 font-bold mb-1">{aboutData.role}</p>
                   <p className="text-sm text-slate-400">at M Data Zone</p>
                </div>
             </div>
             
             <div className="md:col-span-8 space-y-8">
                <div className="prose prose-invert prose-lg text-slate-300 leading-relaxed">
                   <p className="text-xl font-light text-slate-100 mb-8 border-l-4 border-slate-700 pl-6 italic">
                     "I didn't just stumble into coding; I chased it through the layers of abstraction, from high-level automation down to the metal of backend architecture."
                   </p>
                   {aboutData.summary.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-6 first-letter:float-left first-letter:text-4xl first-letter:pr-3 first-letter:font-bold first-letter:text-emerald-500">
                        {paragraph.trim()}
                      </p>
                   ))}
                </div>
             </div>
          </section>

          {/* Academic Foundation: Snake Layout */}
          <section className="max-w-4xl mx-auto">
             <h2 className="text-3xl font-bold mb-16 text-slate-100 flex items-center gap-3">
                <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
                Academic Foundation
             </h2>
             
             <div className="relative">
                {/* Connector logic handles the lines now */}

                <div className="grid md:grid-cols-2 gap-y-12 gap-x-8 relative">
                   {/* @ts-ignore */}
                   {aboutData.education?.map((edu: any, idx: number) => {
                      const isLeft = idx === 0 || idx === 3;
                      const colClass = isLeft ? "md:col-start-1" : "md:col-start-2";
                      
                      return (
                        <motion.div
                           key={idx}
                           initial={{ opacity: 0, scale: 0.9 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.5, delay: idx * 0.1 }}
                           className={`relative ${colClass}`}
                        >
                           <div className="group relative h-full">
                              {/* Glow Effect */}
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                              
                              <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-3xl relative hover:border-emerald-500/30 transition-all duration-300 hover:bg-slate-900/60 hover:-translate-y-1 group-hover:shadow-2xl shadow-emerald-900/5 h-full flex flex-col justify-between">
                                 <div>
                                    <div className="flex justify-between items-start mb-6">
                                       <div className="w-12 h-12 bg-slate-950/80 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-300 shadow-lg shadow-emerald-500/5 group-hover:shadow-emerald-500/20">
                                          <span className="font-bold text-xl font-mono">{idx + 1}</span>
                                       </div>
                                       <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                         {edu.year}
                                       </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-300 transition-colors">{edu.degree}</h3>
                                    <p className="text-slate-400 text-sm font-medium">{edu.institution}</p>
                                 </div>
                                 
                                 {edu.result && (
                                    <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center gap-2">
                                       <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.8)]" />
                                       <p className="text-emerald-400 text-sm font-semibold tracking-wide">{edu.result}</p>
                                    </div>
                                 )}

                                 {/* CONNECTORS (Desktop Only) */}
                                 {/* 1 -> 2: Right of 1 connects to Left of 2 */}
                                 {idx === 0 && (
                                    <div className="hidden md:block absolute top-1/2 -right-10 w-12 h-[2px] bg-gradient-to-r from-emerald-500/20 to-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.4)] z-0" />
                                 )}
                                 
                                 {/* 2 -> 3: Bottom of 2 connects to Top of 3 (Vertical Center) */}
                                 {idx === 1 && (
                                    <div className="hidden md:block absolute top-[calc(100%-2rem)] left-1/2 w-[2px] h-[calc(3rem+4rem)] bg-gradient-to-b from-emerald-500/20 to-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.4)] -z-10" />
                                 )}

                                 {/* 3 -> 4: Left of 3 connects to Right of 4 */}
                                 {idx === 2 && (
                                    <div className="hidden md:block absolute top-1/2 -left-10 w-12 h-[2px] bg-gradient-to-l from-emerald-500/20 to-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.4)] z-0" />
                                 )}

                              </div>
                           </div>
                        </motion.div>
                      );
                   })}
                </div>
             </div>
          </section>

          {/* Hobbies & Interests: Bento Grid */}
          <section>
             <div className="mb-16 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Life Beyond Code</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                   Fueling creativity through diverse passions. What I do when the IDE is closed.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                
                {/* Gaming - Large Square (2x2) */}
                <motion.div 
                   whileHover={{ scale: 1.02 }}
                   className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-indigo-950/30 border border-indigo-500/20"
                >
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                   <div className="absolute bottom-0 left-0 p-8">
                      <div className="bg-indigo-500/20 p-3 rounded-xl inline-block mb-4 backdrop-blur-md border border-indigo-500/30 text-indigo-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">Gaming</h3>
                      <p className="text-slate-300">Strategizing in competitive ranks & immersive open worlds.</p>
                   </div>
                </motion.div>

                {/* Reading - Tall (1x2) */}
                <motion.div 
                   whileHover={{ y: -5 }}
                   className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-3xl bg-amber-950/20 border border-amber-500/20"
                >
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                   </div>
                   <div className="absolute bottom-0 left-0 p-6 w-full">
                      <h3 className="text-xl font-bold text-amber-100 mb-2">Reading</h3>
                      <p className="text-sm text-amber-200/70 mb-4">Tech blogs, Sci-Fi, & AI Research.</p>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full w-2/3 bg-amber-500" />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-2 text-right">65% Progress</p>
                   </div>
                </motion.div>

                {/* Music - Wide (2x1) */}
                <Link 
                   href="https://open.spotify.com/user/31wl6wq4szsjnetv43hqydfg3j24?si=35dc5b1781344081"
                   target="_blank"
                   className="md:col-span-1 md:row-span-1 block"
                >
                <motion.div 
                   whileHover={{ scale: 1.02 }}
                   className="relative h-full group overflow-hidden rounded-3xl bg-[#1DB954]/10 border border-[#1DB954]/20 flex flex-col justify-between p-6 cursor-pointer hover:bg-[#1DB954]/20 transition-colors"
                >
                   {/* Background Gradient */}
                   <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-transparent to-slate-950/80 z-0" />
                   
                   <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                         {/* Spotify Logo */}
                         <div className="text-[#1DB954]">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                               <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.019.6-1.139 4.44-1.32 9.9-1.021 13.561 1.019.299.119.539.539.18 1.02zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.299c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.139-1.26 11.281-1.019 15.779 1.62.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.619.299z" />
                            </svg>
                         </div>
                         
                         {/* Equalizer */}
                         <div className="flex space-x-1 items-end h-6">
                            <span className="w-1 bg-[#1DB954] h-2 animate-pulse" />
                            <span className="w-1 bg-[#1DB954] h-4 animate-pulse delay-75" />
                            <span className="w-1 bg-[#1DB954] h-6 animate-pulse delay-150" />
                            <span className="w-1 bg-[#1DB954] h-3 animate-pulse delay-100" />
                         </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                         {/* User Logo / Profile */}
                         <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1DB954]/50 shadow-lg shadow-[#1DB954]/20 relative">
                             <img src="/profile/spotify_profile.png" alt="Profile" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-gradient-to-tr from-black/0 via-white/10 to-transparent" />
                         </div>
                         <div>
                            <h3 className="text-white font-bold text-lg leading-tight">Music</h3>
                            <p className="text-[#1DB954] text-xs font-medium">On Repeat</p>
                         </div>
                      </div>
                   </div>

                   <div className="relative z-10">
                      <div className="flex flex-wrap gap-1.5">
                         {['Kollywood', 'Soft pop', 'Indie Pop', 'Filmi', 'Art Pop'].map((genre, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-slate-300 bg-slate-950/50 px-2 py-1 rounded-md border border-slate-800 hover:text-[#1DB954] hover:border-[#1DB954]/30 transition-colors">
                              {genre}
                            </span>
                         ))}
                      </div>
                   </div>
                </motion.div>
                </Link>

                {/* Travel - Standard (1x1) - Placed to fill */}
                <motion.div 
                   whileHover={{ scale: 1.02 }}
                   className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl bg-cyan-950/30 border border-cyan-500/20"
                >
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-slate-950/40 hover:bg-slate-950/20 transition-colors" />
                   <div className="absolute inset-0 flex items-center justify-center">
                       <h3 className="text-2xl font-bold text-white drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">Travel</h3>
                   </div>
                </motion.div>

             </div>

             {/* Ticker for Interests */}
             <div className="mt-8 border-y border-slate-900 bg-slate-950/50 py-4 overflow-hidden relative">
                <div className="flex gap-12 animate-scroll whitespace-nowrap">
                   {/* Duplicating for infinite scroll illusion - minimal implementation */}
                   {[...aboutData.interests, ...aboutData.interests, ...aboutData.interests].map((item: any, i) => (
                      <div key={i} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                         <span className="w-2 h-2 rounded-full bg-emerald-500" />
                         <span className="text-sm font-semibold tracking-wider uppercase text-slate-300">{item.title}</span>
                      </div>
                   ))}
                </div>
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
             </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
