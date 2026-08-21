import mqtt from "mqtt";

const BROKER_URL = import.meta.env.VITE_MQTT_BROKER;

// Simpan satu instance client supaya bisa dipakai bersama (baca sensor + kirim perintah)
let clientInstance = null;

export function connectMqtt(onMessage) {
  const client = mqtt.connect(BROKER_URL);
  clientInstance = client;

  client.on("connect", () => {
    console.log("Terhubung ke MQTT broker");
    client.subscribe("sensor/jemuran"); // topic data sensor dari ESP32
  });

  client.on("message", (topic, message) => {
    try {
      const data = JSON.parse(message.toString());
      onMessage(data);
    } catch (err) {
      console.error("Gagal parsing pesan MQTT:", err);
    }
  });

  client.on("error", (err) => {
    console.error("MQTT error:", err);
  });

  return client;
}

// Kirim perintah kontrol motor ke ESP32
export function sendControlCommand(perintah) {
  if (!clientInstance || !clientInstance.connected) {
    console.error("MQTT belum terhubung, perintah tidak terkirim");
    return false;
  }

  clientInstance.publish("jemuran/kontrol", JSON.stringify({ perintah }));
  return true;
}