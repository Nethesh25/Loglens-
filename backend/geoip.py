import requests

_cache = {}

def get_country(ip):
    if ip in _cache:
        return _cache[ip]

    if ip.startswith("192.") or ip.startswith("10.") or ip.startswith("127."):
        _cache[ip] = "Local Network"
        return _cache[ip]

    try:
        url = f"http://ip-api.com/json/{ip}"
        response = requests.get(url, timeout=2)  # shorter timeout
        data = response.json()

        if data.get("status") == "success":
            _cache[ip] = data["country"]
            return _cache[ip]

    except Exception:
        pass

    _cache[ip] = "Unknown"
    return _cache[ip]