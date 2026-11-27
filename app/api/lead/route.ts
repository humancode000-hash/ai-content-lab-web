import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

interface StoredLead {
  id: string;
  createdAt: string;
  lang: "RU" | "KZ";
  topic: string;
  name: string;
  contact: string;
  comment: string;
}

const MAX_BODY_CHARS = 8000;
const LIMITS = { name: 100, contact: 100, topic: 200, comment: 1000 } as const;

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  // убираем управляющие символы, чтобы не ломать логи и файл
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
}

async function saveLeadToFile(lead: StoredLead) {
  await mkdir(DATA_DIR, { recursive: true });
  let existing: StoredLead[] = [];
  try {
    const raw = await readFile(LEADS_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) existing = parsed as StoredLead[];
  } catch {
    existing = [];
  }
  existing.unshift(lead);
  await writeFile(LEADS_FILE, JSON.stringify(existing, null, 2), "utf8");
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return fail(415, "Content-Type must be application/json.");
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_CHARS) return fail(413, "Request is too large.");
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return fail(400, "Invalid request body.");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return fail(400, "Invalid JSON.");
  }

  const name = clean(body.name);
  const contact = clean(body.contact);
  const topic = clean(body.topic) || "Маркетплейс — подбор пакета";
  const comment = clean(body.comment) || "—";
  const lang: "RU" | "KZ" = body.lang === "kz" ? "KZ" : "RU";

  if (!name || !contact) return fail(400, "Name and contact are required.");
  if (
    name.length > LIMITS.name ||
    contact.length > LIMITS.contact ||
    topic.length > LIMITS.topic ||
    comment.length > LIMITS.comment
  ) {
    return fail(400, "One of the fields is too long.");
  }

  const lead: StoredLead = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    lang,
    topic,
    name,
    contact,
    comment,
  };

  // В лог идут только служебные поля: имя, контакт и комментарий клиента не логируются.
  console.log("NEW_LEAD", JSON.stringify({ id: lead.id, createdAt: lead.createdAt, topic: lead.topic, lang: lead.lang }));

  // На Vercel диск доступен только для чтения, файл пишем только локально (npm run dev).
  if (!process.env.VERCEL) {
    try {
      await saveLeadToFile(lead);
    } catch (err) {
      console.error("Local lead file error:", err instanceof Error ? err.message : "unknown");
    }
  }

  return NextResponse.json({ ok: true, leadId: lead.id });
}
