import { useState } from "react";
import axios from "axios";

import "./App.css";

import Header from "./components/Header";
import Buttons from "./components/Buttons";
import StatsCards from "./components/StatsCards";
import Charts from "./components/Charts";
import CountryTable from "./components/CountryTable";
import AttackersTable from "./components/AttackersTable";
import LogsTable from "./components/LogsTable";
import Footer from "./components/Footer";

function App() {

  const [file, setFile] = useState(null);

  const [logs, setLogs] = useState([]);

  const [summary, setSummary] = useState(null);

  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {

    if (!file) {

      alert("Please select a log file");

      return;

    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      const response = await axios.post(

        "https://loglens-backend-f6yg.onrender.com/upload",

        formData

      );

      setLogs(response.data.logs);

      setSummary(response.data.summary);

    } catch (err) {

      console.log(err);

      alert("Upload Failed");

    }

    setLoading(false);

  };

  const loadDemo = async () => {

    try {

      setLoading(true);

      const response = await axios.get(

        "https://loglens-backend-f6yg.onrender.com/demo"

      );

      setLogs(response.data.logs);

      setSummary(response.data.summary);

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  const exportReport = () => {

    window.open(

      "https://loglens-backend-f6yg.onrender.com/export",

      "_blank"

    );

  };

  return (

    <div className="shell">

      <Header />

      <div className="body-grid">

        <aside className="sidebar">

          <Buttons
            uploadFile={uploadFile}
            loadDemo={loadDemo}
            exportReport={exportReport}
            setFile={setFile}
          />

          <StatsCards summary={summary} />

        </aside>

        <main className="main">

          {loading &&
            <div className="loading-bar">
              <span className="spinner" />
              Loading dashboard…
            </div>
          }

          {!summary &&
            <div className="empty-state">
              <h2>No log data yet</h2>
              <p>Upload a .log file or load the demo log from the panel on the left to see the analysis.</p>
            </div>
          }

          <Charts summary={summary} />

          <div className="panel-row">
            <CountryTable summary={summary} />
            <AttackersTable summary={summary} />
          </div>

          <LogsTable logs={logs} />

        </main>

      </div>

      <Footer />

    </div>

  );

}

export default App;