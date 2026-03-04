"use client";

import { motion } from "framer-motion";
import { useMediumArticles } from "@/hooks/useMediumArticles";
import { useEffect, useRef, useState } from "react";

export default function BlogCarousel() {
  const { articles, loading, extractImage } = useMediumArticles();
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [articles]);

  if (loading || articles.length === 0) return null;

  return (
    <div className="w-full relative group">
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="text-xl font-semibold">Latest Writings</h2>
      </div>
      
      <motion.div 
        ref={carousel} 
        className="cursor-grab active:cursor-grabbing overflow-hidden px-4 -mx-4"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-6"
        >
          {articles.slice(0, 6).map((article) => {
             const image = extractImage(article);
             return (
              <motion.a
                key={article.guid}
                href={article.link}
                target="_blank"
                rel="noreferrer"
                className="min-w-[280px] sm:min-w-[320px] h-[360px] relative rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 transition-colors flex flex-col group/card"
              >
                  {/* Image Area */}
                  <div className="h-[200px] w-full bg-slate-800 relative overflow-hidden">
                     {image ? (
                        <img 
                          src={image} 
                          alt={article.title} 
                          className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                        />
                     ) : (
                        <div className="h-full w-full flex items-center justify-center bg-slate-950">
                            <span className="text-4xl">✍️</span>
                        </div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col">
                      <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium mb-2">
                          {new Date(article.pubDate).toLocaleDateString(undefined, { 
                              month: 'short', day: 'numeric', year: 'numeric' 
                          })}
                      </div>
                      <h3 className="text-lg font-bold leading-snug text-slate-100 mb-2 line-clamp-2 group-hover/card:text-white transition-colors">
                          {article.title}
                      </h3>
                      
                       <div className="mt-auto flex items-center text-xs text-slate-500 group-hover/card:text-emerald-400 transition-colors">
                           Read Article <span className="ml-1">→</span>
                       </div>
                  </div>
              </motion.a>
             );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
