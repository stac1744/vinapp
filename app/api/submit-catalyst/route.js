import { NextResponse } from 'next/server';
export async function POST(req) {
  const b = await req.json();
  await fetch('https://n8n.mrstac.com/webhook/Cat-quote', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(b) });
  return NextResponse.json({ success: true });
}
