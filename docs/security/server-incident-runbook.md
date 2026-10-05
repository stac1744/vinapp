# vinapp server incident runbook

The first commit (`a9f7b0d`) copied a live server's `/var/www/vinapp` into git, including an IoT botnet dropper:

- `data/.update`: stripped x86-64 ELF executable
- `data/arm7.kok`: ARM ELF executable, plus 18-byte `*.kok` stubs for other CPUs
- `data/.monitor`: shell loop that relaunches `/opt/nigga (deleted)` every 60 seconds

Treat that server as compromised. A process running as the web user may have escalated to root, so a clean-looking host proves nothing. **Rebuild it; don't clean it in place.**

## 1. Contain (first hour)

1. Snapshot the disk through your hosting provider's console if you want forensics later.
2. Cut the server off from the internet using the provider's firewall or security group, not the server's own firewall. Keep console access.
3. Run `scripts/incident-triage.sh` as root and save its output off the box. The script only reads; it changes nothing.

## 2. Rotate every secret the server could read

Do this from a clean machine, not the compromised server.

- [ ] SSH keys and passwords for every user; remove unknown keys from `authorized_keys` on all other hosts too
- [ ] Hosting provider and DNS registrar accounts, with 2FA turned on
- [ ] n8n: admin login, API keys, every credential stored in n8n, and the webhook paths (`/webhook/vinapp`, `market`, `get-vehicle`, `submit-bid`, `Cat-quote`, `towing`)
- [ ] Database, payment, email/SMS and any third-party API keys in `.env` files
- [ ] GitHub: personal access tokens and deploy keys that were used on the server
- [ ] TLS private keys: reissue the certificates

## 3. Rebuild

1. Create a new server from a fresh OS image. Patch it, allow SSH by key only, disable root login, and open only ports 22, 80 and 443.
2. Deploy from a clean git branch with the malware removed (`claude/mrstac-feature-improvements-xrbye7` or `main` once it's merged). Don't copy files from the old server.
3. Run the web app as an unprivileged user that can't write to its own code directory.
4. Point DNS at the new server, then destroy the old one.

## 4. Check the damage

- [ ] n8n execution history since **Jan 20, 2026**, the earliest date in `sync.log`: look for unknown workflows and changed webhook targets
- [ ] Payout and bid records for changed amounts or payee details
- [ ] Hosting bills and network graphs for outbound traffic spikes, a sign of DDoS participation
- [ ] Whether customer personal data (names, phones, VINs, addresses) was reachable. If so, check state breach-notification rules; South Carolina's is S.C. Code § 39-1-90

## 5. Prevent a repeat

- Add a CI check that fails on any committed executable file.
- Turn type and lint checks back on (`next.config.js`).
- Keep the server's working directory out of git; deploy only built output from CI.
