import { useState } from "react";
import { sendControlCommand } from "../services/mqttClient";

export default function Controls() {
  const [status, setStatus] = useState("Siap");

  function kirimPerintah(command) {
    const berhasil = sendControlCommand(command);

    if (!berhasil) {
      setStatus("MQTT tidak terhubung");
      return;
    }

    setStatus(`Perintah dikirim: ${command}`);
  }

  return (
    <div className="panel controls-panel">
      <div className="panel-header">
        <h3>Kontrol Jemuran</h3>
      </div>

      <div className="mode-grid">
        <button className="mode-button auto" onClick={() => kirimPerintah("auto")}>AUTO</button>
        <button className="mode-button open" onClick={() => kirimPerintah("open")}>BUKA</button>
        <button className="mode-button close" onClick={() => kirimPerintah("close")}>TUTUP</button>
      </div>

      <div className="controls-footer">
        <button className="stop-button" onClick={() => kirimPerintah("stop")}>STOP</button>
      </div>

      <div className="controls-status">{status}</div>
    </div>
  );
}