import { NextResponse } from 'next/server';
export async function GET(req) {
  const hash = new URL(req.url).searchParams.get('hash');
  const res = await fetch(`https://n8n.mrstac.com/webhook/get-vehicle?hash=${hash}`, { cache: 'no-store' });
  return NextResponse.json(await res.json());
}
