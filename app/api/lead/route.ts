import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

interface LeadPayload {
  name?: string;
  contact?: string;
  topic?: string;
  comment?: string;
  lang?: "ru" | "kz";
}

interface StoredLead {
  id: string;
  createdAt: string;
  lang: "RU" | "KZ";
  topic: string;
  name: string;
  contact: string;
  comment: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const name = body.name?.trim() ?? "";
    const contact = body.contact?.trim() ?? "";
    const topic = body.topic?.trim() || "Маркетплейс — подбор пакета";
    const comment = body.comment?.trim() || "—";
    const lang = body.lang === "kz" ? "KZ" : "RU";

    if (!name || !contact) {
      return NextResponse.json(
        { ok: false, error: "Name and contact are required." },
        { status: 400 }
      );
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

    await mkdir(DATA_DIR, { recursive: true });

    let existing: StoredLead[] = [];
    try {
      const raw = await readFile(LEADS_FILE, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        existing = parsed;
      }
    } catch {
      existing = [];
    }

    existing.unshift(lead);
    await writeFile(LEADS_FILE, JSON.stringify(existing, null, 2), "utf8");

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (err) {
    console.error("Lead route error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to save lead." },
      { status: 500 }
    );
  }
}
