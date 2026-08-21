export default function WeatherCard({ data }) {
  const { main, weather, wind, name } = data;

  return (
    <div className="weather-card">
      <h2>{name || "Lokasimu"}</h2>
      <p className="suhu">{Math.round(main.temp)}°C</p>
      <p className="deskripsi">{weather[0].description}</p>
      <div className="detail">
        <span>Kelembapan: {main.humidity}%</span>
        <span>Angin: {wind.speed} m/s</span>
        <span>Terasa seperti: {Math.round(main.feels_like)}°C</span>
      </div>
    </div>
  );
}