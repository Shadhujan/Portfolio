import Link from "next/link";
import { aboutData } from "@/lib/portfolioData";

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950">
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
  );
}
