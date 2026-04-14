// src/hooks/useProperties.js
import { useState, useEffect, useCallback } from "react";
import api from "../../api/api"; 

export const useProperties = (activeRole, userId, page, size = 4) => {
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const role = activeRole?.toUpperCase();
      let url = `/properties?page=${page - 1}&size=${size}`;

      if (role === "LANDLORD" && userId) {
        url = `/properties/landlord/${userId}?page=${page - 1}&size=${size}`;
      }

      const response = await api.get(url);
      
      // --- HATEOAS DATA EXTRACTION ---
      // 1. Extract the list from _embedded
      // Usually named based on the object type, e.g., 'propertyDTOList'
      const embeddedData = response.data._embedded;
      const content = embeddedData ? Object.values(embeddedData)[0] : [];
      
      // 2. Extract totalPages from the 'page' metadata object
      const pagination = response.data.page;
      
      setProperties(content);
      setTotalPages(pagination?.totalPages || 0);

    } catch (err) {
      // Handle 204 No Content (ResponseEntity.noContent().build())
      if (err.response?.status === 204) {
        setProperties([]);
        setTotalPages(0);
      } else {
        setError(err.message || "Failed to load properties.");
      }
    } finally {
      setLoading(false);
    }
  }, [activeRole, userId, page, size]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, totalPages, loading, error, refresh: fetchProperties };
};