export default function RainAlert({ cuaca, sensor }) {
  const kondisi = cuaca.weather[0].main.toLowerCase();
  const hujanTerdeteksiSensor = sensor?.rain === true;

  const potensiHujan =
    kondisi.includes("rain") ||
    kondisi.includes("drizzle") ||
    kondisi.includes("thunderstorm") ||
    hujanTerdeteksiSensor;

  if (!potensiHujan) return null;

  return (
    <div className="rain-alert">
      🌧️ Peringatan: {hujanTerdeteksiSensor ? "sensor mendeteksi hujan" : "kemungkinan hujan"}, segera angkat jemuran!
    </div>
  );
}