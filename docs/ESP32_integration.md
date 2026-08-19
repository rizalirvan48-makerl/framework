Integrasi ESP32 — opsi komunikasi dan skema data

Opsi komunikasi:
- MQTT (disarankan): ringan, push/pull realtime. Broker: Mosquitto, Cloud MQTT.
- REST API: ESP32 memanggil endpoint HTTP untuk mengirim status, atau server memanggil ESP32 jika reachable.
- WebSocket: realtime, tetapi lebih kompleks pada ESP32.

Topik / Endpoint contoh (MQTT):
- `smartclothesline/commands` (server -> ESP32): payload JSON {"cmd":"pull"|"lower"|"stop","req_id":"..."}
- `smartclothesline/status` (ESP32 -> server): payload JSON {"state":"pulling"|"idle","position":75,"motor":true,"battery":3.7}
- `smartclothesline/sensors` (ESP32 -> server): payload JSON {"rain":false,"humidity":58,"temp":28}

Payload contoh REST (POST /api/esp32/command):
{
  "cmd": "pull",
  "client": "dashboard",
  "timestamp": 1690000000
}

Rekomendasi arsitektur:
- Gunakan MQTT untuk commands/status streaming, simpan last-known-state di server
- Dashboard membaca dari server (HTTP) atau via WebSocket yang men-proxy broker MQTT
- Autonomy: ESP32 bisa memutuskan menutup jemuran saat sensor rain=true

Keamanan:
- Autentikasi token pada REST atau username/password pada MQTT
- Batasi akses per device ID

Integrasi langkah selanjutnya:
1. Tentukan broker MQTT dan topic naming
2. Implementasikan handler di server untuk menerima status dan menyimpan state
3. Dashboard subscribe ke endpoint server yang menyajikan state terakhir
