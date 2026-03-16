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

  return (
    <>
      {/* Floating Action Button — elegant orbiting ring design */}
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
          >
            {/* Orbiting ring */}
            <div className="absolute inset-[-6px] rounded-full border border-emerald-400/30 chatbot-orbit" />
            <div className="absolute inset-[-12px] rounded-full border border-emerald-400/10 chatbot-orbit-reverse" />

            {/* Tiny orbiting dot */}
            <div className="absolute inset-[-6px] chatbot-orbit">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            </div>

            {/* Main button */}
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/40 flex items-center justify-center transition-all duration-300 group-hover:shadow-emerald-500/30 group-hover:shadow-xl group-hover:scale-105">
              {/* Chat icon — cute speech bubble */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white drop-shadow-sm"
              >
                <path
                  d="M12 2C6.48 2 2 5.58 2 10c0 2.24 1.12 4.27 2.93 5.72L4 20l4.35-2.17C9.5 18.27 10.72 18.5 12 18.5c5.52 0 10-3.58 10-8S17.52 2 12 2z"
                  fill="currentColor"
                />
                {/* Three dots inside bubble */}
                <circle cx="8" cy="10" r="1.2" fill="#065f46" />
                <circle cx="12" cy="10" r="1.2" fill="#065f46" />
                <circle cx="16" cy="10" r="1.2" fill="#065f46" />
              </svg>
            </div>

            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900/90 backdrop-blur-sm text-emerald-300 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-lg pointer-events-none chatbot-float"
            >
              Ask me anything ✨
            </motion.div>
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
