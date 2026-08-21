import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherApi";

export function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let aktif = true;

    async function fetchData() {
      setLoading(true);
      try {
        const hasil = await getWeather();
        if (aktif) setData(hasil);
        setError(null);
      } catch (err) {
        if (aktif) setError(err.message);
      } finally {
        if (aktif) setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 600000); // update tiap 10 menit

    return () => {
      aktif = false;
      clearInterval(interval);
    };
  }, []);

  return { data, loading, error };
}