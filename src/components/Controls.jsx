import { useState } from "react";
import { sendControlCommand } from "../services/firebaseClient";

export default function Controls() {
  const [status, setStatus] = useState("Siap");

  async function kirimPerintah(command) {
    setStatus("Mengirim perintah...");

    try {
      await sendControlCommand(command);
      setStatus(`Perintah dikirim ke Firebase: ${command}`);
    } catch (error) {
      console.error("Gagal mengirim perintah Firebase:", error);
      setStatus(`Gagal mengirim perintah: ${error.message}`);
    }
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
