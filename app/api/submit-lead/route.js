import { NextResponse } from 'next/server';
export async function POST(req) {
  const b = await req.json();
  const r = await fetch('https://n8n.mrstac.com/webhook/vinapp', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(b) });
  return NextResponse.json(await r.json());
}
