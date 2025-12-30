import { useState, useEffect } from "react";
import api from "../../api/api"; // your axios instance

export default function useTenantProfile(idNumber) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(idNumber));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idNumber) return; // skip if no ID provided

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/tenants/${idNumber}`);
        setUser(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch tenant profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [idNumber]); // re-run if idNumber changes

  return { user, loading, error };
}
