import { useEffect, useState } from "react";
import { useAuth } from "../../pages/Auth/AuthContext";
import api from "../../api/api";

export default function useProfile() {
  const { user: authUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authUser) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    api.get("/users/me")
      .then(res => {
        setProfile(res.data);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setProfile(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authUser]);

  return {
    profile,
    role: profile?.role,
    loading,
    error,
    refreshProfile: () =>
      api.get("/users/me").then(res => setProfile(res.data)),
  };
}
