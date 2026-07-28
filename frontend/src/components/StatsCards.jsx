function StatsCards({ summary }) {

  if (!summary) return null;

  const countryCount = summary.attack_countries
    ? summary.attack_countries.length
    : 0;

  const rows = [
    { label: "Total logs", value: summary.total_logs, tone: "" },
    { label: "Total attacks", value: summary.total_attacks, tone: "bad" },
    { label: "High severity", value: summary.high_severity, tone: "warn" },
    { label: "Countries seen", value: countryCount, tone: "good" }
  ];

  return (
    <div className="metric-panel">

      <span className="panel-label">Overview</span>

      <div className="metric-list">
        {rows.map((row, index) => (
          <div className="metric-row" key={index}>
            <span className="metric-label">{row.label}</span>
            <span className={`metric-value ${row.tone}`}>{row.value}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default StatsCards;