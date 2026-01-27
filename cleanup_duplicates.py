#!/usr/bin/env python3
import json
import os
import shutil
from datetime import datetime

# Path to JSCPD report
REPORT_JSON = "/var/www/vinapp/jscpd-report/html/jscpd-report.json"

# Backup folder
BACKUP_DIR = f"/var/www/vinapp/duplicate_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
os.makedirs(BACKUP_DIR, exist_ok=True)

# Confidence threshold (optional, not used here)
CONFIDENCE_THRESHOLD = 0  # JSCPD does not provide % by default, adjust if needed

# Load report
with open(REPORT_JSON, "r") as f:
    report = json.load(f)

duplicates = report.get("duplicates", [])
print(f"[INFO] Found {len(duplicates)} duplicate groups")

moved_files = set()
for dup in duplicates:
    for file_key in ["firstFile", "secondFile"]:
        file_info = dup.get(file_key)
        if not file_info:
            continue
        path = file_info.get("name")
        if path and os.path.isfile(path) and path not in moved_files:
            try:
                dest = os.path.join(BACKUP_DIR, os.path.basename(path))
                shutil.move(path, dest)
                moved_files.add(path)
                print(f"[MOVED] {path} → {dest}")
            except Exception as e:
                print(f"[ERROR] Could not move {path}: {e}")

print(f"[DONE] Moved {len(moved_files)} duplicate files to {BACKUP_DIR}")
