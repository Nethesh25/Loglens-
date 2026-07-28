import { FiUploadCloud, FiFolder, FiDownload } from "react-icons/fi";

function Buttons({
  uploadFile,
  loadDemo,
  exportReport,
  setFile
}) {
  return (
    <div className="control-panel">

      <span className="panel-label">Source File</span>

      <label className="file-drop">
        <input
          type="file"
          accept=".log"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span>Choose .log file</span>
      </label>

      <div className="control-stack">

        <button className="ctrl-btn ctrl-primary" onClick={uploadFile}>
          <FiUploadCloud />
          Upload log
        </button>

        <button className="ctrl-btn" onClick={loadDemo}>
          <FiFolder />
          Load demo log
        </button>

        <button className="ctrl-btn" onClick={exportReport}>
          <FiDownload />
          Export report
        </button>

      </div>

    </div>
  );
}

export default Buttons;