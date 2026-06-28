import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are all required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  // In production, send this via an email provider (Resend, Postmark, SES…)
  // using RESEND_API_KEY / CONTACT_TO_EMAIL from .env. Without those set,
  // submissions are simply logged so the form is fully testable locally.
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "devlog contact form <onboarding@resend.dev>",
          to: process.env.CONTACT_TO_EMAIL,
          reply_to: email,
          subject: `New message from ${name}`,
          text: message,
        }),
      });
    } catch (err) {
      console.error("Failed to send contact email", err);
      return NextResponse.json({ error: "Could not send your message right now." }, { status: 502 });
    }
  } else {
    console.log("[contact] new message", { name, email, message });
  }

  return NextResponse.json({ ok: true });
}
