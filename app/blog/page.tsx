"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useMediumArticles } from "@/hooks/useMediumArticles";

export default function BlogPage() {
  const { articles, loading, error, extractImage } = useMediumArticles();

  // Helper to strip HTML tags for description
  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 border-b border-slate-900">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold mb-4">Blog</h1>
              <p className="text-slate-400 max-w-2xl">
                Thoughts, tutorials, and insights on .NET, React, and Software
                Engineering.
              </p>
            </motion.div>

            {loading && (
              <div className="flex justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-500"></div>
              </div>
            )}

            {error && (
              <div className="text-red-400 bg-red-900/10 border border-red-900/20 p-4 rounded-lg">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, idx) => {
                   const cleanDescription = stripHtml(article.description);
                   const truncatedDescription = cleanDescription.length > 150 
                      ? cleanDescription.substring(0, 150) + "..." 
                      : cleanDescription;

                   return (
                  <motion.article
                    key={article.guid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-300"
                  >
                    <div className="aspect-video w-full overflow-hidden bg-slate-800 relative">
                       {/* Calculate image source once */}
                       {(() => {
                         const imgSrc = extractImage(article);
                         return imgSrc ? (
                           <img 
                             src={imgSrc} 
                             alt={article.title}
                             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                           />
                         ) : (
                          <div className="h-full w-full flex items-center justify-center text-slate-600 bg-slate-900">
                              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                          </div>
                         );
                       })()}
                      
                      <div className="absolute top-2 right-2 flex gap-2">
                        {article.categories.slice(0, 2).map(cat => (
                           <span key={cat} className="px-2 py-1 text-[10px] uppercase font-bold bg-slate-950/80 backdrop-blur-sm text-emerald-400 rounded">
                              {cat}
                           </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 p-5">
                      <div className="text-[11px] text-slate-500 mb-2">
                        {new Date(article.pubDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      
                      <h2 className="text-lg font-bold mb-2 leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      
                      {/* Truncated clean description */}
                       <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                          {truncatedDescription}
                       </p>

                      <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between">
                         <span className="text-xs text-slate-500 font-medium">Read on Medium</span>
                         <svg className="w-4 h-4 text-emerald-500 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                         </svg>
                      </div>
                    </div>
                    
                    <a 
                      href={article.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="absolute inset-0 z-20"
                    >
                      <span className="sr-only">Read {article.title}</span>
                    </a>
                  </motion.article>
                   );
                })}
              </div>
            )}
            
            {!loading && articles.length === 0 && !error && (
                <div className="text-center py-20 text-slate-500">
                    <p>No articles found.</p>
                </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
