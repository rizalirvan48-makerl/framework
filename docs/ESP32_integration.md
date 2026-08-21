# Integrasi ESP32 — Firebase Realtime Database

Project ID: `smart-clothsline`

Realtime Database URL: `https://smart-clothsline-default-rtdb.asia-southeast1.firebasedatabase.app`

ESP32 menulis status terbaru ke `/sensor` dengan kontrak berikut. Nama dan tipe
field ini adalah kontrak antara firmware dan web dashboard.

```json
{
  "sensor": {
    "temp": 32.3,
    "humidity": 47.0,
    "rain": false,
    "clothesline": "open",
    "mode": "auto",
    "wifiStatus": "connected",
    "wifiSSID": "UNS SOLO",
    "lastUpdate": 1750000000000
  },
  "control": {
    "command": "open"
  }
}
```

Nilai command yang didukung pada `/control/command`: `open`, `close`, `stop`,
dan `auto`. Dashboard hanya menulis string command tersebut; ESP32 membaca dan
menindaklanjutinya. Weather API tetap terpisah sebagai sumber data cuaca online.

Jangan menyimpan service-account JSON, private key, atau password pada firmware
atau frontend.
