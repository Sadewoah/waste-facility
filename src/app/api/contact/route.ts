import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.name || !body.email || !body.phone || !body.volume) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  // TODO: deliver the request, for example by email (Resend, Nodemailer) or a WhatsApp / CRM webhook.
  console.log("New consultation request:", body);
  return NextResponse.json({ ok: true });
}
