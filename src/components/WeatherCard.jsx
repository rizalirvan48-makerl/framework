export default function WeatherCard({ data, loading, error }) {
  if (loading) return <div className="panel weather-panel"><div className="panel-header"><h3>Weather Online</h3></div><p>Memuat data cuaca...</p></div>;
  if (error) return <div className="panel weather-panel"><div className="panel-header"><h3>Weather Online</h3></div><p>Data cuaca tidak tersedia</p></div>;
  if (!data) return <div className="panel weather-panel"><div className="panel-header"><h3>Weather Online</h3></div><p>Menunggu data cuaca...</p></div>;

  const { main, weather, wind, name } = data;
  const condition = weather?.[0]?.description ?? "Cuaca";

  return (
    <div className="panel weather-panel">
      <div className="panel-header">
        <h3>Weather Online</h3>
        <span className="mini-badge online">ONLINE</span>
      </div>

      <div className="weather-header">
        <div>
          <p className="label">LOKASI</p>
          <h3>{name || "Lokasimu"}</h3>
        </div>
        <div className="weather-icon">☀️</div>
      </div>

      <div className="weather-temp">{Math.round(main.temp)}°C</div>
      <p className="weather-condition">{condition}</p>

      <div className="weather-grid">
        <div>
          <span className="label">HUMIDITY</span>
          <strong>{main.humidity}%</strong>
        </div>
        <div>
          <span className="label">ANGIN</span>
          <strong>{wind.speed} m/s</strong>
        </div>
        <div>
          <span className="label">TERASA</span>
          <strong>{Math.round(main.feels_like)}°C</strong>
        </div>
      </div>
    </div>
  );
}