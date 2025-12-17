"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { aboutData, projectsData, skillsData } from "@/lib/portfolioData";

// Helper to pretty-print JSON nicely in the CLI
const prettyJson = (value: unknown) =>
  JSON.stringify(value, null, 2)
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");

// Turn URLs and emails into clickable links inside terminal output
const linkify = (text: string) => {
  const parts: (string | React.ReactNode)[] = [];
  const tokens = text.split(/(\s+)/); // keep spaces

  tokens.forEach((token, index) => {
    if (/^https?:\/\/\S+$/i.test(token)) {
      parts.push(
        <a
          key={index}
          href={token}
          target="_blank"
          rel="noreferrer"
          className="text-sky-400 underline hover:text-sky-300"
        >
          {token}
        </a>
      );
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(token)) {
      parts.push(
        <a
          key={index}
          href={`mailto:${token}`}
          className="text-sky-400 underline hover:text-sky-300"
        >
          {token}
        </a>
      );
    } else {
      parts.push(token);
    }
  });

  return parts;
};

interface CommandEntry {
  id: number;
  input: string;
  output: string[];
  isError?: boolean;
  path?: string;
}

const PROMPT_BASE = "user@portfolio";

const useBlink = (speed = 550) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), speed);
    return () => clearInterval(id);
  }, [speed]);
  return visible;
};

