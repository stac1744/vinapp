import { NextResponse } from 'next/server';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function safeJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function forwardGet(url, init = {}) {
  try {
    const response = await fetch(url, { cache: 'no-store', ...init });
    const payload = await safeJson(response);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Upstream request failed', status: response.status, payload },
        { status: response.status }
      );
    }

    return NextResponse.json(payload ?? { success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Network error contacting upstream' }, { status: 502 });
  }
}

export async function forwardPost(req, url) {
  try {
    const body = await req.json();
    const response = await fetch(url, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(body)
    });

    const payload = await safeJson(response);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Upstream request failed', status: response.status, payload },
        { status: response.status }
      );
    }

    return NextResponse.json(payload ?? { success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request or upstream network error' }, { status: 400 });
  }
}
