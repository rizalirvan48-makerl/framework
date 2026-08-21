# Smart Clothesline Dashboard

Quick start:

```bash
npm install
npm run dev
```

Komunikasi realtime ESP32 dan dashboard menggunakan Firebase Realtime Database.
Weather API tetap dipakai sebagai sumber informasi cuaca online.

Salin `.env.example` menjadi `.env`, lalu isi Firebase Web SDK config yang sudah
tersedia untuk project `smart-clothsline` dan variabel Weather API. Jangan
menambahkan service-account atau private key ke frontend.

Kontrak Firebase untuk firmware tersedia di `docs/ESP32_integration.md`.
