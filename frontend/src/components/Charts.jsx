import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { FiActivity, FiPieChart } from "react-icons/fi";

const PIE_COLORS = ["#1F3A5C", "#1F8A55", "#B4720B", "#C1361E", "#6B7280", "#8E7CC3"];

function Charts({ summary }) {

  if (!summary) return null;

  return (

    <div className="panel-row">

      <div className="panel">

        <div className="panel-header">
          <FiActivity />
          <h2>Attacks per hour</h2>
        </div>

        <ResponsiveContainer width="100%" height={280}>

          <LineChart data={summary.attacks_per_hour}>

            <CartesianGrid strokeDasharray="2 6" stroke="#E3E5E8" vertical={false} />

            <XAxis dataKey="hour" stroke="#68707D" fontSize={12} tickLine={false} axisLine={{ stroke: "#E3E5E8" }} />

            <YAxis stroke="#68707D" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />

            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E3E5E8",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 12px 28px rgba(20,23,28,0.08)"
              }}
            />

            <Legend wrapperStyle={{ fontSize: "12px" }} />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#1F3A5C"
              strokeWidth={2}
              dot={{ r: 3, fill: "#1F3A5C" }}
              activeDot={{ r: 5 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      <div className="panel">

        <div className="panel-header">
          <FiPieChart />
          <h2>Attack types</h2>
        </div>

        <ResponsiveContainer width="100%" height={280}>

          <PieChart>

            <Pie
              data={summary.attack_types}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={2}
              label
            >
              {summary.attack_types && summary.attack_types.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E3E5E8",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 12px 28px rgba(20,23,28,0.08)"
              }}
            />

            <Legend wrapperStyle={{ fontSize: "12px" }} />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default Charts;