import { useEffect, useState } from "react";
import { connectMqtt, getMqttConnectionStatus } from "../services/mqttClient";

const BROKER_URL = import.meta.env.VITE_MQTT_BROKER;
const MQTT_AKTIF = Boolean(BROKER_URL) && !BROKER_URL.includes("broker.example");

export function useMqttSensor() {
  const [sensorData, setSensorData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!MQTT_AKTIF) {
      setConnected(false);
      setSensorData(null);
      console.warn("MQTT dinonaktifkan: VITE_MQTT_BROKER belum diisi alamat asli di .env");
      return undefined;
    }

    const client = connectMqtt((data) => {
      if (data && data._invalid) {
        setSensorData(null);
        return;
      }

      setSensorData(data);
    });

    if (!client) {
      setConnected(false);
      return undefined;
    }

    const updateConnection = () => setConnected(getMqttConnectionStatus());

    client.on("connect", updateConnection);
    client.on("close", updateConnection);
    client.on("offline", updateConnection);
    client.on("reconnect", updateConnection);

    updateConnection();

    return () => {
      if (client && client.connected) {
        client.end(true);
      }
    };
  }, []);

  return { sensorData, connected };
}