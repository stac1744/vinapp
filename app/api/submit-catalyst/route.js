import { forwardPost } from '../../../lib/webhookProxy';

export async function POST(req) {
  return forwardPost(req, 'https://n8n.mrstac.com/webhook/Cat-quote');
}
