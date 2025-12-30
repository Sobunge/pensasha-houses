// src/hooks/useUserProfile.js
import { useState, useEffect } from "react";
import api from "../../api/api";

export default function useUserProfile(user) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(Boolean(user));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        let endpoint;
        switch (user.role) {
          case "tenant":
            endpoint = `/tenants/${user.id}`;
            break;
          case "landlord":
            endpoint = `/landlords/${user.id}`;
            break;
          case "caretaker":
            endpoint = `/caretakers/${user.id}`;
            break;
          case "admin":
            endpoint = `/admins/${user.id}`;
            break;
          default:
            throw new Error("Unknown role");
        }

        const { data } = await api.get(endpoint);
        if (isMounted) setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        if (isMounted) {
          setError(err.response?.data?.message || err.message || "Failed to load profile");
          setProfile(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return { profile, loading, error };
}