export default function CLIPortfolioPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandEntry[]>([]);
  const [commandIndex, setCommandIndex] = useState<number | null>(null);
  const [rawCommands, setRawCommands] = useState<string[]>([]);
  const [sessionStart] = useState(() => new Date());
  const [cwd, setCwd] = useState("~"); // Current working directory
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cursorVisible = useBlink();
  const router = useRouter();

  // Dynamic prompt based on CWD
  const getPrompt = (path: string) => `user@portfolio:${path}$`;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleWrapperClick = () => {
    inputRef.current?.focus();
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    let [cmd, ...args] = trimmed.split(/\s+/);

    if (cmd === "cd..") {
      cmd = "cd";
      args = [".."];
    }

    let output: string[] = [];
    let isError = false;
    let newPath = cwd;

    switch (cmd) {
      case "help": {
        output = [
          "Available commands:",
          "  help                       Show this help.",
          "  whoami                     Show basic information.",
          "  cd <dir>                   Change directory.",
          "  pwd                        Print working directory.",
          "  ls [dir]                   List contents.",
          "  cat <file>                 Show file content.",
          "  analyze-skills --json      Show skills as JSON.",
          "  skills                     Show readable skills list.",
          "  clear                      Clear the screen.",
          "  exit                       Close CLI and go to normal portfolio.",
        ];
        break;
      }

      case "pwd": {
        output = [cwd];
        break;
      }

      case "whoami": {
        output = [
          `${aboutData.name} – ${aboutData.role}`,
          aboutData.location,
          "",
          aboutData.summary,
        ];

        if (aboutData.github) output.push(`GitHub: ${aboutData.github}`);
        if (aboutData.linkedin) output.push(`LinkedIn: ${aboutData.linkedin}`);
        if (aboutData.medium) output.push(`Medium: ${aboutData.medium}`);
        if (aboutData.instagram) output.push(`Instagram: ${aboutData.instagram}`);

        if (aboutData.email) output.push(`Email: ${aboutData.email}`);
        break;
      }

      case "cd": {
        const target = args[0];
        if (!target || target === "~") {
          newPath = "~";
          setCwd(newPath);
        } else if (target === "..") {
          if (cwd === "~/projects") {
            newPath = "~";
            setCwd(newPath);
          }
           // if already at ~, stay at ~
        } else if (target === "projects") {
          if (cwd === "~") {
            newPath = "~/projects";
            setCwd(newPath);
          } else if (cwd === "~/projects") {
             output = [`cd: ${target}: No such file or directory`];
             isError = true;
          }
        } else {
          output = [`cd: ${target}: No such file or directory`];
          isError = true;
        }
        break;
      }

      case "ls": {
        const target = args[0];
        
        let pathToList = cwd;
        if (target) {
           if (target === "~") pathToList = "~";
           else if (target === "projects") pathToList = "~/projects";
           else if (target === "..") pathToList = cwd === "~/projects" ? "~" : "~"; // simple logic
           else {
             output = [`ls: ${target}: No such file or directory`];
             isError = true;
             break;
           }
        }

        if (pathToList === "~") {
          output = ["./", "about.txt", "projects/", "skills.json", "README.md"];
        } else if (pathToList === "~/projects") {
          output = projectsData.map(
            (p) => `${p.id.padEnd(16, " ")}  ${p.name}`
          );
        }
        break;
      }

      case "cat": {
        const target = args[0];
        if (!target) {
            output = ["cat: usage: cat <file>"];
            isError = true;
            break;
        }

        if (target === "about.txt" || (cwd === "~" && target === "./about.txt")) {
           if (cwd === "~") {
              output = [
                `Name: ${aboutData.name}`,
                `Role: ${aboutData.role}`,
                `Location: ${aboutData.location}`,
                "",
                aboutData.summary,
              ];
           } else {
             output = [`cat: ${target}: No such file or directory`];
             isError = true;
           }
        } else if (target === "skills.json") {
           if (cwd === "~") {
              output = [prettyJson(skillsData)];
           } else {
             output = [`cat: ${target}: No such file or directory`];
             isError = true;
           }
        } else if (target === "README.md") {
           if (cwd === "~") {
              output = [
                "# Portfolio CLI v1.0.0",
                "Welcome to my interactive portfolio terminal.",
                "Use standard commands like 'ls', 'cd', 'cat', and 'whoami' to navigate.",
                "",
                "Built with Next.js, React, and Tailwind CSS.",
                "(c) 2025 Shadhujan Jeyachandran"
              ];
           } else {
             output = [`cat: ${target}: No such file or directory`];
             isError = true;
           }
        } else {
           // Check for project id
           // If in ~, usage is cat project <id>? No, let's allow 'cat projects/id' or 'cat id' if in projects
           // The previous code had `cat project <id>`. Let's support that legacy AND native file access
           
           if (target === "project") {
               const projectId = args[1];
               const proj = projectsData.find((p) => p.id === projectId);
                if (!proj) {
                  isError = true;
                  output = [`cat: project '${projectId}' not found`];
                } else {
                  output = [
                    `${proj.name} [${proj.id}]`,
                    `Tech: ${proj.tech.join(", ")}`,
                    "",
                    proj.description,
                    "",
                    proj.url ? `Repo: ${proj.url}` : "",
                    proj.liveUrl ? `Live: ${proj.liveUrl}` : "",
                  ].filter(Boolean);
                }
           } else {
               // Try to find project by ID if in projects dir
               const projectId = target;
               const proj = projectsData.find(p => p.id === projectId);
               
               if (proj && cwd === "~/projects") {
                   output = [
                    `${proj.name} [${proj.id}]`,
                    `Tech: ${proj.tech.join(", ")}`,
                    "",
                    proj.description,
                    "",
                    proj.url ? `Repo: ${proj.url}` : "",
                    proj.liveUrl ? `Live: ${proj.liveUrl}` : "",
                  ].filter(Boolean);
               } else if (proj && cwd === "~" && target.startsWith("projects/")) {
                    // Not strictly supported by simple logic but good to have
                    output = [`cat: ${target}: No such file or directory (try 'cd projects' first)`];
                    isError = true;
               } else {
                   if (target.endsWith(".json")) {
                      output = [
                        "{",
                        '  "error": "File system is virtual only.",',
                        '  "hint": "Use \'ls projects\' or \'cat project <id>\' instead."',
                        "}",
                      ];
                   } else {
                      isError = true;
                      output = [`cat: ${target}: No such file or directory`];
                   }
               }
           }
        }
        break;
      }

      case "skills": {
        output = [
          "Languages:",
          "  - " + skillsData.languages.join("\n  - "),
          "",
          "Frontend:",
          "  - " + skillsData.frontend.join("\n  - "),
          "",
          "Backend:",
          "  - " + skillsData.backend.join("\n  - "),
          "",
          "Databases:",
          "  - " + skillsData.databases.join("\n  - "),
          "",
          "DevOps:",
          "  - " + skillsData.devops.join("\n  - "),
          "",
          "Tools:",
          "  - " + skillsData.tools.join("\n  - "),
          "",
          "Machine Learning:",
          "  - " + (skillsData.machineLearning?.join("\n  - ") || ""),
          "",
          "Architecture:",
          "  - " + (skillsData.architecture?.join("\n  - ") || ""),
        ];
        break;
      }

      case "analyze-skills": {
        const isJsonFlag =
          args.includes("--json") || args.includes("--json-output");
        if (isJsonFlag) {
          output = [prettyJson(skillsData)];
        } else {
          output = [
            "Usage: analyze-skills --json or analyze-skills --json-output",
          ];
        }
        break;
      }

      case "clear": {
        setHistory([]);
        return;
      }

      case "exit": {
        const end = new Date();
        const duration = Math.round(
          (end.getTime() - sessionStart.getTime()) / 1000
        );
        output = [
          `Session closed. Duration: ${duration}s`,
          "Switching to normal portfolio view...",
        ];

        setTimeout(() => {
          router.push("/");
        }, 900);

        break;
      }

      default: {
        isError = true;
        output = [
          `${cmd}: command not found`,
          "Type 'help' to see available commands.",
        ];
      }
    }

    const entry: CommandEntry = {
      id: Date.now(),
      input: trimmed,
      output,
      isError,
      path: cwd, // Store the path where command was ACTUALLY run
    };

    setHistory((prev) => [...prev, entry]);
    setRawCommands((prev) => [...prev, trimmed]);
    setCommandIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      setInput("");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCommandIndex((prev) => {
        if (rawCommands.length === 0) return null;
        const nextIndex =
          prev === null ? rawCommands.length - 1 : Math.max(0, prev - 1);
        setInput(rawCommands[nextIndex] ?? "");
        return nextIndex;
      });
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCommandIndex((prev) => {
        if (rawCommands.length === 0 || prev === null) return null;
        const nextIndex = Math.min(rawCommands.length, prev + 1);
        if (nextIndex === rawCommands.length) {
          setInput("");
          return null;
        }
        setInput(rawCommands[nextIndex] ?? "");
        return nextIndex;
      });
    }
  };

  const startedAtString = sessionStart.toLocaleString();

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black flex items-center justify-center px-4 py-8"
      onClick={handleWrapperClick}
    >
      <div className="w-full max-w-4xl rounded-xl border border-slate-700 bg-black/80 shadow-2xl overflow-hidden">
        {/* Fake window header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-1.5">
            <Link href="/" title="Exit to Home" className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-xs text-slate-300 font-mono">
            interactive-cli-portfolio – bash
          </div>
          <div className="text-[10px] text-slate-500">Next.js · JSON-driven</div>
        </div>

        {/* Terminal body */}
        <div className="font-mono text-sm text-slate-100 px-4 py-3 h-[70vh] overflow-y-auto">
          {/* Intro banner */}
          <div className="mb-4 text-xs text-slate-400">
            <div>Last login: {startedAtString} on ttys001</div>
            <div>Type &apos;help&apos; to get started.</div>
          </div>

          {/* History */}
          {history.map((entry) => (
            <div key={entry.id} className="mb-2">
              <div className="flex gap-2">
                <span className="text-emerald-400">{getPrompt(entry.path || "~")}</span>
                <span>{entry.input}</span>
              </div>
              <pre
                className={`whitespace-pre-wrap mt-1 text-xs md:text-sm ${
                  entry.isError ? "text-red-400" : "text-slate-100"
                }`}
              >
                {entry.output.map((line, idx) => (
                  <div key={idx}>{linkify(line)}</div>
                ))}
              </pre>
            </div>
          ))}

          {/* Current input line */}
          <div className="flex gap-2 items-center">
            <span className="text-emerald-400">{getPrompt(cwd)}</span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                autoFocus
                className="w-full bg-transparent focus:outline-none caret-transparent text-slate-100"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <span className="invisible">{input}</span>
                <span
                  className={`ml-[1px] h-4 w-2 ${
                    cursorVisible ? "bg-slate-100" : "bg-transparent"
                  }`}
                />
              </span>
            </div>
          </div>

          <div ref={endRef} />
        </div>

        {/* Persistent footer */}
        <div className="border-t border-slate-800 px-4 py-1.5 bg-slate-950/90">
          <div className="text-[10px] text-slate-500 flex items-center justify-between font-mono">
            <span>
              {getPrompt(cwd)} interactive session · press{" "}
              <strong className="font-bold">Ctrl+L</strong> or type{" "}
              <strong className="font-bold">clear</strong> to clean screen
            </span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
