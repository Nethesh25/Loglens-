import requests


def get_country(ip):

    # Skip local/private IPs
    if ip.startswith("192.") or ip.startswith("10.") or ip.startswith("127."):
        return "Local Network"

    try:

        url = f"http://ip-api.com/json/{ip}"

        response = requests.get(url, timeout=5)

        data = response.json()

        if data["status"] == "success":
            return data["country"]

    except:
        pass

    return "Unknown"