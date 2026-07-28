import { FiTarget } from "react-icons/fi";

function AttackersTable({ summary }) {

  if (!summary || !summary.top_attackers) return null;

  return (

    <div className="panel">

      <div className="panel-header">
        <FiTarget />
        <h2>Top attackers</h2>
      </div>

      <table>

        <thead>
          <tr>
            <th>IP address</th>
            <th>Attack count</th>
          </tr>
        </thead>

        <tbody>
          {summary.top_attackers.map((attacker, index) => (
            <tr key={index}>
              <td className="mono">{attacker.ip}</td>
              <td className="mono">{attacker.count}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>

  );

}

export default AttackersTable;