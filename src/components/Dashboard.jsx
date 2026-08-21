import { useWeather } from "../hooks/useWeather";
import { useMqttSensor } from "../hooks/useMqttSensor";
import WeatherCard from "./WeatherCard";
import DryingStatus from "./DryingStatus";
import RainAlert from "./RainAlert";
import Controls from "./Controls";

export default function Dashboard() {
  const { data: cuaca, loading, error } = useWeather();
  const { sensorData, connected } = useMqttSensor();

  if (loading) return <p>Memuat data cuaca...</p>;
  if (error) return <p>Terjadi kesalahan: {error}</p>;

  return (
    <div className="dashboard">
      <Controls />

      <WeatherCard data={cuaca} />

      <DryingStatus cuaca={cuaca} sensor={sensorData} />
      <RainAlert cuaca={cuaca} sensor={sensorData} />

      <p className={`sensor-status ${connected ? "online" : "offline"}`}>
        {connected ? "🟢 Sensor lokal terhubung" : "⚪ Sensor lokal tidak aktif"}
      </p>
    </div>
  );
}