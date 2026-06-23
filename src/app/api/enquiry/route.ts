import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fullName = String(body?.fullName ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const phone = String(body?.phone ?? "").trim() || null;
    const country = String(body?.country ?? "").trim() || null;
    const interest = String(body?.interest ?? "").trim();
    const message = String(body?.message ?? "").trim() || null;

    if (!fullName || !email) {
      return NextResponse.json(
        { ok: false, error: "fullName and email are required" },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    const enquiry = await db.enquiry.create({
      data: {
        fullName,
        email,
        phone,
        country,
        interest: interest || "General Enquiry",
        message,
      },
    });

    return NextResponse.json({ ok: true, id: enquiry.id });
  } catch (err) {
    console.error("[enquiry] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await db.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ ok: true, enquiries });
  } catch (err) {
    console.error("[enquiry list] error", err);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}
