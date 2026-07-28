import json

with open("signatures.json", "r") as f:
    signatures = json.load(f)


def detect_attack(log):

    path = log["path"].lower()

    # SQL Injection
    for pattern in signatures["sql_injection"]:
        if pattern.lower() in path:
            return {
                "attack": "SQL Injection",
                "severity": "High"
            }

    # XSS
    for pattern in signatures["xss"]:
        if pattern.lower() in path:
            return {
                "attack": "XSS",
                "severity": "High"
            }

    # Directory Traversal
    for pattern in signatures["directory_traversal"]:
        if pattern.lower() in path:
            return {
                "attack": "Directory Traversal",
                "severity": "High"
            }

    # Unauthorized
    if log["status"] == 401:
        return {
            "attack": "Unauthorized Access",
            "severity": "Medium"
        }

    return {
        "attack": "Normal",
        "severity": "Low"
    }