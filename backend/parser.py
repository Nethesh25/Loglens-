import re

LOG_PATTERN = re.compile(
    r'(?P<ip>\S+) \S+ \S+ '
    r'\[(?P<timestamp>[^\]]+)\] '
    r'"(?P<method>\S+) (?P<path>\S+) [^"]+" '
    r'(?P<status>\d{3}) \S+ '
    r'"[^"]*" '
    r'"(?P<user_agent>[^"]*)"'
)

def parse_log(filepath):

    with open(filepath, "r", encoding="utf-8") as file:

        for line in file:

            match = LOG_PATTERN.match(line)

            if match:

                log = match.groupdict()

                log["status"] = int(log["status"])

                yield log