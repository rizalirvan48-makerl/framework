Weather API — Rekomendasi dan field penting

Rekomendasi API:
- OpenWeatherMap (Current + One Call / One Call 3.0) — mudah diakses, mendukung hourly forecast
- Alternatif: Weatherbit, Meteostat, Tomorrow.io

Field yang dibutuhkan untuk Smart Clothesline:
- current.temp — suhu saat ini (°C)
- current.weather[0].description — deskripsi cuaca (Cerah, Berawan, Hujan)
- hourly[].pop — probability of precipitation (0-1 atau %)
- hourly[].rain (mm) — curah hujan per jam
- minutely precipitation (opsional) — curah hujan per menit jika tersedia
- current.wind_speed — kecepatan angin
- current.humidity — kelembaban
- daily[] sunrise / sunset — untuk perencanaan jemuran malam/hari

Contoh endpoint (OpenWeatherMap One Call 3.0):
GET https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&units=metric&exclude=minutely,alerts&appid={API_KEY}

Mapping ke UI:
- WeatherCard: temp, condition, wind_speed, humidity
- RainAlert: hourly pop dan hourly rain -> hitung peringatan jika pop > 0.3 atau rain > 0
- DryingStatus: gunakan forecast untuk memperkirakan apakah jemuran aman untuk beberapa jam ke depan

Catatan implementasi:
- Simpan API key di environment (`.env`) dan jangan commit
- Pertimbangkan caching (server-side atau client-side) untuk mengurangi kuota API
- Untuk prediksi hujan jangka pendek, gunakan `hourly` 0..6 jam pertama
