import { useState, useEffect } from "react";
import api from "../../api/api";

export function useTenantAnnouncements(userId) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchAnnouncements = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/announcements/user/${userId}`);
        setAnnouncements(response.data || []);
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [userId]);

  return { announcements, loading, error };
}
