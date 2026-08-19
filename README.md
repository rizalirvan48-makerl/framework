# Smart Clothesline — Dashboard (Dummy UI)

Quick start:

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

Apa yang ada di repo ini:
- `src/` : kode React sederhana untuk dashboard dummy
- `docs/WeatherAPI.md` : catatan data cuaca yang diperlukan
- `docs/ESP32_integration.md` : rekomendasi komunikasi ESP32 dan skema data

Langkah selanjutnya:
- Hubungkan real Weather API (gunakan `.env` untuk API key)
- Implementasikan backend untuk MQTT proxy / REST endpoints untuk ESP32
- Ganti tindakan dummy di `Controls` dengan panggilan API ke backend
