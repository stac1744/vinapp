import json

REPORT_JSON = "/var/www/vinapp/jscpd-report/html/jscpd-report.json"

with open(REPORT_JSON, "r") as f:
    report = json.load(f)

# Print top-level keys
print("Top-level keys:", report.keys())

# Print first duplicate entry (if exists)
duplicates = report.get("duplicates", [])
print(f"Found {len(duplicates)} duplicate groups")

if duplicates:
    print("First duplicate entry:")
    print(json.dumps(duplicates[0], indent=4))
