import { useWeather } from "../hooks/useWeather";
import { useMqttSensor } from "../hooks/useMqttSensor";
import WeatherCard from "./WeatherCard";
import DryingStatus from "./DryingStatus";
import RainAlert from "./RainAlert";
import Controls from "./Controls";

function formatTimeStamp(value) {
  if (!value) return "Belum ada update";
  if (typeof value === "number") {
    return new Date(value).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  return value;
}

export default function Dashboard() {
  const { data: cuaca, loading, error } = useWeather();
  const { sensorData, connected } = useMqttSensor();

  const temperature = sensorData?.temp ?? (cuaca ? Math.round(cuaca.main.temp) : null);
  const humidity = sensorData?.humidity ?? (cuaca ? cuaca.main.humidity : null);
  const rain = sensorData?.rain ?? false;
  const clothesline = sensorData?.clothesline ?? "tidak diketahui";
  const mode = sensorData?.mode ?? "auto";
  const wifiStatus = sensorData?.wifiStatus ?? "offline";
  const wifiSSID = sensorData?.wifiSSID ?? "-";
  const lastUpdate = sensorData?.lastUpdate ?? null;

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-icon">☁</div>
          <div>
            <h1>SMART CLOTHESLINE</h1>
            <p>Smart Drying System</p>
          </div>
        </div>
        <div className={`status-pill ${connected ? "online" : "offline"}`}>
          <span className="dot" />
          {connected ? "ONLINE" : "OFFLINE"}
        </div>
      </header>

      <section className="hero-card panel">
        <div className="hero-main">
          <div className="hero-icon">☀️</div>
          <div>
            <p className="label">STATUS JEMURAN</p>
            <h2>{clothesline === "open" ? "TERBUKA" : clothesline === "closed" ? "TERTUTUP" : "TIDAK DIKETAHUI"}</h2>
            <p className="subtitle">{mode.toUpperCase()} MODE</p>
          </div>
        </div>
      </section>

      <div className="main-grid">
        <div className="left-column">
          <section className="panel">
            <div className="panel-header">
              <h3>Sensor Lokal</h3>
              <span className={`mini-badge ${connected ? "online" : "offline"}`}>
                {connected ? "Data dari ESP32" : "ESP32 OFFLINE"}
              </span>
            </div>

            <div className="sensor-grid">
              <div className="sensor-card">
                <div className="sensor-icon">🌡</div>
                <div>
                  <p className="label">TEMPERATURE</p>
                  <h3>{temperature !== null ? `${temperature.toFixed(1)} °C` : "Menunggu data ESP32..."}</h3>
                </div>
              </div>

              <div className="sensor-card">
                <div className="sensor-icon">💧</div>
                <div>
                  <p className="label">HUMIDITY</p>
                  <h3>{humidity !== null ? `${humidity} %` : "Menunggu data ESP32..."}</h3>
                </div>
              </div>

              <div className="sensor-card">
                <div className="sensor-icon">🌧</div>
                <div>
                  <p className="label">RAIN SENSOR</p>
                  <h3>{rain ? "HUJAN" : connected ? "CERAH" : "MENUNGGU DATA"}</h3>
                </div>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h3>Staus Perangkat</h3>
            </div>

            <div className="device-list">
              <div className="device-item">
                <span>ESP32</span>
                <span className={`device-state ${connected ? "online" : "offline"}`}>{connected ? "ONLINE" : "OFFLINE"}</span>
              </div>
              <div className="device-item">
                <span>MQTT</span>
                <span className={`device-state ${connected ? "online" : "offline"}`}>{connected ? "CONNECTED" : "DISCONNECTED"}</span>
              </div>
              <div className="device-item">
                <span>WiFi</span>
                <span className={`device-state ${wifiStatus === "connected" ? "online" : "offline"}`}>
                  {wifiStatus === "connected" ? "Connected" : "Offline"}
                </span>
              </div>
              <div className="device-item">
                <span>SSID</span>
                <span className="device-value">{wifiSSID}</span>
              </div>
              <div className="device-item">
                <span>Last update</span>
                <span className="device-value">{formatTimeStamp(lastUpdate)}</span>
              </div>
            </div>
          </section>

          <Controls />
        </div>

        <div className="right-column">
          <WeatherCard data={cuaca} loading={loading} error={error} />

          <RainAlert cuaca={cuaca} sensor={sensorData} />
          <DryingStatus cuaca={cuaca} sensor={sensorData} />
        </div>
      </div>
    </div>
  );
}