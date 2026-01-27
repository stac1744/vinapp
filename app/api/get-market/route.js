import { NextResponse } from 'next/server';
export async function GET() {
  const res = await fetch('https://n8n.mrstac.com/webhook/market', { cache: 'no-store' });
  return NextResponse.json(await res.json());
}
