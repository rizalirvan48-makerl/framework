import mqtt from "mqtt";

const BROKER_URL = import.meta.env.VITE_MQTT_BROKER;
const MQTT_USERNAME = import.meta.env.VITE_MQTT_USERNAME;
const MQTT_PASSWORD = import.meta.env.VITE_MQTT_PASSWORD;

const SENSOR_TOPIC = "sensor/jemuran";
const CONTROL_TOPIC = "jemuran/kontrol";

let clientInstance = null;

// =====================================================
// VALIDASI DATA SENSOR
// =====================================================

function isValidSensorPayload(data) {
  return (
    data &&
    typeof data === "object" &&
    typeof data.temp === "number" &&
    typeof data.humidity === "number" &&
    typeof data.rain === "boolean" &&
    typeof data.clothesline === "string" &&
    typeof data.mode === "string" &&
    typeof data.wifiStatus === "string"
  );
}

// =====================================================
// CONNECT MQTT
// =====================================================

export function connectMqtt(onMessage) {

  if (
    !BROKER_URL ||
    BROKER_URL.includes("broker.example")
  ) {
    console.warn(
      "MQTT dinonaktifkan: broker belum dikonfigurasi."
    );

    return null;
  }

  if (!MQTT_USERNAME || !MQTT_PASSWORD) {
    console.warn(
      "MQTT username/password belum dikonfigurasi."
    );

    return null;
  }

  console.log("Menghubungkan ke MQTT...");
  console.log("Broker:", BROKER_URL);

  const client = mqtt.connect(BROKER_URL, {

    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,

    clientId:
      "web-" +
      Math.random()
        .toString(16)
        .substring(2, 10),

    clean: true,

    reconnectPeriod: 3000,

    connectTimeout: 10000,

    keepalive: 60,

    protocolVersion: 4
  });

  clientInstance = client;

  // ===================================================
  // CONNECTED
  // ===================================================

  client.on("connect", () => {

    console.log(
      "MQTT TERHUBUNG"
    );

    client.subscribe(
      SENSOR_TOPIC,
      { qos: 0 },
      (err) => {

        if (err) {

          console.error(
            "Gagal subscribe:",
            err
          );

          return;
        }

        console.log(
          "Subscribe:",
          SENSOR_TOPIC
        );
      }
    );
  });

  // ===================================================
  // MESSAGE
  // ===================================================

  client.on(
    "message",
    (topic, message) => {

      if (
        topic !== SENSOR_TOPIC
      ) {
        return;
      }

      try {

        const data =
          JSON.parse(
            message.toString()
          );

        console.log(
          "MQTT SENSOR:",
          data
        );

        if (
          isValidSensorPayload(data)
        ) {

          onMessage(data);

          return;
        }

        console.warn(
          "Payload MQTT sensor tidak valid:",
          data
        );

        onMessage({
          _invalid: true,
          raw: data
        });

      } catch (err) {

        console.error(
          "Gagal parsing MQTT:",
          err
        );

        onMessage({
          _invalid: true,
          raw: message.toString()
        });
      }
    }
  );

  // ===================================================
  // ERROR
  // ===================================================

  client.on(
    "error",
    (err) => {

      console.error(
        "MQTT error:",
        err
      );
    }
  );

  // ===================================================
  // CLOSE
  // ===================================================

  client.on(
    "close",
    () => {

      console.log(
        "MQTT terputus"
      );
    }
  );

  // ===================================================
  // OFFLINE
  // ===================================================

  client.on(
    "offline",
    () => {

      console.warn(
        "MQTT offline"
      );
    }
  );

  // ===================================================
  // RECONNECT
  // ===================================================

  client.on(
    "reconnect",
    () => {

      console.log(
        "Mencoba reconnect MQTT..."
      );
    }
  );

  return client;
}

// =====================================================
// KIRIM PERINTAH KE ESP32
// =====================================================

export function sendControlCommand(
  command
) {

  if (
    !clientInstance ||
    !clientInstance.connected
  ) {

    console.error(
      "MQTT belum terhubung."
    );

    return false;
  }

  const payload = {
    command: command
  };

  clientInstance.publish(
    CONTROL_TOPIC,
    JSON.stringify(payload),
    {
      qos: 0,
      retain: false
    },
    (err) => {

      if (err) {

        console.error(
          "Gagal mengirim command:",
          err
        );

      } else {

        console.log(
          "Command terkirim:",
          payload
        );
      }
    }
  );

  return true;
}

// =====================================================
// STATUS MQTT
// =====================================================

export function getMqttConnectionStatus() {

  return Boolean(
    clientInstance &&
    clientInstance.connected
  );
}

// =====================================================
// DISCONNECT
// =====================================================

export function disconnectMqtt() {

  if (clientInstance) {

    clientInstance.end();

    clientInstance = null;

    console.log(
      "MQTT disconnect."
    );
  }
}