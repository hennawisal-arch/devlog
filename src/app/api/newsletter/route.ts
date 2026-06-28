import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  // Swap this block for a real list provider (Resend Audiences, Buttondown,
  // ConvertKit…) when deploying. Logged here so the flow works out of the
  // box without any third-party account.
  console.log("[newsletter] new subscriber", email);

  return NextResponse.json({ ok: true });
}
