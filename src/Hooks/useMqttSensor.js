import { useEffect, useState } from "react";
import { connectMqtt } from "../services/mqttClient";

const BROKER_URL = import.meta.env.VITE_MQTT_BROKER;
const MQTT_AKTIF = BROKER_URL && !BROKER_URL.includes("broker.example");

export function useMqttSensor() {
  const [sensorData, setSensorData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!MQTT_AKTIF) {
      console.warn("MQTT dinonaktifkan: VITE_MQTT_BROKER belum diisi alamat asli di .env");
      return;
    }

    const client = connectMqtt((data) => {
      setSensorData(data);
    });

    client.on("connect", () => setConnected(true));
    client.on("close", () => setConnected(false));

    return () => client.end();
  }, []);

  return { sensorData, connected };
}