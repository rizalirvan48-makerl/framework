import { sendControlCommand } from "../services/mqttClient";

export default function Controls() {
  function kirimPerintah(perintah) {
    const berhasil = sendControlCommand(perintah);
    if (!berhasil) {
      alert("Gagal mengirim perintah: MQTT belum terhubung");
    }
  }

  return (
    <div>
      <h3>Kontrol Jemuran</h3>
      <div className="controls">
        <button onClick={() => kirimPerintah("tarik")}>Tarik Jemuran</button>
        <button onClick={() => kirimPerintah("turunkan")}>Turunkan Jemuran</button>
        <button onClick={() => kirimPerintah("stop")}>Stop</button>
      </div>
      <div className="small">Kontrol ini terhubung ke ESP32 lewat MQTT.</div>
    </div>
  );
}