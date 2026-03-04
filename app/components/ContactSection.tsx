"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aboutData } from "@/lib/portfolioData";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (aboutData.email) {
      navigator.clipboard.writeText(aboutData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 overflow-hidden bg-slate-950">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl p-8 sm:p-12 text-center overflow-hidden"
        >
          {/* Decorative Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6"
             >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Open to Opportunities
             </motion.div>

             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-6 tracking-tight">
               Let&apos;s Build Something <br className="hidden sm:block"/> Extraordinary
             </h2>

             <p className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed">
               Have a project in mind or just want to say hi? I&apos;m currently available for freelance projects and full-time roles.
             </p>

             <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <button
                  onClick={handleCopyEmail}
                  className="group relative inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 text-sm font-medium text-slate-950 transition-all duration-300 hover:bg-emerald-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  <span className="relative z-10 flex items-center gap-2">
                     {aboutData.email}
                     <AnimatePresence mode="wait">
                       {copied ? (
                         <motion.span
                           key="check"
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           exit={{ scale: 0 }}
                         >
                           <CheckIcon className="w-4 h-4" />
                         </motion.span>
                       ) : (
                         <motion.span
                           key="copy"
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           exit={{ scale: 0 }}
                         >
                           <CopyIcon className="w-4 h-4 opacity-75 group-hover:opacity-100" />
                         </motion.span>
                       )}
                     </AnimatePresence>
                  </span>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded shadow-lg border border-slate-700 whitespace-nowrap"
                    >
                      Copied to clipboard!
                    </motion.div>
                  )}
                </button>

                <div className="flex items-center gap-3">
                   {/* Send Email Action */}
                   {aboutData.email && (
                      <SocialLink 
                        href={`mailto:${aboutData.email}`} 
                        icon={<MailIcon />} 
                        label="Send Email" 
                      />
                   )}

                   {aboutData.github && (
                     <SocialLink href={aboutData.github} icon={<GithubIcon />} label="GitHub" />
                   )}
                   {aboutData.linkedin && (
                     <SocialLink href={aboutData.linkedin} icon={<LinkedinIcon />} label="LinkedIn" />
                   )}
                   {aboutData.medium && (
                     <SocialLink href={aboutData.medium} icon={<MediumIcon />} label="Medium" />
                   )}
                   {aboutData.instagram && (
                     <SocialLink href={aboutData.instagram} icon={<InstagramIcon />} label="Instagram" />
                   )}
                   {/* Removed Website Link as requested */}
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
       <a
         href={href}
         target="_blank"
         rel="noreferrer"
         aria-label={label}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-700 bg-slate-900/50 text-slate-400 transition-all duration-300 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-slate-800 hover:scale-110 relative z-10"
       >
         {icon}
       </a>
       <AnimatePresence>
         {hovered && (
           <motion.div
             initial={{ opacity: 0, y: 10, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 5, scale: 0.9 }}
             transition={{ duration: 0.2 }}
             className="absolute -top-10 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-md text-[10px] text-slate-200 font-medium whitespace-nowrap shadow-xl z-20 pointer-events-none"
           >
             {label}
             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-b border-r border-slate-700 rotate-45" />
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}

// Simple Icons

function MailIcon(props: React.ComponentProps<"svg">) {
   return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        {...props}
      >
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
   );
}

function CopyIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
   return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
         <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
   );
}

function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}

function LinkedinIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function MediumIcon(props: React.ComponentProps<"svg">) {
   return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        {...props}
      >
        <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
   );
}

function InstagramIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}
