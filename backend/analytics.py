from collections import Counter
from datetime import datetime
from geoip import get_country

def generate_summary(logs):

    total_logs = len(logs)

    total_attacks = 0
    high_severity = 0

    ip_counter = Counter()
    attack_counter = Counter()
    hourly_counter = Counter()
    country_counter = Counter()

    for log in logs:

        if log["attack"] != "Normal":

            total_attacks += 1

            ip_counter[log["ip"]] += 1

            attack_counter[log["attack"]] += 1
            country = get_country(log["ip"])
            country_counter[country] += 1

            timestamp = log["timestamp"]

            try:
                hour = datetime.strptime(
                    timestamp.split()[0],
                    "%d/%b/%Y:%H:%M:%S"
                ).hour

                hourly_counter[f"{hour}:00"] += 1

            except:
                pass

        if log["severity"] == "High":
            high_severity += 1

    top_attackers = [
        {"ip": ip, "count": count}
        for ip, count in ip_counter.most_common()
    ]

    attack_types = [
        {"name": attack, "value": count}
        for attack, count in attack_counter.items()
    ]

    attacks_per_hour = [
        {"hour": hour, "count": count}
        for hour, count in sorted(hourly_counter.items())
    ]
    
    attack_countries = []

    for country, count in country_counter.items():

        attack_countries.append({

            "country": country,

             "count": count

         })
    

    return {

        "total_logs": total_logs,

        "total_attacks": total_attacks,

        "high_severity": high_severity,

        "top_attackers": top_attackers,

        "attack_types": attack_types,

        "attacks_per_hour": attacks_per_hour,
        "attack_countries": attack_countries

    }