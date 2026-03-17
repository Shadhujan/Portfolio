"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey there! 👋 I'm Shad's portfolio assistant. Ask me anything about his projects, skills, experience, or education — I'm happy to help!",
};

const SUGGESTED_QUESTIONS = [
  "What does Shadhujan do?",
  "Tell me about his projects",
  "What tech stack does he use?",
  "How can I contact him?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text?: string) => {
      const messageText = text || input.trim();
      if (!messageText || isStreaming) return;

      setHasInteracted(true);
      const userMessage: Message = { role: "user", content: messageText };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsStreaming(true);

      // Add empty assistant message for streaming
      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages([...updatedMessages, assistantMessage]);

      try {
        abortRef.current = new AbortController();

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.filter(
              (m) => m !== WELCOME_MESSAGE
            ),
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error("API request failed");

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let fullContent = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            fullContent += chunk;

            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: fullContent,
              };
              return updated;
            });
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content:
                "Oops, something went wrong. Please try again! 🙏",
            };
            return updated;
          });
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [input, isStreaming, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Simple markdown-like rendering (bold, inline code)
  const renderContent = (content: string) => {
    if (!content) return null;

    const parts = content.split(/(\*\*[^*]+\*\*|`[^`]+`|\n)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-emerald-300 font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="bg-emerald-950/50 text-emerald-300 px-1.5 py-0.5 rounded text-[11px] font-mono"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part === "\n") return <br key={i} />;
      return <span key={i}>{part}</span>;
    });
  };

  // ── Particle canvas ──
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isOpen) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * DPR;
      canvas.height = rect.height * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    interface Particle {
      x: number; y: number; r: number;
      vx: number; vy: number;
      alpha: number; phase: number;
      color: string;
      type: "dot" | "sparkle";
    }

    const W = () => canvas.getBoundingClientRect().width;
    const H = () => canvas.getBoundingClientRect().height;

    const particles: Particle[] = Array.from({ length: 32 }, () => {
      const colors = [
        "rgba(0,229,255,", "rgba(94,234,212,",
        "rgba(255,255,255,", "rgba(251,191,36,"
      ];
      return {
        x: Math.random() * 104, y: Math.random() * 104,
        r: Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random(), phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.7 ? "sparkle" : "dot",
      };
    });

    const drawSparkle = (cx: number, cy: number, size: number, alpha: number, color: string) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color + "1)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 4) * i;
        ctx.moveTo(cx + Math.cos(angle) * size * 0.3, cy + Math.sin(angle) * size * 0.3);
        ctx.lineTo(cx + Math.cos(angle) * size, cy + Math.sin(angle) * size);
      }
      ctx.stroke();
      ctx.restore();
    };

    let time = 0;
    const loop = () => {
      time += 0.016;
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const flicker = 0.4 + 0.6 * Math.sin(time * 2 + p.phase);
        const a = flicker * 0.8;

        if (p.type === "sparkle") {
          drawSparkle(p.x, p.y, p.r * 4, a, p.color);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color + a + ")";
          ctx.fill();
        }
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isOpen]);

  return (
    <>
      {/* ══ Energized Data Core FAB ══ */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chatbot-fab"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9998] group cursor-pointer"
            aria-label="Open chat assistant"
            style={{ background: "none", border: "none" }}
          >
            <div className="data-core-container">
              {/* Particle canvas */}
              <canvas
                ref={canvasRef}
                className="data-core-particles"
              />

              {/* Halo */}
              <div className="data-core-halo" />

              {/* Ring 3 (outermost) */}
              <div className="data-core-ring data-core-ring--3" />

              {/* Ring 2 (middle) + circuit overlay */}
              <div className="data-core-ring data-core-ring--2">
                <svg className="data-core-circuit" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" />
                  <path d="M 10 50 Q 30 20 50 50 T 90 50" />
                </svg>
              </div>

              {/* Ring 1 (innermost) + circuit overlay */}
              <div className="data-core-ring data-core-ring--1">
                <svg className="data-core-circuit" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="38" />
                  <path d="M 5 40 Q 20 10 40 40 T 75 40" />
                </svg>
              </div>

              {/* Inner glow (behind glass) */}
              <div className="data-core-inner-glow" />

              {/* Frosted glass sphere */}
              <div className="data-core-glass">
                {/* Icosahedron SVG */}
                <svg
                  className="data-core-icosa"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="icosa-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ff8c00" stopOpacity="0.7" />
                    </linearGradient>
                    <linearGradient id="icosa-wire" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5eead4" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id="icosa-glow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Filled faces */}
                  <g filter="url(#icosa-glow)">
                    <polygon points="50,8 72,30 50,40" fill="url(#icosa-fill)" opacity="0.9" />
                    <polygon points="50,8 28,30 50,40" fill="url(#icosa-fill)" opacity="0.75" />
                    <polygon points="28,30 22,58 50,40" fill="url(#icosa-fill)" opacity="0.6" />
                    <polygon points="72,30 78,58 50,40" fill="url(#icosa-fill)" opacity="0.65" />
                    <polygon points="50,40 22,58 38,82" fill="url(#icosa-fill)" opacity="0.5" />
                    <polygon points="50,40 78,58 62,82" fill="url(#icosa-fill)" opacity="0.55" />
                    <polygon points="50,40 38,82 62,82" fill="url(#icosa-fill)" opacity="0.7" />
                    <polygon points="22,58 38,82 50,92" fill="url(#icosa-fill)" opacity="0.4" />
                    <polygon points="78,58 62,82 50,92" fill="url(#icosa-fill)" opacity="0.45" />
                  </g>

                  {/* Wireframe overlay */}
                  <g stroke="url(#icosa-wire)" strokeWidth="0.8" fill="none">
                    <polygon points="50,8 72,30 50,40" />
                    <polygon points="50,8 28,30 50,40" />
                    <polygon points="28,30 22,58 50,40" />
                    <polygon points="72,30 78,58 50,40" />
                    <polygon points="50,40 22,58 38,82" />
                    <polygon points="50,40 78,58 62,82" />
                    <polygon points="50,40 38,82 62,82" />
                    <polygon points="22,58 38,82 50,92" />
                    <polygon points="78,58 62,82 50,92" />
                    <line x1="50" y1="8" x2="50" y2="92" strokeOpacity="0.15" />
                    <line x1="22" y1="58" x2="78" y2="58" strokeOpacity="0.15" />
                  </g>
                </svg>
              </div>

              {/* Floating tooltip — visible on hover */}
              <div className="data-core-tooltip">
                ✦ Ask me anything ✦
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[9998] w-[calc(100vw-3rem)] sm:w-[400px] h-[min(580px,calc(100vh-6rem))] flex flex-col rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-900/20"
            style={{
              background:
                "linear-gradient(145deg, rgba(2,6,23,0.97) 0%, rgba(6,15,30,0.98) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500/10 bg-emerald-950/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                    S
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    Shad&apos;s Assistant
                  </p>
                  <p className="text-[10px] text-emerald-400/80">
                    {isStreaming ? "Typing..." : "Online"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-lg hover:bg-slate-800/50"
                aria-label="Close chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3 chatbot-scrollbar"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-emerald-600/90 text-white rounded-br-md shadow-md"
                        : "bg-slate-800/70 text-slate-200 rounded-bl-md border border-slate-700/50"
                    }`}
                  >
                    {msg.role === "assistant"
                      ? renderContent(msg.content)
                      : msg.content}

                    {/* Streaming cursor */}
                    {msg.role === "assistant" &&
                      i === messages.length - 1 &&
                      isStreaming && (
                        <span className="inline-block w-1.5 h-4 bg-emerald-400 rounded-full ml-0.5 chatbot-blink align-middle" />
                      )}
                  </div>
                </motion.div>
              ))}

              {/* Suggested questions (only before first user message) */}
              {!hasInteracted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400/50 transition-all cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-emerald-500/10 bg-slate-950/50">
              <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl px-3 py-1.5 border border-slate-700/50 focus-within:border-emerald-500/40 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={
                    isStreaming ? "Waiting for response..." : "Ask about Shadhujan..."
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isStreaming}
                  className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isStreaming}
                  className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/15 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                  aria-label="Send message"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-slate-600 text-center mt-1.5">
                Powered by Groq • Answers from portfolio data
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
