"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { aboutData } from "@/lib/portfolioData";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const getLink = (id: string) => {
    return isHome ? `#${id}` : `/#${id}`;
  };

  return (
    <header className="border-b border-slate-800/80 backdrop-blur-sm bg-slate-950/60 sticky top-0 z-[9999]">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
           <Link href="/" className="flex items-center gap-2">
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
        <nav className="hidden sm:flex gap-6 text-xs text-slate-300">
          <Link href={getLink("about")} className="hover:text-emerald-400">
            About
          </Link>
          <Link href={getLink("projects")} className="hover:text-emerald-400">
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
        <Link
          href="/cli"
          className="text-[11px] rounded-full border border-emerald-500/50 px-3 py-1 hover:bg-emerald-500 hover:text-slate-950 transition"
        >
          CLI mode
        </Link>
      </div>
    </header>
  );
}
