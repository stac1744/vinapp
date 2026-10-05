#!/usr/bin/env bash
# Read-only triage for the vinapp server compromise. Changes nothing.
# Run as root and save the output off the box:
#   sudo bash incident-triage.sh > triage-$(hostname)-$(date +%F).txt 2>&1
set -u

APP_DIR="${APP_DIR:-/var/www/vinapp}"
section() { printf '\n===== %s =====\n' "$1"; }

section "Host"
hostname; date -u; uptime; uname -a

section "Processes running deleted or dropper binaries"
for p in /proc/[0-9]*; do
  exe=$(readlink "$p/exe" 2>/dev/null) || continue
  case "$exe" in
    *"(deleted)"*|*.kok*|*/.update*|/tmp/*|/dev/shm/*|/var/tmp/*|/opt/nigga*)
      echo "PID ${p#/proc/} -> $exe :: $(tr '\0' ' ' < "$p/cmdline" 2>/dev/null)";;
  esac
done

section "Shell loops matching .monitor"
ps -eo pid,ppid,user,etime,cmd | grep -E 'sleep 60|startup|\.kok|\.update|/opt/' | grep -v grep

section "Listening sockets and outbound connections"
ss -tupan 2>/dev/null || netstat -tupan 2>/dev/null

section "Dropper files on disk"
find / -xdev \( -name '*.kok' -o -name '.update' -o -name '.monitor' -o -path '/opt/nigga*' \) 2>/dev/null
find /tmp /var/tmp /dev/shm "$APP_DIR" -xdev -type f -perm -u+x -newermt '2025-12-01' 2>/dev/null | head -100

section "ELF executables inside the app directory"
find "$APP_DIR" -path "$APP_DIR/node_modules" -prune -o -type f -print 2>/dev/null \
  | while read -r f; do [ "$(head -c 4 "$f" 2>/dev/null | od -An -c | tr -d ' ')" = '177ELF' ] && echo "$f"; done

section "Persistence: cron"
ls -la /etc/cron* /var/spool/cron* 2>/dev/null
for u in $(cut -d: -f1 /etc/passwd); do c=$(crontab -l -u "$u" 2>/dev/null) && printf '%s:\n%s\n' "$u" "$c"; done

section "Persistence: systemd units changed since Dec 2025"
find /etc/systemd /lib/systemd /usr/lib/systemd -type f -newermt '2025-12-01' 2>/dev/null

section "Persistence: startup files"
ls -la /etc/rc.local /etc/init.d 2>/dev/null
grep -lE '\.kok|\.update|\.monitor|/opt/' /etc/rc.local /etc/profile /etc/profile.d/* /root/.bashrc /root/.profile /home/*/.bashrc /home/*/.profile 2>/dev/null

section "Accounts and SSH keys"
awk -F: '$3==0 || $7 !~ /(nologin|false)$/ {print}' /etc/passwd
ls -la /root/.ssh /home/*/.ssh 2>/dev/null
cat /root/.ssh/authorized_keys /home/*/.ssh/authorized_keys 2>/dev/null

section "Recent logins"
last -n 50 2>/dev/null
lastb -n 20 2>/dev/null

section "Hashes of known dropper files (for threat-intel lookup)"
find / -xdev \( -name '*.kok' -o -name '.update' \) -type f -exec sha256sum {} + 2>/dev/null

echo
echo "Done. Rebuild the server per docs/security/server-incident-runbook.md; do not clean in place."
