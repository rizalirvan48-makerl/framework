export default function RainAlert({ cuaca, sensor }) {
  const sensorRain = !!sensor?.rain;
  const weather = cuaca?.weather?.[0];
  const weatherMain = weather?.main?.toLowerCase() ?? "";

  const weatherRainWarning =
    weatherMain.includes("rain") ||
    weatherMain.includes("drizzle") ||
    weatherMain.includes("thunderstorm");

  if (!sensorRain && !weatherRainWarning) return null;

  let text = "PERINGATAN CUACA";
  if (sensorRain && weatherRainWarning) text = "HUJAN TERDETEKSI + PERINGATAN CUACA";
  else if (sensorRain) text = "HUJAN TERDETEKSI";
  else if (weatherRainWarning) text = "PERINGATAN CUACA";

  return (
    <div className="alert-box warning-box">
      <div className="alert-icon">🌧</div>
      <div>
        <strong>{text}</strong>
        <p>
          {sensorRain
            ? "Sensor hujan mendeteksi air dan jemuran disarankan segera ditutup."
            : "Cuaca online memperkirakan kondisi hujan di lokasi Anda."}
        </p>
      </div>
    </div>
  );
}