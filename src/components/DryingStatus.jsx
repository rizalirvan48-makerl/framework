export default function DryingStatus({ cuaca, sensor }) {
  const kelembapanOnline = cuaca.main.humidity;
  const kelembapanSensor = sensor?.humidity; // dari sensor fisik, kalau tersedia

  // Prioritaskan data sensor lokal karena lebih akurat, fallback ke data online
  const kelembapan = kelembapanSensor ?? kelembapanOnline;
  const kondisi = cuaca.weather[0].main.toLowerCase();
  const anginKencang = cuaca.wind.speed > 3;

  const aman = kelembapan < 70 && !kondisi.includes("rain") && !kondisi.includes("cloud");

  return (
    <div className="drying-status">
      <h3>Status Jemur</h3>
      <p>{aman ? "✅ Aman untuk menjemur" : "⚠️ Kurang disarankan"}</p>
      <p>
        Kelembapan: {kelembapan}%{" "}
        {kelembapanSensor !== undefined ? "(dari sensor)" : "(dari cuaca online)"}
      </p>
      {anginKencang && <p>💨 Angin cukup kencang, jemuran bisa cepat kering</p>}
    </div>
  );
}