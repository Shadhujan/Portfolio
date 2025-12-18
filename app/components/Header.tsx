"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { aboutData } from "@/lib/portfolioData";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  const getLink = (id: string) => {
    return isHome ? `#${id}` : `/#${id}`;
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <header className="border-b border-slate-800/80 backdrop-blur-sm bg-slate-950/60 sticky top-0 z-[9999]">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3 relative">
        <div className="flex items-center gap-2 relative z-50">
           <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
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
           </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-6 text-xs text-slate-300">
          <Link href="/about" className="hover:text-emerald-400">
            About
          </Link>
          <Link href="/projects" className="hover:text-emerald-400">
            Projects
          </Link>
          <Link href={getLink("skills")} className="hover:text-emerald-400">
            Skills
          </Link>
          <Link href="/blog" className="hover:text-emerald-400">
            Blog
          </Link>
          <Link href={getLink("contact")} className="hover:text-emerald-400">
            Contact
          </Link>
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3">
            <Link
              href="/cli"
              className="text-[11px] rounded-full border border-emerald-500/50 px-3 py-1 hover:bg-emerald-500 hover:text-slate-950 transition hidden sm:block"
            >
              CLI mode
            </Link>

            {/* Hamburger Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden relative z-50 p-2 text-slate-300 hover:text-emerald-400 transition-colors"
                aria-label="Toggle menu"
            >
                <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
                    <motion.span 
                        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        className="w-full h-0.5 bg-current rounded-full origin-center"
                    />
                    <motion.span 
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-full h-0.5 bg-current rounded-full"
                    />
                    <motion.span 
                        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                        className="w-full h-0.5 bg-current rounded-full origin-center"
                    />
                </div>
            </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                    className="absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl overflow-hidden sm:hidden"
                >
                    <nav className="flex flex-col p-6 gap-4">
                        {[
                            { label: "About", href: "/about" },
                            { label: "Projects", href: "/projects" },
                            { label: "Skills", href: getLink("skills") },
                            { label: "Blog", href: "/blog" },
                            { label: "Contact", href: getLink("contact") },
                            { label: "CLI Mode", href: "/cli" },
                        ].map((item) => (
                            <motion.div key={item.label} variants={itemVariants}>
                                <Link 
                                    href={item.href}
                                    className="text-lg font-medium text-slate-300 hover:text-emerald-400 block py-2 border-b border-slate-900/50 last:border-0"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </header>
  );
}
