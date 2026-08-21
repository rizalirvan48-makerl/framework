import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL ||
    "https://smart-clothsline-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "smart-clothsline",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

function getFirebaseDatabase() {
  if (!firebaseConfig.apiKey) {
    throw new Error(
      "Konfigurasi Firebase belum lengkap. Isi VITE_FIREBASE_API_KEY di .env."
    );
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getDatabase(app);
}

/** Subscribe realtime ke /sensor. Mengembalikan fungsi unsubscribe. */
export function subscribeSensorData(callback, onError) {
  const database = getFirebaseDatabase();

  return onValue(
    ref(database, "sensor"),
    (snapshot) => callback(snapshot.exists() ? snapshot.val() : null),
    onError
  );
}

/** Menulis salah satu command: auto, open, close, atau stop ke /control/command. */
export function sendControlCommand(command) {
  const supportedCommands = ["auto", "open", "close", "stop"];

  if (!supportedCommands.includes(command)) {
    return Promise.reject(new Error("Command kontrol tidak didukung."));
  }

  const database = getFirebaseDatabase();
  return set(ref(database, "control/command"), command);
}

/** Subscribe realtime ke nilai command terakhir di /control/command. */
export function subscribeControlStatus(callback, onError) {
  const database = getFirebaseDatabase();

  return onValue(
    ref(database, "control/command"),
    (snapshot) => callback(snapshot.exists() ? snapshot.val() : null),
    onError
  );
}
