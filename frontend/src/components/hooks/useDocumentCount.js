import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../pages/Auth/AuthContext";

export const useDocumentCount = () => {
  const { user } = useAuth();

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchCount = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await api.get(`/documents/count/${user.id}`);
        setCount(res.data);
      } catch (err) {
        console.error("Failed to fetch document count:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [user?.id]);

  return { count, loading, error };
};
