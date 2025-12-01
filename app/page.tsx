import Link from "next/link";
import { aboutData, projectsData, skillsData } from "@/lib/portfolioData";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-xs font-bold">
              {aboutData.name[0]}
            </div>
            <div>
              <p className="text-sm font-semibold">{aboutData.name}</p>
              <p className="text-xs text-slate-400">{aboutData.role}</p>
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
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        {/* Hero with question about CLI */}
        <section className="border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-3">
                Portfolio v1.0.0
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4">
                Do you want to explore my portfolio
                <span className="text-emerald-400"> in CLI mode</span>?
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-xl">
                I designed two experiences: a clean visual portfolio and a
                playful command line interface. Choose the style you feel more
                comfortable with.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/cli"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 transition"
                >
                  Open CLI experience
                  <span className="text-xs bg-slate-950/10 rounded-full px-2 py-0.5">
                    for devs
                  </span>
                </Link>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-400 hover:text-emerald-300 transition"
                >
                  Continue with normal portfolio
                </a>
              </div>
            </div>

            {/* Small summary card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-xl">
              <p className="text-xs text-slate-400 mb-2">Quick snapshot</p>
              <p className="text-sm font-medium mb-1">
                {aboutData.role} based in {aboutData.location}
              </p>
              <p className="text-xs text-slate-300 mb-3">{aboutData.summary}</p>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-200">
                {skillsData.frontend.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-800 px-3 py-1 border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-b border-slate-900">
          <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-sm text-slate-300 max-w-2xl">{aboutData.summary}</p>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="border-b border-slate-900">
          <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
            <h2 className="text-xl font-semibold mb-4">Selected Projects</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-400/70 transition"
                >
                  <p className="text-xs text-slate-500 mb-1 uppercase tracking-[0.2em]">
                    {project.id}
                  </p>
                  <h3 className="text-base font-semibold mb-1">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-300 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-200"
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
                      className="text-xs text-emerald-400 hover:text-emerald-300 underline"
                    >
                      View code / live demo
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="border-b border-slate-900">
          <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-sm">
              <div>
                <h3 className="text-sm font-medium mb-2">Languages</h3>
                <ul className="text-slate-300 text-xs space-y-1">
                  {skillsData.languages.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Frontend</h3>
                <ul className="text-slate-300 text-xs space-y-1">
                  {skillsData.frontend.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Backend</h3>
                <ul className="text-slate-300 text-xs space-y-1">
                  {skillsData.backend.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Tools</h3>
                <ul className="text-slate-300 text-xs space-y-1">
                  {skillsData.tools.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-sm text-slate-300 mb-2">
              I&apos;m open for freelance work and interesting full-time roles.
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
