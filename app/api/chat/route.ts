import Groq from "groq-sdk";
import {
  aboutData,
  projectsData,
  skillsData,
  playgroundData,
} from "@/lib/portfolioData";

const MODEL = "llama-3.3-70b-versatile";

function buildSystemPrompt(): string {
  const about = `
NAME: ${aboutData.name}
ROLE: ${aboutData.role}
LOCATION: ${aboutData.location}
EMAIL: ${aboutData.email}
GITHUB: ${aboutData.github}
LINKEDIN: ${aboutData.linkedin}
MEDIUM: ${aboutData.medium}

SUMMARY:
${aboutData.summary}

EDUCATION:
${aboutData.education
  .map((e) => `- ${e.degree} at ${e.institution} (${e.year})${e.result ? ` — ${e.result}` : ""}`)
  .join("\n")}

HOBBIES:
${aboutData.hobbies.map((h) => `- ${h.title}: ${h.description}`).join("\n")}

INTERESTS:
${aboutData.interests.map((i) => `- ${i.title}: ${i.description}`).join("\n")}
`.trim();

  const projects = projectsData
    .map(
      (p) =>
        `- ${p.name}: ${p.description}${p.tech ? ` [Tech: ${p.tech.join(", ")}]` : ""}${p.url ? ` (GitHub: ${p.url})` : ""}${p.liveUrl ? ` (Live: ${p.liveUrl})` : ""}${p.longDescription ? `\n  Details: ${p.longDescription}` : ""}${p.features ? `\n  Features: ${p.features.join("; ")}` : ""}`
    )
    .join("\n\n");

  const skills = Object.entries(skillsData)
    .map(([category, items]) => `${category}: ${(items as string[]).join(", ")}`)
    .join("\n");

  const playground = playgroundData
    .map((p) => `- ${p.name}: ${p.description} [Tags: ${p.tags.join(", ")}]`)
    .join("\n");

  return `You are Shadhujan's friendly portfolio assistant — an AI embedded on his personal website. Your job is to answer visitor questions about Shadhujan using ONLY the data provided below. Be warm, conversational, and concise.

RULES:
- Answer ONLY based on the context below. If you genuinely don't know, say so politely and suggest the visitor reach out to Shadhujan directly.
- Keep answers concise (2-4 sentences for simple questions, more for detailed ones).
- Use a friendly, professional tone with a hint of personality.
- When listing projects or skills, format them nicely.
- You may use markdown formatting (bold, lists, etc.) in your responses.
- If asked who you are, say you're Shadhujan's portfolio AI assistant.
- Never make up information not present in the context.

=== ABOUT ===
${about}

=== PROJECTS ===
${projects}

=== SKILLS ===
${skills}

=== PLAYGROUND / LABS ===
${playground}

=== PORTFOLIO WEBSITE ===
URL: https://shadhujan.dev
Version: ${aboutData.version}`;
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "GROQ_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    const groq = new Groq({ apiKey });

    const chatMessages = [
      { role: "system" as const, content: buildSystemPrompt() },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const stream = await groq.chat.completions.create({
      model: MODEL,
      messages: chatMessages,
      temperature: 0.7,
      max_completion_tokens: 1024,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
