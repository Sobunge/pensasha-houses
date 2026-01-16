import { useEffect, useState } from "react";
import api from "../../api/api";

export const useDocumentCount = (userId) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCount = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await api.get(`/documents/count/me`);
        setCount(res.data);
      } catch (err) {
        console.error("Failed to fetch document count:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [userId]);

  return { count, loading, error };
};
