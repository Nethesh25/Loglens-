from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os

from parser import parse_log
from detector import detect_attack
from analytics import generate_summary
from exporter import export_csv

app = Flask(__name__)
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=False
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

latest_logs = []


@app.route("/")
def home():
    return "LogLens Backend Running 🚀"


@app.route("/upload", methods=["POST"])
def upload():
    global latest_logs
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file selected"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        logs = list(parse_log(filepath))

        if not logs:
            return jsonify({"error": "No valid log lines found. Check the file format."}), 400

        for log in logs:
            result = detect_attack(log)
            log["attack"] = result["attack"]
            log["severity"] = result["severity"]

        summary = generate_summary(logs)
        latest_logs = logs

        return jsonify({"logs": logs, "summary": summary})

    except Exception as e:
        print("UPLOAD ERROR:", e)
        return jsonify({"error": str(e)}), 500


@app.route("/demo", methods=["GET"])
def load_demo():

    global latest_logs

    filepath = os.path.join("demo_logs", "demo.log")

    logs = list(parse_log(filepath))

    for log in logs:
        result = detect_attack(log)
        log["attack"] = result["attack"]
        log["severity"] = result["severity"]

    summary = generate_summary(logs)

    latest_logs = logs

    return jsonify({
        "logs": logs,
        "summary": summary
    })


@app.route("/export", methods=["GET"])
def export_report():

    global latest_logs

    filename = export_csv(latest_logs)

    return send_file(
        filename,
        as_attachment=True
    )


if __name__ == "__main__":
    app.run(debug=True)