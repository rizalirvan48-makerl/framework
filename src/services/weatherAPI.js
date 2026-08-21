const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const LAT = import.meta.env.VITE_WEATHER_LAT;
const LON = import.meta.env.VITE_WEATHER_LON;

export async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=id`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal mengambil data cuaca");
  return res.json();
}

// Opsional: fetch berdasarkan nama kota (kalau tidak pakai LAT/LON)
export async function getWeatherByCity(kota) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${API_KEY}&units=metric&lang=id`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal mengambil data cuaca");
  return res.json();
}