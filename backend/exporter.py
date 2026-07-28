import csv


def export_csv(logs, filename="security_report.csv"):

    with open(filename, "w", newline="", encoding="utf-8") as file:

        writer = csv.writer(file)

        writer.writerow([
            "IP",
            "Method",
            "Status",
            "Attack",
            "Severity",
            "Path"
        ])

        for log in logs:

            writer.writerow([
                log["ip"],
                log["method"],
                log["status"],
                log["attack"],
                log["severity"],
                log["path"]
            ])

    return filename