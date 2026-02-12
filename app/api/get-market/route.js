import { forwardGet } from '../../../lib/webhookProxy';

export async function GET() {
  return forwardGet('https://n8n.mrstac.com/webhook/market');
}
