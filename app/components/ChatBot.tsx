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
    "Hey there! 👋 I'm Shad's portfolio assistant. Ask me anything about his projects, skills, experience, or education. I'm happy to help!",
};

const SUGGESTED_QUESTIONS = [
  "What does Shadhujan do?",
  "Tell me about his projects",
  "What tech stack does he use?",
  "How can I contact him?",
];

const MAX_CHARS = 150;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number | null>(null);
  const [rateLimitLimit, setRateLimitLimit] = useState<number | null>(null);
  const [rateLimitReset, setRateLimitReset] = useState<number | null>(null);
  const [countdownText, setCountdownText] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const isQuotaExhausted = rateLimitRemaining !== null && rateLimitRemaining <= 0;

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch quota from Upstash on chat open
  useEffect(() => {
    if (!isOpen) return;
    const fetchQuota = async () => {
      try {
        const res = await fetch("/api/chat");
        if (res.ok) {
          const data = await res.json();
          setRateLimitRemaining(data.remaining);
          setRateLimitLimit(data.limit);
          setRateLimitReset(data.reset);
        }
      } catch {
        // Silently fail — chat still works without quota display
      }
    };
    fetchQuota();
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Live countdown timer when quota is exhausted
  useEffect(() => {
    if (!isQuotaExhausted || !rateLimitReset) {
      setCountdownText(null);
      return;
    }
    const tick = () => {
      const diff = rateLimitReset - Date.now();
      if (diff <= 0) {
        setCountdownText(null);
        // Quota has reset — refetch
        setRateLimitRemaining(null);
        setRateLimitReset(null);
        return;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdownText(mins > 0 ? `${mins}m ${secs}s` : `${secs}s`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isQuotaExhausted, rateLimitReset]);

  // Helper to update quota state from response headers
  const updateQuotaFromHeaders = (res: Response) => {
    const remainingStr = res.headers.get("X-RateLimit-Remaining");
    const resetStr = res.headers.get("X-RateLimit-Reset");
    const limitStr = res.headers.get("X-RateLimit-Limit");
    if (remainingStr) setRateLimitRemaining(parseInt(remainingStr, 10));
    if (resetStr) setRateLimitReset(parseInt(resetStr, 10));
    if (limitStr) setRateLimitLimit(parseInt(limitStr, 10));
  };

  const sendMessage = useCallback(
    async (text?: string) => {
      const messageText = text || input.trim();
      if (!messageText || isStreaming || isQuotaExhausted) return;

      setHasInteracted(true);
      const userMessage: Message = { role: "user", content: messageText };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsStreaming(true);

      // Add empty assistant message for streaming
      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages([...updatedMessages, assistantMessage]);

      // Track if this was a 429 for error handling
      let wasRateLimited = false;

      try {
        abortRef.current = new AbortController();

        // Only send the last 5 messages to the API to save tokens
        const recentMessages = updatedMessages
          .filter((m) => m !== WELCOME_MESSAGE)
          .slice(-5);

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: recentMessages,
          }),
          signal: abortRef.current.signal,
        });

        // Always read rate-limit headers — even on 429
        updateQuotaFromHeaders(res);

        if (!res.ok) {
          wasRateLimited = res.status === 429;
          const errorData = await res.json().catch(() => null);
          throw new Error(
            wasRateLimited
              ? "You've used all your messages for now. Please try again later or reach out directly!"
              : errorData?.error || "API request failed"
          );
        }

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
              content: wasRateLimited
                ? (err as Error).message
                : "Oops, something went wrong. Please try again! 🙏",
            };
            return updated;
          });
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;

        // Re-focus input after message completes
        setTimeout(() => inputRef.current?.focus(), 50);

        // Add a 3-second cooldown to prevent spamming
        setIsCoolingDown(true);
        setTimeout(() => {
          setIsCoolingDown(false);
          // Re-focus after cooldown ends
          inputRef.current?.focus();
        }, 3000);
      }
    },
    [input, isStreaming, isQuotaExhausted, messages]
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

  // Character counter color based on usage
  const charCountColor = 
    input.length >= 140 ? "text-red-400/80" :
    input.length >= 120 ? "text-amber-400/70" :
    "text-slate-600";

  // Header quota badge text
  const quotaBadgeText = (() => {
    if (rateLimitRemaining === null || rateLimitLimit === null) return null;
    if (isQuotaExhausted && countdownText) return `Resets in ${countdownText}`;
    if (isQuotaExhausted) return "Limit reached";
    return `${rateLimitRemaining}/${rateLimitLimit} questions left`;
  })();

  const quotaBadgeColor = (() => {
    if (rateLimitRemaining === null) return "";
    if (isQuotaExhausted) return "text-red-400/80";
    if (rateLimitRemaining <= 5) return "text-amber-400/70";
    return "text-emerald-400/60";
  })();

  // ── Removed Particle canvas: Plasma Motes ──
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  return (
    <>
      {/* ══ The Spatial Fluid Nexus FAB ══ */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chatbot-fab"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9998] group cursor-pointer"
            aria-label="Open chat assistant"
            style={{ background: "none", border: "none" }}
          >
            <div className="nexus-container">
              {/* Outer morphing aura is handled by ::before pseudo-element in CSS */}

              {/* Frosted Glass Morping Body */}
              <div className="nexus-body">
                {/* Internal Spatial Gradient */}
                <div className="nexus-gradient" />

                {/* AI Chatbot Emoji Core */}
                <div className="nx-orb-wrap">
                  <div className="nx-sonar"></div>
                  <div className="nx-orb-shadow"></div>
                  <div className="nx-orb">
                    <div className="nx-face">
                      <div className="nx-eye"></div>
                      <div className="nx-eye2"></div>
                      <div className="nx-mouth"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating tooltip */}
              <div className="nexus-tooltip">
                <span className="nexus-tooltip-dot" />
                <span className="nexus-tooltip-text">Chat with Shad</span>
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
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold text-slate-100 leading-tight">
                    Shad&apos;s Assistant
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[10px] text-emerald-400/80 flex items-center gap-1.5">
                      {isStreaming ? "Typing..." : "Online"}
                    </p>
                    
                    <span className="text-[10px] px-1.5 py-[1px] rounded bg-slate-800/80 text-slate-400 border border-slate-700/50 whitespace-nowrap">
                      20 questions every 1 hr · Max 150 chars
                    </span>
                    {/* {quotaBadgeText && (
                    <p className={`text-[9px] ${quotaBadgeColor} leading-tight`}>
                      {quotaBadgeText}
                    </p>)} */}
                  </div>
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
              {isQuotaExhausted ? (
                // Exhausted state: show helpful message + contact CTA
                <div className="text-center py-2">
                  <p className="text-[12px] text-slate-400 mb-1">
                    You&apos;ve used all {rateLimitLimit ?? 20} messages this hour.
                  </p>
                  {countdownText && (
                    <p className="text-[11px] text-amber-400/80 mb-2">
                      ⏱ Resets in {countdownText}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-500">
                    Need to chat more?
                    <br></br>
                    Message me on{" "}
                    <a
                      href="https://www.linkedin.com/in/shadhujan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      LinkedIn
                    </a>
                    {", "}
                    <a
                      href="https://www.instagram.com/jeya.shad38/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      Instagram
                    </a>
                    {", or "}
                    
                    <a
                      href="mailto:shadhujan@outlook.com"
                      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      send an email
                    </a>
                  </p>
                </div>
              ) : (
                // Normal input state
                <>
                  <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl px-3 py-1.5 border border-slate-700/50 focus-within:border-emerald-500/40 transition-colors">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder={
                        isStreaming || isCoolingDown
                          ? "Waiting..."
                          : "Ask about Shadhujan..."
                      }
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isStreaming || isCoolingDown}
                      maxLength={MAX_CHARS}
                      className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none disabled:opacity-50"
                    />
                    {/* Character counter */}
                    {input.length > 0 && (
                      <span className={`text-[10px] tabular-nums whitespace-nowrap transition-colors ${charCountColor}`}>
                        {input.length}/{MAX_CHARS}
                      </span>
                    )}
                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || isStreaming || isCoolingDown}
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
                  <div className="flex justify-between items-center mt-1.5 px-1">
                    <p className="text-[10px] text-slate-600">
                      Powered by Groq • Answers from portfolio data
                    </p>
                    {rateLimitRemaining !== null && rateLimitRemaining > 0 && (
                      <p className={`text-[10px] ${rateLimitRemaining > 5 ? "text-emerald-500/70" : "text-amber-500/70"}`}>
                        {rateLimitRemaining} msgs left
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
