"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GistDemo from "../components/GistDemo";
import { playgroundData } from "@/lib/portfolioData";

export default function PlaygroundPage() {
  // State for the custom runner
  const [gistId, setGistId] = useState("");
  const [fileName, setFileName] = useState("");
  const [activeGist, setActiveGist] = useState<{ id: string; file?: string; title: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gistId.trim()) return;
    
    setLoading(true);
    setError(null);
    setActiveGist(null);

    try {
      // Fetch Gist metadata to validate
      const response = await fetch(`https://api.github.com/gists/${gistId.trim()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Gist not found. Please check the ID.");
        }
        throw new Error("Failed to fetch Gist data.");
      }

      const data = await response.json();
      const files = Object.keys(data.files || {});

      // If user specified a file, check if it exists and is HTML
      if (fileName.trim()) {
        const targetFile = files.find(f => f === fileName.trim());
        if (!targetFile) {
          throw new Error(`File "${fileName}" not found in this Gist.`);
        }
        if (!targetFile.toLowerCase().endsWith('.html')) {
           throw new Error(`The file "${fileName}" is not an HTML file. This runner only supports HTML.`);
        }
      } else {
        // Otherwise, look for any HTML file
        const htmlFile = files.find(f => f.toLowerCase().endsWith('.html'));
        if (!htmlFile) {
           throw new Error("This Gist does not contain any .html files. To run an experiment, the Gist must at least have an index.html.");
        }
      }

      setActiveGist({
        id: gistId,
        file: fileName || undefined,
        title: data.description || "Custom Gist"
      });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-emerald-500/30">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-20 sm:py-24">
        
        {/* Hero Section */}
        <section className="text-center mb-16 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full -z-10" />
             <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 mb-6 tracking-tight"
             >
                Developer <span className="text-emerald-400">Playground</span>
             </motion.h1>
             <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
             >
                An interactive lab for experimenting with code. Run any GitHub Gist instantly or explore my curated collection of web experiments.
             </motion.p>
             
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-6 flex justify-center"
             >
                <a 
                  href="https://gist.github.com/Shadhujan" 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 font-medium transition-colors border-b border-transparent hover:border-emerald-400 pb-0.5 text-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                  View all my Gists on GitHub
                </a>
             </motion.div>
        </section>

        {/* Gist Runner UI */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-1 shadow-2xl backdrop-blur-sm max-w-3xl mx-auto"
          >
             <div className="bg-slate-950 rounded-xl p-6 sm:p-8 border border-slate-800/50">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                   Gist Runner
                   
                   <div className="group relative ml-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 hover:text-emerald-400 cursor-help transition-colors"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                      
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                         <div className="text-xs text-slate-300 leading-relaxed text-center">
                            Enter the ID of any GitHub Gist containing an <span className="text-emerald-400 font-mono">index.html</span> file to run it instantly in the browser. Perfect for testing raw HTML/CSS/JS snippets.
                         </div>
                         <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800" />
                      </div>
                   </div>
                </h2>
                <form onSubmit={handleRun} className="flex flex-col sm:flex-row gap-4">
                   <div className="flex-1 space-y-2">
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1">Gist ID</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 91fed575..." 
                        value={gistId}
                        onChange={(e) => setGistId(e.target.value)}
                        className={`w-full bg-slate-900 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-emerald-500'} rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600 font-mono text-slate-300`}
                      />
                   </div>
                   <div className="flex-1 space-y-2">
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider ml-1">File (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. demo.html" 
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600 font-mono text-slate-300"
                      />
                   </div>
                   <div className="space-y-2 pt-6 sm:pt-0 sm:self-end">
                      <button 
                         type="submit"
                         disabled={loading}
                         className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                         {loading ? (
                            <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                         ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                         )}
                         {loading ? 'Checking...' : 'Run'}
                      </button>
                   </div>
                </form>

                {error && (
                   <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-sm text-red-200">
                      <svg className="w-5 h-5 shrink-0 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <p>{error}</p>
                   </div>
                )}

                <div className="mt-4 text-xs text-slate-500 flex flex-col sm:flex-row gap-4 sm:items-center">
                   <p className="flex items-center gap-1.5">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                     Required: Gist must contain an <span className="font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">.html</span> file
                   </p>
                   <p className="hidden sm:block text-slate-700">|</p>
                   <p>Powered by <a href="https://gisthost.github.io/" target="_blank" className="text-slate-400 hover:text-emerald-400 underline decoration-slate-700 underline-offset-2">gisthost</a></p>
                </div>
             </div>
          </motion.div>

          {/* Active Runner Display */}
          {activeGist && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="mt-12"
             >
                <div className="flex items-center justify-between mb-4 px-2">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="font-mono text-sm text-emerald-400">
                         Playing: {activeGist.title || activeGist.file || `Gist ${activeGist.id.substring(0, 8)}...`}
                      </h3>
                   </div>
                   <button onClick={() => setActiveGist(null)} className="text-xs text-slate-500 hover:text-red-400 transition-colors">Close Preview</button>
                </div>
                
                {/* We can modify GistDemo to accept fileName if needed, or update its impl. 
                    For now, passing gistId is standard. If the user provided a filename, 
                    we might need to tweak the URL construction. 
                    
                    Wait! GistDemo takes `gistId` and constructs `/?{gistId}`.
                    Gisthost manual says: `/?{gistId}&file={filename}` (implied).
                    Let's quickly manually verify URL construction or just patch GistDemo?
                    
                    Actually, let's just make sure GistDemo can handle the full query string if we pass it, 
                    OR update GistDemo to accept optional fileName prop.
                    
                    Let's stick to using GistDemo as is for now, but pass "ID?file=NAME" if it works, 
                    or even better, let's PATCH GistDemo in a minute to be cleaner.
                    For this file, I'll pass gistId and modify GistDemo next step if needed.
                */}
                 <div className="w-full aspect-video rounded-xl border border-gray-700 overflow-hidden shadow-2xl bg-gray-900 relative">
                     <iframe
                        key={`${activeGist.id}-${activeGist.file}`} // Force re-render on change
                        src={`https://gisthost.github.io/?${activeGist.id}${activeGist.file ? `&file=${activeGist.file}` : ''}`}
                        title="Live Preview"
                        className="w-full h-full"
                        allowFullScreen
                     />
                 </div>
             </motion.div>
          )}
        </section>


        {/* Showcase Grid */}
        <section>
           <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-bold">Featured Experiments</h2>
              <div className="h-px flex-1 bg-slate-800" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playgroundData.map((item, idx) => (
                 <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => {
                       setGistId(item.gistId);
                       setActiveGist({ id: item.gistId, title: item.name });
                       window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-6 cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col h-full"
                 >
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                       </div>
                       <div className="flex gap-2">
                          {item.tags.map(tag => (
                             <span key={tag} className="text-[10px] uppercase font-bold text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">{tag}</span>
                          ))}
                       </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{item.name}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                       {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                        <div className="flex items-center text-sm font-medium text-emerald-500">
                           Load Experiment
                        </div>
                        <a
                           href={`https://gist.github.com/${item.gistId}`}
                           target="_blank"
                           onClick={(e) => e.stopPropagation()} 
                           className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors z-20"
                        >
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                           View Code
                        </a>
                    </div>
                 </motion.div>
              ))}
              
              {/* Fallback / Empty State filler if needed later */}
           </div>


           {/* Fallback / Empty State filler if needed later */}
        </section>

      </main>
      <Footer />
    </div>
  );
}
