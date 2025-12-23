import { useState, useEffect } from "react";
import api from "../../api/api";

export function useTenantRequestsCount(tenantId) {
  const [counts, setCounts] = useState({
    PENDING: 0,
    IN_PROGRESS: 0,
    COMPLETED: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tenantId) return;

    const fetchCounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/maintenance-requests/tenant/${tenantId}/counts`);
        
        // Ensure the response has the expected keys
        setCounts({
          PENDING: response.data.PENDING || 0,
          IN_PROGRESS: response.data.IN_PROGRESS || 0,
          COMPLETED: response.data.COMPLETED || 0,
        });
      } catch (err) {
        console.error("Failed to fetch maintenance counts:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [tenantId]);

  return { counts, loading, error };
}
