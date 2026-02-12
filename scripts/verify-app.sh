#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/2] Building Next.js app"
npm run build

echo "[2/2] Verifying API route proxy usage"
node <<'NODE'
const fs = require('fs');
const path = require('path');

const apiDir = path.join(process.cwd(), 'app', 'api');
const failures = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name === 'route.js') {
      const content = fs.readFileSync(full, 'utf8');
      const isGet = content.includes('export async function GET');
      const isPost = content.includes('export async function POST');
      if (isGet && !content.includes('forwardGet')) failures.push(`${full}: missing forwardGet`);
      if (isPost && !content.includes('forwardPost')) failures.push(`${full}: missing forwardPost`);
    }
  }
}

walk(apiDir);
if (failures.length) {
  console.error('Proxy verification failed:');
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log('All API routes use shared webhook proxy helpers.');
NODE

echo "Done."
