import { useEffect, useState } from "react";
import { subscribeSensorData } from "../services/firebaseClient";

export function useFirebaseSensor() {
  const [sensorData, setSensorData] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;

    try {
      unsubscribe = subscribeSensorData(
        (data) => {
          setSensorData(data);
          setConnected(true);
          setError(null);
        },
        (firebaseError) => {
          console.error("Gagal membaca Firebase Realtime Database:", firebaseError);
          setConnected(false);
          setError(firebaseError.message);
        }
      );
    } catch (firebaseError) {
      console.error("Firebase tidak dapat diinisialisasi:", firebaseError);
      setConnected(false);
      setError(firebaseError.message);
    }

    return () => unsubscribe?.();
  }, []);

  return { sensorData, connected, error };
}
