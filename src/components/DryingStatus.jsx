export default function DryingStatus({ cuaca, sensor }) {
  const weatherHumidity = cuaca?.main?.humidity ?? null;
  const sensorHumidity = sensor?.humidity ?? null;
  const temperature = sensor?.temp ?? cuaca?.main?.temp ?? null;
  const sensorRain = !!sensor?.rain;
  const weatherMain = cuaca?.weather?.[0]?.main?.toLowerCase() ?? "";
  const weatherRain = weatherMain.includes("rain") || weatherMain.includes("drizzle") || weatherMain.includes("thunderstorm");

  const humidity = sensorHumidity ?? weatherHumidity;
  const isRecommended =
    humidity !== null &&
    temperature !== null &&
    humidity < 70 &&
    !sensorRain &&
    !weatherRain &&
    temperature < 35;

  const reason = [];
  if (sensorRain) reason.push("sensor hujan mendeteksi air");
  if (weatherRain) reason.push("cuaca online memperkirakan hujan");
  if (humidity !== null && humidity >= 70) reason.push("kelembapan tinggi");
  if (temperature !== null && temperature >= 35) reason.push("suhu terlalu panas");

  return (
    <div className="panel recommendation-panel">
      <div className="panel-header">
        <h3>Rekomendasi Menjemur</h3>
      </div>

      <div className={`recommendation ${isRecommended ? "safe" : "warning"}`}>
        <div className="recommendation-icon">{isRecommended ? "☀️" : "🌧️"}</div>
        <div>
          <strong>{isRecommended ? "AMAN MENJEMUR" : "TIDAK DISARANKAN MENJEMUR"}</strong>
          <p>
            {isRecommended
              ? "Kondisi saat ini cukup aman untuk menjemur pakaian."
              : reason.length
                ? reason.join("; ")
                : "Periksa kembali kondisi cuaca dan sensor lokal."}
          </p>
        </div>
      </div>

      <div className="summary-metrics">
        <span>Kelembapan: {humidity !== null ? `${humidity}%` : "-"}</span>
        <span>Temp: {temperature !== null ? `${temperature.toFixed(1)}°C` : "-"}</span>
      </div>
    </div>
  );
}