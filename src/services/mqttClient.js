import mqtt from "mqtt";

const BROKER_URL = import.meta.env.VITE_MQTT_BROKER;

let clientInstance = null;

function isValidSensorPayload(data) {
  return (
    data &&
    typeof data === "object" &&
    typeof data.temp === "number" &&
    typeof data.humidity === "number" &&
    typeof data.rain === "boolean" &&
    typeof data.clothesline === "string" &&
    typeof data.mode === "string" &&
    typeof data.wifiStatus === "string"
  );
}

export function connectMqtt(onMessage) {
  if (!BROKER_URL || BROKER_URL.includes("broker.example")) {
    console.warn("MQTT dinonaktifkan: alamat broker belum diisi dengan URL valid.");
    return null;
  }

  const client = mqtt.connect(BROKER_URL);
  clientInstance = client;

  client.on("connect", () => {
    console.log("Terhubung ke MQTT broker");
    client.subscribe("sensor/jemuran");
  });

  client.on("message", (topic, message) => {
    if (topic !== "sensor/jemuran") return;

    try {
      const data = JSON.parse(message.toString());
      if (isValidSensorPayload(data)) {
        onMessage(data);
        return;
      }

      console.warn("Payload MQTT sensor tidak valid:", data);
      onMessage({
        _invalid: true,
        raw: data,
      });
    } catch (err) {
      console.error("Gagal parsing pesan MQTT:", err);
      onMessage({
        _invalid: true,
        raw: message.toString(),
      });
    }
  });

  client.on("error", (err) => {
    console.error("MQTT error:", err);
  });

  client.on("close", () => {
    console.log("MQTT terputus");
  });

  client.on("offline", () => {
    console.warn("MQTT offline");
  });

  return client;
}

export function sendControlCommand(command) {
  if (!clientInstance || !clientInstance.connected) {
    console.error("MQTT belum terhubung, perintah tidak terkirim");
    return false;
  }

  const payload = { command };
  clientInstance.publish("jemuran/kontrol", JSON.stringify(payload));
  return true;
}

export function getMqttConnectionStatus() {
  return Boolean(clientInstance && clientInstance.connected);
}