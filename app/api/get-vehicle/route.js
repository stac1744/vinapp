import { forwardGet } from '../../../lib/webhookProxy';

export async function GET(req) {
  const hash = new URL(req.url).searchParams.get('hash') || '';
  const params = new URLSearchParams({ hash });
  return forwardGet(`https://n8n.mrstac.com/webhook/get-vehicle?${params.toString()}`);
}
