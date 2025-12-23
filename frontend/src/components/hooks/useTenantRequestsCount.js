import { useState, useEffect } from "react";
import axios from "axios";

export function useTenantRequestsCount(tenantId) {
  const [counts, setCounts] = useState({ PENDING: 0, IN_PROGRESS: 0, COMPLETED: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tenantId) return;

    const fetchCounts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/maintenance-requests/tenant/${tenantId}/counts`);
        setCounts(response.data);
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
